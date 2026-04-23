# Design System Strategy: The Digital Curator

## 1. Overview & Creative North Star

**Creative North Star: The Digital Curator**
This design system moves beyond the cold, utilitarian nature of government-adjacent platforms. It envisions the platform as a "Digital Curator"—an interface that is sophisticated, authoritative, yet deeply human. We achieve this by blending editorial-grade typography with a fluid, layered interface that prioritizes clarity and breathing room.

To move away from "template-style" design, the system embraces **Intentional Asymmetry**. Large-scale typography is balanced against expansive whitespace, while UI elements occasionally break the container grid to create a sense of movement. We are not just building a table of grants; we are curating a premium experience for the cultural sector.

---

## 2. Colors & Surface Logic

Our palette balances the energetic warmth of cultural expression (Orange-to-Pink) with the institutional stability of the civic sector (Teal/Blue).

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to define sections. Layout boundaries must be established exclusively through background color shifts. Use `surface` (`#f5f6f7`) for the main canvas and `surface_container_lowest` (`#ffffff`) for elevated interactive areas.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of semi-transparent layers. 
- **Base:** `surface`
- **Sectioning:** Use `surface_container_low` (`#eff1f2`) for large background blocks.
- **Interactive Cards:** Use `surface_container_lowest` (`#ffffff`) to create a "lifted" appearance without heavy outlines.

### The "Glass & Gradient" Rule
To inject "visual soul," use the signature gradient (transitioning from `primary` `#b61424` to `primary_container` `#ff7671`) for high-impact elements like Hero sections and main CTAs. For floating navigation or modal overlays, apply **Glassmorphism**: use a semi-transparent `surface_container_lowest` with a 20px - 40px backdrop blur to integrate the element into the environment.

---

## 3. Typography: Editorial Authority

We use a dual-font strategy to balance character with readability.

*   **Display & Headlines (Plus Jakarta Sans):** Chosen for its modern, geometric cleanliness. Used in `display-lg` through `headline-sm` to create a bold, "magazine-style" hierarchy.
*   **Body & Titles (Manrope):** A highly legible sans-serif with a warm tone. Used for all functional content (`body-md`, `title-sm`) to ensure zero eye strain during long reading sessions.

**Hierarchy as Identity:** 
High contrast between `display-md` (2.75rem) and `body-md` (0.875rem) is intentional. It signals that this platform is both a high-level monitoring tool and a detailed repository of information.

---

## 4. Elevation & Depth

We eschew traditional drop shadows in favor of **Tonal Layering**.

### The Layering Principle
Depth is achieved by stacking. A `surface_container_lowest` card placed on a `surface_container_low` background creates a natural, soft separation. Use this for 90% of the UI.

### Ambient Shadows
Where floating depth is required (e.g., a "New Grant" notification):
- **Blur:** 32px to 64px.
- **Opacity:** 4% - 8%.
- **Tint:** Use a translucent version of `on_surface` (`#2c2f30`) rather than pure black.

### The "Ghost Border" Fallback
If accessibility requirements demand a border (e.g., input fields), use a **Ghost Border**: `outline_variant` (`#abadae`) at **20% opacity**. It should be felt, not seen.

---

## 5. Components

### Buttons
*   **Primary:** High-impact. Gradient background (`primary` to `primary_container`), `on_primary` text. `roundedness-full` for a friendly, modern feel.
*   **Secondary:** `secondary` (`#006666`) text with a `secondary_container` (`#8cf3f3`) background.
*   **Tertiary:** Ghost style. No background, `primary` text, shifts to `surface_container` on hover.

### Grant Cards
Cards are the heart of the system.
- **Background:** `surface_container_lowest`.
- **Corner Radius:** `lg` (1rem).
- **Separation:** No dividers. Use `spacing-6` (1.5rem) to separate internal content blocks (Metadata vs. Description).

### Status Chips
*   **Active Grant:** `secondary_container` background with `on_secondary_container` text.
*   **Closing Soon:** `tertiary_container` background with `on_tertiary_container` text.
*   **Radius:** `full`.

### Search & Filters
Input fields should use `surface_container_low` background with no border. Upon focus, transition to `surface_container_lowest` with a subtle `primary` Ghost Border.

---

## 6. Do’s and Don’ts

### Do:
*   **Use Whitespace as a Tool:** Use `spacing-12` and `spacing-16` to separate major content sections. Let the information breathe.
*   **Layer Surfaces:** Place light cards on slightly darker grey backgrounds to create soft hierarchy.
*   **Respect the Gradient:** Reserve the orange-to-pink gradient for moments of action or celebration (e.g., "Submit Application").

### Don’t:
*   **No Hard Lines:** Never use `1px #000000` or high-contrast borders. It breaks the "Curator" aesthetic.
*   **Avoid Flatness:** Don't let the UI become a wall of white. Use `surface_dim` or `surface_container_low` to create "zones" for different data types.
*   **Don't Over-Shadow:** If every card has a shadow, nothing is important. Use shadows only for temporary or floating elements.