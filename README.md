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

### 🚀部署

1. Fork本项目
2. Clone下来Fork的代码(在`gh-pages`分支中)

    ```bash
    # 注意：别忘了用户名
    git clone https://github.com/fzf404/Tabox.git -b gh-pages --depth 1
    ```

3. 修改配置文件

    ```bash
    |- logo				# 放置网站logo图像的位置
    |- static
      |- css
      |- js
      |- media    # 配置文件
        # 文件中有详细的注释
        |- headbox.xxxxx.yml		# 网站标题及搜索栏的配置
        |- tabox.xxxxx.yml			# 标签的配置
    ```

4. 将代码同步至git仓库

5. 可配置GithubPage部署网站（或使用Webfiy）

### 🚕二次开发

1. 安装NodeJS
2. Fork本项目并Clone至本地
3. 安装依赖

    ```bash
    # 安装依赖
    yarn	# 更推荐使用yarn
    # 运行
    yarn start
    # 构建
    yarn build
    ```

4. 编辑`/src/config/xxx.yml`，配置标签页内容

    ```bash
    # 配置文件中有详细的说明哦
    |- src
      |- config
        |- headbox.yml		# 网站标题及搜索栏的配置
        |- tabox.yml			# 标签的配置
      |- components				# 各种组件
        |- GithubBox.js
      |- pages						# 主页模板与css
      |- Router.js				# 路由

    # 放置Logo图像的位置
    |- public -> logo

    ```


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
- [x] 允许子路径部署
- [x] 允许引入网络图片
- [ ]  服务器性能监控

## 🚨遇到问题

提issue

(๑•̀ㅂ•́)و✧  或加qq: 441535134 
