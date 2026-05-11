const STORAGE_KEY = "pet-snack-tracker-prototype-v2";

const translations = {
  en: {
    addSnack: "Add Snack",
    appTitle: "Pet Snack Tracker",
    brand: "Brand",
    brandPlaceholder: "Inaba",
    cancel: "Cancel",
    category: "Category",
    categoryDental: "Dental",
    categoryDryFood: "Dry food",
    categoryOther: "Other",
    categorySupplement: "Supplement",
    categoryTreat: "Treat",
    categoryWetFood: "Wet food",
    confirmDelete: "Delete this snack?",
    confirmDeletePet: "Delete this pet? Snacks linked to this pet will become shared if no pets remain.",
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
    finishedArchive: "Finished archive",
    finish: "Finish",
    focusNone: "Everything looks fresh",
    focusSome: "{count} snacks need attention",
    fresh: "Fresh",
    history: "History",
    historyEmptyBody: "Finished snacks will move here automatically.",
    historyEmptyTitle: "Nothing finished yet",
    household: "Household",
    inStock: "In stock",
    language: "Language",
    managePets: "Manage pets",
    navAdd: "Add",
    navHistory: "History",
    navSettings: "Settings",
    navSnacks: "Snacks",
    notes: "Notes",
    notesPlaceholder: "Shelf location, flavor, or feeding note",
    opened: "Opened",
    openedBadge: "Opened",
    openedHint: "Track treats that should be finished sooner.",
    petName: "Pet name",
    petNamePlaceholder: "Feifei",
    petPickerHelp: "Choose one, many, or leave empty for a shared snack.",
    pets: "Pets",
    petsCount: "{count} pets",
    preferences: "Preferences",
    productName: "Product name",
    prototypeNoteBody: "This prototype uses local data. Native reminders and scanning come later.",
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
    savePet: "Save Pet",
    saveSnack: "Save Snack",
    scanHint: "Coming in native app. Manual entry works now.",
    scanProduct: "Scan product code",
    scanUnavailable: "Scanning will be available in the native app. You can add this snack manually for now.",
    searchPlaceholder: "Search snacks",
    settings: "Settings",
    sharedSnack: "Shared snack",
    snackNamePlaceholder: "Churu Puree Chicken Recipe",
    species: "Species",
    speciesCat: "Cat",
    speciesDog: "Dog",
    speciesOther: "Other",
    todayFocus: "Today's focus",
    unit: "Unit",
    unitBag: "bag",
    unitBox: "box",
    unitCan: "can",
    unitPack: "pack",
    unitStick: "stick",
    daysLeft: "{count} days left",
    daysOverdue: "{count} days overdue",
    dueToday: "Expires today",
  },
  zh: {
    addSnack: "添加零食",
    appTitle: "宠物零食追踪",
    brand: "品牌",
    brandPlaceholder: "Inaba",
    cancel: "取消",
    category: "分类",
    categoryDental: "磨牙",
    categoryDryFood: "干粮",
    categoryOther: "其他",
    categorySupplement: "营养补充",
    categoryTreat: "零食",
    categoryWetFood: "湿粮",
    confirmDelete: "删除这份零食？",
    confirmDeletePet: "删除这只宠物？相关零食会移除这只宠物；如果没有剩余宠物，会变成共享零食。",
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
    finishedArchive: "已吃完归档",
    finish: "吃完",
    focusNone: "目前都很新鲜",
    focusSome: "{count} 份零食需要关注",
    fresh: "新鲜",
    history: "历史",
    historyEmptyBody: "标记吃完的零食会自动移动到这里。",
    historyEmptyTitle: "还没有历史记录",
    household: "家庭成员",
    inStock: "库存",
    language: "语言",
    managePets: "管理宠物",
    navAdd: "添加",
    navHistory: "历史",
    navSettings: "设置",
    navSnacks: "库存",
    notes: "备注",
    notesPlaceholder: "存放位置、口味或喂食备注",
    opened: "已开封",
    openedBadge: "已开封",
    openedHint: "开封后的零食通常需要更早吃完。",
    petName: "宠物名称",
    petNamePlaceholder: "Feifei",
    petPickerHelp: "可选择一只、多只，也可以留空作为共享零食。",
    pets: "宠物",
    petsCount: "{count} 只宠物",
    preferences: "偏好设置",
    productName: "产品名",
    prototypeNoteBody: "当前原型使用本地数据，原生提醒和扫码后续实现。",
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
    savePet: "保存宠物",
    saveSnack: "保存零食",
    scanHint: "原生 app 阶段实现。现在可以手动录入。",
    scanProduct: "扫描产品码",
    scanUnavailable: "扫码会在原生 app 阶段实现。现在可以先手动添加这份零食。",
    searchPlaceholder: "搜索零食",
    settings: "设置",
    sharedSnack: "共享零食",
    snackNamePlaceholder: "Churu 鸡肉泥",
    species: "物种",
    speciesCat: "猫",
    speciesDog: "狗",
    speciesOther: "其他",
    todayFocus: "今日重点",
    unit: "单位",
    unitBag: "袋",
    unitBox: "盒",
    unitCan: "罐",
    unitPack: "包",
    unitStick: "条",
    daysLeft: "还剩 {count} 天",
    daysOverdue: "已过期 {count} 天",
    dueToday: "今天过期",
  },
};

const productSuggestions = [
  { brand: "Inaba", productName: "Churu Puree Chicken Recipe Cat Treat 4x14g", category: "treat", unit: "pack" },
  { brand: "CAT FOREST", productName: "Puree Chicken & Salmon/Shrimp Cat Treats 12g x 48", category: "treat", unit: "pack" },
  { brand: "Inaba", productName: "Juicy Bites Fish And Clam Cat Treat 3 x 11g", category: "treat", unit: "pack" },
  { brand: "Applaws", productName: "Soft & Chewy Sticks Chicken Breast Cat Treats 4g x 6 pack", category: "treat", unit: "pack" },
  { brand: "Smitten", productName: "Wet Cat Food Mince Beef 400g", category: "wetFood", unit: "can" },
  { brand: "Temptations", productName: "Creamy Purrr-ee Chicken Cat Treats", category: "treat", unit: "pack" },
  { brand: "Greenies", productName: "Feline Dental Treats Chicken Flavor", category: "dental", unit: "pack" },
  { brand: "Ziwi Peak", productName: "Air-Dried Chicken Cat Food", category: "dryFood", unit: "bag" },
  { brand: "Feline Natural", productName: "Freeze Dried Chicken & Lamb Feast", category: "dryFood", unit: "bag" },
];

const categoryLabels = {
  dental: "categoryDental",
  dryFood: "categoryDryFood",
  other: "categoryOther",
  supplement: "categorySupplement",
  treat: "categoryTreat",
  wetFood: "categoryWetFood",
};

let state = normalizeState(loadState());
let activeFilter = "all";

const elements = {
  backToSettingsButton: document.querySelector("#backToSettingsButton"),
  brandInput: document.querySelector("#brandInput"),
  brandOptions: document.querySelector("#brandOptions"),
  cancelEditButton: document.querySelector("#cancelEditButton"),
  categoryInput: document.querySelector("#categoryInput"),
  defaultReminderSelect: document.querySelector("#defaultReminderSelect"),
  editingId: document.querySelector("#editingId"),
  editingPetId: document.querySelector("#editingPetId"),
  emptyAddButton: document.querySelector("#emptyAddButton"),
  emptyState: document.querySelector("#emptyState"),
  expiredCount: document.querySelector("#expiredCount"),
  expiryInput: document.querySelector("#expiryInput"),
  focusCount: document.querySelector("#focusCount"),
  focusTitle: document.querySelector("#focusTitle"),
  historyEmpty: document.querySelector("#historyEmpty"),
  historyList: document.querySelector("#historyList"),
  languageSelect: document.querySelector("#languageSelect"),
  managePetsButton: document.querySelector("#managePetsButton"),
  nameInput: document.querySelector("#nameInput"),
  notesInput: document.querySelector("#notesInput"),
  openedInput: document.querySelector("#openedInput"),
  petForm: document.querySelector("#petForm"),
  petList: document.querySelector("#petList"),
  petNameInput: document.querySelector("#petNameInput"),
  petPicker: document.querySelector("#petPicker"),
  petsSummary: document.querySelector("#petsSummary"),
  productOptions: document.querySelector("#productOptions"),
  quantityInput: document.querySelector("#quantityInput"),
  quickAddButton: document.querySelector("#quickAddButton"),
  reminderInput: document.querySelector("#reminderInput"),
  resetButton: document.querySelector("#resetButton"),
  scanButton: document.querySelector("#scanButton"),
  searchInput: document.querySelector("#searchInput"),
  snackForm: document.querySelector("#snackForm"),
  snackList: document.querySelector("#snackList"),
  soonCount: document.querySelector("#soonCount"),
  speciesInput: document.querySelector("#speciesInput"),
  totalCount: document.querySelector("#totalCount"),
  unitInput: document.querySelector("#unitInput"),
};

init();

function init() {
  setDefaultDate();
  bindEvents();
  persist();
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

  elements.quickAddButton.addEventListener("click", startAdd);
  elements.emptyAddButton.addEventListener("click", startAdd);
  elements.cancelEditButton.addEventListener("click", () => {
    clearSnackForm();
    setScreen("snacks");
  });
  elements.managePetsButton.addEventListener("click", () => setScreen("pets"));
  elements.backToSettingsButton.addEventListener("click", () => setScreen("settings"));
  elements.scanButton.addEventListener("click", () => window.alert(t("scanUnavailable")));
  elements.searchInput.addEventListener("input", renderSnackList);
  elements.brandInput.addEventListener("input", () => {
    renderProductOptions();
    autoApplyProductSuggestion();
  });
  elements.nameInput.addEventListener("input", autoApplyProductSuggestion);

  elements.snackForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveSnackFromForm();
  });

  elements.petForm.addEventListener("submit", (event) => {
    event.preventDefault();
    savePetFromForm();
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
    clearSnackForm();
    clearPetForm();
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
  const feifei = createId();
  const daniel = createId();
  const now = new Date().toISOString();
  return {
    settings: {
      language: getInitialLanguage(),
      defaultReminderDaysBefore: 7,
    },
    pets: [
      { id: feifei, name: "Feifei", species: "cat", avatarColor: "sage", createdAt: now, updatedAt: now },
      { id: daniel, name: "Daniel", species: "cat", avatarColor: "sky", createdAt: now, updatedAt: now },
    ],
    snacks: [
      createSnackSeed("Inaba", "Churu Puree Chicken Recipe Cat Treat 4x14g", [feifei], "treat", "2027-02-21", 4, "pack"),
      createSnackSeed("CAT FOREST", "Puree Chicken & Salmon/Shrimp Cat Treats 12g x 48", [feifei, daniel], "treat", "2027-10-17", 3, "pack"),
      createSnackSeed("Inaba", "Juicy Bites Fish And Clam Cat Treat 3 x 11g", [feifei], "treat", "2026-05-19", 2, "pack"),
      createSnackSeed("Applaws", "Soft & Chewy Sticks Chicken Breast Cat Treats 4g x 6 pack", [], "treat", "2026-07-11", 1, "pack"),
      createSnackSeed("Smitten", "Wet Cat Food Mince Beef 400g", [], "wetFood", "2028-10-11", 1, "can"),
    ],
  };
}

function createSnackSeed(brand, productName, petIds, category, expiryDate, quantity, unit) {
  return {
    id: createId(),
    brand,
    productName,
    name: productName,
    petIds,
    category,
    quantity,
    unit,
    expiryDate,
    opened: false,
    reminderDaysBefore: 7,
    notes: "",
    status: "active",
    createdAt: new Date().toISOString(),
  };
}

function normalizeState(raw) {
  const initial = createInitialState();
  const settings = {
    ...initial.settings,
    ...(raw.settings ?? {}),
  };
  const pets = Array.isArray(raw.pets) && raw.pets.length > 0 ? raw.pets : initial.pets;
  const snacks = Array.isArray(raw.snacks) ? raw.snacks.map((snack) => normalizeSnack(snack, pets)) : initial.snacks;
  return { settings, pets, snacks };
}

function normalizeSnack(snack, pets) {
  const matchingPet = snack.petName ? pets.find((pet) => pet.name === snack.petName) : null;
  return {
    id: snack.id ?? createId(),
    brand: snack.brand ?? "",
    productName: snack.productName ?? snack.name ?? "",
    name: snack.productName ?? snack.name ?? "",
    petIds: Array.isArray(snack.petIds) ? snack.petIds : matchingPet ? [matchingPet.id] : [],
    category: normalizeCategory(snack.category),
    quantity: Number(snack.quantity ?? 1),
    unit: snack.unit ?? "pack",
    expiryDate: normalizeDate(snack.expiryDate) ?? formatDate(addDays(new Date(), 7)),
    opened: Boolean(snack.opened),
    reminderDaysBefore: Number(snack.reminderDaysBefore ?? 7),
    notes: snack.notes ?? "",
    status: snack.status ?? "active",
    createdAt: snack.createdAt ?? new Date().toISOString(),
    updatedAt: snack.updatedAt,
    finishedAt: snack.finishedAt,
  };
}

function normalizeCategory(category) {
  const map = {
    canned: "wetFood",
    freezeDried: "treat",
    jerky: "treat",
    Treat: "treat",
    "Wet Food": "wetFood",
  };
  return map[category] ?? category ?? "treat";
}

function normalizeDate(value) {
  if (!value) {
    return null;
  }
  return String(value).replaceAll(".", "-");
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
  renderBrandOptions();
  renderProductOptions();
  renderPetPicker();
  renderSummary();
  renderSnackList();
  renderHistory();
  renderPets();
}

function translateStaticText() {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.placeholder = t(node.dataset.i18nPlaceholder);
  });
}

function t(key, replacements = {}) {
  const template = translations[state.settings.language][key] ?? translations.en[key] ?? key;
  return Object.entries(replacements).reduce((value, [name, replacement]) => {
    return value.replace(`{${name}}`, String(replacement));
  }, template);
}

function renderBrandOptions() {
  const brands = unique(productSuggestions.map((product) => product.brand).concat(state.snacks.map((snack) => snack.brand).filter(Boolean)));
  elements.brandOptions.innerHTML = brands.map((brand) => `<option value="${escapeHtml(brand)}"></option>`).join("");
}

function renderProductOptions() {
  const brand = elements.brandInput.value.trim().toLowerCase();
  const suggestions = productSuggestions.filter((product) => !brand || product.brand.toLowerCase().includes(brand));
  elements.productOptions.innerHTML = suggestions
    .map((product) => `<option value="${escapeHtml(product.productName)}" label="${escapeHtml(product.brand)}"></option>`)
    .join("");
}

function autoApplyProductSuggestion() {
  const value = elements.nameInput.value.trim().toLowerCase();
  const suggestion = productSuggestions.find((product) => product.productName.toLowerCase() === value);
  if (!suggestion) {
    return;
  }
  elements.brandInput.value = suggestion.brand;
  elements.categoryInput.value = suggestion.category;
  elements.unitInput.value = suggestion.unit;
}

function renderPetPicker(selectedOverride) {
  const selected = selectedOverride ?? getSelectedPetIds();
  elements.petPicker.innerHTML = [
    `<button class="pet-chip ${selected.length === 0 ? "active" : ""}" type="button" data-pet-id="">${t("sharedSnack")}</button>`,
    ...state.pets.map((pet) => {
      return `<button class="pet-chip pet-${pet.avatarColor} ${selected.includes(pet.id) ? "active" : ""}" type="button" data-pet-id="${pet.id}">${escapeHtml(pet.name)}</button>`;
    }),
  ].join("");

  elements.petPicker.querySelectorAll(".pet-chip").forEach((button) => {
    button.addEventListener("click", () => togglePetSelection(button.dataset.petId));
  });
}

function getSelectedPetIds() {
  return Array.from(elements.petPicker.querySelectorAll(".pet-chip.active"))
    .map((button) => button.dataset.petId)
    .filter(Boolean);
}

function togglePetSelection(petId) {
  if (!petId) {
    elements.petPicker.querySelectorAll(".pet-chip").forEach((chip) => chip.classList.toggle("active", chip.dataset.petId === ""));
    return;
  }
  const sharedChip = elements.petPicker.querySelector('[data-pet-id=""]');
  sharedChip?.classList.remove("active");
  const chip = elements.petPicker.querySelector(`[data-pet-id="${petId}"]`);
  chip?.classList.toggle("active");
  if (getSelectedPetIds().length === 0) {
    sharedChip?.classList.add("active");
  }
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
  bindSnackActionButtons(elements.snackList);
}

function renderHistory() {
  const finished = state.snacks
    .filter((snack) => snack.status === "finished")
    .sort((a, b) => new Date(b.finishedAt ?? b.createdAt) - new Date(a.finishedAt ?? a.createdAt));

  elements.historyList.innerHTML = finished.map(renderSnackCard).join("");
  elements.historyEmpty.classList.toggle("hidden", finished.length > 0);
  bindSnackActionButtons(elements.historyList);
}

function bindSnackActionButtons(scope) {
  scope.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => handleSnackAction(button.dataset.action, button.dataset.id));
  });
}

function renderSnackCard(snack) {
  const snackState = getSnackState(snack);
  const categoryKey = categoryLabels[snack.category] ?? "categoryOther";
  const isFinished = snack.status === "finished";
  const petNames = getPetNames(snack.petIds);

  return `
    <article class="snack-card">
      <div class="snack-main">
        <p class="brand-line">${escapeHtml(snack.brand || t("brand"))}</p>
        <h3>${escapeHtml(snack.productName || snack.name)}</h3>
        <p class="snack-meta">
          <span>${escapeHtml(petNames)}</span>
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

function getPetNames(petIds = []) {
  if (!petIds.length) {
    return t("sharedSnack");
  }
  return petIds
    .map((id) => state.pets.find((pet) => pet.id === id)?.name)
    .filter(Boolean)
    .join(", ") || t("sharedSnack");
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
  return [snack.productName, snack.brand, getPetNames(snack.petIds), snack.notes].some((value) => String(value ?? "").toLowerCase().includes(query));
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
    fillSnackForm(snack);
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
  const productName = elements.nameInput.value.trim();
  const payload = {
    brand: elements.brandInput.value.trim(),
    productName,
    name: productName,
    petIds: getSelectedPetIds(),
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
  clearSnackForm();
  setScreen("snacks");
  render();
}

function fillSnackForm(snack) {
  elements.editingId.value = snack.id;
  elements.brandInput.value = snack.brand ?? "";
  elements.nameInput.value = snack.productName ?? snack.name;
  elements.categoryInput.value = snack.category;
  elements.quantityInput.value = snack.quantity;
  elements.unitInput.value = snack.unit;
  elements.expiryInput.value = snack.expiryDate;
  elements.openedInput.checked = snack.opened;
  elements.reminderInput.value = String(snack.reminderDaysBefore ?? state.settings.defaultReminderDaysBefore);
  elements.notesInput.value = snack.notes ?? "";
  renderPetPicker(snack.petIds);
}

function clearSnackForm() {
  elements.snackForm.reset();
  elements.editingId.value = "";
  elements.quantityInput.value = "1";
  elements.unitInput.value = "pack";
  elements.reminderInput.value = String(state.settings.defaultReminderDaysBefore);
  setDefaultDate();
  renderPetPicker([]);
}

function startAdd() {
  clearSnackForm();
  setScreen("add");
}

function renderPets() {
  elements.petsSummary.textContent = t("petsCount", { count: state.pets.length });
  elements.petList.innerHTML = state.pets.map((pet) => {
    return `
      <article class="pet-card pet-${pet.avatarColor}">
        <div>
          <strong>${escapeHtml(pet.name)}</strong>
          <span>${t(speciesKey(pet.species))}</span>
        </div>
        <div class="pet-actions">
          <button class="text-button" type="button" data-pet-action="edit" data-id="${pet.id}">${t("edit")}</button>
          <button class="text-button danger" type="button" data-pet-action="delete" data-id="${pet.id}">${t("delete")}</button>
        </div>
      </article>
    `;
  }).join("");

  elements.petList.querySelectorAll("[data-pet-action]").forEach((button) => {
    button.addEventListener("click", () => handlePetAction(button.dataset.petAction, button.dataset.id));
  });
}

function savePetFromForm() {
  const name = elements.petNameInput.value.trim();
  if (!name) {
    return;
  }
  const id = elements.editingPetId.value;
  if (id) {
    const pet = state.pets.find((item) => item.id === id);
    Object.assign(pet, { name, species: elements.speciesInput.value, updatedAt: new Date().toISOString() });
  } else {
    state.pets.push({
      id: createId(),
      name,
      species: elements.speciesInput.value,
      avatarColor: nextPetColor(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
  clearPetForm();
  persist();
  render();
}

function handlePetAction(action, id) {
  const pet = state.pets.find((item) => item.id === id);
  if (!pet) {
    return;
  }
  if (action === "edit") {
    elements.editingPetId.value = pet.id;
    elements.petNameInput.value = pet.name;
    elements.speciesInput.value = pet.species;
    return;
  }
  if (action === "delete" && window.confirm(t("confirmDeletePet"))) {
    state.pets = state.pets.filter((item) => item.id !== id);
    state.snacks = state.snacks.map((snack) => ({
      ...snack,
      petIds: snack.petIds.filter((petId) => petId !== id),
    }));
    clearPetForm();
    persist();
    render();
  }
}

function clearPetForm() {
  elements.petForm.reset();
  elements.editingPetId.value = "";
  elements.speciesInput.value = "cat";
}

function setScreen(screen) {
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
  elements.expiryInput.value = formatDate(addDays(new Date(), 30));
}

function unitKey(unit) {
  return {
    bag: "unitBag",
    box: "unitBox",
    can: "unitCan",
    pack: "unitPack",
    stick: "unitStick",
  }[unit] ?? "unitPack";
}

function speciesKey(species) {
  return {
    cat: "speciesCat",
    dog: "speciesDog",
    other: "speciesOther",
  }[species] ?? "speciesOther";
}

function nextPetColor() {
  const colors = ["sage", "sky", "honey", "lavender"];
  return colors[state.pets.length % colors.length];
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

function unique(values) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
