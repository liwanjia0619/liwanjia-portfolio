# 李婉嘉 · 作品集网页

单页滚动的个人作品集。纯 HTML / CSS / JS，**无依赖、无构建**，双击 `index.html` 就能看，也能直接拖到 Vercel / Netlify。

---

## 一、怎么看

双击 `index.html`（Chrome / Safari）。本地起服务也行：

```bash
cd site && python3 -m http.server 8899
```

---

## 二、页面结构（5 个区块）

| # | 区块 | 内容 |
|---|---|---|
| 01 | 封面 | PRODUCT / DESIGNER 巨字 + 虚拟形象 + 专业信息条 |
| 02 | 作品 | 5 个「图版」：机器人（主推，带结构热点）/ 校园清理机 / 桌面摆件 / 除螨仪 / 手机支架 |
| 03 | 关于 | 自述 + 教育 / 能力 / 语言 |
| 04 | 荣誉 | 5 条奖项，日期 · 名称 · 归属 |
| 05 | 联系 | 走马灯 + 邮箱 / 电话 / 所在地 |

---

## 三、文件

```
site/
├── index.html        页面内容
├── styles.css        全部样式（顶部 :root 是颜色与字体）
├── main.js           动效（滚动进度、出现动画、视差、热点）
└── assets/
    ├── img/avatar-hero.png     封面虚拟形象（已做酒红双色调 + 暗角）
    └── plates/                 5 个项目的图版
```

---

## 四、换颜色

`styles.css` 顶部 `:root`：

| 变量 | 当前 | 用在哪 |
|---|---|---|
| `--wine` | `#3A0A0E` | 页面底色 |
| `--wine-deep` | `#2A0608` | 联系区底色 |
| `--cream` | `#F2E9DC` | 主文字 |
| `--red` | `#C8102E` | 强调色：编号、细线、热点、链接 |

形象图是**已经烤进图里**的酒红双色调，改主色时最好同步重做（见第五节）。

---

## 五、换形象 / 重新做双色调

形象原图（粉色背景的 3D 渲染图）会跟酒红底打架，所以做了两步处理：

1. 亮度映射到「酒红 → 米白」的渐变色标（双色调）
2. 叠一层椭圆暗角 + 左侧压暗，让它融进页面

处理脚本思路在 `../_tmp_preview/duotone.py` 与 `vignette.py`。换图后重跑即可，输出覆盖 `assets/img/avatar-hero.png`。

---

## 六、加 / 改一个作品

复制 `index.html` 里任意一个 `<article class="plate">` 整块，改五处：
外层编号、`plate__idx`、标题、`plate__en`、`plate__facts`、`plate__points`、图片路径。

作品数变了，同步改三处：封面 `.counter` 的 `/ 05`、`.nav` 不用动、以及 `sec-note` 里那句"五个项目"。

图版图片建议 1400–1600px 宽、JPEG 85%，白底产品图最好（页面会给它铺米色卡纸）：

```bash
sips -s format jpeg -s formatOptions 85 -Z 1500 原图.png --out assets/plates/新图.jpg
```

---

## 七、动效

| 动效 | 位置 | 怎么调 |
|---|---|---|
| 封面大字升起 | `.hero__type .l` | `.9s` 时长、`--solid` 延迟 `.16s` |
| 图版擦开 | `.js .wipe` | `clip-path` `1.15s` |
| 区块升起 | `.js .rise` | 改 `1s` |
| 元素淡入 | `.js .reveal` | `.9s` |
| 封面视差 | `main.js` 的 `--shift` | 系数 `0.16` |
| 结构热点 | `.hot` | 坐标在 HTML 的 `--x/--y` |

**没有用 IntersectionObserver**：出现在 `main.js` 的滚动帧里直接算 `getBoundingClientRect()`。
原因是之前踩过 IO 不回调导致整块内容永久隐藏的坑。

`prefers-reduced-motion` 下全部动效关闭。

---

## 八、上线

1. Vercel：把 `site` 文件夹拖到 vercel.com/new
2. Netlify：app.netlify.com/drop
3. 上线后用手机过一遍；可以把图片再转一轮 WebP

---

## 九、还没做的

- 中英切换（当前中文为主 + 英文小标）
- 项目详情页（目前每个作品只有一屏，没有点进去的二级页）
- 打印 / PDF 版简历
