const Core = require('@actions/core');
const Github = require('@actions/github');
const Path = require("path")
const fs = require('fs')

try {
    const note_path = Path.resolve(Core.getInput('note'));
    console.log(`Note ${note_path}`);
    const note_content = fs.readFileSync(note_path, {encoding: 'utf8'})
    console.log(note_content)
    const tag_match = note_content.match(/^\`(.*)\`\n/)
    console.log(tag_match[1])
    console.log(tag_match[0])
    const asset_paths = Core.getInput('assets').split("\n").map(s => s.trim());
    console.log(`Assets: ${asset_paths}`);
} catch (error) {
    Core.setFailed(error.message);
}