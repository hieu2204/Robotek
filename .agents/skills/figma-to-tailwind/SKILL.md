---
name: figma-to-tailwind
description: Chuyển các thiết kế Figma thành giao diện frontend (HTML semantic, Tailwind CSS, JavaScript thuần) có độ chính xác cao. Kích hoạt bất cứ khi nào có URL Figma, frame được chọn, hoặc yêu cầu chuyển/dựng lại giao diện từ Figma sang HTML/Tailwind.
---

# Figma to Tailwind CSS Skill

Skill này hướng dẫn quy trình chuyển đổi các thiết kế Figma thành mã nguồn Frontend chất lượng cao, chuẩn SEO, responsive và chính xác so với thiết kế gốc. Quy trình bắt buộc thực hiện **Design System Extraction & Audit** và **Existing Component Discovery & Reuse** trước khi lập trình giao diện.

## Điều kiện kích hoạt & Operation Modes

Skill tự động xác định **Operation Mode** dựa trên câu lệnh của người dùng:

### 1. Full Page Implementation Mode

- **Kích hoạt**: Yêu cầu implement một Figma page, convert toàn page sang HTML/Tailwind, reproduce một page/frame lớn, dựng landing page hoặc màn hình hoàn chỉnh.
- **Quy trình bắt buộc**:
  1. Inspect repository.
  2. Build Existing Reusability Inventory.
  3. Inspect toàn bộ target Figma page/frame bằng Figma MCP Server.
  4. Audit design system (Typography, Colors, Spacing, Radius, Shadows).
  5. Match Figma requirement against existing components & tokens (bao gồm Spacing mapping).
  6. Reuse existing components, project tokens và standard Tailwind utilities; chỉ tạo component mới, token mới hoặc arbitrary value khi thực sự thiếu.
  7. Phân tích component & layout.
  8. Implement UI (Semantic HTML + Tailwind CSS + Vanilla JS).
  9. Final Tailwind Cleanup Pass & Technical QA.
  10. Bàn giao kết quả cho người dùng thực hiện Manual Visual QA (không tự động mở trình duyệt/chụp ảnh Visual QA trừ khi được yêu cầu).
- **Workflow mong muốn**:
  ```text
  Inspect repository
          ↓
  Build Existing Reusability Inventory
          ↓
  Inspect Figma
          ↓
  Design System Audit
          ↓
  Match Figma requirement against existing components
          ↓
  Match existing tokens
          ↓
  Resolve Tailwind utilities
          ↓
  Create something new only if needed
          ↓
  Implement
  ```
- **Ràng buộc**: **KHÔNG ĐƯỢC** bắt đầu viết code UI trước khi hoàn thành Design System Audit và Reusability Discovery.

### 2. Component Implementation Mode

1. Inspect repository scope liên quan và build Local Reusability Inventory:
   - existing semantic classes;
   - typography;
   - buttons;
   - cards;
   - badges;
   - navigation;
   - section patterns;
   - existing `@layer components`;
   - existing variants.

2. Inspect target Figma selection/component và descendants.

3. Inspect các Figma Variables và Styles mà component tham chiếu.

4. Match Figma requirement against existing components:
   - same semantic role?
   - visual signature compatible?
   - responsive behavior compatible?

5. Nếu existing component phù hợp:
   → BẮT BUỘC reuse.

6. Nếu không phù hợp:
   → check existing variant.

7. Nếu vẫn không có:
   → resolve bằng existing tokens / standard Tailwind utilities;
   → chỉ tạo component mới nếu pattern thực sự reusable.

8. Implement Semantic HTML + Tailwind + Vanilla JS.

9. Final Cleanup + Technical QA + Manual Visual QA handoff.

_Không được viết utility composition mới trước khi hoàn thành Existing Component Discovery._

### 3. Design System Audit Mode

- **Kích hoạt**: Yêu cầu đọc design system, kiểm tra typography, extract colors, trích xuất Figma variables, setup Tailwind tokens hoặc audit Figma.
- **Quy trình**:
  1. Inspect target Figma page/frame.
  2. Trích xuất toàn bộ Design System (Typography, Colors, Spacing, Radius, Shadows).
  3. Tạo báo cáo Audit chi tiết (Typography, Colors, Spacing Mapping, Radius, Shadows, Inconsistencies).
  4. Setup/update tokens trong repository (nếu người dùng yêu cầu).
  5. **DỪNG TẠI ĐÂY** — Không implement UI trừ khi có yêu cầu thêm.

---

## Quy trình triển khai chi tiết

### Step 1: Kiểm tra Repository hiện tại & Reusability Inventory

Trước khi viết code hoặc cấu hình:

1. **Cấu trúc HTML/Template**: Kiểm tra cách tổ chức các file HTML, component, template.
2. **Tailwind Version & Configuration**: Kiểm tra phiên bản Tailwind (v3/v4), file cấu hình (`tailwind.config.js` hoặc `@theme` directive trong CSS).
3. **Asset & Font Directories**: Xác định thư mục lưu trữ asset (`public/`, `assets/`) và các file font hiện có. Map font-weight numeric: `400` -> Regular, `500` -> Medium, `600` -> SemiBold, `700` -> Bold.
4. **Existing Tokens**: Kiểm tra các token màu sắc (`--color-*`), typography (`--font-*`), spacing (`@theme` hoặc config) đã được định nghĩa trong dự án.
5. **Existing Reusable Component Inventory**:
   - Agent phải inspect các file/component có khả năng chứa reusable styling:
     - CSS entry files (`src/input.css`, `assets/css/style.css`, ...)
     - `@layer components`
     - File component tách biệt (`_typography.css`, `_buttons.css`, `_cards.css`, `_sections.css`, `_navigation.css` hoặc tên tương đương trong repository)
     - Existing HTML pages (`index.html`, `about.html`, ...)
     - Shared templates/partials nếu có.
   - _Không được giả định tên file chắc chắn tồn tại; phải inspect cấu trúc repo thực tế._
   - **Tạo Mental Inventory**:

     ```text
     component / class → semantic role → visual signature → variants → nơi đang được sử dụng
     ```

     - Ví dụ:
       - `.heading-h1` → Page/Hero H1 → Inter Tight / 48px / 600 / 58px / -0.48px → color intentionally external
       - `.badge-tag` → Small section label → Orbitron / 14px / 600 / uppercase
       - `.btn-primary` → Primary CTA button

---

### Step 2: Phân tích chi tiết thiết kế Figma (Figma Inspection)

Sử dụng **Figma MCP Server** làm nguồn dữ liệu chính xác (Source of Truth):

- Ở mode _Full Page_ hoặc _Design System Audit_, phải inspect toàn bộ target page/frame và tất cả section/component liên quan.
- Thu thập đầy đủ từ Figma MCP: Figma Variables, Text Styles, Color Styles, Typography, Colors, Spacing, Dimensions, Auto Layout, Constraints, Radius, Borders, Shadows, Assets, Icons, Responsive variants.
- **Ràng buộc**: **KHÔNG ĐƯỢC** suy đoán hoặc ước lượng giá trị nếu Figma MCP có thể cung cấp giá trị thực tế.

---

### Step 3: Extract & Audit Design System (Bắt buộc trước khi Code UI)

Step này chạy **SAU** Figma Inspection và **TRƯỚC** khi phác thảo component hoặc viết code UI.

#### 3.1. Typography Extraction

Thu thập chính xác từng kết hợp typography:

- Figma Text Style Name (nếu có).
- `font-family`, `font-size`, `font-weight`, `font-style`, `line-height`, `letter-spacing`.
- **Typography Signature Identity**: Nhận diện duy nhất dựa trên bộ 6 thuộc tính:
  ```text
  font-family + font-size + font-weight + font-style + line-height + letter-spacing
  ```

#### 3.2. Typography Semantic Role & Visual Truth

- **Visual Signature Matching**: Tái sử dụng typography class không dựa vào tên màu hay vị trí đặt, mà dựa vào bộ thuộc tính Visual Signature (`font-family`, `font-size`, `font-weight`, `line-height`, `letter-spacing`, `responsive behavior`).
- **Text Colors Separation**: Màu sắc **KHÔNG** nằm trong signature của typography. Typography và Color hoàn toàn độc lập.
  - Ví dụ: Nếu dự án có `.heading-h1` với signature `Inter Tight / 48px / 600 / 58px / -0.48px`:
    ```html
    <!-- CHUẨN: Tái sử dụng .heading-h1 và thêm màu chữ riêng -->
    <h1 class="heading-h1 text-white">About Us</h1>
    <h1 class="heading-h1 text-gray-900">Our Services</h1>
    ```
  - **KHÔNG TẠO** các class kiểu `.heading-h1-white` hay `.heading-h1-dark` chỉ vì màu chữ khác nhau.

#### 3.3. Existing Component Must Not Be Forced

- KHÔNG reuse component chỉ vì tên có vẻ đúng nếu visual signature thực tế không khớp.
- Ví dụ: Nếu `.heading-h1` hiện tại là `48px` nhưng Figma target mới là `56px`:
  - A. Đây là một variant thực sự? → Tạo/reuse variant có ngữ nghĩa rõ ràng.
  - B. Shared component đang sai so với design system? → Chỉ sửa global component nếu đã xác minh nó thực sự sai ở tất cả các vị trí sử dụng.
  - C. Đây là true one-off? → Sử dụng Tailwind utilities phù hợp.
  - _Không sửa shared component toàn project chỉ để fix một page._

#### 3.4. Shared Component Change Safety

Trược khi thay đổi một existing shared component, semantic class, hoặc reusable design-system class (`.heading-h1`, `.btn-primary`, `.badge-tag`, `.nav-link`, `.feature-card`), agent BẮT BUỘC tìm kiếm tất cả vị trí sử dụng (usages) trong repository.

Nếu component đang được sử dụng ở nhiều trang/component khác:

- KHÔNG sửa visual signature global chỉ để làm một Figma target mới khớp.
- Inspect các usages trước.
- Xác định target mới là: A. cùng component; B. legitimate variant; C. component khác; D. true one-off.

```text
Existing shared component
        ↓
Target signature matches?
      /     \
    yes      no
     ↓        ↓
   reuse    Existing variant?
              /      \
            yes       no
             ↓         ↓
           reuse    legitimate new variant?
                       /      \
                     yes       no
                      ↓         ↓
                create variant  utilities/one-off
```

Chỉ sửa shared component globally khi đã xác minh definition hiện tại thực sự sai đối với tất cả relevant usages. Không dùng page-specific override để "fight" với shared component nếu một semantic variant là giải pháp đúng hơn.

#### 3.5. Spacing Reconciliation

```text
Figma Value    Tailwind Scale Class
4px         -> 1  (gap-1, p-1, m-1)
8px         -> 2  (gap-2, p-2, m-2)
12px        -> 3  (gap-3, p-3, m-3)
16px        -> 4  (gap-4, p-4, m-4)
20px        -> 5  (gap-5, p-5, m-5)
24px        -> 6  (gap-6, p-6, m-6)
32px        -> 8  (gap-8, p-8, m-8)
40px        -> 10 (gap-10, p-10, m-10)
48px        -> 12 (gap-12, p-12, m-12)
64px        -> 16 (gap-16, p-16, m-16)
80px        -> 20 (gap-20, p-20, m-20)
96px        -> 24 (gap-24, p-24, m-24)
```

- Nếu value Figma match chính xác Tailwind spacing scale: BẮT BUỘC dùng standard utility.
  - **BAD**: `gap-[16px]`, `px-[24px]`, `mt-[32px]`
  - **GOOD**: `gap-4`, `px-6`, `mt-8`
- Không được làm tròn một value khác biệt đáng kể chỉ để ép vào scale.
  - Ví dụ: Nếu Figma thực sự là `18px`, không có token và không có reusable spacing phù hợp → `gap-[18px]` được phép.
- **Ràng buộc**: Visual Fidelity > ép Tailwind scale.

#### 3.6. Arbitrary Value Budget

Arbitrary values `[...]` là ngoại lệ, không phải mặc định.

Trong mỗi section/component vừa implement:

1. Scan tất cả arbitrary values.
2. Nếu có standard Tailwind utility tương đương chính xác → replace.
3. Nếu có existing project token tương đương → reuse token.
4. Nếu cùng arbitrary value xuất hiện từ 2 lần trở lên → kiểm tra khả năng design token / semantic component / reusable utility.
5. Nếu value là true one-off từ Figma → được phép giữ arbitrary value.

Không được hy sinh Visual Fidelity chỉ để loại bỏ arbitrary values.

#### 3.7. Repeated Color Token Promotion

Khi inspect Figma hoặc implement/refactor UI, agent BẮT BUỘC theo dõi các raw/arbitrary color values như:

- `text-[#...]`
- `bg-[#...]`
- `border-[#...]`
- `fill-[#...]`
- `stroke-[#...]`
- raw CSS hex/rgb/hsl values

Quy trình:

1. Trước tiên search existing project color tokens (`--color-*`).
2. Nếu color đã có token tương đương:
   → BẮT BUỘC reuse token hiện tại.
3. Nếu color chưa có token và chỉ xuất hiện một lần:
   → được phép giữ arbitrary value nếu đây là true one-off.
4. Nếu cùng một exact color xuất hiện từ 2 lần trở lên:
   → inspect semantic usage và Figma design system.
5. Nếu color được reuse như một phần của design language/project palette:
   → BẮT BUỘC promote thành project color token.
6. Sau khi tạo token:
   → refactor tất cả usages trong scope hiện tại sang token đó.
7. Không tạo nhiều token khác tên nhưng cùng một giá trị màu nếu semantic role không thực sự khác nhau.

Ví dụ:

BAD:
`text-[#808080]`
`bg-[#808080]`
`border-[#808080]`

Nếu `#808080` là một màu reusable của design system.

GOOD:

@theme {
--color-neutral-500: #808080;
}

Sau đó dùng:

`text-neutral-500`
`bg-neutral-500`
`border-neutral-500`

Token naming phải dựa trên semantic/design-system role nếu Figma Variables/Styles có tên.
Không tự đặt tên semantic như `disabled`, `muted`, `secondary` nếu chưa xác minh role đó từ Figma hoặc codebase.

Priority:

Existing token
→ Figma Variable/Style
→ repeated project color token
→ one-off arbitrary color

---

### Step 4: Existing Component Discovery & Reuse Gate

Trước khi agent được phép tạo hoặc viết một Tailwind class composition mới cho bất kỳ UI element nào, BẮT BUỘC đi qua Gate kiểm tra:

```text
Need UI element
        ↓
Existing component with same semantic role?
   ↓ yes
Compare visual signature
   ↓
Exact/compatible match?
   ↓ yes
REUSE (Dùng existing component class)
   ↓ no
Check existing variant
   ↓
No valid variant
   ↓
Use tokens/utilities or create new component if justified
```

- **Quy tắc**: Agent KHÔNG ĐƯỢC tái tạo inline một semantic component đã tồn tại trong repository.

---

### Step 5: Hiểu Cấu trúc Trang & Phân tích Component

- Xác định layout tổng thể trang, container width (`max-w-*`), padding hông.
- Phân chia các section UI, lưới flex/grid, vị trí các component lặp lại.
- Xác định hành vi responsive cho từng section.

---

### Step 6: Triển khai HTML Semantic chuẩn Accessibility

Sử dụng chuẩn thẻ ngữ nghĩa HTML5:

- `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`.
- Nút bấm action dùng `<button type="button">`, liên kết chuyển trang dùng `<a href="...">`.
- Input luôn đi kèm `<label for="...">`. Có `alt` đầy đủ cho `<img>`.

---

### Step 7: Styling với Tailwind CSS & Component Strategy

#### 7.1. Tailwind Utility Resolution Priority (Thứ tự Ưu tiên Giải mã Class)

Khi chuyển một giá trị từ Figma sang Tailwind, BẮT BUỘC resolve theo thứ tự ưu tiên duy nhất:

```text
1. Existing reusable project component / semantic utility (.heading-h1, .nav-link, .btn-primary, .badge-tag)
        ↓
2. Existing project design token (--color-primary, font-orbitron)
        ↓
3. Standard Tailwind utility (gap-4, p-6, text-base, rounded-lg)
        ↓
4. Create reusable semantic component + @apply only when no correct existing equivalent exists and the pattern is actually reusable
        ↓
5. Custom project token (nếu lặp lại nhiều lần trong design system)
        ↓
6. Raw CSS for complex CSS (linear-gradient phức tạp, filter đặc thù)
        ↓
7. Arbitrary value [...] for true one-off only
```

**QUAN TRỌNG**: "Existing reusable component" BẮT BUỘC phải được kiểm tra trước "Standard Tailwind utility". Nếu `.heading-h1` đã có trong dự án với signature tương đương:

- **BAD**: `<h1 class="text-3xl sm:text-4xl lg:text-[48px] font-semibold leading-tight lg:leading-[58px] tracking-[-0.48px] text-white">`
- **GOOD**: `<h1 class="heading-h1 text-white">`

#### 7.2. Duplicate Component Signature Rule

- Nếu cùng một semantic visual pattern xuất hiện từ 2 lần trở lên trong codebase, agent phải kiểm tra khả năng tạo/tái sử dụng component.
- Đặc biệt scan các long Tailwind composition inline (`text-* font-* leading-* tracking-*`, `inline-flex items-center justify-center px-* py-* rounded-*`).
- **Chỉ extract thành component mới nếu**:
  - Semantic role giống nhau;
  - Visual signature giống/compatible;
  - Việc abstraction giúp code rõ ràng và dễ duy trì hơn.
- **Không over-componentize** các wrapper generic đơn lẻ như `.flex-row`, `.wrapper`, `.content-box`, `.div-container`.

#### 7.3. Component Styling Strategy & @apply Rules

TRƯỚC KHI tạo một component mới:

- Search existing components trước.
- Existing component → Reuse.
- Existing component + legitimate variant → Reuse / Thêm variant.
- Chưa có component + lặp lại semantic pattern → Tạo component mới với `@layer components` + `@apply`.
- True one-off → Direct Tailwind utilities.

#### 7.4. Refactor Existing Code During Implementation

Khi implement page mới hoặc bổ sung code:

- Nếu phát hiện markup mới đang duplicate một component đã tồn tại trong repository (ví dụ inline typography composition khi `.heading-h1` đã tồn tại) → **Phải refactor phần code MỚI thành component tái sử dụng** (`<h1 class="heading-h1 text-white">`).
- _Lưu ý_: Không tự ý refactor các page cũ ngoài scope trừ khi người dùng yêu cầu.

---

### Step 8: Responsive Mobile-First

- Thiết kế responsive từ Mobile-First (`w-full md:w-1/2 lg:w-1/3`).
- Dựa trên Figma Auto Layout, Constraints và Variant các màn hình (Mobile < 640px, Tablet 640px - 1024px, Desktop > 1024px).

---

### Step 9: Tương tác với JavaScript thuần (Vanilla JS)

- Chỉ dùng JS thuần cho các hành vi tương tác (Mobile menu toggle, dropdown, tab switching, modal, accordion, carousel, form handling).
- Không dùng JS cho layout hay styling mà CSS có thể xử lý.

---

### Step 10: Assets & Pixel Precision Verification

- Export/tải về asset thật từ Figma (SVG cho icon, JPG/PNG cho image). Không dùng emoji hay ảnh giả.
- Hạn chế `position: absolute` với offset hardcode trừ khi cần các element đè lập thể.
- Đảm bảo độ chính xác so với Figma về hierarchy, alignment, spacing, typography, colors, radius, shadow.

---

### Step 11: Final Tailwind Cleanup Pass & Technical QA

#### 11.1. Final Tailwind Cleanup Pass (Bắt buộc trước khi bàn giao)

Sau khi hoàn thành viết mã nguồn UI nhưng TRƯỚC KHI bàn giao, agent BẮT BUỘC scan đoạn code vừa tạo/sửa để tìm:

1. Arbitrary values `[...]` (xem có utility chuẩn hay token tương đương không).
2. Duplicate Tailwind class groups hoặc duplicate raw CSS.
3. Long typography compositions đang recreate một existing semantic component.
4. Long button / card / badge compositions đang recreate an existing component.
5. Newly-created components trùng lập với existing components trong repository.
6. Nếu phát hiện element đang recreate existing semantic component (ví dụ: `<h1 class="text-3xl sm:text-4xl lg:text-[48px] ...">` trong khi dự án đã có `.heading-h1`), BẮT BUỘC refactor về `<h1 class="heading-h1 text-white">` NẾU computed visual output tương đương.
7. _Lưu ý_: Chỉ refactor khi visual output tương đương. Nếu không chắc chắn → giữ implementation hiện tại. Visual Fidelity > DRY.

#### 11.2. Visual Safety (An toàn Giao diện)

- Component reuse KHÔNG ĐƯỢC làm thay đổi giao diện hiển thị.
- Trước khi thay thế inline utilities bằng existing component, phải xác minh computed signature hoàn toàn tương đương.
- KHÔNG ĐƯỢC thay đổi font-size, line-height, font-weight, tracking, spacing hay dimensions chỉ để ép code về DRY.
- **Ràng buộc**: Visual Fidelity > DRY.

### 11.3 Implementation Quality Gate — Mandatory

Implementation is NOT considered complete immediately after the UI is visually
implemented.

Before Technical QA, the agent MUST perform a review of all newly created or
modified code in the current task.

#### 1. Color Gate

Scan all changed code for:

- `text-[#...]`
- `bg-[#...]`
- `border-[#...]`
- `fill-[#...]`
- `stroke-[#...]`
- raw hex/rgb/hsl/oklch colors

For every discovered color:

1. Search existing `--color-*` project tokens.
2. If an exact token exists → replace the raw color with the token utility.
3. If no token exists → count exact usages in the current implementation.
4. If the value appears multiple times, inspect Figma Variables/Styles and
   project usage.
5. If it represents a reusable palette value → create one project token and
   replace all relevant usages in current scope.
6. Raw arbitrary color may remain only when verified as a true one-off.

The agent MUST NOT defer this review until a later refactor request.

#### 2. Tailwind Gate

Scan changed code for all arbitrary values `[...]`.

For each arbitrary value:

Existing semantic component?
→ Existing token?
→ Standard Tailwind utility?
→ Legitimate reusable abstraction?
→ True one-off?

Only true one-offs may remain.

#### 3. Component Gate

Scan newly written markup for repeated or long utility compositions.

Search the repository again for an existing equivalent component before
considering implementation complete.

#### 4. JavaScript Architecture Gate

Scan modified HTML for newly added:

- `<script>` blocks
- inline event handlers
- duplicated initialization code

Move interaction logic into the repository's existing JavaScript entry/module
according to repository architecture.

Do not leave page implementation JavaScript inline unless the repository
architecture explicitly requires it.

#### 5. CSS Architecture Gate

Scan modified HTML for newly added `<style>` blocks or duplicated raw CSS.

Move reusable styling into the existing Tailwind/CSS architecture when
appropriate.

#### Completion Rule

If any violation above is found, fix it BEFORE running `npm run build`.

Do not report the task complete while known cleanup/refactor work remains.

#### 11.4. Technical QA (Kiểm tra Kỹ thuật)

1. Chạy `npm run build` / dev compilation check để đảm bảo không có lỗi biên dịch CSS/JS/Tailwind.
2. Kiểm tra các lỗi cú pháp HTML, accessibility cơ bản.

#### 11.5. Visual QA Execution Policy

**Default Policy**: `MANUAL_VISUAL_QA`

- Người dùng trực tiếp thực hiện routine Visual QA.
- Agent KHÔNG tự động mở browser, render trang, chụp screenshot hoặc compare với Figma.
- Sau khi hoàn thành Implementation + Cleanup + Technical QA, dừng lại và bàn giao cho người dùng kiểm tra thủ công.

#### 11.6. Existing Implementation Correction / Visual Mismatch Rule

Khi người dùng báo một implementation hiện tại sai so với Figma (ví dụ: heading sai màu, font-size sai, gap sai, image quá lớn, alignment sai, Swiper sai vị trí, section quá cao):

KHÔNG chạy lại Full Page Implementation.

Workflow bắt buộc:

1. Inspect code/component/section liên quan.
2. BẮT BUỘC đọc lại đúng Figma node/frame liên quan bằng Figma MCP.
3. Không inspect lại toàn bộ Figma page nếu issue chỉ nằm trong một section/component.
4. Compare computed values: dimensions, width/height, spacing, padding/gap, typography, font-size, font-weight, line-height, letter-spacing, colors, background, alignment, Auto Layout, constraints, border, radius, shadow, asset, responsive behavior.
5. Nếu mismatch có thể đến từ existing shared component/token → inspect shared component/token và usages.
6. Xác định ROOT CAUSE trước khi sửa.
7. Không patch bằng: arbitrary translate, arbitrary negative margin, random offset, hardcoded positioning nếu nguyên nhân thực sự là do layout/component/token sai.
8. Chỉ sửa scope liên quan.
9. Sau khi sửa: Final Tailwind Cleanup + Technical QA (`npm run build`).
10. KHÔNG tự chạy Browser Visual QA. Dừng lại để người dùng Manual Visual QA.

---

## Important Technical Constraints (Ràng buộc Quan trọng)

1. **Visual Fidelity Constraint**: Không được hy sinh độ chính xác của Figma chỉ để cố loại bỏ arbitrary values. Nếu một giá trị là unique one-off thực sự của bản vẽ (ví dụ offset góc lượn đặc thù `top-[205px]` hay width đặc thù `w-[569px]`), arbitrary value vẫn được phép sử dụng.
2. **Priority Chain Summary**:
   ```text
   1. Existing reusable project component / semantic utility (.heading-h1, .nav-link, .btn-primary, .badge-tag)
           ↓
   2. Existing project design token (--color-primary, font-orbitron)
           ↓
   3. Standard Tailwind utility (gap-4, p-6, text-base, rounded-lg)
           ↓
   4. Create reusable semantic component + @apply only when no correct existing equivalent exists and the pattern is actually reusable
           ↓
   5. Custom project token
           ↓
   6. Raw CSS for complex CSS
           ↓
   7. Arbitrary value [...] for true one-off only
   ```

---

## Báo cáo kết quả (Final Output Format)

### Khi chạy Full Page / Component Implementation Mode

Tóm tắt ngắn gọn:

1. **Existing Components Discovered & Reused**: Danh sách các reusable component/class đã tìm thấy và tái sử dụng (ví dụ: `.heading-h1`, `.nav-link`, `.badge-tag`).
2. **Files Created / Modified**: Đồ thị các file đã sửa/tạo (dùng link `file://`).
3. **Components & Sections Implemented**: Các phần giao diện đã dựng.
4. **Tailwind Cleanup & Utility Refactoring**: Tóm tắt các class arbitrary hoặc inline composition đã được chuẩn hóa.
5. **Responsive & Interaction**: Tóm tắt responsive breakpoints và tương tác JS.
6. **Technical QA Status**: Kết quả build/compile (`npm run build`) và kiểm tra kỹ thuật.
7. **Next Step**: Báo cáo sẵn sàng để người dùng thực hiện Manual Visual QA.
