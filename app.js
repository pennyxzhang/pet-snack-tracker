const STORAGE_KEY = "pet-snack-tracker-prototype";

const translations = {
  en: {
    addSnack: "Add Snack",
    appTitle: "Pet Snack Tracker",
    cancel: "Cancel",
    category: "Category",
    categoryCanned: "Canned",
    categoryDental: "Dental",
    categoryFreezeDried: "Freeze-dried",
    categoryJerky: "Jerky",
    categoryOther: "Other",
    categorySupplement: "Supplement",
    defaultReminder: "Default reminder",
    delete: "Delete",
    edit: "Edit",
    emptyBody: "Add the first treat and we'll keep its expiry date visible.",
    emptyTitle: "No snacks yet",
    eyebrow: "Snack expiry tracker",
    expired: "Expired",
    expiringSoon: "Expiring soon",
    expiryDate: "Expiry date",
    filterAll: "All",
    filterExpired: "Expired",
    filterFresh: "Fresh",
    filterSoon: "Soon",
    finished: "Finished",
    finishedArchive: "Finished archive",
    finish: "Finish",
    fresh: "Fresh",
    history: "History",
    historyEmptyBody: "Finished snacks will move here automatically.",
    historyEmptyTitle: "Nothing finished yet",
    inStock: "In stock",
    language: "Language",
    navAdd: "Add",
    navHistory: "History",
    navSettings: "Settings",
    navSnacks: "Snacks",
    notes: "Notes",
    opened: "Opened",
    openedHint: "Track treats that should be finished sooner.",
    petName: "Pet",
    preferences: "Preferences",
    prototypeNoteBody: "This version simulates reminder logic. Native notification scheduling comes in the app build.",
    prototypeNoteTitle: "Prototype note",
    quantity: "Quantity",
    quickEntry: "Quick entry",
    reminder: "Reminder",
    reminder1: "1 day before",
    reminder3: "3 days before",
    reminder7: "7 days before",
    reminder14: "14 days before",
    reminder30: "30 days before",
    resetDemo: "Reset demo data",
    saveSnack: "Save Snack",
    searchPlaceholder: "Search snacks",
    settings: "Settings",
    snackName: "Snack name",
    snackNamePlaceholder: "Chicken bites",
    petNamePlaceholder: "Mochi",
    notesPlaceholder: "Shelf location, flavor, or feeding note",
    todayFocus: "Today's focus",
    unit: "Unit",
    unitBag: "bag",
    unitBox: "box",
    unitCan: "can",
    unitStick: "stick",
    daysLeft: "{count} days left",
    daysOverdue: "{count} days overdue",
    dueToday: "Expires today",
    focusNone: "Everything looks fresh",
    focusSome: "{count} snacks need attention",
    openedBadge: "Opened",
    confirmDelete: "Delete this snack?",
  },
  zh: {
    addSnack: "添加零食",
    appTitle: "宠物零食追踪",
    cancel: "取消",
    category: "分类",
    categoryCanned: "罐头",
    categoryDental: "磨牙",
    categoryFreezeDried: "冻干",
    categoryJerky: "肉干",
    categoryOther: "其他",
    categorySupplement: "营养补充",
    defaultReminder: "默认提醒",
    delete: "删除",
    edit: "编辑",
    emptyBody: "添加第一份零食后，我们会帮你盯住过期日期。",
    emptyTitle: "还没有零食",
    eyebrow: "零食保质期提醒",
    expired: "已过期",
    expiringSoon: "即将过期",
    expiryDate: "过期日期",
    filterAll: "全部",
    filterExpired: "过期",
    filterFresh: "新鲜",
    filterSoon: "临期",
    finished: "已吃完",
    finishedArchive: "已吃完归档",
    finish: "吃完",
    fresh: "新鲜",
    history: "历史",
    historyEmptyBody: "标记吃完的零食会自动移动到这里。",
    historyEmptyTitle: "还没有历史记录",
    inStock: "库存",
    language: "语言",
    navAdd: "添加",
    navHistory: "历史",
    navSettings: "设置",
    navSnacks: "库存",
    notes: "备注",
    opened: "已开封",
    openedHint: "开封后的零食通常需要更早吃完。",
    petName: "宠物",
    preferences: "偏好设置",
    prototypeNoteBody: "当前版本模拟提醒逻辑，真正的系统通知会在原生 app 构建中实现。",
    prototypeNoteTitle: "原型说明",
    quantity: "数量",
    quickEntry: "快速录入",
    reminder: "提醒",
    reminder1: "提前 1 天",
    reminder3: "提前 3 天",
    reminder7: "提前 7 天",
    reminder14: "提前 14 天",
    reminder30: "提前 30 天",
    resetDemo: "重置示例数据",
    saveSnack: "保存零食",
    searchPlaceholder: "搜索零食",
    settings: "设置",
    snackName: "零食名称",
    snackNamePlaceholder: "鸡肉粒",
    petNamePlaceholder: "Mochi",
    notesPlaceholder: "存放位置、口味或喂食备注",
    todayFocus: "今日重点",
    unit: "单位",
    unitBag: "袋",
    unitBox: "盒",
    unitCan: "罐",
    unitStick: "条",
    daysLeft: "还剩 {count} 天",
    daysOverdue: "已过期 {count} 天",
    dueToday: "今天过期",
    focusNone: "目前都很新鲜",
    focusSome: "{count} 份零食需要关注",
    openedBadge: "已开封",
    confirmDelete: "删除这份零食？",
  },
};

const categoryLabels = {
  freezeDried: "categoryFreezeDried",
  canned: "categoryCanned",
  jerky: "categoryJerky",
  dental: "categoryDental",
  supplement: "categorySupplement",
  other: "categoryOther",
};

let state = loadState();
let activeScreen = "snacks";
let activeFilter = "all";

const elements = {
  cancelEditButton: document.querySelector("#cancelEditButton"),
  defaultReminderSelect: document.querySelector("#defaultReminderSelect"),
  editingId: document.querySelector("#editingId"),
  emptyAddButton: document.querySelector("#emptyAddButton"),
  emptyState: document.querySelector("#emptyState"),
  expiryInput: document.querySelector("#expiryInput"),
  focusCount: document.querySelector("#focusCount"),
  focusTitle: document.querySelector("#focusTitle"),
  historyEmpty: document.querySelector("#historyEmpty"),
  historyList: document.querySelector("#historyList"),
  languageSelect: document.querySelector("#languageSelect"),
  nameInput: document.querySelector("#nameInput"),
  petInput: document.querySelector("#petInput"),
  quantityInput: document.querySelector("#quantityInput"),
  categoryInput: document.querySelector("#categoryInput"),
  unitInput: document.querySelector("#unitInput"),
  openedInput: document.querySelector("#openedInput"),
  reminderInput: document.querySelector("#reminderInput"),
  notesInput: document.querySelector("#notesInput"),
  quickAddButton: document.querySelector("#quickAddButton"),
  resetButton: document.querySelector("#resetButton"),
  searchInput: document.querySelector("#searchInput"),
  snackForm: document.querySelector("#snackForm"),
  snackList: document.querySelector("#snackList"),
  soonCount: document.querySelector("#soonCount"),
  expiredCount: document.querySelector("#expiredCount"),
  totalCount: document.querySelector("#totalCount"),
};

init();

function init() {
  setDefaultDate();
  bindEvents();
  render();
}

function bindEvents() {
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.addEventListener("click", () => setScreen(button.dataset.screen));
  });

  document.querySelectorAll(".filter-chip").forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      document.querySelectorAll(".filter-chip").forEach((chip) => chip.classList.toggle("active", chip === button));
      renderSnackList();
    });
  });

  elements.quickAddButton.addEventListener("click", () => startAdd());
  elements.emptyAddButton.addEventListener("click", () => startAdd());
  elements.cancelEditButton.addEventListener("click", () => {
    clearForm();
    setScreen("snacks");
  });

  elements.searchInput.addEventListener("input", renderSnackList);

  elements.snackForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveSnackFromForm();
  });

  elements.languageSelect.addEventListener("change", () => {
    state.settings.language = elements.languageSelect.value;
    persist();
    render();
  });

  elements.defaultReminderSelect.addEventListener("change", () => {
    state.settings.defaultReminderDaysBefore = Number(elements.defaultReminderSelect.value);
    persist();
  });

  elements.resetButton.addEventListener("click", () => {
    state = createInitialState();
    activeFilter = "all";
    clearForm();
    persist();
    render();
    setScreen("snacks");
  });
}

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored?.snacks && stored?.settings) {
      return stored;
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
  return createInitialState();
}

function createInitialState() {
  const today = startOfDay(new Date());
  return {
    settings: {
      language: getInitialLanguage(),
      defaultReminderDaysBefore: 7,
    },
    snacks: [
      {
        id: createId(),
        name: "Freeze-dried chicken",
        petName: "Mochi",
        category: "freezeDried",
        quantity: 2,
        unit: "bag",
        expiryDate: formatDate(addDays(today, 3)),
        opened: true,
        reminderDaysBefore: 7,
        notes: "Top shelf, finish opened bag first.",
        status: "active",
        createdAt: new Date().toISOString(),
      },
      {
        id: createId(),
        name: "Dental chews",
        petName: "Miso",
        category: "dental",
        quantity: 1,
        unit: "box",
        expiryDate: formatDate(addDays(today, -2)),
        opened: false,
        reminderDaysBefore: 7,
        notes: "Check before feeding.",
        status: "active",
        createdAt: new Date().toISOString(),
      },
      {
        id: createId(),
        name: "Salmon bites",
        petName: "Mochi",
        category: "jerky",
        quantity: 1,
        unit: "bag",
        expiryDate: formatDate(addDays(today, 32)),
        opened: false,
        reminderDaysBefore: 14,
        notes: "Favorite training treat.",
        status: "active",
        createdAt: new Date().toISOString(),
      },
    ],
  };
}

function getInitialLanguage() {
  return navigator.language?.toLowerCase().startsWith("zh") ? "zh" : "en";
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function render() {
  document.documentElement.lang = state.settings.language === "zh" ? "zh-CN" : "en";
  elements.languageSelect.value = state.settings.language;
  elements.defaultReminderSelect.value = String(state.settings.defaultReminderDaysBefore);
  translateStaticText();
  renderSummary();
  renderSnackList();
  renderHistory();
}

function translateStaticText() {
  const dictionary = translations[state.settings.language];
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = dictionary[node.dataset.i18n] ?? translations.en[node.dataset.i18n] ?? node.textContent;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.placeholder = dictionary[node.dataset.i18nPlaceholder] ?? translations.en[node.dataset.i18nPlaceholder] ?? "";
  });
}

function t(key, replacements = {}) {
  const template = translations[state.settings.language][key] ?? translations.en[key] ?? key;
  return Object.entries(replacements).reduce((value, [name, replacement]) => {
    return value.replace(`{${name}}`, String(replacement));
  }, template);
}

function renderSummary() {
  const activeSnacks = getActiveSnacks();
  const attention = activeSnacks.filter((snack) => ["soon", "expired"].includes(getSnackState(snack).status));
  const soon = activeSnacks.filter((snack) => getSnackState(snack).status === "soon");
  const expired = activeSnacks.filter((snack) => getSnackState(snack).status === "expired");

  elements.totalCount.textContent = activeSnacks.length;
  elements.soonCount.textContent = soon.length;
  elements.expiredCount.textContent = expired.length;
  elements.focusCount.textContent = attention.length;
  elements.focusTitle.textContent = attention.length > 0 ? t("focusSome", { count: attention.length }) : t("focusNone");
}

function renderSnackList() {
  const activeSnacks = getActiveSnacks()
    .filter(matchesFilter)
    .filter(matchesSearch)
    .sort(sortByUrgency);

  elements.snackList.innerHTML = activeSnacks.map(renderSnackCard).join("");
  elements.emptyState.classList.toggle("hidden", activeSnacks.length > 0 || elements.searchInput.value.trim() !== "");

  elements.snackList.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => handleSnackAction(button.dataset.action, button.dataset.id));
  });
}

function renderHistory() {
  const finished = state.snacks
    .filter((snack) => snack.status === "finished")
    .sort((a, b) => new Date(b.finishedAt ?? b.createdAt) - new Date(a.finishedAt ?? a.createdAt));

  elements.historyList.innerHTML = finished.map(renderSnackCard).join("");
  elements.historyEmpty.classList.toggle("hidden", finished.length > 0);

  elements.historyList.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => handleSnackAction(button.dataset.action, button.dataset.id));
  });
}

function renderSnackCard(snack) {
  const snackState = getSnackState(snack);
  const categoryKey = categoryLabels[snack.category] ?? "categoryOther";
  const isFinished = snack.status === "finished";

  return `
    <article class="snack-card">
      <div class="snack-main">
        <h3>${escapeHtml(snack.name)}</h3>
        <p class="snack-meta">
          <span>${escapeHtml(snack.petName || "Pet")}</span>
          <span>${t(categoryKey)}</span>
          <span>${snack.quantity} ${t(unitKey(snack.unit))}</span>
          ${snack.opened ? `<span>${t("openedBadge")}</span>` : ""}
        </p>
      </div>
      <span class="status-pill status-${snackState.status}">${snackState.label}</span>
      <div class="snack-actions">
        ${isFinished ? "" : `<button class="text-button" type="button" data-action="finish" data-id="${snack.id}">${t("finish")}</button>`}
        <button class="text-button" type="button" data-action="edit" data-id="${snack.id}">${t("edit")}</button>
        <button class="text-button danger" type="button" data-action="delete" data-id="${snack.id}">${t("delete")}</button>
      </div>
    </article>
  `;
}

function getSnackState(snack) {
  const days = diffDays(startOfDay(new Date()), parseDate(snack.expiryDate));
  if (days < 0) {
    return { status: "expired", days, label: t("daysOverdue", { count: Math.abs(days) }) };
  }
  if (days === 0) {
    return { status: "soon", days, label: t("dueToday") };
  }
  if (days <= Number(snack.reminderDaysBefore ?? state.settings.defaultReminderDaysBefore)) {
    return { status: "soon", days, label: t("daysLeft", { count: days }) };
  }
  return { status: "fresh", days, label: t("fresh") };
}

function matchesFilter(snack) {
  return activeFilter === "all" || getSnackState(snack).status === activeFilter;
}

function matchesSearch(snack) {
  const query = elements.searchInput.value.trim().toLowerCase();
  if (!query) {
    return true;
  }
  return [snack.name, snack.petName, snack.notes].some((value) => String(value ?? "").toLowerCase().includes(query));
}

function sortByUrgency(a, b) {
  const stateA = getSnackState(a);
  const stateB = getSnackState(b);
  const rank = { expired: 0, soon: 1, fresh: 2 };
  return rank[stateA.status] - rank[stateB.status] || stateA.days - stateB.days;
}

function getActiveSnacks() {
  return state.snacks.filter((snack) => snack.status !== "finished");
}

function handleSnackAction(action, id) {
  const snack = state.snacks.find((item) => item.id === id);
  if (!snack) {
    return;
  }

  if (action === "finish") {
    snack.status = "finished";
    snack.finishedAt = new Date().toISOString();
    persist();
    render();
    return;
  }

  if (action === "edit") {
    fillForm(snack);
    setScreen("add");
    return;
  }

  if (action === "delete" && window.confirm(t("confirmDelete"))) {
    state.snacks = state.snacks.filter((item) => item.id !== id);
    persist();
    render();
  }
}

function saveSnackFromForm() {
  const id = elements.editingId.value;
  const payload = {
    name: elements.nameInput.value.trim(),
    petName: elements.petInput.value.trim(),
    category: elements.categoryInput.value,
    quantity: Math.max(1, Number(elements.quantityInput.value || 1)),
    unit: elements.unitInput.value,
    expiryDate: elements.expiryInput.value,
    opened: elements.openedInput.checked,
    reminderDaysBefore: Number(elements.reminderInput.value),
    notes: elements.notesInput.value.trim(),
    updatedAt: new Date().toISOString(),
  };

  if (id) {
    const snack = state.snacks.find((item) => item.id === id);
    Object.assign(snack, payload);
  } else {
    state.snacks.push({
      id: createId(),
      ...payload,
      status: "active",
      createdAt: new Date().toISOString(),
    });
  }

  persist();
  clearForm();
  setScreen("snacks");
  render();
}

function fillForm(snack) {
  elements.editingId.value = snack.id;
  elements.nameInput.value = snack.name;
  elements.petInput.value = snack.petName;
  elements.categoryInput.value = snack.category;
  elements.quantityInput.value = snack.quantity;
  elements.unitInput.value = snack.unit;
  elements.expiryInput.value = snack.expiryDate;
  elements.openedInput.checked = snack.opened;
  elements.reminderInput.value = String(snack.reminderDaysBefore ?? state.settings.defaultReminderDaysBefore);
  elements.notesInput.value = snack.notes ?? "";
}

function clearForm() {
  elements.snackForm.reset();
  elements.editingId.value = "";
  elements.quantityInput.value = "1";
  elements.reminderInput.value = String(state.settings.defaultReminderDaysBefore);
  setDefaultDate();
}

function startAdd() {
  clearForm();
  setScreen("add");
}

function setScreen(screen) {
  activeScreen = screen;
  document.querySelectorAll(".screen").forEach((node) => {
    node.classList.toggle("active", node.id === `screen-${screen}`);
  });
  document.querySelectorAll(".nav-item").forEach((node) => {
    node.classList.toggle("active", node.dataset.screen === screen);
  });
  if (screen === "add") {
    elements.nameInput.focus({ preventScroll: true });
  }
}

function setDefaultDate() {
  elements.expiryInput.value = formatDate(addDays(new Date(), 7));
}

function unitKey(unit) {
  return {
    bag: "unitBag",
    box: "unitBox",
    can: "unitCan",
    stick: "unitStick",
  }[unit] ?? "unitBag";
}

function parseDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function diffDays(from, to) {
  const day = 1000 * 60 * 60 * 24;
  return Math.round((startOfDay(to) - startOfDay(from)) / day);
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function createId() {
  if (crypto?.randomUUID) {
    return crypto.randomUUID();
  }
  return `snack-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
