# Especificação Técnica

## Visão Geral Técnica
Este documento detalha a arquitetura do ecossistema Soma Inova, priorizando a robustez no tratamento de dados e a escalabilidade do serviço de alertas.

---

## Arquitetura de Referência
- **Estilo:** Microserviços desacoplados.
- **Componentes:** Scraper (Python), APP Core (Next.js), Worker de Notificações.
- **Comunicação:** REST e Filas Assíncronas (Redis).
- **Infraestrutura:** Deployment em Cloud (Vercel/AWS).

---

## Stack Tecnológica

### Frontend
- **Linguagem**: TypeScript
- **Framework web**: Next.js
- **Estilização**: Tailwind CSS

### Backend
- **Linguagem**: Python (Web Scraping/NLP) e Node.js (API)
- **Runtime**: Node.js LTS / Python 3.11+
- **Framework**: Express (Node) / Scrapy (Python)
- **Persistência**: PostgreSQL (Dados estruturados)
- **NoSQL**: MongoDB (Logs e documentos de editais)

### Stack de Desenvolvimento
- **IDE**: Antigravity
- **Gerenciamento de pacotes**: NPM / Pip
- **Pipeline CI/CD**: GitHub Actions

---

## Segurança

### Autenticação e Gestão de Sessão
- Supabase Auth

### Segurança de Dados
- Criptografia em repouso (AES-256) e em trânsito (TLS/SSL).

---

## APIs
- Padrão RESTful, versionamento via URL (/v1/...), nomenclatura em kebab-case.
- Endpoints protegidos por middleware de autenticação.

---

## Tenancy
- Isolamento lógico via Row-Level Security (RLS) no banco de dados para garantir que um proponente nunca acesse dados de outro.

---

## Diretrizes para Desenvolvimento Assistido por IA
- A IA deve priorizar a geração de código modular, seguindo princípios de Clean Architecture e garantindo a cobertura de testes unitários em funções críticas de parsing de editais.