'use strict';

const pathsTopLevel = [
  'app',
  'applications',
  'appManifests',
  'apps',
  'authorizations',
  'codesOfConduct',
  'emojis',
  'enterprises',
  'events',
  'feeds',
  'gists',
  'gitignore',
  'installation',
  'issues',
  'licenses',
  'markdown',
  'marketplaceListing',
  'meta',
  'networks',
  'notifications',
  'octocat',
  'organizations',
  'orgs',
  'projects',
  'rateLimit',
  'repos',
  'repositories',
  'scim',
  'search',
  'teams',
  'user',
  'users',
  'zen',
];

let outputFiles = {};
pathsTopLevel.forEach((name) => {
  const upper = name.charAt(0).toUpperCase() + name.slice(1);
  const key = `../output/${name}Endpoints.ts`;
  const value = {
    filterEndpoints: new RegExp(`^[a-z]+${upper}`),
  };
  outputFiles[key] = value;
});

const config = {
  schemaFile: 'api.github.com.json',
  apiFile: 'baseApi.ts',
  apiImport: 'githubApi',
  outputFiles,
  exportName: 'githubApi',
  hooks: true,
};

exports.default = config;
