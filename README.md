# Soma Alerta

[![Status do Projeto](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)](#)
[![Tecnologias](https://img.shields.io/badge/tech-Next.js%20%7C%20TypeScript%20%7C%20Supabase-blue)](#)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

O **Soma Alerta** é uma plataforma inteligente e inclusiva de monitoramento e notificação personalizada de editais, desenhada para reduzir as barreiras de acesso ao fomento cultural e democratizar recursos contínuos para agentes culturais independentes e gestores públicos ou privados.

---

## 🚀 Visão Geral

Este repositório consolida toda a base de documentação, design e engenharia do ecossistema Soma. A documentação atua como a **única fonte de verdade** para o desenvolvimento assistido por IA e colaboração humana.

### 🍱 Ecossistema Soma
- **Soma Alerta (App/BFF)**: Plataforma de monitoramento e notificações.
- **Soma Index (Scraper)**: Motor de busca e indexação de editais em Diários Oficiais.
- **Soma Assistente (IA)**: Tradutor de editais complexos em resumos simplificados.

---

## 📚 Índice de Documentação

| Documento | Descrição |
| :--- | :--- |
| [🎯 **Problem Statement**](./docs/problem_statement.md) | Contexto de negócio, dores dos usuários e oportunidades. |
| [📋 **PRD**](./docs/prd.md) | Requisitos funcionais, matriz de usuários e métricas. |
| [⚙️ **Especificação Técnica**](./docs/spech_tech.md) | Stack (Next.js, Python), arquitetura e segurança. |
| [📱 **Especificação de UI**](./docs/spech_ui.md) | Fluxos de usuário e detalhamento das interfaces. |
| [🎨 **Design System**](./docs/design_system.md) | Tokens, tipografia, cores e acessibilidade. |
| [🤖 **Prompt Stitch**](./docs/prompt_stitch.md) | Instruções para prototipagem generativa (Google Stitch). |

---

## 🔗 Links do Projeto

- **Protótipo Interativo (Stitch)**: [Visualizar no Stitch](https://stitch.withgoogle.com/u/1/projects/12045098472463027267?pli=1)
- **AI Studio App**: [Acessar Instância](https://ai.studio/apps/ac286277-8837-427b-8fa4-14d1261ef22d)

---

## 🛠️ Como Executar Localmente

### Pré-requisitos
- Node.js (v22.17.0+ recomendado)
- Docker & Docker Compose (para banco de dados local)

### Passo a Passo

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Configuração de Ambiente:**
   Renomeie o arquivo `.env.example` para `.env` e preencha as credenciais necessárias:
   ```bash
   cp .env.example .env
   ```

3. **Banco de Dados (Prisma):**
   ```bash
   # Gerar o cliente Prisma
   npx prisma generate

   # Sincronizar o schema com o banco de dados
   npx prisma db push
   ```

4. **Executar em modo desenvolvimento:**
   ```bash
   npm run dev
   ```

---

## 📁 Estrutura do Projeto

```text
/
├── apps/web/          # Aplicação principal NEXT.js (Frontend + BFF)
├── docs/              # Documentação técnica e de produto (Fonte de Verdade)
├── prisma/            # Schema e migrações do banco de dados
├── src/               # Código fonte compartilhado e componentes
├── .agent/            # Skills e configurações de IA (Antigravity)
└── .github/           # CI/CD Workflows e templates
```

---

## 🤖 Desenvolvimento Assistido por IA

Este projeto foi desenvolvido com Antigravity com auxílio de roteiro de desenvolvimento [disponibilizado](https://github.com/valuedriven/devai/blob/main/.fluxo/fluxo_geral.md) durante pós-graduação em Engenharia de Software da PUC Minas

### Diretrizes para Contribuições
1. **Documentação Primeiro**: Consulte sempre `docs/` antes de gerar qualquer código.
2. **Minimalismo**: Mantenha o escopo estritamente limitado ao definido no `prd.md`.
3. **Padrões**: Priorize modularidade, baixo acoplamento e tipos TypeScript explícitos.
4. **Validação**: Verifique alterações localmente com `npm run lint` antes de submeter.

---

## 🔐 Segurança e Testes

- **Autenticação**: Gerenciada via **Supabase Auth**.
- **Testes**:
  ```bash
  npm test              # Testes unitários
  npm run test:e2e      # Testes de ponta a ponta
  npm run test:coverage # Relatório de cobertura
  ```

---
*© 2024 Soma Inova - Alerta Cultural.*
