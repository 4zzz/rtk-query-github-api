# rtk-query-github-api

This package can be used to generate RTK Query based Github API definition using patched version of package @rtk-query/codegen-openapi (and some of its dependencies) that can be used for code generation since version `1.0.0-alpha.1` cannot be used.

Used OpenAPI schema is in file `config/api.github.com.json` and configuration for codegen-openapi is in `config/openapi-config.js`

To generate code clone this repository, install package dependencies with `npm install` and then run `npm run generate-api`. If everything went right, directory `src/endpoints` should be populated with generated code.
