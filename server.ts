import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/grants", async (req, res) => {
    try {
      let grants = await prisma.grant.findMany({
        orderBy: { deadline: 'asc' }
      });

      // Seed mock data if empty
      if (grants.length === 0) {
        const mockGrants = [
          {
            title: "Edital de Fomento à Música Independente - PE",
            description: "Apoio a projetos de gravação e circulação de artistas independentes em Pernambuco. Foco em novos talentos e diversidade rítmica.",
            value: 50000,
            deadline: new Date("2026-05-15"),
            state: "Pernambuco",
            category: "Música",
            isUrgent: true,
            externalUrl: "https://www.cultura.pe.gov.br"
          },
          {
            title: "Lei Paulo Gustavo - Audiovisual Bahia",
            description: "Seleção de projetos de curta e longa metragem, além de capacitação técnica no setor audiovisual baiano.",
            value: 120000,
            deadline: new Date("2026-04-30"),
            state: "Bahia",
            category: "Audiovisual",
            isUrgent: false,
            externalUrl: "https://www.cultura.ba.gov.br"
          },
          {
            title: "Prêmio Culturas Populares do Ceará",
            description: "Reconhecimento de mestres e mestras da cultura popular cearense. Valorização do patrimônio imaterial.",
            value: 20000,
            deadline: new Date("2026-06-10"),
            state: "Ceará",
            category: "Cultura Popular",
            isUrgent: false,
            externalUrl: "https://www.secult.ce.gov.br"
          }
        ];
        
        // Use createMany if supported, or loop
        for (const g of mockGrants) {
          await prisma.grant.create({ data: g });
        }
        grants = await prisma.grant.findMany({ orderBy: { deadline: 'asc' } });
      }

      res.json(grants);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch grants" });
    }
  });

  app.get("/api/grants/:id", async (req, res) => {
    try {
      const grant = await prisma.grant.findUnique({
        where: { id: req.params.id }
      });
      if (!grant) return res.status(404).json({ error: "Grant not found" });
      res.json(grant);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch grant" });
    }
  });

  app.post("/api/profile", async (req, res) => {
    try {
      const profile = await prisma.profile.upsert({
        where: { userId: req.body.userId },
        update: req.body,
        create: req.body
      });
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: "Failed to save profile" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
