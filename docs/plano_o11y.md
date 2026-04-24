# Observabilidade e Testabilidade

Este documento detalha as estratégias e ferramentas para atender aos requisitos não funcionais de Observabilidade e Testabilidade.

---

## 🛰️ Observabilidade e Rastreabilidade

### Estratégia
Implementar uma arquitetura de logs e rastreamento baseada em padrões abertos, permitindo que qualquer evento no sistema seja correlacionado.

### Ferramentas e Padrões
- **Logging Estruturado**: Utilização do `Pino.js` para gerar logs em formato JSON.
- **Error Tracking**: Integração com **Sentry** para monitoramento de erros em tempo real.
- **Auditoria**: Criação de um interceptor no Prisma para registrar mutações críticas.

### 🛠️ Guia Rápido: Integração com Sentry (Web Gratuito)
Para integrar o Sentry no Next.js (plano gratuito):

1.  **Instalação**:
    ```bash
    npx @sentry/wizard@latest -i nextjs
    ```
2.  **Configuração**:
    *   Siga as instruções do wizard para criar/escolher o projeto no [Sentry.io](https://sentry.io).
    *   O wizard criará automaticamente os arquivos `sentry.client.config.js`, `sentry.server.config.js` e `sentry.edge.config.js`.
3.  **Variáveis de Ambiente**:
    *   Certifique-se de que o `SENTRY_AUTH_TOKEN` foi adicionado ao seu arquivo `.env` (o wizard geralmente faz isso ou gera um arquivo `.sentryclirc`).
4.  **Uso**:
    *   Erros não capturados serão enviados automaticamente.
    *   Para capturar erros manualmente:
        ```javascript
        import * as Sentry from "@sentry/nextjs";
        Sentry.captureException(error);
        ```

---

## 🧪 Manutenibilidade e Testabilidade

### Estratégia
Adotar a Pirâmide de Testes focada em Unidade e Integração (API) para garantir que a lógica de negócio esteja validada sem a complexidade de testes E2E pesados.

### Frameworks Adotados
- **Testes de Unidade e Integração**: `Vitest` + `Supertest` (para APIs).
- **Mocking**: `msw` (Mock Service Worker) para simular chamadas de API externas em testes.

---

## 📋 Roadmap de Implementação

1.  **Fundação**: Setup do Vitest e lib de logging.
2.  **Sentry**: Execução do wizard de integração e teste de disparo de exceção.
3.  **Auditoria**: Implementação de middleware Prisma para logs de auditoria.
4.  **Automação**: Configuração de GitHub Actions para rodar testes de unidade em cada PR.
