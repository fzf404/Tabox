#  📦Tabox

> 使用React+Antd
>
> 🚲正在如火如荼的开发着~
>
> 预览：[https://tab.fzf404.top/](https://tab.fzf404.top/)

![image-20210304221051489](C:\Users\44153\AppData\Roaming\Typora\typora-user-images\image-20210304221051489.png)

### 🚀在本地使用

1. 安装Nodejs
2. Clone本项目
4. 安装依赖

```bash
npm install		# 安装依赖
npm start			# 预览模式
npm run build	# 构建页面
```

4. 编辑`/src/config/xxx.yml`，配置标签

5. 生成的静态网页就会出现在`/build`文件夹中

### 🚕使用GithubAction

1. 在本地编辑好配置

2. 在Clone的项目中添加私钥，名为`TABOX_DEPLOY_PRI`

3. 新建一个仓库，添加配对的公钥。（这里是静态文件，并配置GithubPage

4. 编辑`.github\workflows\develop.yml`的env变量

   - `GIT_USER`: 你的名字
   - `GIT_EAMIL`: 你的邮箱

   - `REPO_URL`: 新建的仓库
   - `REPO_NAME`: 新建仓库的名称

5. 将修改完的Fork仓库Push上去，接着新建仓库中就有静态网页了

6. 可以在新建仓库中配置GithubPage了~

## 🚟进度

- [x] 基本界面
- [x] yml文件解析
- [x] 多重搜索
- [ ] 搜索聚合 

  - [ ] iframe跨域问题待解决
- [x] 使用Action自动部署
- [ ] 服务器性能监控
- [x] 自动加载GitHub仓库
  - [x] 忽略显示
  - [x] 配置项目头像
- [ ] 侧边栏子菜单