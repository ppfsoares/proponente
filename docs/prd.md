# Definição de Requisitos do Produto (PRD)

## Descrição do produto

**Problema:** Dispersão de informações sobre editais e alta complexidade burocrática que exclui a base da pirâmide cultural.

**Solução:** O "Alerta Cultura", uma plataforma inteligente de monitoramento e notificação personalizada de editais.

Para o **público-alvo**, o produto garante redução de desigualdades regionais, economia de tempo na busca por fomento e maior autonomia para propostas independentes.

Nossos Diferenciais:
- Indexação inteligente com classificação semântica (NLP).
- Foco em inclusão regional (ênfase no Nordeste) e minorias.
- Tradução de editais para linguagem simples.
- Modelo de negócio B2G2C e micro-pagamentos acessíveis.

---

## Perfis de Usuário

### Agente Cultural (Artista/Coletivo)
- **Problemas:** Falta de tempo para monitoramento e dificuldade em entender requisitos técnicos.
- **Objetivos:** Encontrar e submeter projetos a editais compatíveis com sua realidade.
- **Dados demográficos:** Artistas e produtores independentes, 18-65 anos, diversas linguagens artísticas.
- **Motivações:** Sustentabilidade financeira da arte e democratização do acesso ao recurso público.
- **Frustrações:** Perder prazos e não compreender por que não são elegíveis a certas vagas.

### Gestor Governamental
- **Problemas:** Baixa capilaridade dos editais e gestão ineficiente de inscritos.
- **Objetivos:** Aumentar a diversidade de proponentes e automatizar processos de avaliação.
- **Motivações:** Eficiência na aplicação de recursos públicos (Lei Rouanet, PNAB, etc.).

---

## Principais Funcionalidades  (V1)

### RFN-01 - Indexador Automatizado
- Motor em Python para captura de dados em Diários Oficiais e portais de fomento.
Critérios de Aceitação:
- Deve identificar título, valor, prazo e público-alvo com alta precisão.

### RFN-02 - Perfil e Alertas Personalizados
- Cadastro de perfil criativo e configuração de alertas via e-mail/dashboard.
Critérios de Aceitação:
- Usuário deve receber notificações apenas de editais que dão "match" com seu perfil.

### RFN-03 - Tradutor de Editais (IA)
- Resumo de editais complexos em linguagem simples (Quem pode? Quanto? Quando?).
Critérios de Aceitação:
- O resumo deve ter no máximo 3 frases e destacar impedimentos legais.

---

## Requisitos Não Funcionais

### RNF-01 - Acessibilidade
- Conformidade com WCAG 2.1 nível AA, incluindo suporte a leitores de tela e alto contraste.

### RNF-02 - Escalabilidade
- Arquitetura capaz de suportar o crescimento da base de usuários sem perda de performance no processamento de dados.

---

## Métricas de Sucesso
- Número de usuários cadastrados (Meta: 5.000 em 6 meses).
- Taxa de submissão de projetos após o alerta.
- Volume de editais indexados por região.

---

## Premissas e restrições
- Dependência da disponibilidade de portais de dados abertos governamentais.
- Necessidade de conformidade estrita com a LGPD para dados de proponentes.

## Escopo
- **V1 (MVP):** Indexador nacional/regional, cadastro de perfil e alertas por e-mail.
- **V2:** Aplicativo PWA, trilhas de conhecimento e assistente de IA para redação de projetos.
- **V3:** ERP Gestor de projetos e prestação de contas
- **V4:** Observatório de fomento cultural (dados abertos, tendências, etc.)
- **V5:** ERP Gestor de projetos e prestação de contas para órgãos públicos