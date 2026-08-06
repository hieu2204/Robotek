---
name: html-css-tailwind
description: >
---

# HTML/CSS/JS + Tailwind v4 Workflow

## Cấu trúc thư mục chuẩn

```
project/
├── src/
│   ├── input.css                 ← CSS nguồn, Tailwind đọc và build từ đây
│   └── components/
│       ├── _buttons.css
│       ├── _cards.css
│       └── _nav.css
├── assets/
│   ├── css/
│   │   └── style.css             ← OUTPUT (do Tailwind build ra, không chỉnh tay)
│   └── js/
│       ├── vendor/               ← thư viện ngoài, không chỉnh tay
│       │   ├── fancybox.umd.js
│       │   └── swiper.min.js
│       └── main.js               ← code tự viết, gọi init từ đây
├── index.html
└── package.json
```

**Nguyên tắc:**

- `src/` chỉ chứa CSS — JS không có build step nên để thẳng trong `assets/js/`
- `assets/css/style.css` là file output — không bao giờ chỉnh tay
- `vendor/` là vùng cấm — không trộn code tự viết với code thư viện

---

## Setup Tailwind v4

```bash
npm install tailwindcss @tailwindcss/cli
```

**`src/input.css`:**

```css
@import "tailwindcss";
@import "./components/_buttons.css";
@import "./components/_cards.css";

@theme {
  --color-primary: #2563eb;
  --color-primary-dark: #1d4ed8;
  --font-heading: "Inter", sans-serif;
}
```

**`package.json` scripts:**

```json
"scripts": {
  "dev": "npx @tailwindcss/cli -i ./src/input.css -o ./assets/css/style.css --watch",
  "build": "npx @tailwindcss/cli -i ./src/input.css -o ./assets/css/style.css --minify"
}
```