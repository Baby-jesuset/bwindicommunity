import { defineConfig, loadEnv, type PluginOption } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig(async ({ command, mode }) => {
  const loaded = loadEnv(mode, process.cwd(), "VITE_");
  const define = Object.fromEntries(
    Object.entries(loaded).map(([key, value]) => [`import.meta.env.${key}`, JSON.stringify(value)]),
  );

  const plugins: PluginOption[] = [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    // The bundled server entry is src/server.ts, which wraps SSR errors.
    tanstackStart({ server: { entry: "server" } }),
  ];

  if (command === "build") {
    const { nitro } = await import("nitro/vite");
    // Vercel sets VERCEL=1 during builds and reads the Build Output API
    // directory; everywhere else the bundle targets Cloudflare.
    const preset = process.env["VERCEL"] ? "vercel" : "cloudflare-module";
    plugins.push(nitro({ preset }));
  }

  plugins.push(viteReact());

  return {
    define,
    resolve: {
      alias: { "@": `${process.cwd()}/src` },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-dom/client",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
      ignoreOutdatedRequests: true,
    },
    server: { host: "::", port: 8080 },
    plugins,
  };
});
