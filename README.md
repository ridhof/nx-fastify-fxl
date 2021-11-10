# nx-fastify-fxl

This is a Fastify setup that responds with Excel spreadsheet embedded in an Nx workspace.

## Notes

1. Create an Nx workspace: `npx create-nx-workspace`.
2. Install the Fastify plugin and generate: `yarn add @plugified/nx-fastify && nx g @plugified/nx-fastify:application api`.
3. Install fxl.js: `yarn add @01group/fxl`.

## Test the API

Run the API server with `yarn nx serve api`.

```bash
curl -X POST \
    -H "Content-Type: application/json" \
    -d @resources/example-data.json \
    -o output.xlsx \
    localhost:8080/excel
```
