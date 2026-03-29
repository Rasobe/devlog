import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "http://localhost:8080/api/v1/v3/api-docs",
  output: {
    path: "src/infrastructure/api",
  },
  plugins: [
    "@hey-api/client-fetch",
    "@hey-api/sdk",
    "@hey-api/typescript",
    "@tanstack/react-query"
  ],
});
