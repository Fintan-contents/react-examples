import { defineConfig } from "orval";

export default defineConfig({
  sampleFront: {
    output: {
      mode: "tags-split",
      clean: true,
      target: "src/libs/generated/api.ts",
      schemas: "src/libs/generated/model",
      client: "react-query",
      tsconfig: "tsconfig.json",
      override: {
        query: {
          useQuery: true,
        },
        mutator: {
          path: "src/libs/backend/customInstance.ts",
          name: "backendCustomInstance",
        },
      },
    },
    input: {
      target: "./openapi/openapi_todo.yaml",
    },
  },
});
