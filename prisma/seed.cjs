const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
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

  console.log('Seeding grants...');
  for (const g of mockGrants) {
    await prisma.grant.create({ data: g });
  }
  console.log('Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
