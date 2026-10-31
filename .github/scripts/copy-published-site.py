"""Copy exact published assets into this backup branch, verifying every Git blob."""
import base64
from concurrent.futures import ThreadPoolExecutor
import hashlib
import json
import os
from pathlib import Path
import subprocess
import urllib.request

ROOT = Path(__file__).resolve().parents[2]
REPOSITORY = 'tabi12183-afk/memoriesasart-home'
BRANCH = 'tabis-branch'

def git(*args, **kwargs):
    return subprocess.check_output(['git', *args], cwd=ROOT, **kwargs).decode().strip()

def copy_asset(asset):
    with urllib.request.urlopen(asset['url'], timeout=90) as response:
        data = response.read()
    actual = hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest()
    if actual != asset['sha']:
        raise ValueError('Published bytes do not match the saved snapshot: ' + asset['url'])
    for relative in asset['paths']:
        path = ROOT / relative
        if not path.resolve().is_relative_to(ROOT):
            raise ValueError('Path is outside the backup root')
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(data)
    return len(asset['paths'])

def main():
    if os.environ.get('GITHUB_REPOSITORY') != REPOSITORY:
        raise SystemExit('This workflow is restricted to the requested repository.')
    if os.environ.get('GITHUB_REF') != 'refs/heads/' + BRANCH:
        raise SystemExit('This workflow is restricted to the existing backup branch.')
    if git('branch', '--show-current') != BRANCH:
        raise SystemExit('The checked out branch is not the backup branch.')
    assets = json.loads((ROOT / '.github/site-copy-manifest.json').read_text())
    with ThreadPoolExecutor(max_workers=8) as pool:
        copied = sum(pool.map(copy_asset, assets))
    git('add', '--', 'apps/site/public/assets', 'apps/admin/public/assets', 'published-site/assets')
    if not git('diff', '--cached', '--name-only'):
        print('Every asset already matches the published snapshot.')
        return
    git('config', 'user.name', 'github-actions[bot]')
    git('config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com')
    git('commit', '-m', 'Copy and verify every published photography asset')
    env = dict(os.environ)
    authorization = base64.b64encode(('x-access-token:' + env['GITHUB_TOKEN']).encode()).decode()
    env['BACKUP_GIT_AUTHORIZATION'] = 'Authorization: Basic ' + authorization
    remote = 'https://github.com/' + REPOSITORY + '.git'
    subprocess.run(['git', '-c', 'credential.helper=', '--config-env=http.' + remote + '.extraHeader=BACKUP_GIT_AUTHORIZATION', 'push', remote, 'HEAD:refs/heads/' + BRANCH], cwd=ROOT, env=env, check=True)
    print('Verified ' + str(len(assets)) + ' unique assets and saved ' + str(copied) + ' files.')

if __name__ == '__main__':
    main()
