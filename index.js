const Core = require('@actions/core');
const Github = require('@actions/github');
const Path = require("path")

try {
    const note_path = Path.resolve(Core.getInput('note'));
    console.log(`Note ${note_path}`);
    const note_content = fs.readFileSync(note_path, {encoding: 'utf8'})
    console.log(note_content)
    const asset_paths = Core.getInput('assets').split("\n").map(s => s.trim());
    console.log(`Assets: ${asset_paths}`);
} catch (error) {
    core.setFailed(error.message);
}