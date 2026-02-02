const sceneData = [
  {
    name: "AI+教育",
    subtitle: "智慧学习系统，打造全域数据驱动的教学闭环。",
    tag: "智慧教育",
    cards: [
      { title: "学习画像", desc: "精准分析学习习惯与能力分布，动态调整资源。" },
      { title: "课堂互联", desc: "多终端联动，实时互动与学习反馈。" },
      { title: "成长评估", desc: "全周期追踪评估，为教学决策提供数据支撑。" }
    ],
    detail:
      "聚焦课堂与校园场景的智能化升级，支持教学数据采集、智能排课、精准作业与成长评估，实现教学全链路闭环。"
  },
  {
    name: "AI+影视",
    subtitle: "AI渲染与智能剪辑，赋能内容生产新范式。",
    tag: "内容生产",
    cards: [
      { title: "智能剪辑", desc: "自动识别关键镜头，快速生成多版本内容。" },
      { title: "虚拟拍摄", desc: "实时渲染与特效叠加，提升拍摄效率。" },
      { title: "素材管理", desc: "智能分类归档，提升协作与复用效率。" }
    ],
    detail:
      "围绕影视工业化流程提供智能剪辑、AI渲染与多团队协作平台，提升内容生产效率与质量。"
  },
  {
    name: "绿色双碳",
    subtitle: "统一能碳管理，驱动园区绿色低碳运行。",
    tag: "绿色运营",
    cards: [
      { title: "能耗监测", desc: "实时采集园区能耗数据，实现可视化洞察。" },
      { title: "碳排分析", desc: "多维度碳排核算，支持双碳目标管理。" },
      { title: "策略优化", desc: "动态调度策略，降低成本并提升节能效率。" }
    ],
    detail:
      "通过能源与碳排的统一监控平台，形成预测、评估、优化闭环，帮助园区实现绿色运营与节能减排。"
  },
  {
    name: "零碳园区",
    subtitle: "融合清洁能源与储能调度，打造零碳示范。",
    tag: "零碳示范",
    cards: [
      { title: "清洁能源", desc: "引入分布式光储及风能，实现清洁供给。" },
      { title: "源网荷储", desc: "多能协同优化，提升系统稳定性。" },
      { title: "能效管理", desc: "设备能效监测与告警，持续运营优化。" }
    ],
    detail:
      "以多能互补与储能调度为核心，实现园区能源结构优化与零碳运营的示范样板。"
  },
  {
    name: "绿色智算",
    subtitle: "绿色算力调度与节能机房，释放算力价值。",
    tag: "智算中心",
    cards: [
      { title: "算力调度", desc: "智能分配算力资源，提升能效比。" },
      { title: "冷却优化", desc: "液冷与风冷协同，降低机房能耗。" },
      { title: "安全韧性", desc: "多级冗余与安全管理，保障业务连续性。" }
    ],
    detail:
      "聚焦绿色算力基础设施建设，整合算力调度与能耗优化策略，提升机房能效与服务稳定性。"
  },
  {
    name: "绿色校园",
    subtitle: "校园设施全生命周期管理，构建低碳校园。",
    tag: "智慧校园",
    cards: [
      { title: "设备互联", desc: "物联设备集中管理，统一监管。" },
      { title: "安全运营", desc: "多维安全巡检与应急协同。" },
      { title: "服务升级", desc: "打造师生一体化服务体验。" }
    ],
    detail:
      "为校园提供能耗、安防、服务一体化运营平台，提升管理效率与绿色低碳水平。"
  },
  {
    name: "智慧矿山",
    subtitle: "矿山场景数字孪生与智能调度。",
    tag: "工业场景",
    cards: [
      { title: "安全监测", desc: "实时监测环境与设备状态，保障安全。" },
      { title: "无人运输", desc: "自动驾驶运输调度，提高效率。" },
      { title: "协同指挥", desc: "指挥调度中心一屏掌控。" }
    ],
    detail:
      "通过数字孪生与智能调度系统，实现矿山生产的安全、高效与绿色运营。"
  }
];

const wheel = document.getElementById("selectorWheel");
const contentTitle = document.getElementById("contentTitle");
const contentSubtitle = document.getElementById("contentSubtitle");
const contentBody = document.getElementById("contentBody");
const contentTag = document.getElementById("contentTag");
const detailButton = document.getElementById("detailButton");
const modal = document.getElementById("detailModal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");

const baseAngles = [];
let rotation = 0;
let velocity = 0;
let isDragging = false;
let lastTime = 0;
let activeIndex = 0;

const radius = 150;
const center = { x: 160, y: 160 };

sceneData.forEach((scene, index) => {
  const item = document.createElement("div");
  item.className = "selector-item";
  item.textContent = scene.name;
  item.dataset.index = index;
  item.addEventListener("click", () => {
    rotateToIndex(index);
    openDetail(true);
  });
  wheel.appendChild(item);
});

const items = Array.from(document.querySelectorAll(".selector-item"));

function initializeAngles() {
  const spread = Math.PI;
  const start = -Math.PI / 2;
  sceneData.forEach((_, index) => {
    const angle = start + (spread / (sceneData.length - 1)) * index;
    baseAngles[index] = angle;
  });
}

function updateLayout() {
  items.forEach((item, index) => {
    const angle = baseAngles[index] + rotation;
    const x = center.x + Math.cos(angle) * radius;
    const y = center.y + Math.sin(angle) * radius;
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    item.style.opacity = angle > -Math.PI / 2 - 0.4 && angle < Math.PI / 2 + 0.4 ? 1 : 0.2;
  });

  const newIndex = findClosestIndex();
  if (newIndex !== activeIndex) {
    activeIndex = newIndex;
    updateContent(activeIndex);
  }

  items.forEach((item, index) => {
    item.classList.toggle("active", index === activeIndex);
  });
}

function findClosestIndex() {
  let min = Infinity;
  let selected = 0;
  baseAngles.forEach((angle, index) => {
    const distance = Math.abs(angle + rotation);
    if (distance < min) {
      min = distance;
      selected = index;
    }
  });
  return selected;
}

function updateContent(index) {
  const scene = sceneData[index];
  contentTitle.textContent = scene.name;
  contentSubtitle.textContent = scene.subtitle;
  contentTag.textContent = scene.tag;
  contentBody.innerHTML = scene.cards
    .map(
      (card) => `
      <div class="content-card">
        <h4>${card.title}</h4>
        <p>${card.desc}</p>
      </div>`
    )
    .join("");
}

function rotateToIndex(index) {
  rotation = -baseAngles[index];
  velocity = 0;
  updateLayout();
}

function getPointerAngle(event) {
  const rect = wheel.getBoundingClientRect();
  const x = (event.clientX || event.touches?.[0].clientX) - rect.left;
  const y = (event.clientY || event.touches?.[0].clientY) - rect.top;
  return Math.atan2(y - center.y, x - center.x);
}

function startDrag(event) {
  isDragging = true;
  velocity = 0;
  lastTime = performance.now();
  wheel.dataset.startAngle = getPointerAngle(event);
  wheel.dataset.startRotation = rotation;
}

function onDrag(event) {
  if (!isDragging) return;
  const currentAngle = getPointerAngle(event);
  const startAngle = Number(wheel.dataset.startAngle);
  const startRotation = Number(wheel.dataset.startRotation);
  const now = performance.now();
  const delta = currentAngle - startAngle;
  rotation = startRotation + delta;
  const dt = now - lastTime;
  velocity = (delta / dt) * 16;
  lastTime = now;
  updateLayout();
}

function endDrag() {
  if (!isDragging) return;
  isDragging = false;
  requestAnimationFrame(inertiaStep);
}

function inertiaStep() {
  if (isDragging) return;
  rotation += velocity;
  velocity *= 0.92;
  updateLayout();
  if (Math.abs(velocity) > 0.002) {
    requestAnimationFrame(inertiaStep);
  }
}

function openDetail(forceOpen = true) {
  const scene = sceneData[activeIndex];
  modalTitle.textContent = `${scene.name} · 详细信息`;
  modalBody.textContent = scene.detail;
  if (forceOpen) {
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
  }
}

wheel.addEventListener("pointerdown", startDrag);
wheel.addEventListener("pointermove", onDrag);
window.addEventListener("pointerup", endDrag);
wheel.addEventListener("touchstart", startDrag);
wheel.addEventListener("touchmove", onDrag);
window.addEventListener("touchend", endDrag);

detailButton.addEventListener("click", () => openDetail(true));

modal.addEventListener("click", (event) => {
  if (event.target.dataset.close) {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  }
});

initializeAngles();
rotateToIndex(2);
updateLayout();
