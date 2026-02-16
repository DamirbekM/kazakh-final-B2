const STORAGE_KEY = "kz_neologisms_v1";
const LANG_KEY = "kz_glossary_lang";

const translations = {
    ru: {
        title: "Глоссарий неологизмов",
        subtitle: "Казахский язык — примеры, значения, теги, поиск",
        search: "Поиск",
        tag: "Тег",
        sort: "Сортировка",
        reset: "Сброс",
        addTerm: "Добавить термин",
        addBtn: "Добавить",
        shown: "Показано",
        nothing: "Ничего не найдено"
    },
    kz: {
        title: "Неологизмдер сөздігі",
        subtitle: "Қазақ тілі — мысалдар, мағыналар, іздеу",
        search: "Іздеу",
        tag: "Тег",
        sort: "Сұрыптау",
        reset: "Тазалау",
        addTerm: "Термин қосу",
        addBtn: "Қосу",
        shown: "Көрсетілді",
        nothing: "Ештеңе табылмады"
    }
};

let currentLang = localStorage.getItem(LANG_KEY) || "ru";

const seed = [
    {
        id: crypto.randomUUID(),
        term: "вайб",
        meaning: "атмосфера, настроение",
        example: "Бүгін вайб жақсы екен.",
        origin: "интернет-сленг",
        tags: ["молодежь"]
    }
];

const $ = (s) => document.querySelector(s);

const els = {
    list: $("#list"),
    stats: $("#stats"),
    q: $("#q"),
    tag: $("#tag"),
    sort: $("#sort"),
    reset: $("#reset"),
    form: $("#form"),
    term: $("#term"),
    meaning: $("#meaning"),
    example: $("#example"),
    origin: $("#origin"),
    tags: $("#tags"),
    langSelect: $("#langSelect")
};

function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.dataset.i18n;
        el.textContent = translations[currentLang][key];
    });
}

function loadData() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: seed };
    return JSON.parse(raw);
}

function saveData(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

let state = loadData();

function render() {
    applyTranslations();

    const filtered = state.items;

    els.stats.textContent =
        `${translations[currentLang].shown}: ${filtered.length}`;

    if (!filtered.length) {
        els.list.innerHTML =
            `<div class="panel">${translations[currentLang].nothing}</div>`;
        return;
    }

    els.list.innerHTML = filtered.map(item => `
    <article class="card">
      <div class="cardTop">
        <h3 class="term">${item.term}</h3>
        <span class="badge">${item.origin}</span>
      </div>
      <div>${item.meaning}</div>
      <p class="example">${item.example}</p>
    </article>
  `).join("");
}

els.langSelect.value = currentLang;

els.langSelect.addEventListener("change", () => {
    currentLang = els.langSelect.value;
    localStorage.setItem(LANG_KEY, currentLang);
    render();
});

render();
