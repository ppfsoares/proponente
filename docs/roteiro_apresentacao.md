# Roteiro de Apresentação: Case Alerta Cultura

Este roteiro é voltado para uma apresentação de projeto (case study, banca final ou retrospectiva), abordando desde a concepção do produto e suas especificações até os aprendizados práticos do desenvolvimento.

---

## 1. Capa: O Projeto Alerta Cultura
* **Visual:** Logo do projeto e sua proposta de valor (Opcionalmente, use o Gradiente Coral do Design System).
* **Foco:** Apresentar a missão e o foco do aplicativo.
* **Roteiro Falado:** "Olá. Hoje vamos falar sobre o projeto Alerta Cultura (e o ecossistema Soma Inova), uma plataforma inteligente desenhada para democratizar o acesso a financiamentos e editais culturais através da tecnologia."

## 2. Informações do Projeto: A Descrição do Problema
* **Visual:** Dados ou gráficos demonstrando a alta burocracia e a concentração de recursos (ex: Sudeste vs. Nordeste).
* **Foco:** A barreira de entrada no financiamento cultural.
* **Roteiro Falado:** "O grande problema que identificamos foi a exclusão da base da pirâmide cultural. Artistas independentes perdem prazos ou nem mesmo se candidatam porque as regras são complexas, os editais estão espalhados pelos Diários Oficiais estaduais/federais e a linguagem burocrática é inacessível."

## 3. Informações do Projeto: Resumo do PRD
* **Visual:** Destaque para as personas (Agente Cultural vs. Gestor) e lista das features principais.
* **Foco:** Como o produto se propõe a resolver a dor.
* **Roteiro Falado:** "O foco do nosso Documento de Requisitos (PRD) centrou em 3 pilares fundamentais:
  1. Um indexador/crawler automatizado para compilar os editais do país.
  2. Notificações inteligentes gerando um cenário de 'Match' personalizado para cada perfil.
  3. A 'cereja do bolo': um tradutor de IA que processa 50 páginas de um edital e resume impedimentos legais em até 3 frases de leitura simples."

## 4. Informações do Projeto: Resumo das Especificações Técnicas
* **Visual:** Diagrama de blocos mostrando: Frontend (Next.js/Tailwind), Backend (Python Scraper/Node) e Base de Dados (Supabase).
* **Foco:** Robutez, Arquitetura e Escabilidade.
* **Roteiro Falado:** "A nível arquitetural, adotamos microsserviços. Implementamos um script em Python focado em mineração de dados (Web Scraping/NLP) rodando em background. No núcleo da aplicação (Mobile-First PWA), utilizamos as modernas APIs do Next.js. Toda informação é salva em um Supabase, onde configuramos Row-Level Security (RLS) para estrita conformidade técnica com a LGPD e privacidade."

## 5. A Interface e as Jornadas (Demonstração)
* **Visual:** Print das telas principais: Dashboard de Onboarding (INT-02), Feed de Match (INT-04) e Tabela Multiperfil (INT-06).
* **Foco:** Acessibilidade e foco em conversão amigável.
* **Roteiro Falado:** "O visual não foi pensado ao acaso; nosso Design System garante acessibilidade WCAG 2.1 nível AA nativamente. Criamos do zero jornadas adaptadas: os proponentes acompanham sugestões de 'Match' e os mentores, gestores municipais e empresas B2B possuem planos específicos na nossa tabela de assinatura para publicação ou gestão de captação."

## 6. Principais Achados e Observações do Processo de Desenvolvimento
* **Visual:** Bullet points com destaques dos "bastidores", aprendizados técnicos, de design e de processo.
* **Foco:** Lições aprendidas e uso de ferramentas LLM/Generativas.
* **Roteiro Falado:** 
  "A construção desta plataforma trouxe valiosos aprendizados em nosso processo de engenharia e produto:
  * **Inteligência Artificial Centralizada (Gemini):** Descobrimos rapidamente que algoritmos heurísticos tradicionais eram falhos na varredura de editais. Padronizamos a inteligência usando a API do Gemini via AI Studio para garantir classificações semânticas confiáveis na categorização das exigências e resumos.
  * **Onboarding Sem Atrito:** Notamos através da modelagem de UI que formulários maçantes impedem o cadastro em políticas governamentais. Divulgar informações num processo step-by-step guiado aumentou nossa projeção teórica de conversão de perfil.
  * **Uso de IA Geradora no Workflow (Google Stitch):** A documentação bem amarrada (`prd.md` e o próprio `design_system.md`) permitiu que gerássemos protótipos em alta fidelidade com extrema agilidade utilizando ferramentas generativas; o fluxo inteiro foi validado mais rápido graças a prompts detalhados e estruturados que criamos."

## 7. Próximos Passos (Encerramento/Q&A)
* **Visual:** Links do repositório, link para a aplicação no Google AI Studio (incluso no README) e QR Code de contato.
* **Foco:** Convite para testes.
* **Roteiro Falado:** "Como próximos passos para expandir do MVP para a v2, focaremos na adoção regional orgânica via redes e em melhorar nosso motor de extração para Diários Municipais no Nordeste. Fica aqui o convite: rodem nossa aplicação localmente ou acessem nosso link direto do AI Studio exibido em nosso repositório. Muito obrigado pela atenção!"
