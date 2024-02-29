const Core = require('@actions/core');
const Github = require('@actions/github');
const Path = require("path")
const fs = require('fs')

try {
    // Get octokit
    const Octokit = Github.getOctokit(Core.getInput('token'));
    // Read & parse release note
    let note_content = fs.readFileSync(Path.resolve(Core.getInput('note')), {encoding: 'utf8'});
    const [tag_str, tag_name] = note_content.match(/^\`(.*)\`\n/);
    note_content = note_content.substring(tag_str.length);
    // Get tags
    Octokit.rest.git.listMatchingRefs({
        owner: Github.context.repo.owner,
        repo: Github.context.repo.repo,
        ref: `tags/${tag_name}`
    })
    .then(req => req.data)
    .then(console.log)

    // Get assets
    const asset_paths = Core.getInput('assets').split("\n").map(s => s.trim());
    console.log(`Assets: ${asset_paths}`);
} catch (error) {
    Core.setFailed(error.message);
}