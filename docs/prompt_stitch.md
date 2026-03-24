# Prompt para Geração de Protótipos no Google Stitch

**Papel:** UX/UI Designer Senior
**Ferramenta Alvo:** Google Stitch (ou outras ferramentas de IA generativa para prototipagem de UI)
**Produto:** Alerta Cultura (Ecossistema Soma Inova)

---

## Instruções Principais

Atue como um Especialista em UX/UI e crie templates de protótipos de alta fidelidade para o aplicativo "Alerta Cultura", respeitando rigorosamente o contexto e as restrições fornecidos abaixo. O produto é mobile-first (PWA) e voltado para um público diverso (Agentes Culturais independentes e Gestores Governamentais).

### 1. Contexto do Produto (PRD)
* **Objetivo:** Resolver a dispersão de informações e a burocracia no acesso a editais culturais, ajudando a base da pirâmide cultural e promovendo democratização.
* **Diferenciais:** Inteligência artificial para tradução de editais complexos em linguagem simples, notificações personalizadas baseadas em compatibilidade e foco inicial na inclusão regional e minorias.

### 2. Especificações de Engenharia e Design (Tech & UI)
* **Design System e Acessibilidade:** Conformidade obrigatória com as diretrizes WCAG 2.1 nível AA. É mandatório o uso de alto contraste e suporte absoluto para leitores de tela.
* **Estética e Componentes:** Utilize uma linguagem visual limpa e baseada em componentes nativamente acessíveis (inspirados em bibliotecas como Shadcn/ui) com tokens em Tailwind CSS. Layouts devem priorizar funções de utilidade pública e conversão rápida.
* **Fluxo de Navegação:** Lógica linear partindo do Onboarding até o Consumo/Engajamento.

---

## Interfaces a Serem Prototipadas

Por favor, desenhe wireframes/layouts detalhados (indicando hierarquia visual, sugestão de disposição de elementos e estrutura de componentes) para as seguintes 5 telas essenciais:

### INT-01: Landing Page e Descoberta
* **Layout/Container:** Página de entrada com forte apelo visual, focada em reter e explicar rapidamente a proposta de valor.
* **Elementos Obrigatórios:** 
  * Campo de busca rápida focada em "palavra-chave" ou "estado".
  * Call-to-actions primários e secundários muito nítidos: botões "Cadastre-se Grátis" e "Ver Editais Abertos".

### INT-02: Cadastro de Perfil e Onboarding
* **Layout/Container:** Formulário em estilo "Step-by-Step" (passo a passo para evitar o abandono).
* **Elementos Obrigatórios:**
  * Entradas focadas: Nome/CNPJ, Área Cultural, Localização, Porte, Público-alvo, e Interesses.
  * Indicadores de progresso visuais ao longo do cadastro.
  * Botões de avanço: "Próximo" e "Finalizar Cadastro".

### INT-03: Painel "Meus Alertas" (Configuração)
* **Layout/Container:** Dashboard de preferências minimalista e responsivo.
* **Elementos Obrigatórios:**
  * Controles visuais/toggles para: Prazo de inscrição, Tipo de edital e Canais de notificação de preferência.
  * Botões: "Salvar Preferências" e "Testar Alerta".

### INT-04: Central de Oportunidades (Feed)
* **Layout/Container:** Lista (Feed) rolagem vertical contendo "Cards com Inteligência".
* **Elementos Obrigatórios:**
  * **Card do Edital (Item de Lista):** Cada resultado deve exibir o Título, o Valor financeiro e o Prazo final.
  * **Destaque Visual de IA:** Um "Selo" ou "Badge" muito destacado mostrando o "% de Match" que o edital tem com o perfil cadastrado do usuário. Este é o ponto focal da tela.
  * Ações do Card: "Ver Detalhes", "Salvar Favorito", "Compartilhar".

### INT-05: Visualizador de Edital e Suporte
* **Layout/Container:** Página de Detalhe com leitura extremamente facilitada.
* **Elementos Obrigatórios:**
  * Bloco "O que você precisa saber": Resumo gerado por IA com no máximo 3 frases. Impedimentos e ressalvas legais devem ser o maior destaque da página.
  * Lista interativa (Checklist) de Documentos necessários e Sugestão de itens financiáveis.
  * Botões de apoio: "Baixar Modelos", "Marcar como Lido" e componente de ajuda "Preciso de Ajuda".

### INT-06: Tabela de Preços e Funcionalidades (Página Extra)
* **Layout/Container:** Página adicional linkada a partir da Home (INT-01).
* **Elementos Obrigatórios:**
  * **Modelos de Assinatura/Tabela:** Mockup demonstrando os planos e funcionalidades para 4 perfis:
    * **Proponente:** "Preciso de recursos"
    * **Mentor:** "Ajudo a captar recursos"
    * **Gestor Gov:** "Publico e gerencio editais governamentais"
    * **Gestor B2B:** "Publico e gerencio editais da iniciativa privada"
  * **Call-to-Action (CTA):** Botões com os textos "Em breve" e "Registre-se para ser informado do lançamento" para cada coluna/plano.
  * **Fluxo de Registro (Modal 1):** Ao clicar no botão de registrar-se, exibe um modal simples pedindo apenas "Nome" e "E-mail".
  * **Onboarding de Interesses (Modal 2):** Após informar o e-mail, o sistema deve abrir um novo modal com o título "Nos conte um pouco sobre seus interesses". Este modal deve conter:
    * 3 perguntas pertinentes (com alternativas para facilitar a resposta).
    * Um campo de texto livre para comentários diversos.
