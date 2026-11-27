/* 李婉嘉 · 作品集 — 动效与交互 */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (new URLSearchParams(location.search).get('theme') !== 'pink') {
    document.documentElement.classList.add('cyber');
  }
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const PROJECTS = {
    lake: {
      idx:'01', img:'assets/plates/feature-robot.jpg',
      zh:{ title:'湖泊垃圾清理机器人', sub:'Lake Garbage Cleaning Robot',
           role:'五人团队 · 组员', duty:'用户调研 · SWOT 分析 · 草图定稿 · 结构草图优化 · 建模沟通', time:'2025.03 — 2025.04',
           points:['四条可折叠机械臂 + 齿轮刷盘，旋转聚拢、中段粉碎收集',
                   '太阳能板与锂电池双模供电，多传感器避障、自主规划路径',
                   '自主 / 手动两种模式，无线通信实时反馈',
                   '配套 42 页商业计划书：市场、融资、公司与团队'],
           tags:'产品造型 / 结构草图 / 商业计划' },
      en:{ title:'Lake Garbage Cleaning Robot', sub:'湖泊垃圾清理机器人',
           role:'Team of five · Member', duty:'User research · SWOT analysis · Final sketching · Structure sketch refinement · Modelling liaison', time:'Mar — Apr 2025',
           points:['Four foldable arms with gear brushes gather debris and shred it mid-way',
                   'Solar plus lithium dual power; multi-sensor obstacle avoidance and path planning',
                   'Autonomous and manual modes with real-time wireless feedback',
                   'Backed by a 42-page business plan: market, funding, company and team'],
           tags:'Product form / Structure sketching / Business plan' }
    },
    campus: {
      idx:'02', img:'assets/plates/work-campus.jpg',
      zh:{ title:'校园路面清理机', sub:'Campus Road Cleaning Machine',
           role:'组长 · 5 人团队', duty:'设计 · 建模 · 团队统筹', time:'2025.07',
           points:['碟形机身压低重心，橙色警示带贯穿腰线',
                   '可伸缩机械臂 + 五边形摄像头头部，前探清扫',
                   '太阳能顶板、四足支撑与三视图 / 爆炸图完整表达'],
           tags:'造型推演 / 建模 / 版面' },
      en:{ title:'Campus Road Cleaning Machine', sub:'校园路面清理机',
           role:'Team lead · 5 people', duty:'Design · Modelling · Team coordination', time:'Jul 2025',
           points:['Disc-shaped body keeps the centre of gravity low; orange warning band runs along the waistline',
                   'Telescopic arm and pentagonal camera head sweep ahead of the machine',
                   'Solar roof panel, four-point stance, full three-view and exploded drawings'],
           tags:'Form development / Modelling / Layout' }
    },
    gadget: {
      idx:'03', img:'assets/plates/work-gadget.jpg',
      zh:{ title:'桌面电子多功能摆件', sub:'Retro Console Desk Gadget',
           role:'个人项目 · 改造设计', duty:'创新点 · 建模 · 渲染 · 3D 打印', time:'2025.11',
           points:['原产品是方正方块，单调、无记忆点；改以复古掌机为原型',
                   '整合时间、日期、温湿度、天气与 PM2.5，一屏可读',
                   '完成 3D 打印样机与电子模块实装，是能开机的一件实物'],
           tags:'产品改造 / 3D 打印 / 样机' },
      en:{ title:'Retro Console Desk Gadget', sub:'桌面电子多功能摆件',
           role:'Personal project · Redesign', duty:'Concept · Modelling · Rendering · 3D printing', time:'Nov 2025',
           points:['The original was a plain cube with no personality; rebuilt around a retro handheld console',
                   'Time, date, temperature, humidity, weather and PM2.5 in one screen',
                   'Finished as a 3D-printed prototype with working electronics'],
           tags:'Redesign / 3D printing / Prototype' }
    },
    mite: {
      idx:'04', img:'assets/plates/work-mite.jpg',
      zh:{ title:'除螨仪', sub:'Handheld Mite Remover',
           role:'课程作业', duty:'设计 · 建模 · 渲染', time:'2024.04',
           points:['弧形手柄贴合掌心，拇指正好落在圆形电源键上',
                   '透明尘盒可视化，点阵出风口作为侧面的节奏细节',
                   '浅蓝与灰白双色，弱化家电的攻击性'],
           tags:'造型 / 建模 / 渲染' },
      en:{ title:'Handheld Mite Remover', sub:'除螨仪',
           role:'Coursework', duty:'Design · Modelling · Rendering', time:'Apr 2024',
           points:['Curved handle fits the palm, thumb lands right on the round power key',
                   'Transparent dust cup; dotted vents give the side face a rhythm',
                   'Pale blue and grey-white pairing softens the appliance feel'],
           tags:'Form / Modelling / Rendering' }
    },
    stand: {
      idx:'05', img:'assets/plates/work-stand.jpg',
      zh:{ title:'拟人化手机支架', sub:'Character Phone Stand',
           role:'个人练习', duty:'设计 · 建模 · 渲染', time:'2025.05',
           points:['方形身体 + 关节四肢，用一个「人」的姿势托住手机',
                   '金属转轴连接底座，坐姿、躺姿两种角度',
                   '关机时它是一件桌面摆件，不是一件工具'],
           tags:'潮玩 / 拟人化 / 建模' },
      en:{ title:'Character Phone Stand', sub:'拟人化手机支架',
           role:'Personal practice', duty:'Design · Modelling · Rendering', time:'May 2025',
           points:['Square body with jointed limbs holds the phone like a little person',
                   'Metal hinge on the base allows sitting and reclining angles',
                   'With the screen off it is a desk object, not a tool'],
           tags:'Design toy / Character / Modelling' }
    }
  };

  const bar = $('.progress span');
  const pctEl = $('[data-pct]');
  const railFill = $('.rail i b');
  const curEl = $('[data-current]');
  const topbar = $('.topbar');
  const heroType = $('.hero__type');
  const heroImg = $('.hero__figure img');
  const sections = $$('section[data-index]');

  $$('.tile, .sec-head, .about__grid, .honor-list, .contact__grid').forEach((el, i) => {
    el.classList.add('rise');
    el.style.setProperty('--i', i % 5);
  });
  const revealEls = $$('.reveal, .wipe, .rise');
  let ticking = false;

  function onFrame() {
    const y = window.scrollY || window.pageYOffset;
    const vh = window.innerHeight;
    const docH = document.documentElement.scrollHeight - vh;
    const p = docH > 0 ? Math.min(1, y / docH) : 0;
    if (bar) bar.style.width = (p * 100).toFixed(2) + '%';
    if (pctEl) pctEl.textContent = Math.round(p * 100) + '%';
    if (railFill) railFill.style.height = (p * 100).toFixed(1) + '%';
    if (topbar) topbar.classList.toggle('is-scrolled', y > 40);
    if (!reduce && heroImg && y < vh * 1.2) heroImg.style.setProperty('--shift', (y * 0.16).toFixed(1) + 'px');
    for (const el of revealEls) {
      if (el.classList.contains('in')) continue;
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.9 && r.bottom > 0) el.classList.add('in');
    }
    if (curEl) {
      let idx = '01';
      for (const s of sections) { if (s.getBoundingClientRect().top <= vh * 0.42) idx = s.dataset.index; }
      if (curEl.textContent !== idx) curEl.textContent = idx;
    }
    ticking = false;
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(onFrame); } }

  const lb = $('#lightbox');
  let lastFocus = null;

  let LANG = 'zh';

  function openProject(key) {
    const d = PROJECTS[key];
    if (!d || !lb) return;
    const t = d[LANG] || d.zh;
    lastFocus = document.activeElement;
    $('#lb-idx').textContent = d.idx;
    $('#lb-title').textContent = t.title;
    $('#lb-en').textContent = t.sub;
    $('#lb-role').textContent = t.role;
    $('#lb-duty').textContent = t.duty;
    $('#lb-time').textContent = t.time;
    const img = $('#lb-img'); img.src = d.img; img.alt = t.title;
    $('#lb-points').innerHTML = t.points.map(function (p) { return '<li>' + p + '</li>'; }).join('');
    $('#lb-tags').textContent = t.tags;
    lb.dataset.key = key;
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    const c = $('.lb__close'); if (c) c.focus();
  }

  function closeProject() {
    if (!lb || lb.hidden) return;
    lb.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  $$('.tile[data-project]').forEach(t => t.addEventListener('click', () => openProject(t.dataset.project)));
  $$('[data-close]').forEach(el => el.addEventListener('click', closeProject));
  addEventListener('keydown', e => { if (e.key === 'Escape') closeProject(); });

  /* ── 人物视差 + 偶发故障 ── */
  (function figureFx() {
    const fig = $('.fig--cyber');
    const host = $('.hero__figure');
    if (!fig || !host || reduce) return;

    let tx = 0, ty = 0, cx = 0, cy = 0;
    addEventListener('mousemove', e => {
      tx = (e.clientX / innerWidth - 0.5) * 2;
      ty = (e.clientY / innerHeight - 0.5) * 2;
    }, { passive: true });

    (function loop() {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      host.style.transform = 'rotateY(' + (cx * 2.6).toFixed(2) + 'deg) rotateX(' + (-cy * 1.6).toFixed(2) + 'deg) translate3d(' + (cx * -10).toFixed(1) + 'px,' + (cy * -6).toFixed(1) + 'px,0)';
      requestAnimationFrame(loop);
    })();

    /* 滚动驱动：视频进度跟随滚动（往下翻 → 手拿出来比 V） */
    (function glitch() {
      const wait = 4200 + Math.random() * 5000;
      setTimeout(() => {
        fig.classList.add('is-glitch');
        setTimeout(() => fig.classList.remove('is-glitch'), 380);
        glitch();
      }, wait);
    })();
  })();

  /* ── 工牌：滚一下掉下来，带阻尼摆动 ── */
  (function badgeFx() {
    const swing = document.querySelector('.badge__swing');
    const track = document.querySelector('.hero-track');
    if (!swing || !track || matchMedia('(max-width:900px)').matches) return;

    const c1 = 1.70158, c3 = c1 + 1;
    const easeOutBack = function (t) {
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    };

    let raf = 0;
    function draw() {
      raf = 0;
      const rect = track.getBoundingClientRect();
      const total = Math.max(1, track.offsetHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, -rect.top / total));
      const drop = Math.min(1, p / 0.2);
      const y = -262 * (1 - easeOutBack(drop));
      const amp = 11 * Math.exp(-3.6 * p);
      const rot = Math.sin(p * 30) * amp;
      swing.style.transform = 'translateY(' + y.toFixed(1) + 'px) rotate(' + rot.toFixed(2) + 'deg)';
    }
    function onScroll() { if (!raf) raf = requestAnimationFrame(draw); }
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    draw();
  })();

  /* ── 首屏：逐帧滚动驱动（手机用视频自动播放） ── */
  (function heroFrames() {
    const track = document.querySelector('.hero-track');
    const frame = document.getElementById('heroFrame');
    const video = document.querySelector('.hero__video');
    if (!track || !frame) return;
    const mobile = matchMedia('(max-width:900px)').matches;
    const N = 50, BASE = 'assets/frames/f_';
    const pad = function (n) { return String(n).padStart(3, '0'); };

    if (mobile) {
      frame.style.display = 'none';
      if (video) { video.loop = true; video.preload = 'auto'; video.play().catch(function () {}); }
      return;
    }
    if (video) video.style.display = 'none';

    for (let i = 1; i <= N; i++) { const im = new Image(); im.src = BASE + pad(i) + '.webp'; }

    let cur = 1, raf = 0;
    function draw() {
      raf = 0;
      const rect = track.getBoundingClientRect();
      const total = Math.max(1, track.offsetHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, -rect.top / total));
      const i = Math.min(N, Math.max(1, Math.round(p * (N - 1)) + 1));
      if (i !== cur) {
        cur = i;
        frame.src = BASE + pad(i) + '.webp';
        document.documentElement.style.setProperty('--hero-p', p.toFixed(3));
      }
    }
    function onScroll() { if (!raf) raf = requestAnimationFrame(draw); }
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    draw();
  })();

  /* ── 鼠标特效 ── */
  (function cursorFx() {
    const fine = matchMedia('(pointer:fine)').matches;
    if (!fine) return;
    const cur = $('.cursor');
    const spot = $('.spot');
    if (!cur || !spot) return;
    document.documentElement.classList.add('has-cursor');

    let mx = innerWidth / 2, my = innerHeight / 2;
    let rx = mx, ry = my, sx = mx, sy = my;

    let started = false;
    addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      if (!started) { started = true; document.documentElement.classList.add('cursor-on'); }
    }, { passive: true });
    addEventListener('mousedown', () => cur.classList.add('is-down'));
    addEventListener('mouseup', () => cur.classList.remove('is-down'));

    const hoverables = 'a, button, .tile, .mail';
    document.addEventListener('mouseover', e => {
      const t = e.target.closest(hoverables);
      if (!t) return;
      const isTile = t.classList.contains('tile');
      cur.classList.toggle('is-view', isTile);
      cur.classList.toggle('is-link', !isTile);
    });
    document.addEventListener('mouseout', e => {
      if (!e.relatedTarget || !e.relatedTarget.closest || !e.relatedTarget.closest(hoverables)) {
        cur.classList.remove('is-view', 'is-link');
      }
    });

    if (reduce) {
      addEventListener('mousemove', () => {
        cur.style.transform = 'translate(' + mx + 'px,' + my + 'px)';
        spot.style.transform = 'translate(' + mx + 'px,' + my + 'px)';
      }, { passive: true });
      return;
    }

    (function loop() {
      rx += (mx - rx) * 0.22; ry += (my - ry) * 0.22;
      sx += (mx - sx) * 0.075; sy += (my - sy) * 0.075;
      cur.style.transform = 'translate(' + rx.toFixed(2) + 'px,' + ry.toFixed(2) + 'px)';
      spot.style.transform = 'translate(' + sx.toFixed(2) + 'px,' + sy.toFixed(2) + 'px)';
      requestAnimationFrame(loop);
    })();
  })();


  /* ── 中英切换 ── */
  (function i18n() {
    const DICT = {
      '作品': 'Works', '关于': 'About', '荣誉': 'Honors', '联系': 'Contact',
      '产品设计 · 艺术科技与商业': 'Product Design · Arts Technology & Business',
      '目标岗位 / 产品设计师 · 工业设计师': 'Target role / Product Designer · Industrial Designer',
      '香港 / HONG KONG — 2026 年底起接受实习与全职': 'HONG KONG — Internship and full-time from late 2026',
      '— 作品集': '— Portfolio',
      '三维建模': '3D Modelling', '样机制作': 'Prototyping', '3D 打印': '3D Printing', '商业计划': 'Business plan',
      '产品设计': 'Product Design',
      '五个项目，从水面清洁机器人到桌面潮玩。': 'Five projects, from a lake-cleaning robot to a desk toy.',
      '点开任意一件看细节。': 'Click any one to see the details.',
      '湖泊垃圾清理机器人': 'Lake Garbage Cleaning Robot', 'Lake Garbage Cleaning Robot': '湖泊垃圾清理机器人',
      '校园路面清理机': 'Campus Road Cleaning Machine', 'Campus Road Cleaning Machine': '校园路面清理机',
      '桌面电子多功能摆件': 'Retro Console Desk Gadget', 'Retro Console Desk Gadget': '桌面电子多功能摆件',
      '除螨仪': 'Handheld Mite Remover', 'Handheld Mite Remover': '除螨仪',
      '拟人化手机支架': 'Character Phone Stand', 'Character Phone Stand': '拟人化手机支架',
      '课程作业': 'Coursework', '个人练习': 'Personal practice',
      '作品 05 / 05': '05 / 05 Works',
      '另有两件获奖作品': 'Two more award-winning',
      '与草图过程稿': 'projects and process sketches',
      '索取完整作品集 ↗': 'Request full portfolio ↗',
      '2026 · 香港': '2026 · Hong Kong',
      '2026.08 — 至今': 'Aug 2026 — Present',
      '岭南大学': 'Lingnan University',
      '艺术科技与商业 · 硕士': 'Arts Technology & Business · MSc',
      '香港 · 屯门': 'Hong Kong · Tuen Mun',
      '太原科技大学': 'Taiyuan University of Science and Technology',
      '产品设计 · 艺术学学士': 'Product Design · BFA',
      '产品造型与结构设计': 'Form and structure design',
      '三维建模与渲染': '3D modelling and rendering',
      '3D 打印与样机制作': '3D printing and prototyping',
      '电子模块整合': 'Electronics integration',
      '展板与作品集版式': 'Poster and portfolio layout',
      '商业计划书撰写': 'Business plan writing',
      '手绘草图表达': 'Hand sketching',
      '中文 — 母语': 'Chinese — Native',
      '英语 — IELTS 5.5 · CET-4': 'English — IELTS 5.5 · CET-4',
      '五项校内外奖项与奖学金': 'Five awards and scholarships',
      '校级一等奖学金': 'University First-class Scholarship',
      'University First-class Scholarship': 'Taiyuan University of Science and Technology',
      '2025 UAD Cup 全国大学生城市设计竞赛 · 三等奖': '2025 UAD Cup National Urban Design Competition · Third Prize',
      '作品 / 自然共行：交互式适老携幼探索载具': 'Project / Coexist: Interactive Vehicle for Elder and Child',
      '全国': 'National',
      '英国国际创意大赛 · 银奖': 'Britain International Creative Competition · Silver Award',
      '作品 / 针对介入手术的外骨骼辅助装置': 'Project / Exoskeleton Assistive Device for Interventional Surgery',
      '国际': 'International',
      '大学生视觉艺术与设计大赛 · 省级二等奖': 'University Student Visual Art & Design Competition · Provincial Second Prize',
      '同一作品 / 自然共行：交互式适老携幼探索载具': 'Same project / Coexist: Interactive Vehicle for Elder and Child',
      '山西': 'Shanxi',
      '校级二等奖学金': 'University Second-class Scholarship',
      'University Second-class Scholarship': 'Taiyuan University of Science and Technology',
      '聊聊设计': 'Let\u2019s talk design',
      '香港 · 屯门 / 山西 · 太原': 'Hong Kong · Tuen Mun / Shanxi · Taiyuan',
      '中文 · English': 'Chinese · English',
      '产品设计师 / 工业设计师': 'Product Designer / Industrial Designer',
      '2026 年底起': 'Late 2026',
      '© 2026 李婉嘉 LI WANJIA': '© 2026 Li Wanjia',
      '回到顶部 ↑': 'Back to top ↑',
      '身份': 'Role', '负责': 'Responsibilities', '周期': 'Period', '/ 作品': '/ Project'
    };

    const htmlEls = Array.from(document.querySelectorAll('[data-en-html]'));
    htmlEls.forEach(function (el) { el.dataset.zhHtml = el.innerHTML; });

    const skip = new Set();
    htmlEls.forEach(function (el) {
      const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      let x; while ((x = w.nextNode())) skip.add(x);
    });

    const nodes = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = walker.nextNode())) {
      if (skip.has(n)) continue;
      const raw = n.nodeValue, s = raw.trim();
      if (!s || !Object.prototype.hasOwnProperty.call(DICT, s)) continue;
      nodes.push({ n: n, raw: raw, s: s });
    }

    const btn = $('.lang');

    function apply(lang) {
      LANG = lang;
      const en = lang === 'en';
      document.documentElement.lang = en ? 'en' : 'zh-CN';
      document.title = en ? 'Li Wanjia — Product Designer / Portfolio'
                          : '李婉嘉 LI WANJIA — 产品设计师 / 作品集';
      for (const it of nodes) {
        const lead = it.raw.match(/^\s*/)[0], trail = it.raw.match(/\s*$/)[0];
        it.n.nodeValue = lead + (en ? DICT[it.s] : it.s) + trail;
      }
      for (const el of htmlEls) {
        el.innerHTML = en ? el.dataset.enHtml : el.dataset.zhHtml;
      }
      if (btn) {
        btn.textContent = en ? '中文' : 'EN';
        btn.classList.toggle('is-en', en);
      }
      try { localStorage.setItem('lwj-lang', lang); } catch (e) {}
      if (lb && !lb.hidden && lb.dataset.key) openProject(lb.dataset.key);
    }

    if (btn) btn.addEventListener('click', function () { apply(LANG === 'en' ? 'zh' : 'en'); });

    let saved = 'zh';
    try { saved = localStorage.getItem('lwj-lang') || 'zh'; } catch (e) {}
    const q = new URLSearchParams(location.search).get('lang');
    apply(q === 'en' || q === 'zh' ? q : saved);
  })();

  requestAnimationFrame(() => {
    if (heroType) heroType.classList.add('in');
    onScroll();
    setTimeout(onScroll, 120);
    setTimeout(onScroll, 480);
  });
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  addEventListener('load', onScroll);
})();