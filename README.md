# 📦 Tabox

> 通过编写 YAML 配置文件, 快速建立属于自己的标签页
>
> 使用 React + Antd 开发
>
> [预览地址](https://tab.fzf404.art/)

![Tabox](https://img.fzf404.art/tabox/v1.0.0.webp)

## 🚄 特性

- 全功能配置
- 支持多平台搜索
- 网站图标自动加载
- 用户 Github 仓库展示

## 🚀 快速开始

### 🖥 本机使用

1. 访问 [https://tab.fzf404.art/](https://tab.fzf404.art/)
2. 点击右上角的设置图标, 切换到编辑模式
3. 编辑 YAML 配置文件, 实时预览效果，编辑完成后点击右上角的保存
4. 可将配置文件上传至 `Github Gist`, 从 CDN 加载配置文件
5. 使用 `New Tab Override` 插件, 将 `https://tab.fzf404.art/` 设置为默认标签页

> 注: 切换编辑 / 链接模式后，需要点击设置菜单右上角的保存按钮

### 🎁 Github Pages

> 也可使用 Gitee Pages

1. Clone 本项目
2. **切换到 `gh-pages` 分支**
3. 按照自己的喜好, 编辑 `config.yaml` 文件
4. 将代码推送至 github，启用 Github Pages
5. 访问 Github Pages

### 💾 服务器

> 推荐使用 debian / ubuntu

```bash
# 1. 安装 nginx / git
apt install git nginx -y

# 2. 切换到 nginx 目录
cd /var/www/html/

# 3. clone 项目
git clone https://github.com/fzf404/Tabox.git -b gh-pages --depth 1 .

# 4. 访问网站
http://{server_ip}/
```

### 💡 配置文件托管

> 待完成...

## 🔥 提交配置文件

> 欢迎提交自己的配置文件
