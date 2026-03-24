# Alerta Cultura

O **Alerta Cultura** é uma plataforma inteligente e inclusiva de monitoramento e notificação personalizada de editais, desenhada para reduzir as barreiras de acesso ao fomento cultural e democratizar recursos contínuos para agentes culturais independentes e gestores públicos ou privados.

## Visão Geral

Este repositório consolida toda a base de documentação de ideação, design e engenharia do projeto. A documentação está organizada para facilitar a entrada de novos membros no ecossistema e atuar como única fonte de verdade para o desenvolvimento da plataforma.

## Índice de Documentação

Todos os artefatos gerados estão concentrados no diretório `/docs`. Acesse os documentos através dos links abaixo:

- 🎯 **[Declaração do Problema (Problem Statement)](./docs/problem_statement.md)**
  *Contexto do problema de negócio, dores dos usuários e oportunidades do produto.*

- 📋 **[Product Requirements Document (PRD)](./docs/prd.md)**
  *Escopo das funcionalidades, matriz de usuários, métricas de sucesso e requisitos não-funcionais.*

- ⚙️ **[Especificação Técnica](./docs/spech_tech.md)**
  *Visão técnica, decisões de stack (Next.js, Python, Tailwind), arquitetura e segurança.*

- 📱 **[Especificação de UI](./docs/spech_ui.md)**
  *Relação de interfaces da aplicação (INT-01 à INT-06) e detalhamento do fluxo do usuário.*

- 🎨 **[Design System (Prisma Cultural)](./docs/design_system.md)**
  *Diretrizes visuais puras (tokens, tipografia, cores e acessibilidade) e princípios de interface.*

- 🤖 **[Prompt de Prototipagem (Google Stitch)](./docs/prompt_stitch.md)**
  *Intruções prontas em prompt estruturado para uso em IA generativa de interfaces.*
  https://stitch.withgoogle.com/u/1/projects/12045098472463027267?pli=1


# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/ac286277-8837-427b-8fa4-14d1261ef22d

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`


---
*© 2024 Soma Inova - Alerta Cultura.*
