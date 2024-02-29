const Core = require('@actions/core');
const Github = require('@actions/github');
const Path = require("path")
const fs = require('fs')

try {
    // Read & parse release note
    const note_path = Path.resolve(Core.getInput('note'));
    console.log(`Note ${note_path}`);
    const note_content = fs.readFileSync(note_path, {encoding: 'utf8'})
    const [tag_str, tag_name] = note_content.match(/^\`(.*)\`\n/)
    note_content = note_content.substring(tag_str.length)
    console.log(note_content)
    console.log(tag_name)
    // Get assets
    const asset_paths = Core.getInput('assets').split("\n").map(s => s.trim());
    console.log(`Assets: ${asset_paths}`);
} catch (error) {
    Core.setFailed(error.message);
}