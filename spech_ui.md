# Especificação de UI

## Interfaces gráficas

### INT-01 - Landing Page e Descoberta
- Container: Página de entrada.
- **Campos:** Busca rápida por palavra-chave ou estado.
- **Botões:** "Cadastre-se Grátis", "Ver Editais Abertos".

### INT-02 - Cadastro de Perfil e Onboarding
- Container: Formulário Step-by-Step.
- **Campos:** Nome/CNPJ, Área Cultural, Localização, Porte, Público-alvo, Interesses.
- **Botões:** "Próximo", "Finalizar Cadastro".

### INT-03 - Painel "Meus Alertas"
- Container: Dashboard de preferências.
- **Campos:** Prazo de inscrição, Tipo de edital, Canais de notificação.
- **Botões:** "Salvar Preferências", "Testar Alerta".

### INT-04 - Central de Oportunidades (Feed)
- Container: Lista de Cards com Inteligência.
- **Campos:** Título, Valor, Prazo, Selo de "% de Match".
- **Botões:** "Ver Detalhes", "Salvar Favorito", "Compartilhar".

### INT-05 - Visualizador de Edital e Suporte
- Container: Página de Detalhe.
- **Campos:** Resumo "O que você precisa saber", Checklist de Documentos, Sugestão de itens financiáveis.
- **Botões:** "Baixar Modelos", "Marcar como Lido", "Preciso de Ajuda".

---

## Fluxo de Navegação
1. **Descoberta:** Acesso via busca ou link (INT-01).
2. **Onboarding:** Cadastro e definição do perfil criativo (INT-02).
3. **Configuração:** Definição dos filtros de alerta (INT-03).
4. **Consumo:** Recebimento de alertas e análise de oportunidades (INT-04 e INT-05).
5. **Engajamento:** Avaliação de editais e atualização de perfil.

---

## Diretrizes para IA
- Design Mobile-First (PWA).
- Priorizar componentes Shadcn/ui ou similares para acessibilidade nativa.
- A IA deve destacar visualmente editais com maior compatibilidade ao perfil do usuário.