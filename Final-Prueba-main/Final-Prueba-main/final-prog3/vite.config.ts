import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ============================================================
// 🔍 Autoescaneo de todos los .html dentro de /src/pages/
// ============================================================
function getHtmlEntries() {
  const baseDir = resolve(__dirname, "src/pages");
  const entries: Record<string, string> = {};

  function scan(dir: string) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = resolve(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        scan(fullPath);
      } else if (file.endsWith(".html")) {
        let relative = fullPath.replace(baseDir, "");
        relative = relative.replace(/\\/g, "/");
        if (relative.startsWith("/")) relative = relative.slice(1);
        entries[`src/pages/${relative}`] = fullPath;
      }
    }
  }

  scan(baseDir);
  return entries;
}

// ============================================================
// 🧩 Plugin para servir rutas HTML reales (evita “Hola este es el index”)
// ============================================================
function ServeHtmlPlugin(): Plugin {
  return {
    name: "serve-html-plugin",
    configureServer(server: ViteDevServer) {
      server.middlewares.use((req: any, res: any, next: any) => {
        if (req.url && req.url.endsWith(".html") && req.url.startsWith("/src/pages/")) {
          const filePath = resolve(__dirname, "." + req.url);
          if (fs.existsSync(filePath)) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.end(fs.readFileSync(filePath));
            return;
          }
        }
        next();
      });
    },
  };
}

// ============================================================
// 🚀 Configuración principal de Vite
// ============================================================
export default defineConfig({
  root: ".",                 // raíz del proyecto
  base: "./",                // ✅ evita errores de rutas absolutas en build
  plugins: [ServeHtmlPlugin()],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        ...getHtmlEntries(), // ✅ incluye todos los HTML de src/pages
      },
    },
  },
  server: {
    open: "/src/pages/auth/login/login.html", // página inicial al ejecutar npm run dev
    fs: {
      allow: [resolve(__dirname, "src"), resolve(__dirname)],
    },
  },
});
