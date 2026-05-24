# ToolBox - 在线工具箱

纯静态在线工具网站，HTML5 + CSS3 + 原生JavaScript构建，无需数据库，所有工具在浏览器本地运行。

## 功能列表

| 工具 | 说明 | 付费功能 |
|------|------|----------|
| 图片压缩 | PNG/JPEG/WebP压缩，自定义质量 | 高清导出 (PRO) |
| 图片格式转换 | PNG ↔ JPEG ↔ WebP ↔ BMP 互转 | 批量转换 (PRO) |
| 二维码生成器 | URL/文本/邮箱/电话/WiFi二维码 | 高清矢量导出 (PRO) |
| 字数统计 | 中英文字数/字符/行/段落统计 | 完全免费 |
| 繁简体转换 | 简体 ↔ 繁體双向互转 | 完全免费 |
| JSON格式化 | JSON美化/压缩/校验 | 完全免费 |
| 日期时间计算器 | 日期间隔/日期推算/时间差 | 完全免费 |

## 项目结构

```
tool-website/
├── index.html              # 首页 - 工具聚合
├── about.html              # 关于我们页面
├── css/
│   └── style.css           # 全局样式表 (响应式)
├── js/
│   └── main.js             # 通用脚本 (导航/搜索/Toast/模态框)
├── tools/
│   ├── image-compress.html  # 图片压缩工具
│   ├── image-convert.html   # 图片格式转换工具
│   ├── qrcode-generate.html # 二维码生成器
│   ├── word-count.html      # 字数统计工具
│   ├── chinese-convert.html # 繁简体转换工具
│   ├── json-format.html     # JSON格式化工具
│   └── date-calc.html       # 日期时间计算器
└── README.md               # 本文件
```

## 本地启动

### 方法一：直接打开 (最简单)

直接用浏览器打开 `index.html` 即可。

### 方法二：使用 Python

```bash
# Python 3
python -m http.server 8080

# 访问 http://localhost:8080
```

### 方法三：使用 Node.js

```bash
npx serve .

# 访问 http://localhost:3000
```

### 方法四：使用 VS Code Live Server

安装 Live Server 插件，右键 `index.html` → Open with Live Server。

## 部署上线

### 方案一：GitHub Pages (免费)

```bash
# 1. 在 GitHub 创建仓库
# 2. 推送代码
git init
git add -A
git commit -m "Init ToolBox"
git remote add origin https://github.com/你的用户名/toolbox.git
git push -u origin main

# 3. 在仓库 Settings → Pages 中启用
# Source: Deploy from branch → main → / (root) → Save
# 等待1-2分钟即可访问 https://你的用户名.github.io/toolbox
```

### 方案二：Vercel (免费, 推荐)

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel

# 按提示操作即可，自动分配域名
```

### 方案三：Netlify (免费)

1. 访问 [netlify.com](https://netlify.com)
2. 拖拽整个 `tool-website` 文件夹到页面
3. 自动部署，可绑定自定义域名

### 方案四：Nginx 服务器

```bash
# 上传文件到服务器
scp -r tool-website/* user@server:/var/www/toolbox/

# Nginx 配置
server {
    listen 80;
    server_name toolbox.yourdomain.com;
    root /var/www/toolbox;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    # 静态资源缓存
    location ~* \.(css|js|png|jpg|svg|ico)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

### 方案五：CDN + OSS (阿里云/腾讯云)

1. 将文件上传到 OSS 存储桶
2. 开启静态网站托管
3. 绑定 CDN 加速域名
4. 可选：配置自定义域名 + HTTPS

## 盈利接入指南

### 广告位
网站上预留了三处广告位（顶部、侧边栏、底部），将占位文字替换为广告代码即可：

```html
<!-- 替换前 -->
<div class="ad-slot ad-top">📢 广告位招租</div>

<!-- 替换后 (以 Google AdSense 为例) -->
<div class="ad-slot ad-top">
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-client="ca-pub-XXXXXXXX"
       data-ad-slot="XXXXXX"
       data-ad-format="auto"></ins>
</div>
```

### PRO 订阅
付费弹窗代码在 `js/main.js` 的 `showPremiumModal()` 函数中，接入支付系统（如微信支付/Stripe）后替换：

```javascript
// js/main.js 约第38行
overlay.querySelector('.btn-gold').addEventListener('click', function() {
  // 替换为实际的支付跳转
  window.location.href = 'https://你的支付页面';
});
```

## 技术特点

- **纯前端**: 所有工具在浏览器本地运行，数据不上传服务器
- **零依赖**: 除二维码库(CDN加载)外，纯原生JavaScript
- **响应式**: 自动适配桌面/平板/手机
- **SEO优化**: 每个页面独立 title/description/keywords
- **轻量**: 全部静态文件，首屏加载快速

## 自定义与扩展

### 添加新工具
1. 在 `tools/` 目录下创建新 HTML 文件
2. 参考现有工具页面结构
3. 在 `index.html` 的工具网格中添加卡片
4. 设置正确的 `data-cat` 分类属性

### 修改配色
编辑 `css/style.css` 开头的 CSS 变量：

```css
:root {
  --primary: #2c3e50;    /* 主色 */
  --accent: #3498db;     /* 强调色 */
  --gold: #f39c12;       /* PRO金色 */
  ...
}
```

## License

MIT
