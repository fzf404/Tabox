#  📦Tabox

> 编写yaml配置文件，快速建立属于自己的标签页
>
> 预览：[https://tab.fzf404.top/](https://tab.fzf404.top/)
>
> 使用React+Antd开发

![image-20210305133016461](https://gitee.com/nmdfzf404/Image-hosting/raw/master/2021/20210621104207.png)

## 🚖特性

- 配置用户名即可加载该用户在Github中的所有项目
- 搜索栏支持多选跳转
- 备忘录功能

## 快速开始

### 🚀使用

1. 移步Action为我们生成好的静态页：[传送门](https://github.com/fzf404/TaboxPage)
2. Clone传送门所指向的项目
3. 修改配置文件

```bash
|- logo				# 放置不同网站logo图像的位置
|- static
	|- css			# 静态样式表
	|- js				# js文件
  |- media
    |- headbox.xxxxx.yml		# 网站标题及搜索栏的配置
    |- tabox.xxxxx.yml			# 标签的配置
```

4. 即可部署静态页，可使用GithubPage或GiteePage。
5. 或在个人服务器使用Nginx部署

### 🚕二次开发

1. 安装Nodejs
2. Fork本项目并Clone至本地
4. 安装依赖

```bash
npm install		# 安装依赖
yarn					# 推荐使用yarn

# 太慢的话可换源再安装
npm config set registry https://registry.npm.taobao.org
```

4. 编辑`/src/config/xxx.yml`，配置标签页内容

```bash
# 配置文件中有详细的说明哦
|- src
  |- config
    |- headbox.yml		# 网站标题及搜索栏的配置
    |- tabox.yml			# 标签的配置
  |- component				# 各种组件
  |- pages						# 主页模板与css
  |- Router.js				# 路由

# Logo图片的位置
|- public -> logo

npm start			# 运行此命令可实时预览
```

4. 生成的静态网页

```bash
npm run build
# 运行完成后 静态界面就会出现在 /build 文件夹中
```

### 🚕使用GithubAction

> 项目中已经写好了action配置文件，只需要修改几个环境变量即可~

1. 按照上一步在本地编辑好配置~

2. 把修改完的项目Push到github上

3. 在项目设置中添加私钥，名为`TABOX_DEPLOY_PRI`

	> 使用`ssh-keygen`命令在本地生成

4. 新建一个仓库，添加配对的公钥

	> 这里将会是Action生成的静态html文件

4. 编辑Fork仓库中的`.github\workflows\develop.yml`的env变量

   - `GIT_USER`: 你的名字
   - `GIT_EAMIL`: 你的邮箱

   - `REPO_URL`: 新建的仓库
   - `REPO_NAME`: 新建仓库的名称
   
6. Push上去，Action就会自动运行啦~

### 🚄部署到自己的服务器

1. 正在打算搞一个一键配置

## 🚟进度

- [x] 基本界面
- [x] yml文件解析
- [x] 多重搜索
- [x] 搜索聚合 

  - [ ] iframe跨域问题待解决
- [x] 使用Action自动部署
- [x] 自动加载GitHub仓库
  - [x] 忽略显示
  - [x] 配置项目头像
- [x] 搜索栏分类
- [x] 备忘录功能
- [x] 允许引入网络图片
- [ ]  服务器性能监控

## 🚨遇到问题

提issue

(๑•̀ㅂ•́)و✧  或加qq: 441535134 
