'use strict';

const pathsTopLevel = [
  'actions',
  'activity',
  'apps',
  'billing',
  'codeScanning',
  'codesOfConduct',
  'codespaces',
  'dependabot',
  'emojis',
  'enterpriseAdmin',
  'gists',
  'git',
  'gitignore',
  'checks',
  'interactions',
  'issues',
  'licenses',
  'markdown',
  'meta',
  'migrations',
  'oauthAuthorizations',
  'orgs',
  'packages',
  'projects',
  'pulls',
  'rateLimit',
  'reactions',
  'repos',
  'scim',
  'search',
  'secretScanning',
  'teams',
  'users',
];

let outputFiles = {};
pathsTopLevel.forEach((name) => {
  const key = `../src/endpoints/${name}.ts`;
  const value = {
    filterEndpoints: new RegExp(`^${name}`),
  };
  outputFiles[key] = value;
});

const config = {
  schemaFile: 'api.github.com.json',
  apiFile: '../src/baseApi.ts',
  apiImport: 'githubApi',
  outputFiles,
  exportName: 'githubApi',
  hooks: true,
};

exports.default = config;
