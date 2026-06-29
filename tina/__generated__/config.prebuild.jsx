// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  // These read from env vars and are only required for live editing via Tina Cloud.
  // Local production builds (build:local) work without them via the local datalayer.
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID ?? "",
  token: process.env.TINA_TOKEN ?? "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    // Git-based media: uploads are committed to /public/uploads, no external store needed.
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      // ───────────────────────────────────────────────────────────────
      // 1. SITE SETTINGS — single document, edited by staff (no create/delete)
      // ───────────────────────────────────────────────────────────────
      {
        name: "siteSettings",
        label: "Site Settings",
        path: "content/settings",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          router: () => "/"
        },
        fields: [
          {
            type: "string",
            name: "orgName",
            label: "Organization Name",
            required: true
          },
          {
            type: "string",
            name: "tagline",
            label: "Tagline / Short Description"
          },
          {
            type: "image",
            name: "logo",
            label: "Logo",
            description: "Upload the NBUF-KC logo. Leave empty to show the text name."
          },
          {
            type: "object",
            name: "address",
            label: "Office Address",
            fields: [
              { type: "string", name: "line1", label: "Street Address" },
              {
                type: "string",
                name: "line2",
                label: "City, State, ZIP"
              },
              {
                type: "string",
                name: "mapEmbedUrl",
                label: "Google Maps Embed URL",
                description: 'Optional. In Google Maps: Share \u2192 Embed a map \u2192 copy the src="..." URL only.'
              }
            ]
          },
          {
            type: "string",
            name: "email",
            label: "Contact Email",
            description: "PLACEHOLDER \u2014 replace with the real address."
          },
          {
            type: "string",
            name: "phone",
            label: "Phone Number",
            description: "PLACEHOLDER \u2014 replace with the real number."
          },
          {
            type: "string",
            name: "hours",
            label: "Office Hours",
            description: "PLACEHOLDER \u2014 e.g. 'Mon\u2013Fri, 10am\u20134pm'."
          },
          {
            type: "string",
            name: "nextForumDate",
            label: "Next Liberation Forum Date",
            description: "PLACEHOLDER \u2014 e.g. 'Saturday, July 19, 2026 \xB7 2pm'."
          },
          {
            type: "object",
            name: "social",
            label: "Social Links",
            fields: [
              { type: "string", name: "facebook", label: "Facebook URL" },
              { type: "string", name: "instagram", label: "Instagram URL" }
            ]
          },
          {
            type: "string",
            name: "donationLink",
            label: "Donation Link (optional)",
            description: "Optional. If set, a 'Donate' button appears. Leave empty to hide it."
          }
        ]
      },
      // ───────────────────────────────────────────────────────────────
      // 2a. HOME PAGE — single document
      // ───────────────────────────────────────────────────────────────
      {
        name: "home",
        label: "Home Page",
        path: "content/home",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          router: () => "/"
        },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Hero",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "string",
                name: "subheading",
                label: "Subheading",
                ui: { component: "textarea" }
              },
              {
                type: "string",
                name: "primaryCtaLabel",
                label: "Primary Button Label"
              },
              {
                type: "string",
                name: "primaryCtaHref",
                label: "Primary Button Link"
              },
              {
                type: "string",
                name: "secondaryCtaLabel",
                label: "Secondary Button Label"
              },
              {
                type: "string",
                name: "secondaryCtaHref",
                label: "Secondary Button Link"
              },
              {
                type: "image",
                name: "image",
                label: "Hero Image (optional) [PHOTO NEEDED]"
              }
            ]
          },
          {
            type: "object",
            name: "mission",
            label: "Mission Snapshot",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "rich-text", name: "body", label: "Body" }
            ]
          },
          {
            type: "object",
            name: "actionCards",
            label: "Action Cards",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.title ?? "Card" })
            },
            fields: [
              { type: "string", name: "title", label: "Title" },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" }
              },
              { type: "string", name: "href", label: "Link" },
              { type: "string", name: "ctaLabel", label: "Link Label" }
            ]
          },
          {
            type: "object",
            name: "ourWork",
            label: "Our Work",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "string",
                name: "intro",
                label: "Intro",
                ui: { component: "textarea" }
              },
              {
                type: "object",
                name: "focusAreas",
                label: "Focus Areas",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.title ?? "Focus Area" })
                },
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    ui: { component: "textarea" }
                  }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "upcomingForum",
            label: "Upcoming Forum Block",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "string",
                name: "body",
                label: "Body",
                ui: { component: "textarea" }
              }
            ]
          },
          {
            type: "object",
            name: "contactCta",
            label: "Contact / Social Call-to-Action",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "string",
                name: "body",
                label: "Body",
                ui: { component: "textarea" }
              }
            ]
          }
        ]
      },
      // ───────────────────────────────────────────────────────────────
      // 2b. ABOUT PAGE — single document
      // ───────────────────────────────────────────────────────────────
      {
        name: "about",
        label: "About Page",
        path: "content/about",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          router: () => "/about"
        },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Hero",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "string",
                name: "subheading",
                label: "Subheading",
                ui: { component: "textarea" }
              }
            ]
          },
          {
            type: "object",
            name: "mission",
            label: "Mission",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "rich-text", name: "body", label: "Body" }
            ]
          },
          {
            type: "object",
            name: "vision",
            label: "Vision",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "rich-text", name: "body", label: "Body" }
            ]
          },
          {
            type: "object",
            name: "history",
            label: "History",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "rich-text", name: "body", label: "Body" }
            ]
          },
          {
            type: "object",
            name: "whatWeDo",
            label: "What We Do",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "rich-text", name: "body", label: "Body" },
              {
                type: "object",
                name: "items",
                label: "Items",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.title ?? "Item" }) },
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    ui: { component: "textarea" }
                  }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "leadership",
            label: "Leadership (optional \u2014 shown only if filled in)",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.name ?? "Member" }) },
            fields: [
              { type: "string", name: "name", label: "Name" },
              { type: "string", name: "role", label: "Role / Title" },
              { type: "image", name: "photo", label: "Photo [PHOTO NEEDED]" },
              {
                type: "string",
                name: "bio",
                label: "Short Bio",
                ui: { component: "textarea" }
              }
            ]
          }
        ]
      },
      // ───────────────────────────────────────────────────────────────
      // 3. PARTNERS — repeatable (starts empty)
      // ───────────────────────────────────────────────────────────────
      {
        name: "partner",
        label: "Partners",
        path: "content/partners",
        format: "json",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => (values?.name ?? "partner").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
          }
        },
        fields: [
          {
            type: "string",
            name: "name",
            label: "Name",
            required: true,
            isTitle: true
          },
          {
            type: "string",
            name: "blurb",
            label: "Short Description",
            ui: { component: "textarea" }
          },
          { type: "string", name: "url", label: "Website URL" },
          {
            type: "number",
            name: "order",
            label: "Sort Order (lower shows first)"
          }
        ]
      },
      // ───────────────────────────────────────────────────────────────
      // 4. RESOURCES — downloadable documents
      // ───────────────────────────────────────────────────────────────
      {
        name: "resource",
        label: "Resources",
        path: "content/resources",
        format: "json",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => (values?.title ?? "resource").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
            isTitle: true
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: { component: "textarea" }
          },
          {
            type: "image",
            name: "file",
            label: "File (PDF or image)",
            description: "Upload the document. Staff can add files here directly."
          },
          {
            type: "string",
            name: "type",
            label: "Type",
            options: ["PDF", "Image", "Flyer", "Document", "Link"]
          },
          {
            type: "number",
            name: "order",
            label: "Sort Order (lower shows first)"
          }
        ]
      },
      // ───────────────────────────────────────────────────────────────
      // 5. UPDATES — blog posts (MDX)
      // ───────────────────────────────────────────────────────────────
      {
        name: "update",
        label: "Updates (Blog)",
        path: "content/updates",
        format: "mdx",
        ui: {
          router: (props) => `/updates/${props.document._sys.filename}`,
          filename: {
            readonly: false,
            slugify: (values) => (values?.title ?? "untitled").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
            isTitle: true
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft (hidden from the live site)"
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt / Summary",
            ui: { component: "textarea" }
          },
          {
            type: "image",
            name: "coverImage",
            label: "Cover Image (optional) [PHOTO NEEDED]"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
