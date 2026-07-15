import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
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
} from "lucide-react";
import LogoLoop from "./LogoLoop";
import TextPressure from "./TextPressure";
import worksManifest from "virtual:works-manifest";
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
  role: "个人作品 · 原画设计",
  tag: "",
  layout: "natural",
  image: file.image,
  mtime: file.mtime,
}));
const portfolioProjects = uploadedProjects.length
  ? uploadedProjects
  : projects.map((p) => ({ ...p, id: `placeholder-${p.no}` }));
const projectForNo = (no) =>
  portfolioProjects.find((p) => p.no === no) ||
  portfolioProjects[(Number(no) - 1) % portfolioProjects.length];

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
    detail: "主导多项目美术风格与研发标准搭建，负责核心视觉方向与团队交付。",
    more: [
      "拆解项目研发需求，建立美术、动作与特效协同机制，主导 30+ 动效设计质量达标。",
      "搭建美术资产库与规范体系，统一角色、场景、道具、技能图标及 UI 视觉标准。",
      "推动 AI 工具与美术流程融合，制定生产规范并完成团队培训，有效提升探索与交付效率。",
    ],
  },
  {
    period: "2022.05 — 2022.09",
    company: "北京贝塔科技",
    role: "场景美术",
    projectNo: "02",
    detail: "输出高质量游戏场景、外景及宣传图，负责交互表现与资源迭代。",
    more: [
      "根据主策需求控制场景氛围、空间层次及宣传图品质。",
      "负责场景交互插件、道具设计及资源分层，针对反馈持续迭代。",
      "统筹协调各组美术资源，使项目作品在风格、色彩与造型上保持统一。",
    ],
  },
  {
    period: "2020.07 — 2022.05",
    company: "成都美有利有限公司",
    role: "高级场景",
    projectNo: "03",
    detail: "负责多风格场景、转场 CG、气氛图及道具设计与品质交付。",
    more: [
      "依据客户需求完成世界观场景、转场 CG、气氛图与道具设计。",
      "参与项目测试与需求沟通，拆分制作任务并协助初级同事完成场景绘制。",
      "推进外包项目拆分、制作与反馈，解决资源需求变化并保证最终交付质量。",
    ],
  },
  {
    period: "2018.03 — 2020.06",
    company: "成都亚然科技",
    role: "原画设计师",
    projectNo: "04",
    detail: "参与自研项目角色、过场动画、道具与场景地图设计。",
    more: [
      "负责《乘玩》等自研项目的角色、过场动画、道具与 20 余张场景地图设计。",
      "完成项目风格研究与创新探索，持续制作激励视频及节日运营素材。",
      "推进产品启动页、加载页、过场动画及道具特效的视觉优化。",
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
    [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(scrollY > 80);
    addEventListener("scroll", fn);
    return () => removeEventListener("scroll", fn);
  }, []);
  return (
    <header className={scrolled ? "nav scrolled" : "nav"}>
      <a className="logo" href="#top">
        <span>Y</span>
        <i>ANG</i>
      </a>
      <nav className={open ? "navlinks open" : "navlinks"}>
        <a href="#work" onClick={() => setOpen(false)}>
          项目作品
        </a>
        <a href="#about" onClick={() => setOpen(false)}>
          关于我
        </a>
        <a href="#experience" onClick={() => setOpen(false)}>
          工作履历
        </a>
        <a href="#ability" onClick={() => setOpen(false)}>
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
    let frame,
      w,
      h,
      dpr,
      t = 0;
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const particles = Array.from({ length: 90 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.7 + 0.25,
      s: Math.random() * 0.0007 + 0.00015,
      a: Math.random() * 0.45 + 0.08,
      phase: Math.random() * 6.28,
      kind: i % 7 === 0,
    }));
    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 1.6);
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
    const draw = () => {
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
    resize();
    addEventListener("resize", resize);
    addEventListener("pointermove", pointer);
    draw();
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", pointer);
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
          <span>塑造世界，</span>
          <em>定义视觉。</em>
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
        <div ref={art} className="portrait-art">
          <span>
            YANG
            <br />
            YANG
          </span>
        </div>
        <small>BASED IN CHENGDU · CN</small>
      </div>
    </motion.div>
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
            <motion.a variants={rise} href="mailto:iq.yang@aliyun.com">
              <Mail />
              iq.yang@aliyun.com
            </motion.a>
            <motion.a variants={rise} href="tel:13330982143">
              <Phone />
              133 3098 2143
            </motion.a>
            <motion.span variants={rise}>
              <MapPin />
              成都，中国
            </motion.span>
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

function Lightbox({ project, onClose, onSelect }) {
  const [view, setView] = useState({ scale: 1, x: 0, y: 0 });
  const drag = useRef(null),
    filmRef = useRef(null),
    stageRef = useRef(null);
  const currentIndex = portfolioProjects.findIndex(
      (p) => p.id === project.id || p.image === project.image,
    ),
    previousIndex = useRef(currentIndex);
  const slideDirection = currentIndex >= previousIndex.current ? 1 : -1;
  const reset = () => setView({ scale: 1, x: 0, y: 0 });
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
    const r = stageRef.current?.getBoundingClientRect();
    zoomAt(
      amount,
      r ? r.left + r.width / 2 : null,
      r ? r.top + r.height / 2 : null,
    );
  };
  useEffect(() => {
    reset();
  }, [project.no]);
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
          <strong>{project.title}</strong>
        </div>
        <div className="lightbox-tools">
          <button
            onClick={(e) => {
              e.stopPropagation();
              zoom(-0.35);
            }}
            aria-label="缩小"
          >
            <ZoomOut />
          </button>
          <span>{Math.round(view.scale * 100)}%</span>
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
          </button>
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
            e.preventDefault();
            zoomAt(e.deltaY < 0 ? 0.25 : -0.25, e.clientX, e.clientY);
          }}
          onDoubleClick={reset}
          onPointerDown={pointerDown}
          onPointerMove={pointerMove}
          onPointerUp={() => (drag.current = null)}
          onPointerCancel={() => (drag.current = null)}
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={project.no}
              className="lightbox-image-frame"
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
              <motion.img
                src={project.image}
                alt={project.title}
                animate={view}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 30,
                  mass: 0.65,
                }}
                draggable="false"
              />
            </motion.div>
          </AnimatePresence>
          <div className="lightbox-hint">
            滚轮缩放 · 拖动平移 · 双击复位 · ESC 关闭
          </div>
        </div>
        <aside
          key={project.no}
          className="project-detail"
          onClick={(e) => e.stopPropagation()}
        >
          <span>{project.tag}</span>
          <h2>{project.title}</h2>
          <strong>{project.role}</strong>
          <p>
            {project.description ||
              "围绕项目世界观与核心体验展开视觉探索，从前期参考研究、构图与色彩方案，到场景细化和最终研发落地，持续平衡叙事氛围、画面表现与生产可行性。"}
          </p>
          <div>
            <i>职责</i>
            <b>概念设计 · 风格研发 · 品质把控</b>
          </div>
          <div>
            <i>流程</i>
            <b>研究 / 草图 / 色彩 / 细化 / 交付</b>
          </div>
        </aside>
      </div>
      <motion.div
        ref={filmRef}
        className="filmstrip"
        onClick={(e) => e.stopPropagation()}
        initial="hidden"
        animate="show"
      >
        {portfolioProjects.map((p, i) => (
          <motion.button
            key={p.id || p.no}
            className={
              p.id === project.id || p.image === project.image ? "active" : ""
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
            onClick={() => onSelect(p)}
          >
            <img src={p.image} alt={p.title} />
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
  onDragStart,
  onDragOver,
  onDragEnd,
}) {
  const tile = useRef(null),
    image = useRef(null);
  const move = (e) => {
    const r = tile.current.getBoundingClientRect(),
      x = (e.clientX - r.left - r.width / 2) / r.width,
      y = (e.clientY - r.top - r.height / 2) / r.height;
    tile.current.style.transform = `translate3d(${x * 18}px,${y * 18}px,0) scale(1.018)`;
    image.current.style.transform = `scale(1.08) translate3d(${-x * 12}px,${-y * 12}px,0)`;
  };
  const resetTile = () => {
    tile.current.style.transform = "translate3d(0,0,0) scale(1)";
    image.current.style.transform = "scale(1.03) translate3d(0,0,0)";
  };
  return (
    <motion.div
      layout
      className={`project-tile-shell ${project.layout} ${dragging ? "is-dragging" : ""}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        layout: { type: "spring", stiffness: 260, damping: 28 },
        opacity: { duration: 0.7, delay: (index % 3) * 0.08 },
      }}
    >
      <article
        ref={tile}
        className="project-tile"
        draggable
        onDragStart={(e) => onDragStart(e, project.id)}
        onDragOver={(e) => onDragOver(e, project.id)}
        onDragEnd={onDragEnd}
        onMouseMove={move}
        onMouseLeave={resetTile}
        onClick={() => {
          if (!dragging) onOpen(project);
        }}
        tabIndex="0"
        onKeyDown={(e) => {
          if (e.key === "Enter") onOpen(project);
        }}
      >
        <img
          ref={image}
          src={project.image}
          alt={project.title}
          draggable="false"
        />
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
    [dragging, setDragging] = useState(null);
  const [ordered, setOrdered] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("yang-work-order") || "[]"),
        map = new Map(portfolioProjects.map((p) => [p.id, p])),
        known = saved.map((id) => map.get(id)).filter(Boolean),
        fresh = portfolioProjects.filter((p) => !saved.includes(p.id));
      return [...fresh, ...known];
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
  const start = (e, id) => {
    dragId.current = id;
    setDragging(id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
  };
  const over = (e, target) => {
    e.preventDefault();
    if (!dragId.current || dragId.current === target) return;
    setOrdered((list) => {
      const from = list.findIndex((p) => p.id === dragId.current),
        to = list.findIndex((p) => p.id === target);
      if (from < 0 || to < 0) return list;
      const next = [...list],
        [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  };
  const end = () => {
    dragId.current = null;
    setTimeout(() => setDragging(null), 80);
  };
  return (
    <section className="section work work-gallery" id="work">
      <div className="section-head">
        <span>01 / PROJECT WORKS</span>
        <p>项目作品</p>
      </div>
      <div className="work-intro">
          <PressureHeading lines={["先理解需求", "再完成画面"]} />
          <p>移动鼠标探索作品　单击进入沉浸大图</p>
      </div>
      <div className="project-mosaic">
        {ordered.map((p, i) => (
          <ProjectTile
            key={p.id}
            project={{ ...p, no: String(i + 1).padStart(2, "0") }}
            index={i}
            onOpen={onOpen}
            dragging={dragging === p.id}
            onDragStart={start}
            onDragOver={over}
            onDragEnd={end}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectTypeTags() {
  const [bursts, setBursts] = useState([]),
    counts = useRef({}),
    id = useRef(0);
  const add = (type) => {
    const offset = counts.current[type] || 0;
    counts.current[type] = offset + 1;
    setBursts((v) => [...v, { id: ++id.current, type, offset }]);
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
                style={{ "--offset": `${b.offset}px` }}
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
              </div>
              <span className="timeline-view-label">查看对应项目</span>
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
                    <img src={p.image} alt="" />
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
