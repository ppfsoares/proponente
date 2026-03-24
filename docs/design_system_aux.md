# Estratégia do Design System: O Curador Digital (By Stitch)

## 1. Visão Geral e Norte Criativo

**Norte Criativo: O Curador Digital**
Este design system vai além da natureza fria e utilitária de plataformas ligadas ao governo. Ele idealiza a plataforma como um "Curador Digital" — uma interface sofisticada, com autoridade, e ainda assim profundamente humana. Alcançamos isso misturando uma tipografia com qualidade editorial a uma interface fluida e em camadas que prioriza a clareza e o respiro visual.

Para fugir do design "estilo template", o sistema abraça a **Assimetria Intencional**. A tipografia em grande proporção é equilibrada com um espaço em branco expansivo, enquanto elementos da interface frequentemente quebram o grid do container para criar uma sensação de movimento. Não estamos apenas construindo uma tabela de editais; estamos curando uma experiência premium para o setor cultural.

---

## 2. Cores e Lógica de Superfície

Nossa paleta equilibra o calor enérgico da expressão cultural (Laranja para Rosa) com a estabilidade institucional do setor público (Teal/Azul).

### A Regra "Sem Linhas"
**Instrução Explícita:** Não use bordas sólidas de 1px para definir seções. Os limites do layout devem ser estabelecidos exclusivamente através de mudanças na cor de fundo. Use `surface` (`#f5f6f7`) para a tela principal e `surface_container_lowest` (`#ffffff`) para áreas interativas elevadas.

### Hierarquia de Superfícies e Aninhamento
Trate a UI como uma pilha física de camadas semitransparentes. 
- **Base:** `surface`
- **Seções:** Use `surface_container_low` (`#eff1f2`) para grandes blocos de fundo.
- **Cards Interativos:** Use `surface_container_lowest` (`#ffffff`) para criar uma aparência "elevada" sem a necessidade de contornos pesados.

### A Regra "Vidro e Gradiente"
Para injetar "alma visual", use o gradiente de assinatura (transitando de `primary` `#b61424` para `primary_container` `#ff7671`) em elementos de alto impacto como Hero sections (seções de destaque) e CTAs principais. Para navegação flutuante ou sobreposições de modais, aplique o **Glassmorfismo**: use um `surface_container_lowest` semitransparente com um desfoque de fundo (backdrop blur) de 20px - 40px para integrar o elemento ao ambiente.

---

## 3. Tipografia: Autoridade Editorial

Usamos uma estratégia de duas famílias tipográficas para equilibrar personalidade e legibilidade.

*   **Display e Títulos Principais (Plus Jakarta Sans):** Escolhida por sua limpeza moderna e geométrica. Usada de `display-lg` até `headline-sm` para criar uma hierarquia ousada, "estilo revista".
*   **Corpo de Texto e Subtítulos (Manrope):** Uma fonte sem serifa altamente legível com um tom quente e acolhedor. Usada para todo o conteúdo funcional (`body-md`, `title-sm`) garantindo zero cansaço visual durante longas sessões de leitura.

**Hierarquia como Identidade:** 
O alto contraste entre `display-md` (2.75rem) e `body-md` (0.875rem) é intencional. Ele sinaliza que esta plataforma é, ao mesmo tempo, uma ferramenta de monitoramento de alto nível e um repositório detalhado de informações.

---

## 4. Elevação e Profundidade

Evitamos sombras projetadas tradicionais (drop shadows) em favor do **Tonal Layering** (Camadas Tonais).

### O Princípio de Camadas
A profundidade é alcançada através do empilhamento. Um card em `surface_container_lowest` posicionado sobre um fundo `surface_container_low` cria uma separação natural e suave. Use esta lógica para 90% da interface.

### Sombras Ambientes
Onde profundidade flutuante é estritamente necessária (ex: uma notificação de "Novo Edital"):
- **Desfoque (Blur):** 32px a 64px.
- **Opacidade:** 4% - 8%.
- **Tonalidade (Tint):** Use uma versão translúcida do `on_surface` (`#2c2f30`) em vez de preto puro.

### A Alternativa "Borda Fantasma" (Ghost Border)
Se requisitos de acessibilidade exigirem uma borda (ex: campos de formulário/inputs), use uma **Borda Fantasma**: `outline_variant` (`#abadae`) com **20% de opacidade**. Ela deve ser apenas sentida, e não vista ativamente.

---

## 5. Componentes

### Botões
*   **Primário:** Alto impacto. Fundo em gradiente (de `primary` para `primary_container`), com texto em `on_primary`. Arredondamento `roundedness-full` para um toque amigável e moderno.
*   **Secundário:** Texto `secondary` (`#006666`) com um fundo em `secondary_container` (`#8cf3f3`).
*   **Terciário:** Estilo Fantasma (Ghost). Sem fundo, texto em `primary`, que muda para `surface_container` ao passar o mouse (hover).

### Cards de Editais
Os cards são o coração do sistema.
- **Fundo:** `surface_container_lowest`.
- **Raio da Borda (Corner Radius):** `lg` (1rem).
- **Separação:** Sem linhas divisórias. Use `spacing-6` (1.5rem) para separar blocos de conteúdo internos (como Metadados vs. Descrição).

### Chips de Status
*   **Edital Ativo:** Fundo em `secondary_container` com texto `on_secondary_container`.
*   **Encerrando em Breve:** Fundo em `tertiary_container` com texto `on_tertiary_container`.
*   **Raio da Borda (Radius):** `full`.

### Busca e Filtros
Os campos de busca (inputs) devem usar um fundo `surface_container_low` sem borda. Ao receber foco (focus), devem transitar para `surface_container_lowest` recebendo uma sutil Borda Fantasma em `primary`.

---

## 6. O que Fazer e Não Fazer (Dos and Don'ts)

### Faça:
*   **Use os Espaços em Branco como Ferramenta:** Aplique `spacing-12` e `spacing-16` para separar seções principais de conteúdo. Deixe a informação "respirar".
*   **Superfícies em Camadas:** Sobreponha cards claros sobre fundos ligeiramente mais cinzas para criar uma hierarquia macia.
*   **Respeite o Gradiente:** Reserve o gradiente assinatura (Laranja/Rosa) exclusivamente para momentos de forte ação ou celebração (ex: botão "Enviar Inscrição").

### Não Faça:
*   **Sem Linhas Rígidas:** Nunca use bordas pretas ou linhas rígidas (como `1px #000000`). Isso quebra frontalmente a estética do "Curador Digital".
*   **Evite a Planificidade Extrema:** Não permita que a interface se torne apenas uma "parede branca". Use `surface_dim` ou `surface_container_low` para demarcar "zonas" de diferentes tipos de conteúdo.
*   **Não Faça Superposição de Sombras:** Se todo card possui sombra, nada tem destaque. Use sombras rigorosamente apenas para os elementos temporários ou flutuantes (como modais ou popups).
