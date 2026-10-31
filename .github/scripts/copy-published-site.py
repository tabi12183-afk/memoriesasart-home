"""Restore exact public website assets from the verified backup transfer parts."""
import base64
import hashlib
import json
import os
from pathlib import Path
import subprocess
import tarfile
import tempfile
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[2]
REPOSITORY = 'tabi12183-afk/memoriesasart-home'
BRANCH = 'tabis-branch'
ARCHIVE_SHA256 = '1b1f39894cf45911d81227a85ca3d9d04389f08aa72fef594da966d21451ca0b'

def git(*args, **kwargs):
    return subprocess.check_output(['git', *args], cwd=ROOT, **kwargs).decode().strip()

def digest(data):
    return hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest()

def restore(assets):
    parts = sorted((ROOT / '.github/site-asset-parts').glob('*.part'))
    if not parts:
        for asset in assets:
            for relative in asset['paths']:
                if digest((ROOT / relative).read_bytes()) != asset['sha']:
                    raise ValueError('Existing asset does not match the saved snapshot: ' + relative)
        return
    with tempfile.TemporaryFile() as assembled:
        sha256 = hashlib.sha256()
        for part in parts:
            with part.open('rb') as source:
                while data := source.read(1024 * 1024):
                    assembled.write(data)
                    sha256.update(data)
        if sha256.hexdigest() != ARCHIVE_SHA256:
            raise ValueError('Transfer archive checksum mismatch')
        assembled.seek(0)
        with tarfile.open(fileobj=assembled, mode='r:') as archive:
            for asset in assets:
                name = urlsplit(asset['url']).path.lstrip('/')
                member = archive.getmember(name)
                if not member.isfile():
                    raise ValueError('Expected a regular asset file')
                data = archive.extractfile(member).read()
                if digest(data) != asset['sha']:
                    raise ValueError('Asset checksum mismatch: ' + name)
                for relative in asset['paths']:
                    path = ROOT / relative
                    if not path.resolve().is_relative_to(ROOT):
                        raise ValueError('Asset path is outside the backup root')
                    path.parent.mkdir(parents=True, exist_ok=True)
                    path.write_bytes(data)

def main():
    if os.environ.get('GITHUB_REPOSITORY') != REPOSITORY:
        raise SystemExit('Restricted to the requested repository.')
    if os.environ.get('GITHUB_REF') != 'refs/heads/' + BRANCH:
        raise SystemExit('Restricted to the existing backup branch.')
    if git('branch', '--show-current') != BRANCH:
        raise SystemExit('Checked out branch is not the backup branch.')
    assets = json.loads((ROOT / '.github/site-copy-manifest.json').read_text())
    restore(assets)
    for asset in assets:
        for relative in asset['paths']:
            if digest((ROOT / relative).read_bytes()) != asset['sha']:
                raise ValueError('Post-copy verification failed: ' + relative)
    git('add', '--', 'apps/site/public/assets', 'apps/admin/public/assets', 'published-site/assets')
    if (ROOT / '.github/site-asset-parts').exists():
        git('rm', '-r', '--', '.github/site-asset-parts')
    verified = {'source_version': 7, 'unique_assets': len(assets), 'verified_asset_files': sum(len(a['paths']) for a in assets), 'every_asset_hash_matches_saved_publication': True}
    (ROOT / '.github/site-copy-verification.json').write_text(json.dumps(verified, indent=2) + '\n')
    git('add', '--', '.github/site-copy-verification.json')
    if not git('diff', '--cached', '--name-only'):
        print('Every asset already matches the saved publication.')
        return
    git('config', 'user.name', 'github-actions[bot]')
    git('config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com')
    git('commit', '-m', 'Restore and verify every published photography asset')
    env = dict(os.environ)
    authorization = base64.b64encode(('x-access-token:' + env['GITHUB_TOKEN']).encode()).decode()
    env['BACKUP_GIT_AUTHORIZATION'] = 'Authorization: Basic ' + authorization
    remote = 'https://github.com/' + REPOSITORY + '.git'
    subprocess.run(['git', '-c', 'credential.helper=', '--config-env=http.' + remote + '.extraHeader=BACKUP_GIT_AUTHORIZATION', 'push', remote, 'HEAD:refs/heads/' + BRANCH], cwd=ROOT, env=env, check=True)
    print('Verified ' + str(len(assets)) + ' unique assets across ' + str(verified['verified_asset_files']) + ' files.')

if __name__ == '__main__':
    main()
