import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/information")({
  head: () => ({
    meta: [
      { title: "BCH Information & Original Pages — Bwindi Community Hospital" },
      {
        name: "description",
        content:
          "Original BCH pages, reports, clinical services, community programs, education and donation information.",
      },
      { property: "og:title", content: "BCH Information & Original Pages" },
      {
        property: "og:description",
        content: "Access original information published by Bwindi Community Hospital.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <Outlet />,
});
