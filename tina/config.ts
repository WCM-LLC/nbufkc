import { defineConfig } from "tinacms";

// Branch resolution: explicit env var wins, then Vercel's git ref, then a default.
const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  // These read from env vars and are only required for live editing via Tina Cloud.
  // Local `tinacms build` works without them (uses the local filesystem data layer).
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID ?? "",
  token: process.env.TINA_TOKEN ?? "",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "siteSettings",
        label: "Site Settings",
        path: "content/settings",
        format: "json",
        ui: {
          // Single-document collection: staff edit it, but cannot create/delete copies.
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: "string", name: "orgName", label: "Organization Name", required: true },
          { type: "string", name: "tagline", label: "Tagline" },
        ],
      },
    ],
  },
});
