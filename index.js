let Core = require('@actions/core');
let Github = require('@actions/github');
let Path = require("path")
let Fs = require('fs')

try {
    // Get octokit
    let Octokit = Github.getOctokit(Core.getInput('token'));
    // Read & parse release note
    let note_content = Fs.readFileSync(Path.resolve(Core.getInput('note')), {encoding: 'utf8'});
    let [tag_str, tag_name] = note_content.match(/^\`(.*)\`\n/);
    note_content = note_content.substring(tag_str.length);
    // Get tags
    let tags = fs.readdirSync(Path.resolve(".git", "refs", "tags"))
    console.log(tags)

    // Get assets
    let asset_paths = Core.getInput('assets').split("\n").map(s => s.trim());
    console.log(`Assets: ${asset_paths}`);
} catch (error) {
    Core.setFailed(error.message);
}