const core = require('@actions/core');
const github = require('@actions/github');

try {
    const note_path = core.getInput('note');
    console.log(`Note ${note_path}`);
    const asset_paths = core.getInput('assets');
    console.log(`Assets: ${asset_paths}`);
} catch (error) {
    core.setFailed(error.message);
}