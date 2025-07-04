# 部署指南

本文档详细说明如何将Suno AI儿童绘本创作平台部署到各种环境中。

## 目录

1. [环境准备](#环境准备)
2. [本地开发](#本地开发)
3. [生产构建](#生产构建)
4. [静态网站部署](#静态网站部署)
5. [服务器部署](#服务器部署)
6. [Docker部署](#docker部署)
7. [CI/CD配置](#cicd配置)
8. [故障排除](#故障排除)

## 环境准备

### 系统要求

- **操作系统**: Windows 10+, macOS 10.15+, Ubuntu 18.04+
- **Node.js**: 18.0.0 或更高版本
- **内存**: 最少 4GB RAM
- **存储**: 最少 1GB 可用空间

### 安装Node.js

#### Windows
```bash
# 使用 Chocolatey
choco install nodejs

# 或下载安装包
# https://nodejs.org/zh-cn/download/
```

#### macOS
```bash
# 使用 Homebrew
brew install node

# 或使用 MacPorts
sudo port install nodejs18
```

#### Ubuntu/Debian
```bash
# 使用 NodeSource 仓库
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 验证安装
node --version
npm --version
```

## 本地开发

### 1. 克隆项目

```bash
git clone https://github.com/your-username/children-storybook-website.git
cd children-storybook-website
```

### 2. 安装依赖

```bash
# 使用 npm
npm install --legacy-peer-deps

# 或使用 yarn
yarn install

# 或使用 pnpm
pnpm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:5173` 查看应用。

### 4. 开发环境配置

创建 `.env.local` 文件：

```env
# API配置
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_TITLE=Suno AI儿童绘本创作平台

# 功能开关
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true
```

## 生产构建

### 1. 构建项目

```bash
npm run build
```

构建完成后，所有文件将输出到 `dist` 目录。

### 2. 预览构建结果

```bash
npm run preview
```

### 3. 构建优化

#### 分析包大小
```bash
npm install --save-dev rollup-plugin-visualizer
```

在 `vite.config.js` 中添加：

```javascript
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  plugins: [
    // 其他插件...
    visualizer({
      filename: 'dist/stats.html',
      open: true
    })
  ]
}
```

## 静态网站部署

### Vercel部署

#### 方法1: CLI部署
```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署
vercel --prod
```

#### 方法2: Git集成
1. 将代码推送到GitHub
2. 在Vercel控制台导入项目
3. 配置构建设置：
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install --legacy-peer-deps`

### Netlify部署

#### 方法1: 拖拽部署
1. 运行 `npm run build`
2. 将 `dist` 目录拖拽到 Netlify 部署页面

#### 方法2: Git集成
1. 连接GitHub仓库
2. 配置构建设置：
   ```
   Build command: npm run build
   Publish directory: dist
   ```

#### 方法3: CLI部署
```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录
netlify login

# 部署
netlify deploy --prod --dir=dist
```

### GitHub Pages部署

#### 使用GitHub Actions

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm install --legacy-peer-deps
      
    - name: Build
      run: npm run build
      
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### 阿里云OSS部署

```bash
# 安装阿里云CLI工具
npm install -g @alicloud/cli

# 配置访问密钥
aliyun configure

# 上传文件
aliyun oss cp dist/ oss://your-bucket-name/ --recursive
```

## 服务器部署

### Nginx配置

#### 1. 安装Nginx

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# CentOS/RHEL
sudo yum install nginx
```

#### 2. 配置Nginx

创建 `/etc/nginx/sites-available/storybook`：

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/storybook/dist;
    index index.html;

    # Gzip压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # 缓存静态资源
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
}
```

#### 3. 启用站点

```bash
sudo ln -s /etc/nginx/sites-available/storybook /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Apache配置

创建 `.htaccess` 文件：

```apache
RewriteEngine On
RewriteBase /

# Handle Angular and Vue.js routes
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# 启用Gzip压缩
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# 设置缓存
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/ico "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

## Docker部署

### 1. 创建Dockerfile

```dockerfile
# 多阶段构建
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# 生产镜像
FROM nginx:alpine

# 复制构建文件
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制Nginx配置
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### 2. 创建nginx.conf

```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    keepalive_timeout  65;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    server {
        listen       80;
        server_name  localhost;
        root   /usr/share/nginx/html;
        index  index.html index.htm;

        location / {
            try_files $uri $uri/ /index.html;
        }

        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

### 3. 构建和运行

```bash
# 构建镜像
docker build -t storybook-app .

# 运行容器
docker run -d -p 80:80 --name storybook storybook-app

# 使用docker-compose
```

### 4. docker-compose.yml

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
    
  # 如果需要后端API
  api:
    image: your-api-image
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

## CI/CD配置

### GitHub Actions

创建 `.github/workflows/ci-cd.yml`：

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm install --legacy-peer-deps
      
    - name: Run tests
      run: npm test
      
    - name: Run linting
      run: npm run lint

  build:
    needs: test
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm install --legacy-peer-deps
      
    - name: Build
      run: npm run build
      
    - name: Upload build artifacts
      uses: actions/upload-artifact@v3
      with:
        name: dist
        path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Download build artifacts
      uses: actions/download-artifact@v3
      with:
        name: dist
        path: dist/
        
    - name: Deploy to production
      run: |
        # 部署脚本
        echo "Deploying to production..."
```

### GitLab CI

创建 `.gitlab-ci.yml`：

```yaml
stages:
  - test
  - build
  - deploy

variables:
  NODE_VERSION: "18"

cache:
  paths:
    - node_modules/

test:
  stage: test
  image: node:$NODE_VERSION
  script:
    - npm install --legacy-peer-deps
    - npm run test
    - npm run lint

build:
  stage: build
  image: node:$NODE_VERSION
  script:
    - npm install --legacy-peer-deps
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 hour

deploy:
  stage: deploy
  image: alpine:latest
  script:
    - apk add --no-cache rsync openssh
    - rsync -avz --delete dist/ user@server:/var/www/html/
  only:
    - main
```

## 故障排除

### 常见问题

#### 1. 依赖安装失败

```bash
# 清除缓存
npm cache clean --force

# 删除node_modules重新安装
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

#### 2. 构建失败

```bash
# 检查Node.js版本
node --version

# 增加内存限制
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

#### 3. 路由404问题

确保服务器配置了SPA路由回退：

```nginx
# Nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

```apache
# Apache
RewriteRule . /index.html [L]
```

#### 4. 静态资源加载失败

检查 `vite.config.js` 中的 `base` 配置：

```javascript
export default {
  base: '/your-app-path/', // 如果部署在子目录
  // 或
  base: '/', // 如果部署在根目录
}
```

### 性能优化

#### 1. 启用Gzip压缩

```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
```

#### 2. 设置缓存头

```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

#### 3. 使用CDN

```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
}
```

### 监控和日志

#### 1. 错误监控

集成Sentry：

```bash
npm install @sentry/react @sentry/tracing
```

```javascript
// main.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

#### 2. 访问日志

```nginx
# Nginx日志配置
access_log /var/log/nginx/storybook_access.log;
error_log /var/log/nginx/storybook_error.log;
```

## 安全考虑

### 1. HTTPS配置

使用Let's Encrypt：

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### 2. 安全头

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';" always;
```

---

如有任何部署问题，请参考项目文档或联系技术支持团队。

