# 📦 Tabox

> 编写 yaml 配置文件, 快速建立属于自己的标签页
>
> 预览：[https://tab.fzf404.top/](https://tab.fzf404.top/)
>
> 预览：[https://fzf404.github.io/Tabox/](https://fzf404.github.io/Tabox/)
>
> 使用 React + Antd 开发

![show](show.jpeg)

## 🚄 特性

- 支持多平台同时搜索
  
- 配置用户名即可加载该用户在 Github 中的所有项目
  
- 备忘录功能

## 🚀 快速开始

### 🖥　本机使用

1. 访问 [https://tab.fzf404.top/](https://tab.fzf404.top/)
   
2. 点击右上角的设置, 根据注释信息编辑配置, 实时预览并保存至浏览器

   > 推荐使用 [VectorLogo](https://worldvectorlogo.com) 寻找适合的 logo
   > 
   > 找到后 右键 -> 复制图像地址

3. 使用 `New Tab Override` 插件, 将 `https://tab.fzf404.top/` 设置为默认标签页

> 注: 编辑过后如需加载云端最新配置, 点击设置菜单右上角的清除按钮


### 🎁 Github Pages

> 也可使用 Gitee Pages

1. Fork 本项目
   
2. **切换到 `gh-pages` 分支**
   
3. 启用 Github Pages
   
4. 按照自己的喜好, 编辑 `config.yaml` 文件
   
   > 可先执行 `本机使用` , 将配置文件复制过来

5. 访问 Github Pages

### 💾 服务器

> 推荐使用 debian / ubuntu

```bash
# 0. 执行上方 Github Page 的操作

# 1. 安装 nginx / git
apt install git nginx -y

# 2. 切换到 nginx 目录
cd /var/www/html/

# 3. clone 项目的 gh-pages 分支
git clone https://github.com/fzf404/Tabox.git -b gh-pages --depth 1
# github 国内加速
git clone https://hub.fastgit.xyz/fzf404/Tabox.git -b gh-pages --depth 1

# 4. 访问
http://your_ip/Tabox/

# 5. 自动部署

```

### 💡 配置文件托管

> 接入托管平台
> 
> 待完成...

## 🔥 提交配置文件

> 欢迎在 `example` 文件夹中提交自己的配置文件
