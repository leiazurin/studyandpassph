const btn = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

if (btn && nav) {
  btn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(isOpen));
    btn.textContent = isOpen ? "✕" : "☰";
  });
}

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();


// --- Board Results Filter ---
(function(){
  const searchInput = document.getElementById("boardSearch");
  const yearSelect = document.getElementById("boardYear");
  const cards = Array.from(document.querySelectorAll("[data-board-card]"));

  if (!searchInput && !yearSelect && cards.length === 0) return;

  function normalize(s){ return (s||"").toLowerCase().trim(); }

  function applyCardLinks(){
    const y = yearSelect ? yearSelect.value : "";
    cards.forEach(card => {
      const baseHref = card.getAttribute("data-basehref");
      const yearHref = card.getAttribute("data-yearhref"); // template like "board-nursing-results-YYYY.html"
      const a = card.querySelector("a[data-board-open]");
      if (!a) return;
      if (y && yearHref) {
        a.setAttribute("href", yearHref.replace("YYYY", y));
        a.textContent = "Open " + y;
      } else {
        a.setAttribute("href", baseHref);
        a.textContent = "Open";
      }
    });
  }

  function filterCards(){
    const q = normalize(searchInput ? searchInput.value : "");
    const y = yearSelect ? yearSelect.value : "";
    cards.forEach(card => {
      const hay = normalize(card.getAttribute("data-title")) + " " + normalize(card.getAttribute("data-tags"));
      const show = !q || hay.includes(q);
      card.style.display = show ? "" : "none";
    });
    applyCardLinks();
    const hint = document.getElementById("boardHint");
    if (hint) {
      hint.textContent = y ? ("Tip: Year selected. Clicking any category opens " + y + " directly.") : "Tip: Select a year to jump straight to that year's results per category.";
    }
  }

  if (searchInput) searchInput.addEventListener("input", filterCards);
  if (yearSelect) yearSelect.addEventListener("change", filterCards);

  filterCards();
})();

// --- Year Grid Filter (optional) ---
(function(){
  const input = document.getElementById("yearSearch");
  const grid = document.getElementById("yearGrid");
  if (!input || !grid) return;
  const cards = Array.from(grid.querySelectorAll("[data-year-card]"));
  function normalize(s){ return (s||"").toLowerCase().trim(); }
  input.addEventListener("input", () => {
    const q = normalize(input.value);
    cards.forEach(c => {
      const hay = normalize(c.getAttribute("data-title"));
      c.style.display = (!q || hay.includes(q)) ? "" : "none";
    });
  });
})();
