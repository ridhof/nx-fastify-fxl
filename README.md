# nx-fastify-fxl

This is a Fastify setup that responds with Excel spreadsheet embedded in an Nx workspace.

Test the API with:

```bash
curl -X POST \
    -H "Content-Type: application/json" \
    -d @resources/example-data.json \
    -o output.xlsx \
    localhost:8080/excel
```
