# Modelos C4 - Arquitetura Soma Alerta

Utilizamos a metodologia C4 para descrever a arquitetura do ecossistema de forma multinível.

## Nível 1: Contexto do Sistema

```mermaid
graph TD
    User[Agente Cultural / Produtor] -- Consulta editais e recebe alertas --> SomaApp[Soma Alerta]
    SomaApp -- Extrai dados --> GovPortals[Portais Governamentais / Diários Oficiais]
    SomaApp -- Envia notificações --> MsgServices[Serviços de Mensageria - WhatsApp/Email]
    SomaApp -- Autenticação --> SupabaseAuth[Supabase Auth]
```

## Nível 2: Containers

```mermaid
graph LR
    subgraph "Ecossistema Soma"
        WebApp[Web App - Next.js] -- API Requests --> BFF[BFF / API Core - Next.js Route Handlers]
        BFF -- Persistência --> Postgres[(PostgreSQL - Prisma)]
        BFF -- Cache/Filas --> Redis[(Redis)]
        Crawler[Soma Index - Python/FastAPI] -- Push Data --> BFF
        Assistant[Soma Assistente - AI/GenAI] -- Analysis --> BFF
    end
    
    User -- HTTPS --> WebApp
    BFF -- Auth check --> SupabaseAuth[Supabase Auth]
```

## Nível 3: Componentes (Web App / BFF)

```mermaid
graph TB
    subgraph "Web App Containers"
        AuthComp[Componente de Autenticação]
        DashComp[Dashboard do Proponente]
        AlertComp[Gestor de Alertas]
        MatchEngine[Motor de Match Semântico]
    end
    
    MatchEngine -- Query --> Prisma[Prisma Client]
    Prisma -- SQL --> DB[(PostgreSQL)]
    AlertComp -- Trigger --> Worker[Notification Worker]
```
