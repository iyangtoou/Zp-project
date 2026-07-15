import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  Palette,
  Layers3,
  Crown,
  Users,
  Sparkles,
  FolderKanban,
  Play,
  Pause,
  SlidersHorizontal,
  ChevronDown,
  Volume2,
  VolumeX,
} from "lucide-react";
import LogoLoop from "./LogoLoop";
import TextPressure from "./TextPressure";
import ModelViewer from "./ModelViewer";
import "./model-overrides.css";
import worksManifest from "virtual:works-manifest";
import savedProjectCopy from "./assets/project-copy.json";
import profilePortrait from "./assets/profile-rw.png";
import "./styles.css";
import "./masonry.css";
import "./experience.css";
import "./hero-art.css";
import "./experience-v2.css";
import "./experience-cards.css";
import "./interaction-v2.css";
import "./focus-effects.css";
import "./timeline-lens.css";
import "./cinema-view.css";
import "./vertical-fit.css";
import "./timeline-smooth.css";
import "./capability-loop.css";
import "./profile-motion.css";
import "./pressure-headings.css";
import "./natural-masonry.css";
import "./detail-fit.css";
import "./filmstrip-polish.css";
import "./detail-controls.css";
import "./hero-signature.css";
import "./performance.css";
import "./career-content.css";
import "./copy-contact.css";
import "./nav-active.css";
import "./media-works.css";
import "./editable-project.css";
import "./work-filter.css";
import "./drag-performance.css";
import "./filmstrip-scrub.css";
import "./profile-image.css";

const projects = [
  {
    no: "01",
    title: "东方幻想世界观",
    role: "美术主导 · 风格研发",
    tag: "WORLD BUILDING",
    layout: "wide",
    image:
      "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=2200&q=90",
  },
  {
    no: "02",
    title: "失落文明场景概念",
    role: "场景原画 · 氛围设计",
    tag: "ENVIRONMENT",
    layout: "tall",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=90",
  },
  {
    no: "03",
    title: "次世代叙事空间",
    role: "2D主美 · 团队协作",
    tag: "ART DIRECTION",
    layout: "square",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=90",
  },
  {
    no: "04",
    title: "云海之上的遗迹",
    role: "概念设计 · 光影氛围",
    tag: "CONCEPT",
    layout: "landscape",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=90",
  },
  {
    no: "05",
    title: "异域植被探索",
    role: "场景设计 · 视觉探索",
    tag: "EXPLORATION",
    layout: "portrait",
    image:
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1400&q=90",
  },
  {
    no: "06",
    title: "荒原叙事场景",
    role: "场景原画 · 构图设计",
    tag: "STORYTELLING",
    layout: "wide",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2200&q=90",
  },
  {
    no: "07",
    title: "静谧之境",
    role: "氛围设计 · 色彩脚本",
    tag: "MOOD",
    layout: "square",
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1600&q=90",
  },
  {
    no: "08",
    title: "远古通道",
    role: "空间设计 · 细节深化",
    tag: "ENVIRONMENT",
    layout: "landscape",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=90",
  },
  {
    no: "09",
    title: "雪境边城",
    role: "场景原画 · 建筑设计",
    tag: "LOCATION",
    layout: "tall",
    image:
      "https://images.unsplash.com/photo-1486911278844-a81c5267e227?auto=format&fit=crop&w=1400&q=90",
  },
  {
    no: "10",
    title: "峡谷色彩稿",
    role: "色彩设计 · 氛围探索",
    tag: "COLOR KEY",
    layout: "landscape",
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1800&q=90",
  },
  {
    no: "11",
    title: "迷雾森林",
    role: "视觉研发 · 场景气氛",
    tag: "VISUAL DEV",
    layout: "portrait",
    image:
      "https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?auto=format&fit=crop&w=1400&q=90",
  },
  {
    no: "12",
    title: "海岸远征",
    role: "概念设计 · 叙事构图",
    tag: "KEYFRAME",
    layout: "square",
    image:
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1600&q=90",
  },
];
const uploadedProjects = worksManifest.map((file, i) => ({
  id: file.id,
  no: String(i + 1).padStart(2, "0"),
  title: file.name.replace(/[-_]/g, " "),
  role: file.type === "model" ? "三维模型 · 材质展示" : file.type === "video" ? "动态影像 · 视频作品" : file.type === "gif" ? "动态设计 · GIF 作品" : "个人作品 · 原画设计",
  tag: file.type === "model" ? "3D MODEL" : file.type === "video" ? "MP4 VIDEO" : file.type === "gif" ? "GIF MOTION" : "",
  type: file.type,
  layout: file.type === "model" ? "model" : "natural",
  image: file.image,
  mtime: file.mtime,
}));
const portfolioProjects = [
  ...uploadedProjects,
  ...projects.map((p) => ({ ...p, id: `placeholder-${p.no}`, type: "image" })),
].map((project) => ({ ...project, ...(savedProjectCopy[project.id] || {}) }));
const projectForNo = (no) =>
  portfolioProjects.find((p) => p.no === no) ||
  portfolioProjects[(Number(no) - 1) % portfolioProjects.length];
const modelPreviewCache = new Map();

const strengths = [
  {
    no: "A",
    title: "风格定义",
    en: "ART DIRECTION",
    text: "从竞品拆解、视觉母题到可落地的美术规范，建立项目统一且具有辨识度的视觉语言。",
  },
  {
    no: "B",
    title: "全流程原画",
    en: "FULL PIPELINE",
    text: "覆盖角色、场景、道具与UI设计，熟悉从概念草图到研发交付的完整生产链路。",
  },
  {
    no: "C",
    title: "团队与协作",
    en: "TEAM LEADERSHIP",
    text: "主导30+项目美术资源落地，擅长跨部门沟通、进度把控与新人培养。",
  },
  {
    no: "D",
    title: "AI 视觉探索",
    en: "AI WORKFLOW",
    text: "将 Midjourney、Stable Diffusion 等融入视觉研究，建立可控、统一且符合项目气质的探索方法。",
  },
];

const career = [
  {
    period: "2022.10 — 2025.05",
    company: "成都趣乐多科技",
    role: "游戏主美",
    projectNo: "01",
    detail: "负责项目美术标准、视觉方向、协作机制与团队培养，推动 AI 技术在美术生产中的实际应用。",
    more: [
      "拆解项目研发需求并制定节点计划，建立美术、动作与特效的协同沟通机制，主导 30+ 动效设计，质量达标率 97.5%。",
      "整合 2000+ 存量素材并建立美术资产库，素材复用率提升 65%，产品定向需求调整周期缩短 30%；规范 30+ 外包项目，按周校准进度并及时反馈修改意见。",
      "设计并绘制新功能所需的场景、角色、怪物、道具、技能图标、装备等美术内容；融合 Midjourney 与 Stable Diffusion，团队产能提升 35%，推进 AI 辅助设计标准化流程。",
      "制定角色、场景与交互界面的表现技法规范，完成移动端至 H5 的美术资源适配优化，确保多端视觉一致性达到 95%。",
      "构建初中级美术人才培养体系，开发 3 门核心课程并带教 6 人，其中 2 人在 6 个月内能够独立承接项目。",
      "主导 AI 技术落地，训练 2 套完整的风格化模型，制定 AI 生产流程，辅导 10+ 同事掌握相关工具，草图效率提升 70%。",
    ],
  },
  {
    period: "2022.05 — 2022.09",
    company: "北京贝塔科技",
    role: "场景美术",
    projectNo: "02",
    detail: "依据主策需求完成游戏主场景、外景、宣传图与活动场景，负责交互内容和美术资源迭代。",
    more: [
      "根据主策需求，按时绘制符合质量要求的游戏主场景、外景、宣传图及活动场景。",
      "负责场景交互物件、道具设计及升降级、换装等作品呈现，并有针对性地更新迭代既有美术资源。",
      "统筹协调各组提交的美术资源，使项目中的美术作品在风格、色彩与造型上保持协调统一。",
    ],
  },
  {
    period: "2020.07 — 2022.05",
    company: "成都美有科技有限公司",
    role: "高级场景",
    projectNo: "03",
    detail: "依据客户文案与项目设定完成多风格场景设计，负责测试沟通、任务拆分和外包项目交付。",
    more: [
      "按照甲方客户的文案需求，设计符合设定氛围的场景图，包括但不限于战斗场景、转场 CG、气氛图设定、道具、古风与 Q 版建筑等内容。",
      "负责绘制项目测试作品，参与测试及客户需求沟通，拆分项目元素并协助初级同事完成场景绘制，提升组内实力与市场竞争力。",
      "推进各项外包项目，及时对已通过的项目进行拆分归档；制作时准确把握客户的美术特点并针对性完善，按时、按要求完成工作内容。",
    ],
  },
  {
    period: "2018.03 — 2020.06",
    company: "成都亚然科技",
    role: "原画设计师",
    projectNo: "04",
    detail: "负责公司自研项目的角色、场景地图、过场动画、道具特效及 UI 原画设计。",
    more: [
      "负责公司研发项目《莱玩》的美术设计，包括角色、过场动画、道具及 20 余张场景地图设计。",
      "设定项目风格并探索创新玩法，持续提升项目品质，优化美宣素材，制作激励视频等内容以提升用户日活率。",
      "承担产品启动页、加载页、过场动画、道具特效及 UI 等原画设计，并参与产品交互流程设计。",
    ],
  },
];

const projectTypes = [
  "MMORPG",
  "卡牌养成",
  "二次元",
  "国风武侠",
  "多人竞技",
  "休闲竞技",
  "多端项目",
  "欧美卡通",
  "写实场景",
  "宣传视觉",
];
const selectedGames = [
  { name: "神武", projectNo: "01" },
  { name: "新天龙八部", projectNo: "02" },
  { name: "恋与制作人", projectNo: "03" },
  { name: "决战平安京", projectNo: "04" },
  { name: "王者荣耀", projectNo: "05" },
  { name: "合金弹头：觉醒", projectNo: "06" },
];

function Magnetic({ children, className = "", href = "#contact" }) {
  const ref = useRef(null);
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.14}px, ${(e.clientY - r.top - r.height / 2) * 0.14}px)`;
  };
  return (
    <a
      ref={ref}
      href={href}
      className={`magnetic ${className}`}
      onMouseMove={move}
      onMouseLeave={() => (ref.current.style.transform = "translate(0,0)")}
    >
      {children}
    </a>
  );
}

function PressureHeading({ lines, delay = 0, className = "" }) {
  return (
    <motion.div
      className={`pressure-heading ${className}`}
      initial={{ opacity: 0, y: 42, filter: "blur(7px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {lines.map((line, i) => (
        <TextPressure
          key={line}
          text={line}
          minFontSize={34}
          className={i ? "pressure-heading-secondary" : ""}
        />
      ))}
    </motion.div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false),
    [open, setOpen] = useState(false),
    [activeSection, setActiveSection] = useState("top");
  useEffect(() => {
    let scheduled = false;
    const update = () => {
      scheduled = false;
      setScrolled(scrollY > 80);
      const activationLine = innerHeight * 0.38;
      let currentSection = "top";
      ["top", "work", "about", "experience", "ability"].forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= activationLine) currentSection = id;
      });
      setActiveSection(currentSection);
    };
    const fn = () => { if (!scheduled) { scheduled = true; requestAnimationFrame(update); } };
    update();
    addEventListener("scroll", fn, { passive: true });
    return () => removeEventListener("scroll", fn);
  }, []);
  return (
    <header className={scrolled ? "nav scrolled" : "nav"}>
      <a className="logo" href="#top">
        <span>Y</span>
        <i>ANG</i>
      </a>
      <nav className={open ? "navlinks open" : "navlinks"}>
        <a className={activeSection === "top" ? "active" : ""} href="#top" aria-current={activeSection === "top" ? "page" : undefined} onClick={() => setOpen(false)}>
          首页
        </a>
        <a className={activeSection === "work" ? "active" : ""} href="#work" aria-current={activeSection === "work" ? "page" : undefined} onClick={() => setOpen(false)}>
          项目作品
        </a>
        <a className={activeSection === "about" ? "active" : ""} href="#about" aria-current={activeSection === "about" ? "page" : undefined} onClick={() => setOpen(false)}>
          关于我
        </a>
        <a className={activeSection === "experience" ? "active" : ""} href="#experience" aria-current={activeSection === "experience" ? "page" : undefined} onClick={() => setOpen(false)}>
          工作履历
        </a>
        <a className={activeSection === "ability" ? "active" : ""} href="#ability" aria-current={activeSection === "ability" ? "page" : undefined} onClick={() => setOpen(false)}>
          个人优势
        </a>
      </nav>
      <Magnetic className="nav-contact">
        联系我 <ArrowUpRight size={16} />
      </Magnetic>
      <button className="menu" onClick={() => setOpen(!open)}>
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}

function GenerativeBackdrop() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current,
      ctx = canvas.getContext("2d", { alpha: false });
    let frame = 0,
      w,
      h,
      dpr,
      t = 0,
      active = true,
      lastFrame = 0;
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const particles = Array.from({ length: innerWidth < 800 ? 48 : 72 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.7 + 0.25,
      s: Math.random() * 0.0007 + 0.00015,
      a: Math.random() * 0.45 + 0.08,
      phase: Math.random() * 6.28,
      kind: i % 7 === 0,
    }));
    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, innerWidth < 800 ? 1.15 : 1.4);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const pointer = (e) => {
      mouse.tx = e.clientX / innerWidth;
      mouse.ty = e.clientY / innerHeight;
    };
    const ribbon = (index, color, width, alpha) => {
      const base = h * (0.2 + index * 0.145),
        drift = (mouse.x - 0.5) * 55;
      ctx.beginPath();
      ctx.moveTo(-100, base);
      for (let x = -100; x <= w + 160; x += 90) {
        const wave =
          Math.sin(x * 0.005 + t * (0.32 + index * 0.04) + index * 1.4) * 70 +
          Math.cos(x * 0.011 - t * 0.18) * 28;
        ctx.quadraticCurveTo(
          x + 45,
          base + wave + drift * (index % 2 ? 1 : -1),
          x + 90,
          base + Math.sin((x + 90) * 0.005 + t * 0.32 + index * 1.4) * 70,
        );
      }
      ctx.strokeStyle = color;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = width;
      ctx.lineCap = "round";
      ctx.stroke();
    };
    const draw = (now = 0) => {
      if (!active) return;
      const interval = innerWidth < 800 ? 1000 / 30 : 1000 / 45;
      if (now - lastFrame < interval) { frame = requestAnimationFrame(draw); return; }
      lastFrame = now;
      t += reduced ? 0 : 0.012;
      mouse.x += (mouse.tx - mouse.x) * 0.025;
      mouse.y += (mouse.ty - mouse.y) * 0.025;
      const bg = ctx.createRadialGradient(
        w * (0.25 + mouse.x * 0.15),
        h * (0.25 + mouse.y * 0.08),
        10,
        w * 0.48,
        h * 0.48,
        Math.max(w, h),
      );
      bg.addColorStop(0, "#31332f");
      bg.addColorStop(0.38, "#171918");
      bg.addColorStop(1, "#070807");
      ctx.globalAlpha = 1;
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ribbon(0, "#9e784c", 34, 0.055);
      ribbon(1, "#bdc1b5", 8, 0.085);
      ribbon(2, "#6e837d", 58, 0.045);
      ribbon(3, "#b48a5a", 3, 0.2);
      ribbon(4, "#8c958d", 20, 0.045);
      ctx.restore();
      ctx.save();
      ctx.translate((mouse.x - 0.5) * 22, (mouse.y - 0.5) * 15);
      particles.forEach((p, i) => {
        p.y -= p.s;
        if (p.y < -0.03) {
          p.y = 1.03;
          p.x = Math.random();
        }
        const x = p.x * w + Math.sin(t * 0.8 + p.phase) * 18,
          y = p.y * h;
        ctx.globalAlpha = p.a * (0.65 + 0.35 * Math.sin(t * 1.4 + p.phase));
        ctx.fillStyle = p.kind ? "#b7905f" : "#d7d1c3";
        if (p.kind) {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(t * 0.2 + p.phase);
          ctx.fillRect(-p.r * 3, -p.r * 0.5, p.r * 6, p.r);
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(x, y, p.r, 0, 6.28);
          ctx.fill();
        }
      });
      ctx.restore();
      ctx.save();
      ctx.globalAlpha = 0.08;
      ctx.strokeStyle = "#d8d3c7";
      ctx.lineWidth = 1;
      for (let i = 0; i < 7; i++) {
        const x = w * (0.12 + i * 0.145) + (mouse.x - 0.5) * 12;
        ctx.beginPath();
        ctx.moveTo(x, h * 0.12);
        ctx.lineTo(x + Math.sin(t + i) * 28, h * 0.88);
        ctx.stroke();
      }
      ctx.restore();
      const vignette = ctx.createRadialGradient(
        w / 2,
        h / 2,
        h * 0.15,
        w / 2,
        h / 2,
        w * 0.68,
      );
      vignette.addColorStop(0.45, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,.68)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);
      frame = requestAnimationFrame(draw);
    };
    const setActive = (next) => {
      active = next && !document.hidden;
      if (active && !frame) frame = requestAnimationFrame(draw);
      if (!active && frame) { cancelAnimationFrame(frame); frame = 0; }
    };
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { rootMargin: "100px" });
    const visibility = () => setActive(!document.hidden && canvas.getBoundingClientRect().bottom > -100);
    resize();
    observer.observe(canvas);
    addEventListener("resize", resize, { passive: true });
    canvas.addEventListener("pointermove", pointer, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", pointer);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  return (
    <>
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="hero-artifacts">
        <i />
        <i />
        <i />
        <span>RAW / IDEA / FORM</span>
      </div>
    </>
  );
}

function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.25], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  return (
    <section className="hero" id="top">
      <GenerativeBackdrop />
      <div className="hero-shade" />
      <motion.div className="hero-content" style={{ y, opacity }}>
        <div className="eyebrow">
          <span>GAME ART · PORTFOLIO</span>
          <span>2018 — 2026</span>
        </div>
        <h1>
          <span>塑造世界</span>
          <em>定义视觉</em>
        </h1>
        <div className="hero-bottom">
          <motion.div
            className="hero-signature"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.55,
                  duration: 0.85,
                  ease: [0.22, 1, 0.36, 1],
                  staggerChildren: 0.12,
                },
              },
            }}
          >
            <motion.div
              className="signature-name"
              variants={{
                hidden: { opacity: 0, x: -18 },
                show: { opacity: 1, x: 0 },
              }}
            >
              <b>杨杨</b>
              <span>
                YANG
                <br />
                YANG
              </span>
            </motion.div>
            <motion.div
              className="signature-roles"
              variants={{
                hidden: { opacity: 0, x: 18 },
                show: { opacity: 1, x: 0 },
              }}
            >
              <i>01</i>
              <strong>游戏原画设计师</strong>
              <small>GAME CONCEPT ARTIST</small>
              <i>02</i>
              <strong>游戏 2D 主美</strong>
              <small>2D ART DIRECTOR</small>
            </motion.div>
          </motion.div>
          <Magnetic className="round-link" href="#work">
            <ArrowDownRight />
          </Magnetic>
        </div>
      </motion.div>
      <div className="hero-index">YY / 001</div>
    </section>
  );
}

function ProfilePortrait() {
  const card = useRef(null),
    art = useRef(null);
  const move = (e) => {
    const r = card.current.getBoundingClientRect(),
      x = (e.clientX - r.left - r.width / 2) / r.width,
      y = (e.clientY - r.top - r.height / 2) / r.height;
    card.current.style.transform = `perspective(900px) translate3d(${x * 16}px,${y * 16}px,18px) rotateY(${x * 3}deg) rotateX(${-y * 3}deg)`;
    art.current.style.transform = `scale(1.035) translate3d(${-x * 10}px,${-y * 10}px,0)`;
  };
  const reset = () => {
    card.current.style.transform =
      "perspective(900px) translate3d(0,0,0) rotateY(0) rotateX(0)";
    art.current.style.transform = "scale(1) translate3d(0,0,0)";
  };
  return (
    <motion.div
      className="portrait-reveal"
      initial={{ x: -45, scale: 0.97 }}
      whileInView={{ x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        ref={card}
        className="portrait"
        onMouseMove={move}
        onMouseLeave={reset}
      >
        <div ref={art} className="portrait-art portrait-art-image">
          <img
            className="portrait-image portrait-image-base"
            src={profilePortrait}
            alt="杨杨 游戏原画设计师与游戏 2D 主美"
          />
          <img
            className="portrait-image portrait-image-ghost"
            src={profilePortrait}
            alt=""
            aria-hidden="true"
          />
          <i className="portrait-atmosphere" aria-hidden="true" />
        </div>
        <small>BASED IN CHENGDU · CN</small>
      </div>
    </motion.div>
  );
}

function CopyContact({ value, children, variants }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const input = document.createElement("textarea");
      input.value = value;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    clearTimeout(timer.current);
    setCopied(true);
    timer.current = setTimeout(() => setCopied(false), 1200);
  };
  useEffect(() => () => clearTimeout(timer.current), []);
  return (
    <motion.button
      type="button"
      className={`copy-contact ${copied ? "is-copied" : ""}`}
      variants={variants}
      onClick={copy}
      animate={copied ? { scale: [1, 1.12, 0.98, 1] } : { scale: 1 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      aria-label={`复制 ${value}`}
    >
      {children}
      <AnimatePresence>
        {copied && (
          <motion.span
            className="copy-toast"
            role="status"
            initial={{ opacity: 0, y: 7, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -7, scale: 0.94 }}
          >
            已复制
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function About() {
  const rise = {
    hidden: { opacity: 0, y: 34, filter: "blur(5px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" },
  };
  return (
    <section className="section about" id="about">
      <div className="section-head">
        <span>02 / PROFILE</span>
        <p>关于我</p>
      </div>
      <div className="about-grid">
        <ProfilePortrait />
        <div className="about-copy">
          <PressureHeading
            className="about-pressure"
            lines={["能完成设计", "也能建立标准"]}
          />
          <div className="about-summary">
            <motion.p
              variants={rise}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.26 }}
            >
              拥有 8 年游戏美术核心岗位经验，具备从场景、角色到 UI/UX
              的完整原画设计能力，以及 2D
              主美与团队管理经验。熟悉多平台、多品类和多种美术风格，能够完成概念设计、视觉规范搭建与最终品质落地。
            </motion.p>
            <motion.p
              variants={rise}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              擅长协调策划、技术及下游美术，建立审核标准并把控全流程质量；对原画概念、UI、U3D
              与动效产出具备成熟的判断能力，确保团队目标一致、标准明确、交付稳定。
            </motion.p>
            <motion.p
              className="project-history"
              variants={rise}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.56 }}
            >
              曾参与《神武》《新天龙八部》《恋与制作人》《决战平安京》《王者荣耀》《合金弹头：觉醒》等项目。
            </motion.p>
          </div>
          <motion.div
            className="contacts"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.11, delayChildren: 0.38 },
              },
            }}
          >
            <CopyContact variants={rise} value="iq.yang@aliyun.com">
              <Mail />
              iq.yang@aliyun.com
            </CopyContact>
            <CopyContact variants={rise} value="13330982143">
              <Phone />
              133 3098 2143
            </CopyContact>
            <CopyContact variants={rise} value="成都，中国">
              <MapPin />
              成都，中国
            </CopyContact>
          </motion.div>
        </div>
      </div>
      <CapabilityLoop />
    </section>
  );
}

function CapabilityLoop() {
  const items = [
    {
      icon: <Palette />,
      eyebrow: "08 YEARS",
      title: "综合原画能力",
      text: "场景、角色、道具与界面视觉",
    },
    {
      icon: <Layers3 />,
      eyebrow: "FULL PIPELINE",
      title: "全流程视觉把控",
      text: "从概念设定到研发交付",
    },
    {
      icon: <Crown />,
      eyebrow: "ART DIRECTION",
      title: "主美与艺术指导",
      text: "风格定义、标准搭建与品质判断",
    },
    {
      icon: <Users />,
      eyebrow: "TEAM LEADERSHIP",
      title: "团队协作管理",
      text: "跨部门沟通与美术团队培养",
    },
    {
      icon: <Sparkles />,
      eyebrow: "MULTI-STYLE",
      title: "多风格适配",
      text: "国风、二次元、欧美卡通与写实",
    },
    {
      icon: <FolderKanban />,
      eyebrow: "30+ PROJECTS",
      title: "项目实战沉淀",
      text: "多端、多品类游戏研发经验",
    },
  ];
  return (
    <div className="capability-loop-wrap">
      <div className="number-field" aria-hidden="true">
        {["08", "30+", "10+", "2018", "2025", "2D", "03", "06", "12", "01"].map(
          (n, i) => (
            <i
              key={`${n}-${i}`}
              style={{
                "--x": `${6 + ((i * 19) % 91)}%`,
                "--y": `${8 + ((i * 27) % 84)}%`,
                "--d": `${-i * 0.7}s`,
              }}
            >
              {n}
            </i>
          ),
        )}
      </div>
      <LogoLoop
        logos={items.map((item) => ({
          node: (
            <div className="cap-loop-card">
              <span>{item.icon}</span>
              <div>
                <small>{item.eyebrow}</small>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </div>
            </div>
          ),
        }))}
        speed={58}
        hoverSpeed={10}
        logoHeight={58}
        gap={16}
        fadeOut
        fadeOutColor="#090908"
        scaleOnHover
        ariaLabel="杨杨的个人能力"
      />
    </div>
  );
}

const formatMediaTime = (seconds) => {
  if (!Number.isFinite(seconds)) return "00:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
};

function GifPreview({ src, alt, interactive = true, active, className = "" }) {
  const canvasRef = useRef(null);
  const [localPlaying, setLocalPlaying] = useState(false);
  const [ratio, setRatio] = useState(null);
  const playing = active ?? localPlaying;
  const capturePoster = (event) => {
    const img = event.currentTarget;
    const scale = Math.min(1, 720 / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
    canvas.getContext("2d")?.drawImage(img, 0, 0, canvas.width, canvas.height);
    setRatio(img.naturalWidth / img.naturalHeight);
  };
  return (
    <div
      className={`gif-preview ${playing ? "is-playing" : ""} ${className}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
      onMouseEnter={interactive && active === undefined ? () => setLocalPlaying(true) : undefined}
      onMouseLeave={interactive && active === undefined ? () => setLocalPlaying(false) : undefined}
    >
      <canvas ref={canvasRef} aria-hidden="true" />
      <img
        key={playing ? "playing" : "poster-loader"}
        className={playing ? "gif-live" : "gif-loader"}
        src={src}
        alt={playing ? alt : ""}
        onLoad={capturePoster}
        draggable="false"
      />
      <span className="media-kind">GIF</span>
    </div>
  );
}

function VideoDetail({ project }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [rateOpen, setRateOpen] = useState(false);
  const rates = [2.5, 1.5, 1.25, 1, 0.75];
  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };
  useEffect(() => () => videoRef.current?.pause(), []);
  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    if (videoRef.current) videoRef.current.muted = next;
  };
  const selectRate = (next) => {
    setPlaybackRate(next);
    if (videoRef.current) videoRef.current.playbackRate = next;
    setRateOpen(false);
  };
  return (
    <div className="video-detail-player">
      <video
        ref={videoRef}
        src={project.image}
        preload="metadata"
        playsInline
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onClick={toggle}
      />
      {!playing && (
        <button className="video-center-play" onClick={toggle} aria-label="播放视频">
          <Play fill="currentColor" />
        </button>
      )}
      <div className="video-controls" onClick={(e) => e.stopPropagation()}>
        <button onClick={toggle} aria-label={playing ? "暂停" : "播放"}>
          {playing ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}
        </button>
        <span>{formatMediaTime(currentTime)}</span>
        <input
          className="video-progress"
          aria-label="视频进度"
          type="range"
          min="0"
          max={duration || 0}
          step="0.01"
          value={Math.min(currentTime, duration || 0)}
          style={{ "--media-progress": `${duration ? (currentTime / duration) * 100 : 0}%` }}
          onChange={(e) => {
            const next = Number(e.target.value);
            if (videoRef.current) videoRef.current.currentTime = next;
            setCurrentTime(next);
          }}
        />
        <span>{formatMediaTime(duration)}</span>
        <div className="video-volume">
          <button onClick={toggleMute} aria-label={muted || volume === 0 ? "恢复声音" : "静音"}>
            {muted || volume === 0 ? <VolumeX /> : <Volume2 />}
          </button>
          <div className="video-volume-popover">
            <input
              aria-label="音量"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={muted ? 0 : volume}
              style={{ "--volume-level": `${(muted ? 0 : volume) * 100}%` }}
              onChange={(event) => {
                const next = Number(event.target.value);
                setVolume(next);
                setMuted(next === 0);
                if (videoRef.current) {
                  videoRef.current.volume = next;
                  videoRef.current.muted = next === 0;
                }
              }}
            />
          </div>
        </div>
        <div
          className={`video-rate-wrap ${rateOpen ? "is-open" : ""}`}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setRateOpen(false);
          }}
        >
          <button className="video-rate" onClick={() => setRateOpen((value) => !value)} aria-expanded={rateOpen} aria-haspopup="menu" aria-label={`当前 ${playbackRate} 倍速　点击选择`}>
            {playbackRate}×
          </button>
          <AnimatePresence>
            {rateOpen && (
              <motion.div className="video-rate-menu" role="menu" initial={{ opacity: 0, x: "-50%", y: 8, scaleY: 0.75 }} animate={{ opacity: 1, x: "-50%", y: 0, scaleY: 1 }} exit={{ opacity: 0, x: "-50%", y: 6, scaleY: 0.8 }} transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}>
                {rates.map((rate) => (
                  <button key={rate} role="menuitem" className={rate === playbackRate ? "active" : ""} onClick={() => selectRate(rate)}>{rate}×</button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

const IS_LOCAL_EDITOR = ["localhost", "127.0.0.1"].includes(window.location.hostname);

function EditableText({ as: Tag = "div", value, onCommit, multiline = false, className = "" }) {
  if (!IS_LOCAL_EDITOR) return <Tag className={className}>{value}</Tag>;
  const finish = (event) => {
    const next = event.currentTarget.innerText.replace(/\u00a0/g, " ").trim();
    if (next && next !== value) onCommit(next);
    else if (!next) event.currentTarget.innerText = value;
  };
  return (
    <Tag
      className={`project-editable ${className}`}
      contentEditable
      suppressContentEditableWarning
      role="textbox"
      aria-multiline={multiline}
      spellCheck="false"
      title="点击编辑　失焦自动保存"
      onBlur={finish}
      onKeyDown={(event) => {
        if (!multiline && event.key === "Enter") {
          event.preventDefault();
          event.currentTarget.blur();
        }
        if (event.key === "Escape") {
          event.currentTarget.innerText = value;
          event.currentTarget.blur();
        }
      }}
    >
      {value}
    </Tag>
  );
}

function Lightbox({ project, onClose, onSelect }) {
  const [view, setView] = useState({ scale: 1, x: 0, y: 0 });
  const [modelInfo, setModelInfo] = useState(null);
  const [modelSnapshots, setModelSnapshots] = useState(() => Object.fromEntries(modelPreviewCache));
  const [projectCopy, setProjectCopy] = useState({});
  const [scrubIndex, setScrubIndex] = useState(null);
  const [scrubbing, setScrubbing] = useState(false);
  const isModel = project.type === "model";
  const isVideo = project.type === "video";
  const isGif = project.type === "gif";
  const drag = useRef(null),
    filmRef = useRef(null),
    filmScrub = useRef(null),
    blockFilmClick = useRef(false),
    stageRef = useRef(null),
    viewerRef = useRef(null);
  const currentIndex = portfolioProjects.findIndex(
      (p) => p.id === project.id || p.image === project.image,
    ),
    previousIndex = useRef(currentIndex);
  const copyDefaults = {
    tag: project.tag || "PERSONAL WORK",
    title: project.title,
    role: project.role,
    description: project.description || (project.type === "video" ? "以动态镜头呈现完整的视觉节奏与画面设计　可通过底部控制条查看任意时间节点" : project.type === "model" ? "模型支持全方位旋转与缩放查看　右侧数据由模型文件自动读取" : "围绕项目世界观与核心体验展开视觉探索　从前期参考研究　构图与色彩方案　到场景细化和最终研发落地　持续平衡叙事氛围　画面表现与生产可行性"),
    duty: "概念设计 · 风格研发 · 品质把控",
    process: project.type === "video" ? "播放 / 暂停 / 拖动进度" : "研究 / 草图 / 色彩 / 细化 / 交付",
  };
  const projectCopyKey = project.id || project.image;
  const copy = { ...copyDefaults, ...(savedProjectCopy[projectCopyKey] || {}), ...projectCopy };
  const commitCopy = (field, value) => {
    const next = { ...copy, [field]: value };
    setProjectCopy(next);
    localStorage.setItem(`yang-project-copy:${projectCopyKey}`, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent("project-copy-updated", {
      detail: { key: projectCopyKey, value: next },
    }));
    if (IS_LOCAL_EDITOR) {
      fetch('/__project-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: projectCopyKey, value: next }),
      }).catch(() => {});
    }
  };
  const slideDirection = currentIndex >= previousIndex.current ? 1 : -1;
  const reset = () => isModel ? viewerRef.current?.reset() : setView({ scale: 1, x: 0, y: 0 });
  const zoomAt = (amount, clientX, clientY) =>
    setView((v) => {
      const nextScale = Math.min(5, Math.max(1, v.scale + amount));
      if (nextScale === 1) return { scale: 1, x: 0, y: 0 };
      const rect = stageRef.current?.getBoundingClientRect();
      if (!rect || clientX == null || clientY == null)
        return { ...v, scale: nextScale };
      const anchorX = clientX - (rect.left + rect.width / 2),
        anchorY = clientY - (rect.top + rect.height / 2);
      const ratio = nextScale / v.scale;
      return {
        scale: nextScale,
        x: anchorX - (anchorX - v.x) * ratio,
        y: anchorY - (anchorY - v.y) * ratio,
      };
    });
  const zoom = (amount) => {
    if (isModel) { viewerRef.current?.zoom(amount); return; }
    const r = stageRef.current?.getBoundingClientRect();
    zoomAt(
      amount,
      r ? r.left + r.width / 2 : null,
      r ? r.top + r.height / 2 : null,
    );
  };
  useEffect(() => {
    setModelInfo(null);
    reset();
    try {
      setProjectCopy(JSON.parse(localStorage.getItem(`yang-project-copy:${projectCopyKey}`) || "{}"));
    } catch {
      setProjectCopy({});
    }
  }, [project.id, project.image]);
  useEffect(() => {
    previousIndex.current = currentIndex;
    requestAnimationFrame(() =>
      filmRef.current
        ?.querySelector(".active")
        ?.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        }),
    );
  }, [currentIndex]);
  useEffect(() => {
    const key = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = "";
      removeEventListener("keydown", key);
    };
  }, [onClose]);
  const pointerDown = (e) => {
    drag.current = { x: e.clientX, y: e.clientY, ox: view.x, oy: view.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const pointerMove = (e) => {
    const origin = drag.current;
    if (!origin || view.scale === 1) return;
    setView((v) => ({
      ...v,
      x: origin.ox + e.clientX - origin.x,
      y: origin.oy + e.clientY - origin.y,
    }));
  };
  const beginFilmScrub = (event) => {
    if (event.button !== 0) return;
    const container = filmRef.current;
    const startButton = event.target.closest("button[data-film-index]");
    if (!container || !startButton) return;
    const session = { pointerId: event.pointerId, startX: event.clientX, startScroll: container.scrollLeft, active: false, targetIndex: Number(startButton.dataset.filmIndex), timer: 0 };
    session.timer = window.setTimeout(() => {
      session.active = true;
      setScrubbing(true);
      setScrubIndex(session.targetIndex);
      container.setPointerCapture?.(session.pointerId);
    }, 260);
    filmScrub.current = session;
  };
  const moveFilmScrub = (event) => {
    const session = filmScrub.current;
    if (!session) return;
    const distance = event.clientX - session.startX;
    if (!session.active) {
      if (Math.abs(distance) > 7) { clearTimeout(session.timer); filmScrub.current = null; }
      return;
    }
    event.preventDefault();
    const container = filmRef.current;
    container.scrollLeft = session.startScroll - distance * 1.9;
    const center = container.getBoundingClientRect().left + container.clientWidth / 2;
    let nearestIndex = session.targetIndex, nearestDistance = Infinity;
    container.querySelectorAll("button[data-film-index]").forEach((button) => {
      const rect = button.getBoundingClientRect();
      const delta = Math.abs(rect.left + rect.width / 2 - center);
      if (delta < nearestDistance) { nearestDistance = delta; nearestIndex = Number(button.dataset.filmIndex); }
    });
    if (nearestIndex !== session.targetIndex) { session.targetIndex = nearestIndex; setScrubIndex(nearestIndex); }
  };
  const finishFilmScrub = () => {
    const session = filmScrub.current;
    if (!session) return;
    clearTimeout(session.timer);
    if (session.active) {
      blockFilmClick.current = true;
      const nextProject = portfolioProjects[session.targetIndex];
      if (nextProject) onSelect(nextProject);
      setTimeout(() => { blockFilmClick.current = false; }, 120);
    }
    setScrubbing(false);
    setScrubIndex(null);
    filmScrub.current = null;
  };
  return (
    <motion.div
      className="lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="lightbox-bar" onClick={(e) => e.stopPropagation()}>
        <div>
          <span>
            {project.no} / {String(portfolioProjects.length).padStart(2, "0")}
          </span>
          <strong>{copy.title}</strong>
        </div>
        <div className="lightbox-tools">
          {!isVideo && <><button
            onClick={(e) => {
              e.stopPropagation();
              zoom(-0.35);
            }}
            aria-label="缩小"
          >
            <ZoomOut />
          </button>
          <span>{isModel ? "3D" : `${Math.round(view.scale * 100)}%`}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              zoom(0.35);
            }}
            aria-label="放大"
          >
            <ZoomIn />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              reset();
            }}
            aria-label="复位"
          >
            <RotateCcw />
          </button></>}
          <button
            className="lightbox-close"
            onClick={onClose}
            aria-label="关闭"
          >
            <X />
          </button>
        </div>
      </div>
      <div className="project-detail-layout">
        <div
          ref={stageRef}
          className={
            view.scale > 1 ? "lightbox-stage zoomed" : "lightbox-stage"
          }
          onClick={(e) => e.stopPropagation()}
          onWheel={(e) => {
            if (!isModel && !isVideo) {
              e.preventDefault();
              zoomAt(e.deltaY < 0 ? 0.25 : -0.25, e.clientX, e.clientY);
            }
          }}
          onDoubleClick={reset}
          onPointerDown={isModel || isVideo ? undefined : pointerDown}
          onPointerMove={isModel || isVideo ? undefined : pointerMove}
          onPointerUp={() => (drag.current = null)}
          onPointerCancel={() => (drag.current = null)}
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={project.id || project.image}
              className={`lightbox-image-frame ${isModel ? "model-frame" : ""} ${isVideo ? "video-frame" : ""}`}
              initial={{
                opacity: 0,
                x: slideDirection * 150,
                scale: 0.82,
                filter: "blur(6px)",
              }}
              animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
              exit={{
                opacity: 0,
                x: slideDirection * -110,
                scale: 0.9,
                filter: "blur(4px)",
              }}
              transition={{
                type: "spring",
                stiffness: 145,
                damping: 23,
                mass: 0.82,
              }}
            >
              {isModel ? (
                <ModelViewer ref={viewerRef} src={project.image} format={project.id?.split(".").pop()} onInfo={setModelInfo} onSnapshot={(image) => { modelPreviewCache.set(project.id, image); setModelSnapshots((current) => ({ ...current, [project.id]: image })); }} />
              ) : isVideo ? (
                <VideoDetail project={project} />
              ) : (
                <motion.img
                  src={project.image}
                  alt={project.title}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  animate={view}
                  transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.65 }}
                  draggable="false"
                />
              )}
            </motion.div>
          </AnimatePresence>
          {!isVideo && <div className="lightbox-hint">
            {isModel ? "拖动旋转 · 滚轮缩放 · 双击复位 · ESC 关闭" : isGif ? "GIF 自动播放 · 滚轮缩放 · 拖动平移 · ESC 关闭" : "滚轮缩放 · 拖动平移 · 双击复位 · ESC 关闭"}
          </div>}
        </div>
        <aside
          key={project.id || project.image}
          className="project-detail"
          onClick={(e) => e.stopPropagation()}
        >
          <EditableText as="span" value={copy.tag} onCommit={(value) => commitCopy("tag", value)} className="project-editable-tag" />
          <EditableText as="h2" value={copy.title} onCommit={(value) => commitCopy("title", value)} className="project-editable-title" />
          <EditableText as="strong" value={copy.role} onCommit={(value) => commitCopy("role", value)} className="project-editable-role" />
          {isModel ? <>
            <EditableText as="p" value={copy.description} onCommit={(value) => commitCopy("description", value)} multiline className="project-editable-description" />
            <div className="model-info-grid"><i>模型</i><b>{modelInfo ? `${modelInfo.vertices.toLocaleString()} 顶点　${modelInfo.triangles.toLocaleString()} 三角面` : "正在读取"}</b></div>
            <div className="model-info-grid"><i>UV</i><b>{modelInfo ? `${modelInfo.uvChannels} 个 UV 通道` : "正在读取"}</b></div>
            <div className="model-material-list"><i>材质</i><ul>{modelInfo?.materials.map((m,i)=><li key={`${m.name}-${i}`}>{m.name}　{m.type}{m.roughness!=null?`　粗糙度 ${m.roughness.toFixed(2)}`:""}{m.metalness!=null?`　金属度 ${m.metalness.toFixed(2)}`:""}</li>)}</ul></div>
            <div className="model-material-list"><i>贴图</i><ul>{modelInfo?.textures.length ? modelInfo.textures.map((t,i)=><li key={`${t.uuid}-${i}`}>{t.type}　{t.name}{t.width?`　${t.width} × ${t.height}`:""}</li>) : <li>未检测到外部贴图</li>}</ul></div>
          </> : isVideo ? <>
            <EditableText as="p" value={copy.description} onCommit={(value) => commitCopy("description", value)} multiline className="project-editable-description" />
            <div><i>格式</i><b>MP4 动态影像</b></div>
            <div><i>操作</i><EditableText as="b" value={copy.process} onCommit={(value) => commitCopy("process", value)} className="project-editable-meta" /></div>
          </> : <>
            <EditableText as="p" value={copy.description} onCommit={(value) => commitCopy("description", value)} multiline className="project-editable-description" />
            <div><i>职责</i><EditableText as="b" value={copy.duty} onCommit={(value) => commitCopy("duty", value)} className="project-editable-meta" /></div>
            <div><i>流程</i><EditableText as="b" value={copy.process} onCommit={(value) => commitCopy("process", value)} className="project-editable-meta" /></div>
          </>}
        </aside>
      </div>
      <motion.div
        ref={filmRef}
        className={`filmstrip ${scrubbing ? "is-scrubbing" : ""}`}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={beginFilmScrub}
        onPointerMove={moveFilmScrub}
        onPointerUp={finishFilmScrub}
        onPointerCancel={finishFilmScrub}
        initial="hidden"
        animate="show"
      >
        {portfolioProjects.map((p, i) => (
          <motion.button
            key={p.id || p.no}
            data-film-index={i}
            className={
              `${p.id === project.id || p.image === project.image ? "active" : ""} ${scrubIndex === i ? "scrub-target" : ""}`
            }
            variants={{
              hidden: { opacity: 0, y: 65, scale: 0.7 },
              show: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{
              delay: i * 0.025,
              type: "spring",
              stiffness: 190,
              damping: 20,
            }}
            onClick={(event) => {
              if (blockFilmClick.current) { event.preventDefault(); return; }
              onSelect(p);
            }}
          >
            {p.type === "model" ? (modelSnapshots[p.id] ? <img className="model-static-thumb" src={modelSnapshots[p.id]} alt={`${p.title} 静态预览`} /> : <span className="model-thumb">3D</span>) : p.type === "video" ? <video src={p.image} muted playsInline preload="metadata" aria-label={`${p.title} 视频缩略图`} /> : p.type === "gif" ? <GifPreview src={p.image} alt={p.title} interactive={false} className="film-gif" /> : <img src={p.image} alt={p.title} loading="lazy" decoding="async" />}
            <span>{String(i + 1).padStart(2, "0")}</span>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}

function ProjectTile({
  project,
  index,
  onOpen,
  dragging,
  onPointerDragStart,
  dropIntent,
}) {
  const [mediaHovered, setMediaHovered] = useState(false);
  const tile = useRef(null),
    image = useRef(null),
    video = useRef(null),
    moveFrame = useRef(0),
    pendingPoint = useRef(null);
  const move = (e) => {
    if (dragging) return;
    pendingPoint.current = { x: e.clientX, y: e.clientY };
    if (moveFrame.current) return;
    moveFrame.current = requestAnimationFrame(() => {
      moveFrame.current = 0;
      if (!tile.current || !pendingPoint.current) return;
      const r = tile.current.getBoundingClientRect(),
        x = (pendingPoint.current.x - r.left - r.width / 2) / r.width,
        y = (pendingPoint.current.y - r.top - r.height / 2) / r.height;
      tile.current.style.transform = `translate3d(${x * 14}px,${y * 14}px,0) scale(1.012)`;
      if (image.current) image.current.style.transform = `scale(1.045) translate3d(${-x * 8}px,${-y * 8}px,0)`;
    });
  };
  const resetTile = () => {
    if (moveFrame.current) cancelAnimationFrame(moveFrame.current);
    moveFrame.current = 0;
    pendingPoint.current = null;
    setMediaHovered(false);
    tile.current.style.transform = "translate3d(0,0,0) scale(1)";
    if (image.current) image.current.style.transform = "scale(1.03) translate3d(0,0,0)";
    if (video.current) {
      video.current.pause();
      video.current.currentTime = 0;
    }
  };
  return (
    <motion.div
      className={`project-tile-shell ${project.layout} ${dragging ? "is-dragging" : ""} ${dropIntent ? `drop-${dropIntent}` : ""}`}
      style={{ viewTransitionName: `work-item-${portfolioProjects.findIndex((item) => item.id === project.id)}` }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0, scale: 0.86, filter: "blur(5px)" }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        opacity: { duration: 0.7, delay: (index % 3) * 0.08 },
      }}
    >
      {dropIntent && (
        <div className={`drop-slot drop-slot-${dropIntent}`} aria-hidden="true">
          <span>{dropIntent === "before" ? "↑" : "↓"}</span>
          <b>插入此处</b>
          <i />
        </div>
      )}
      <article
        ref={tile}
        className="project-tile"
        draggable="false"
        data-project-id={project.id}
        onPointerDown={(e) => {
          if (e.button !== 0) return;
          resetTile();
          onPointerDragStart(e, project.id, project.title);
        }}
        onMouseMove={move}
        onMouseEnter={() => {
          setMediaHovered(true);
          if (video.current) video.current.play().catch(() => {});
        }}
        onMouseLeave={resetTile}
        onClick={() => {
          if (!dragging) onOpen(project);
        }}
        tabIndex="0"
        onKeyDown={(e) => {
          if (e.key === "Enter") onOpen(project);
        }}
      >
        {project.type === "model" ? <ModelViewer src={project.image} format={project.id?.split(".").pop()} preview /> : project.type === "video" ? <div ref={image} className="tile-media-transform"><video ref={video} src={project.image} muted playsInline loop preload="metadata" aria-label={`${project.title} 视频预览`} /><span className="media-kind">MP4</span></div> : project.type === "gif" ? <div ref={image} className="tile-media-transform"><GifPreview src={project.image} alt={project.title} active={mediaHovered} /></div> : <img ref={image} src={project.image} alt={project.title} loading="lazy" decoding="async" draggable="false" />}
        <div className="project-overlay" />
        <div className="project-tile-top">
          <span>{project.no}</span>
          {project.tag && <span>{project.tag}</span>}
        </div>
        <div className="project-tile-copy">
          <h3>{project.title}</h3>
          <p>{project.role}</p>
        </div>
        <span className="tile-open">
          <ArrowUpRight />
        </span>
      </article>
    </motion.div>
  );
}

function Work({ onOpen }) {
  const dragId = useRef(null),
    filterRef = useRef(null),
    refreshDropTarget = useRef(null),
    [dragging, setDragging] = useState(null);
  const [dropIntent, setDropIntent] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [copyOverrides, setCopyOverrides] = useState({});
  const [ordered, setOrdered] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("yang-work-order") || "[]"),
        map = new Map(portfolioProjects.map((p) => [p.id, p])),
        known = saved.map((id) => map.get(id)).filter(Boolean),
        fresh = portfolioProjects.filter((p) => !saved.includes(p.id)),
        freshWorks = fresh.filter((p) => !p.id.startsWith("placeholder-")),
        freshPlaceholders = fresh.filter((p) => p.id.startsWith("placeholder-"));
      return [...freshWorks, ...known, ...freshPlaceholders];
    } catch {
      return portfolioProjects;
    }
  });
  useEffect(() => {
    localStorage.setItem(
      "yang-work-order",
      JSON.stringify(ordered.map((p) => p.id)),
    );
  }, [ordered]);
  useEffect(() => {
    const close = (event) => {
      if (!filterRef.current?.contains(event.target)) setFilterOpen(false);
    };
    const key = (event) => {
      if (event.key === "Escape") setFilterOpen(false);
    };
    addEventListener("pointerdown", close);
    addEventListener("keydown", key);
    return () => {
      removeEventListener("pointerdown", close);
      removeEventListener("keydown", key);
    };
  }, []);
  useEffect(() => {
    const syncProjectCopy = (event) => {
      const { key, value } = event.detail || {};
      if (key && value) setCopyOverrides((current) => ({ ...current, [key]: value }));
    };
    window.addEventListener("project-copy-updated", syncProjectCopy);
    return () => window.removeEventListener("project-copy-updated", syncProjectCopy);
  }, []);
  useEffect(() => {
    if (!dragging) return;
    let wheelFrame = 0;
    let pendingDelta = 0;
    const wheelWhileDragging = (event) => {
      event.preventDefault();
      pendingDelta += event.deltaY;
      if (wheelFrame) return;
      wheelFrame = requestAnimationFrame(() => {
        const distance = Math.max(-420, Math.min(420, pendingDelta));
        pendingDelta = 0;
        wheelFrame = 0;
        window.scrollBy({ top: distance, left: 0, behavior: "auto" });
        requestAnimationFrame(() => refreshDropTarget.current?.());
      });
    };
    window.addEventListener("wheel", wheelWhileDragging, { passive: false, capture: true });
    return () => {
      window.removeEventListener("wheel", wheelWhileDragging, true);
      if (wheelFrame) cancelAnimationFrame(wheelFrame);
    };
  }, [dragging]);
  const filters = [
    { id: "image", label: "原画", index: "01" },
    { id: "gif", label: "动效", index: "02" },
    { id: "video", label: "视频", index: "03" },
  ];
  const displayOrdered = ordered.map((project) => ({
    ...project,
    ...(savedProjectCopy[project.id] || {}),
    ...(copyOverrides[project.id] || {}),
  }));
  const visibleProjects = activeFilter ? displayOrdered.filter((project) => project.type === activeFilter) : displayOrdered;
  const commitDrop = (movingId, target, side) => {
    if (!movingId || !target || movingId === target) return;
    const updateOrder = () => flushSync(() => setOrdered((list) => {
      const from = list.findIndex((p) => p.id === movingId),
        next = [...list];
      if (from < 0) return list;
      const [moved] = next.splice(from, 1);
      const targetIndex = next.findIndex((p) => p.id === target);
      if (targetIndex < 0) return list;
      next.splice(targetIndex + (side === "after" ? 1 : 0), 0, moved);
      return next;
    }));
    if (document.startViewTransition) document.startViewTransition(updateOrder);
    else updateOrder();
  };
  const startPointerDrag = (event, id, title) => {
    const origin = { x: event.clientX, y: event.clientY };
    let active = false;
    let ghost = null;
    let lastPoint = origin;
    let localIntent = null;
    const updateTarget = () => {
      if (!active) return;
      const targetElement = document.elementFromPoint(lastPoint.x, lastPoint.y)?.closest?.("[data-project-id]");
      const target = targetElement?.dataset.projectId;
      if (!target || target === id) {
        localIntent = null;
        setDropIntent(null);
        return;
      }
      const rect = targetElement.getBoundingClientRect();
      const side = lastPoint.y < rect.top + rect.height / 2 ? "before" : "after";
      if (localIntent?.id === target && localIntent?.side === side) return;
      localIntent = { id: target, side };
      setDropIntent(localIntent);
    };
    const activate = () => {
      active = true;
      dragId.current = id;
      setDragging(id);
      setDropIntent(null);
      document.body.classList.add("work-pointer-dragging");
      ghost = document.createElement("div");
      ghost.className = "work-drag-ghost is-visible";
      const label = document.createElement("small");
      const name = document.createElement("strong");
      label.textContent = "MOVE / WORK";
      name.textContent = title;
      ghost.append(label, name);
      document.body.appendChild(ghost);
    };
    const movePointer = (moveEvent) => {
      lastPoint = { x: moveEvent.clientX, y: moveEvent.clientY };
      if (!active && Math.hypot(lastPoint.x - origin.x, lastPoint.y - origin.y) >= 7) activate();
      if (!active) return;
      moveEvent.preventDefault();
      if (ghost) ghost.style.transform = `translate3d(${lastPoint.x + 16}px,${lastPoint.y + 14}px,0)`;
      updateTarget();
    };
    const finishPointer = () => {
      document.removeEventListener("pointermove", movePointer);
      document.removeEventListener("pointerup", finishPointer);
      document.removeEventListener("pointercancel", finishPointer);
      refreshDropTarget.current = null;
      ghost?.remove();
      document.body.classList.remove("work-pointer-dragging");
      if (active && localIntent) commitDrop(id, localIntent.id, localIntent.side);
      setDropIntent(null);
      if (active) setTimeout(() => {
        dragId.current = null;
        setDragging(null);
      }, 90);
    };
    refreshDropTarget.current = updateTarget;
    document.addEventListener("pointermove", movePointer, { passive: false });
    document.addEventListener("pointerup", finishPointer, { once: true });
    document.addEventListener("pointercancel", finishPointer, { once: true });
  };
  return (
    <section className="section work work-gallery" id="work">
      <div className="section-head">
        <span>01 / PROJECT WORKS</span>
        <p>项目作品</p>
      </div>
      <div className="work-intro">
          <PressureHeading lines={["先理解需求", "再完成画面"]} />
      </div>
      <div className="work-gallery-toolbar">
        <div className="collision-hint" aria-label="移动鼠标探索作品　单击进入沉浸大图">
          <span>移动鼠标</span><span>探索作品</span><i /><span>单击进入</span><span>沉浸大图</span>
        </div>
        <div className="work-filter" ref={filterRef}>
          <button
            className={`work-filter-trigger ${filterOpen ? "is-open" : ""} ${activeFilter ? "has-filter" : ""}`}
            onClick={() => setFilterOpen((value) => !value)}
            aria-expanded={filterOpen}
            aria-haspopup="menu"
          >
            <SlidersHorizontal />
            <span>{filters.find((item) => item.id === activeFilter)?.label || "筛选作品"}</span>
            <ChevronDown />
          </button>
          <AnimatePresence>
            {filterOpen && (
              <motion.div
                className="work-filter-menu"
                role="menu"
                initial={{ opacity: 0, y: -12, scaleY: 0.75 }}
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                exit={{ opacity: 0, y: -8, scaleY: 0.8 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              >
                {filters.map((item, index) => (
                  <motion.button
                    key={item.id}
                    role="menuitem"
                    className={activeFilter === item.id ? "active" : ""}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + index * 0.055 }}
                    onClick={() => {
                      setActiveFilter((current) => current === item.id ? null : item.id);
                      setFilterOpen(false);
                    }}
                  >
                    <small>{item.index}</small><span>{item.label}</span><i />
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className={`project-mosaic ${dragging ? "is-reordering" : ""}`}>
        <AnimatePresence mode="popLayout">
        {visibleProjects.map((p, i) => (
          <ProjectTile
            key={p.id}
            project={{ ...p, no: String(i + 1).padStart(2, "0") }}
            index={i}
            onOpen={onOpen}
            dragging={dragging === p.id}
            onPointerDragStart={startPointerDrag}
            dropIntent={dropIntent?.id === p.id ? dropIntent.side : null}
          />
        ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ProjectTypeTags() {
  const [bursts, setBursts] = useState([]),
    id = useRef(0);
  const add = (type) => {
    const x = 16 + Math.random() * 68;
    const y = 18 + Math.random() * 58;
    setBursts((v) => [...v, { id: ++id.current, type, x, y }]);
  };
  return (
    <div className="type-tags">
      {projectTypes.map((type) => (
        <button
          key={type}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => add(type)}
        >
          {type}
          {bursts
            .filter((b) => b.type === type)
            .map((b) => (
              <span
                key={b.id}
                style={{ "--burst-x": `${b.x}%`, "--burst-y": `${b.y}%` }}
                onAnimationEnd={() =>
                  setBursts((v) => v.filter((item) => item.id !== b.id))
                }
              >
                +1
              </span>
            ))}
        </button>
      ))}
    </div>
  );
}

function Experience({ onOpen }) {
  const timelineRef = useRef(null),
    itemRefs = useRef([]);
  const lens = useRef({ current: 0, target: 0, raf: 0, active: false });
  const resting = () =>
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.transform = `perspective(900px) translateX(${i * 2}px) scale(${1 - i * 0.018})`;
      el.style.opacity = String(1 - i * 0.18);
      el.style.filter = `blur(${i * 0.18}px)`;
    });
  useEffect(() => {
    resting();
    return () => cancelAnimationFrame(lens.current.raf);
  }, []);
  const tickLens = () => {
    const s = lens.current;
    if (!s.active) {
      s.raf = 0;
      return;
    }
    s.current += (s.target - s.current) * 0.105;
    timelineRef.current.style.setProperty("--lens-y", `${s.current}px`);
    itemRefs.current.forEach((el) => {
      if (!el) return;
      const center = el.offsetTop + el.offsetHeight / 2,
        dist = Math.abs(s.current - center),
        power = Math.max(0, 1 - dist / 300);
      el.style.transform = `perspective(900px) translateX(${power * 16}px) translateZ(${power * 52}px) scale(${0.93 + power * 0.085})`;
      el.style.opacity = String(0.25 + power * 0.75);
      el.style.filter = `blur(${(1 - power) * 0.6}px)`;
    });
    s.raf = requestAnimationFrame(tickLens);
  };
  const lensMove = (e) => {
    const r = timelineRef.current.getBoundingClientRect(),
      s = lens.current;
    s.target = e.clientY - r.top;
    if (!s.active) {
      s.active = true;
      s.current = s.target;
    }
    if (!s.raf) s.raf = requestAnimationFrame(tickLens);
  };
  const lensLeave = () => {
    const s = lens.current;
    s.active = false;
    cancelAnimationFrame(s.raf);
    s.raf = 0;
    resting();
  };
  return (
    <section className="section experience" id="experience">
      <div className="section-head">
        <span>03 / EXPERIENCE</span>
        <p>工作履历</p>
      </div>
      <div className="experience-intro">
          <PressureHeading lines={["从原画设计", "到美术主导"]} />
          <p>2018 — 2025　成都</p>
      </div>
      <div className="career-layout">
        <div
          ref={timelineRef}
          className="timeline lens-timeline"
          onMouseEnter={lensMove}
          onMouseMove={lensMove}
          onMouseLeave={lensLeave}
        >
          {career.map((item, i) => (
            <motion.article
              ref={(el) => (itemRefs.current[i] = el)}
              className="timeline-item"
              key={item.period}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: i * 0.06 }}
              onClick={() =>
                onOpen(projects.find((p) => p.no === item.projectNo))
              }
              tabIndex="0"
            >
              <time>{item.period}</time>
              <div className="timeline-dot" />
              <div className="timeline-content">
                <h3>{item.company}</h3>
                <strong>{item.role}</strong>
                <p>{item.detail}</p>
                <ul className="timeline-more">
                  {item.more.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <span className="timeline-view-label">查看对应项目</span>
              </div>
            </motion.article>
          ))}
        </div>
        <aside className="experience-side">
          <div>
            <span>SELECTED PROJECTS</span>
            <div className="selected-project-cards">
              {selectedGames.map((game, i) => {
                const p = projects.find((item) => item.no === game.projectNo);
                return (
                  <button
                    key={game.name}
                    style={{ "--delay": `${-i * 0.8}s` }}
                    onClick={() => onOpen(p)}
                  >
                    <img src={p.image} alt="" loading="lazy" decoding="async" />
                    <i>{String(i + 1).padStart(2, "0")}</i>
                    <strong>《{game.name}》</strong>
                    <ArrowUpRight />
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <span>PROJECT TYPES</span>
            <ProjectTypeTags />
          </div>
        </aside>
      </div>
    </section>
  );
}

function Ability() {
  return (
    <section className="section ability" id="ability">
      <div className="section-head">
        <span>04 / CAPABILITY</span>
        <p>个人优势</p>
      </div>
      <div className="ability-title">
          <PressureHeading
            lines={["把经验整理成方法", "把方法用在项目里"]}
          />
          <p>画面品质　审美判断　团队协作</p>
      </div>
      <div className="ability-grid">
        {strengths.map((s, i) => (
          <motion.div
            className="ability-card"
            key={s.no}
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.08 }}
          >
            <div>
              <span>{s.no}</span>
              <small>{s.en}</small>
            </div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <ArrowUpRight />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer id="contact">
      <div className="footer-bg">杨</div>
      <div className="footer-top">
        <span>05 / CONTACT</span>
        <span>AVAILABLE FOR SELECTED PROJECTS</span>
      </div>
      <div className="footer-main">
        <p>
          下一段世界观，
          <br />
          从一次对话开始。
        </p>
        <Magnetic className="contact-orbit" href="mailto:iq.yang@aliyun.com">
          <span>LET'S TALK</span>
          <ArrowUpRight />
        </Magnetic>
      </div>
      <div className="footer-actions">
        <a href="mailto:iq.yang@aliyun.com">
          <Mail /> <span>邮箱</span>
          <strong>iq.yang@aliyun.com</strong>
          <ArrowUpRight />
        </a>
        <a href="tel:13330982143">
          <Phone /> <span>电话</span>
          <strong>133 3098 2143</strong>
          <ArrowUpRight />
        </a>
        <button onClick={() => window.print()}>
          <Download /> <span>简历下载</span>
          <strong>保存当前网页为 PDF</strong>
          <ArrowDownRight />
        </button>
      </div>
      <div className="footer-bottom">
        <span>© 2026 YANG YANG</span>
        <span>GAME CONCEPT ART · ART DIRECTION</span>
        <a href="#top">BACK TO TOP ↑</a>
      </div>
    </footer>
  );
}

function App() {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <Header />
      <Hero />
      <main>
        <Work onOpen={setSelected} />
        <About />
        <Experience onOpen={setSelected} />
        <Ability />
      </main>
      <Contact />
      <AnimatePresence>
        {selected && (
          <Lightbox
            project={selected}
            onSelect={setSelected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
