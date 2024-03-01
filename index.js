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
    const [name_str, release_name] = note_content.match(/^#\s+(.*)\n/);
    note_content = note_content.substring(name_str.length);
    // Get assets
    const asset_paths = Core.getInput('assets').split("\n").map(s => s.trim());
    console.log(`Assets: ${asset_paths}`);
    // Get/Create tags
    Octokit.rest.git.listMatchingRefs({
        owner: Github.context.repo.owner,
        repo: Github.context.repo.repo,
        ref: `tags/${tag_name}`
    })
    .then(res => res.data)
    .then(Octokit.request('POST /repos/{owner}/{repo}/releases', {
        owner: Github.context.repo.owner,
        repo: Github.context.repo.repo,
        tag_name: tag_name,
        target_commitish: Github.context.sha,
        name: release_name,
        body: note_content,
        draft: true,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
    }))
} catch (error) {
    Core.setFailed(error.message);
}