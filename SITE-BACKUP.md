# Memories as Art website backup

This branch contains the operational website source and every published image from the saved version 7 of https://memories-as-art.photosbytabi.chatgpt.site/.

- `apps/` and `packages/`: editable shared CMS applications, presentation, content and tests.
- `published-site/`: exact deployable snapshot, including every page, original SEO filename and bundled asset.
- `tools/build-photography-preview.mjs`: build the static snapshot from the shared React component after installing the pinned dependencies and building component CSS.

Internal Dropbox import records, private connector identifiers, processing scratch data and restoration audit originals are excluded. They are not required to run or build this website.

The original hosted Site is unchanged. A new separate Sites project has not yet been provisioned because the Sites duplication capability is unavailable in this session.
