# 前端部署说明

## 部署选项

### 选项1：GitHub Pages (推荐)
1. 创建GitHub仓库
2. 将frontend_deploy文件夹内容推送到仓库
3. 在仓库设置中启用GitHub Pages
4. 选择部署源为GitHub Actions或master分支

### 选项2：Netlify
1. 访问 https://netlify.com
2. 点击"New site from Git"
3. 选择GitHub仓库
4. 配置构建设置：
   - Build command: (留空)
   - Publish directory: .

### 选项3：Vercel
1. 访问 https://vercel.com
2. 导入GitHub仓库
3. 配置项目设置

## 重要配置

部署后需要修改api_client.js中的API地址：
将 `const apiClient = new ApiClient();` 
改为 `const apiClient = new ApiClient('https://your-api-domain.vercel.app');`

## 部署检查清单

- [ ] 所有HTML文件已上传
- [ ] api_client.js文件已上传
- [ ] API地址已正确配置
- [ ] 可以正常访问首页
- [ ] 用户注册功能正常
- [ ] 用户登录功能正常
- [ ] 帖子创建功能正常