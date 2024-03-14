# release-action

A GitHub Action to publish release by release API

## Usage

In the .yml file, add

```yaml
uses: WasmVM/release-action@master
    with:
      note: <note_file>
      token: ${{secrets.GITHUB_TOKEN}}
      draft: <true | false>
      assets: |-
        <asset_files>
```

### Fields

**note** : [required] The path of release note file in Markdown
  default: RELEASE.md

**token** : [required] The GitHub token for release API, mostly is `${{secrets.GITHUB_TOKEN}}`

**draft** : [required] Whether this is draft release, true or false
  default: false
**assets** : [optional] Files added to assets
