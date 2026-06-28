// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  // These read from env vars and are only required for live editing via Tina Cloud.
  // Local `tinacms build` works without them (uses the local filesystem data layer).
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID ?? "",
  token: process.env.TINA_TOKEN ?? "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
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
          allowedActions: { create: false, delete: false }
        },
        fields: [
          { type: "string", name: "orgName", label: "Organization Name", required: true },
          { type: "string", name: "tagline", label: "Tagline" }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
