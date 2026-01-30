const projects = [
  {
    id: "project-a",
    title: "智慧展厅 · 互动引导",
    preview: "面向参观者的沉浸式互动入口，集中展示公司全线业务能力。",
    detail: "多媒体交互与讲解方案，适合大型展厅的开场总览区。",
    image: "assets/project-a.svg",
    tags: ["互动引导", "总览屏", "沉浸体验"],
    points: [
      "建议以 30 秒概览快速建立参观节奏。",
      "重点说明三大核心服务：策展、内容、技术。",
      "引导观众关注右侧滚动列表进行二级深入。",
    ],
  },
  {
    id: "project-b",
    title: "项目 B · 数字孪生",
    preview: "以实时数据驱动的数字孪生系统，支持多终端联动展示。",
    detail: "实时数据可视化与监控管理，适合智慧园区与工业展区演示。",
    image: "assets/project-b.svg",
    tags: ["数据大屏", "实时监控", "可视化"],
    points: [
      "展示实时数据接入与模拟演示能力。",
      "突出多维度视角切换与异常预警。",
      "可搭配互动模型讲解场景价值。",
    ],
  },
  {
    id: "project-c",
    title: "项目 C · AI 讲解",
    preview: "AI 讲解员与语音交互系统，实现多语种自动讲解。",
    detail: "智能讲解与问答系统，适用于大型展馆与品牌体验中心。",
    image: "assets/project-c.svg",
    tags: ["语音交互", "AI 导览", "知识库"],
    points: [
      "强调语音识别与知识库联动。",
      "支持自定义讲解路线与角色形象。",
      "可接入多语言与远程控制模式。",
    ],
  },
  {
    id: "project-d",
    title: "项目 D · 智慧交互",
    preview: "多屏互动与体感装置组合，打造高参与度体验区。",
    detail: "面向互动体验区的多屏联动方案，支持体感、触控、移动联动。",
    image: "assets/project-d.svg",
    tags: ["多屏联动", "体感互动", "控制中枢"],
    points: [
      "演示多屏同步与控制台调度。",
      "重点说明硬件设备兼容性。",
      "建议结合现场体验区做互动演示。",
    ],
  },
  {
    id: "project-e",
    title: "项目 E · 未来展区",
    preview: "沉浸影像与空间叙事结合，适合品牌未来馆展示。",
    detail: "沉浸式影像和空间叙事体验，适用于品牌未来馆与发布厅。",
    image: "assets/project-e.svg",
    tags: ["沉浸影像", "空间叙事", "未来感"],
    points: [
      "强调光影与空间的沉浸式体验。",
      "结合品牌故事进行分段讲解。",
      "可扩展为沉浸式发布活动。",
    ],
  },
];

const body = document.body;
const scrollList = document.getElementById("scroll-list");
const scrollItems = Array.from(document.querySelectorAll(".scroll-item"));
const previewImage = document.getElementById("preview-image");
const previewTitle = document.getElementById("preview-title");
const previewDesc = document.getElementById("preview-desc");
const detailTitle = document.getElementById("detail-title");
const detailDesc = document.getElementById("detail-desc");
const detailImage = document.getElementById("detail-image");
const detailTags = document.getElementById("detail-tags");
const detailPoints = document.getElementById("detail-points");
const togglePanelButton = document.getElementById("toggle-panel");
const jumpDetailButton = document.getElementById("jump-detail");
const backOverviewButton = document.getElementById("back-overview");
const prevButton = document.getElementById("prev-project");
const nextButton = document.getElementById("next-project");
const returnOverviewButton = document.getElementById("return-overview");

let activeIndex = 0;

const updatePanelButtonText = () => {
  const isLeft = body.classList.contains("panel-left");
  togglePanelButton.textContent = isLeft ? "发送到右侧" : "发送到左侧";
};

const setActiveProject = (index, options = {}) => {
  const project = projects[index];
  if (!project) return;

  activeIndex = index;
  scrollItems.forEach((item, itemIndex) => {
    const isActive = itemIndex === index;
    item.classList.toggle("active", isActive);
    item.setAttribute("aria-selected", String(isActive));
  });

  previewImage.src = project.image;
  previewImage.alt = `${project.title}预览图`;
  previewTitle.textContent = project.title;
  previewDesc.textContent = project.preview;

  detailTitle.textContent = project.title;
  detailDesc.textContent = project.detail;
  detailImage.src = project.image;
  detailImage.alt = `${project.title}主页图`;

  detailTags.innerHTML = "";
  project.tags.forEach((tag) => {
    const span = document.createElement("span");
    span.textContent = tag;
    detailTags.appendChild(span);
  });

  detailPoints.innerHTML = "";
  project.points.forEach((point) => {
    const li = document.createElement("li");
    li.textContent = point;
    detailPoints.appendChild(li);
  });

  if (options.scrollIntoView) {
    scrollItems[index].scrollIntoView({ block: "center", behavior: "smooth" });
  }
};

const updateActiveFromScroll = () => {
  const containerRect = scrollList.getBoundingClientRect();
  const centerY = containerRect.top + containerRect.height / 2;

  let closestIndex = activeIndex;
  let closestDistance = Number.POSITIVE_INFINITY;

  scrollItems.forEach((item, index) => {
    const rect = item.getBoundingClientRect();
    const itemCenter = rect.top + rect.height / 2;
    const distance = Math.abs(centerY - itemCenter);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  if (closestIndex !== activeIndex) {
    setActiveProject(closestIndex);
  }
};

scrollList.addEventListener("scroll", () => {
  window.requestAnimationFrame(updateActiveFromScroll);
});

scrollItems.forEach((item) => {
  item.addEventListener("click", () => {
    const index = Number(item.dataset.index);
    setActiveProject(index, { scrollIntoView: true });
    document.getElementById("project-detail").scrollIntoView({ behavior: "smooth" });
  });
});

jumpDetailButton.addEventListener("click", () => {
  document.getElementById("project-detail").scrollIntoView({ behavior: "smooth" });
});

backOverviewButton.addEventListener("click", () => {
  document.getElementById("overview").scrollIntoView({ behavior: "smooth" });
});

prevButton.addEventListener("click", () => {
  const nextIndex = (activeIndex - 1 + projects.length) % projects.length;
  setActiveProject(nextIndex, { scrollIntoView: true });
  document.getElementById("project-detail").scrollIntoView({ behavior: "smooth" });
});

nextButton.addEventListener("click", () => {
  const nextIndex = (activeIndex + 1) % projects.length;
  setActiveProject(nextIndex, { scrollIntoView: true });
  document.getElementById("project-detail").scrollIntoView({ behavior: "smooth" });
});

returnOverviewButton.addEventListener("click", () => {
  document.getElementById("overview").scrollIntoView({ behavior: "smooth" });
});

togglePanelButton.addEventListener("click", () => {
  body.classList.toggle("panel-left");
  body.classList.toggle("panel-right");
  updatePanelButtonText();
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.target.id === "overview") {
        backOverviewButton.disabled = entry.isIntersecting;
      }
    });
  },
  { threshold: 0.4 }
);

observer.observe(document.getElementById("overview"));

updatePanelButtonText();
setActiveProject(0);
updateActiveFromScroll();
