# Suno AI儿童绘本创作平台

基于Suno AI技术的儿童绘本创作平台，为孩子们创造独特的有声绘本体验。

## 项目简介

这是一个现代化的儿童绘本创作网站，采用React + Vite构建，具有以下特色：

- 🎨 **精美的UI设计** - 采用渐变色彩和动画效果，营造童趣氛围
- 🤖 **AI智能创作** - 基于Suno先进AI技术生成故事内容
- 🎵 **专业配音** - 多种儿童友好的语音选择
- 🖼️ **精美插画** - 多种艺术风格的插画生成
- 🌍 **多语言支持** - 支持中文、英文、西班牙文等多种语言
- 📱 **响应式设计** - 完美适配桌面端和移动端

## 技术栈

- **前端框架**: React 18
- **构建工具**: Vite
- **样式框架**: Tailwind CSS
- **图标库**: Lucide React
- **开发语言**: JavaScript (ES6+)

## 功能特色

### 🎯 核心功能

1. **故事主题输入** - 用户可以输入任意故事主题和关键词
2. **多样化选择** - 支持多种语言、插画风格和语音类型选择
3. **一键生成** - AI智能生成完整的儿童绘本故事
4. **实时预览** - 即时查看生成的故事内容和插画

### 🎨 界面设计

- **现代化导航栏** - 固定顶部导航，支持平滑滚动
- **渐变背景** - 紫色到粉色的温馨渐变背景
- **卡片式布局** - 清晰的信息层次和视觉分组
- **悬停动效** - 丰富的交互反馈和动画效果
- **响应式布局** - 自适应各种屏幕尺寸

### 📊 数据展示

- **统计数据** - 展示平台创作故事数、用户数等关键指标
- **功能特色** - 四大核心功能的详细介绍
- **使用流程** - 四步简单操作流程说明
- **案例展示** - 精彩绘本故事案例

## 快速开始

### 环境要求

- Node.js 18.0 或更高版本
- npm 或 yarn 包管理器

### 安装依赖

```bash
# 克隆项目
git clone <repository-url>
cd children-storybook-website

# 安装依赖
npm install --legacy-peer-deps
```

### 开发模式

```bash
# 启动开发服务器
npm run dev

# 访问 http://localhost:5173
```

### 生产构建

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 项目结构

```
children-storybook-website/
├── public/                 # 静态资源
├── src/                   # 源代码
│   ├── components/        # React组件
│   ├── App.jsx           # 主应用组件
│   ├── App.css           # 应用样式
│   ├── index.css         # 全局样式
│   └── main.jsx          # 应用入口
├── dist/                 # 构建输出
├── package.json          # 项目配置
├── vite.config.js        # Vite配置
└── README.md            # 项目文档
```

## 部署说明

### 静态网站部署

构建完成后，`dist` 目录包含所有静态文件，可以部署到任何静态网站托管服务：

1. **Vercel部署**
   ```bash
   npm install -g vercel
   vercel --prod
   ```

2. **Netlify部署**
   - 将 `dist` 目录拖拽到 Netlify 部署页面
   - 或连接 Git 仓库自动部署

3. **GitHub Pages部署**
   ```bash
   npm run build
   # 将 dist 目录内容推送到 gh-pages 分支
   ```

### 服务器部署

如需在服务器上部署：

```bash
# 安装 serve 工具
npm install -g serve

# 启动静态文件服务
serve -s dist -l 3000
```

## 自定义配置

### 修改主题色彩

在 `src/index.css` 中修改 CSS 变量：

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --secondary: 210 40% 96%;
  /* 其他颜色变量 */
}
```

### 添加新语言

在 `src/App.jsx` 中的 `translations` 对象添加新语言：

```javascript
const translations = {
  zh: { /* 中文翻译 */ },
  en: { /* 英文翻译 */ },
  fr: { /* 法文翻译 */ },
  // 添加更多语言...
}
```

### 修改API接口

目前使用模拟数据，如需连接真实API，修改 `handleGenerateStory` 函数：

```javascript
const handleGenerateStory = async () => {
  try {
    const response = await fetch('/api/generate-story', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        theme: storyTheme,
        language: selectedLanguage,
        illustrationStyle,
        voiceType
      })
    });
    const data = await response.json();
    // 处理返回数据
  } catch (error) {
    console.error('生成故事失败:', error);
  }
};
```

## 浏览器支持

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 性能优化

- ✅ 代码分割和懒加载
- ✅ 图片优化和压缩
- ✅ CSS和JS文件压缩
- ✅ 现代浏览器优化
- ✅ 响应式图片加载

## 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系我们

- 项目维护者: Manus AI Team
- 邮箱: support@suno-storybook.com
- 官网: https://suno-storybook.com

## 更新日志

### v1.0.0 (2024-07-03)
- 🎉 初始版本发布
- ✨ 完整的儿童绘本创作界面
- 🎨 精美的UI设计和动画效果
- 📱 响应式设计支持
- 🌍 多语言支持 (中文/英文)
- 🎵 语音类型选择功能
- 🖼️ 插画风格选择功能

---

**让每个孩子都拥有属于自己的独特故事！** ✨

