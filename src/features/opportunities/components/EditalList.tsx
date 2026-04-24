import { EditalCard } from "./EditalCard";

const MOCK_EDITAIS = [
  {
    id: "1",
    title: "Lei Paulo Gustavo - Audiovisual Pernambuco",
    value: 50000,
    deadline: "15/05/2026",
    matchScore: 98,
    area: "Cinema",
    location: "Pernambuco",
  },
  {
    id: "2",
    title: "Edital de Ocupação Cultural - SESC Bahia",
    value: 12000,
    deadline: "20/05/2026",
    matchScore: 85,
    area: "Teatro",
    location: "Bahia",
  },
  {
    id: "3",
    title: "Fomento à Música Independente - Recife",
    value: 25000,
    deadline: "02/06/2026",
    matchScore: 92,
    area: "Música",
    location: "Recife/PE",
  },
  {
    id: "4",
    title: "Prêmio Culturas Populares - Nacional",
    value: 30000,
    deadline: "10/06/2026",
    matchScore: 78,
    area: "Cultura Popular",
    location: "Brasil",
  },
];

export function EditalList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
      {MOCK_EDITAIS.map((edital) => (
        <EditalCard key={edital.id} edital={edital} />
      ))}
    </div>
  );
}
