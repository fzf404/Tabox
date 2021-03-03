# 📦Tabox

> 使用React+Antd
>
> 🚲正在如火如荼的开发着~

![image-20210303205907773](https://gitee.com/nmdfzf404/Image-hosting/raw/master/2021/image-20210303205907773.png)

### 🚀在本地使用

1. 安装Nodejs
2. Clone本项目
3. 编辑`/src/config/xxx.yml`，配置标签
4. 安装依赖

```bash
npm install		# 安装依赖
npm run build	# 构建今天页面
```

5. 生成的静态网页就会出现在`/build`文件夹中

### 🚕使用GithubAction

1. Fork本项目，并编辑配置文件

2. 在Fork的项目中添加私钥，名为`TABOX_DEPLOY_PRI`

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

- [ ] 加载GitHub项目

  > 配置用户名，Tabox自动列出改用户的所有项目