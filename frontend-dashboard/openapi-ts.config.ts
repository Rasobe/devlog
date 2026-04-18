import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "http://localhost:3001/swagger/json",
  output: {
    path: "src/infrastructure/api",
  },
  plugins: [
    "@hey-api/client-axios",
    "@hey-api/sdk",
    "@hey-api/typescript",
    "@tanstack/react-query",
  ],
});
