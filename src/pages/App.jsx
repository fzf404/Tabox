/*
 * @Author: fzf404
 * @Date: 2022-04-23 19:52:16
 * @LastEditTime: 2022-06-02 22:48:17
 * @Description: 主页
 */
import { useState, useEffect } from 'react'
import YAML from 'yaml'
import UrlParse from 'url-parse'

// 组件库
import {
  Spin,
  Layout,
  Menu,
  Space,
  Form,
  Avatar,
  Typography,
  Input,
  Checkbox,
  Drawer,
  Switch,
  Row,
  Col,
  PageHeader,
  Card,
  Button,
  Empty,
  BackTop,
  Alert,
} from 'antd'
// 图标
import { GithubFilled, SettingFilled, ShareAltOutlined } from '@ant-design/icons'

// 编辑器
import Editor from '@monaco-editor/react'

const { Header, Content, Footer, Sider } = Layout
const { Paragraph, Title } = Typography
const { Search } = Input
const { Meta } = Card

export default function App() {
  // 配置文件信息
  const [config, setConfig] = useState({
    loading: true, // 是否加载中
    url: 'config.yaml', // 配置文件路径
    yaml: '', // yaml格式的配置文件
    json: {}, // json格式的配置文件
  })

  // 侧栏折叠
  const [navCollapsed, setNavCollapsed] = useState(false)

  // 设置信息
  const [setting, setSetting] = useState({
    show: false, // 展示设置面板
    edit: false, // 是否为编辑模式
    error: false, // 配置文件格式错误
  })

  // 搜索配置
  const [search, setSearch] = useState({
    checkedMenu: '', // 当前选中的菜单
    checkedKeys: [], // 当前选中的配置项
  })

  // Github 配置
  const [github, setGithub] = useState({
    loading: true, // 是否加载中
    data: [], // 个人仓库数据
  })

  // 左上角时间
  const [time, setTime] = useState(new Date())

  setInterval(() => {
    setTime(new Date())
  }, 1000)

  // 读取配置数据
  useEffect(() => {
    // 是否为编辑模式
    if (localStorage.getItem('tabox-edit-mode') === 'true') {
      loadConfig()
    } else {
      fetchConfig()
    }
  }, [])

  // config 更改后更新配置
  useEffect(() => {
    if (Object.keys(config.yaml).length) {
      // 写入默认折叠状态
      setNavCollapsed(config.json.Config.hide)
      // 写入默认搜索配置
      setSearch({
        checkedMenu: Object.keys(config.json.Search)[0],
        checkedKeys: [Object.keys(config.json.Search[Object.keys(config.json.Search)[0]])[0]],
      })
      // 加载成功
      setConfig({ ...config, loading: false })
      // 保存配置信息
      localStorage.setItem('tabox-config', JSON.stringify(config.json))
      // 判断是否将配置 github 信息
      if (config.json.Tabox.Github !== undefined) {
        // 加载 github 仓库信息
        fetch(`https://api.github.com/users/${config.json.Tabox.Github.name}/repos?per_page=100`)
          .then((res) => res.json())
          .then((data) => {
            let repoInfo = data
            // 按照 star 数排序
            repoInfo.sort((a, b) => {
              return b.stargazers_count - a.stargazers_count
            })
            // 设置 Github 信息
            setGithub({ loading: false, data: repoInfo })
          })
      }
    }
  }, [config.json])

  // 请求配置文件
  const fetchConfig = () => {
    fetch(config.url)
      .then((res) => res.text())
      .then((text) => {
        try {
          // 验证合法性
          const parse = YAML.parse(text)
          if (parse.Config === undefined) {
            // 配置文件格式错误
            return setSetting({ ...setting, error: true })
          }
        } catch {
          // 配置文件格式错误
          return setSetting({ ...setting, error: true })
        }
        setConfig({ ...config, yaml: text, json: YAML.parse(text) })
      })
  }

  // 加载配置文件
  const loadConfig = () => {
    const text = localStorage.getItem('tabox-config')
    const parse = JSON.parse(text)
    setConfig({ ...config, yaml: YAML.stringify(parse), json: parse })
    setSetting({ ...setting, edit: true })
  }

  // 点击侧边栏滚动
  const onMenuSelect = (e) => {
    document.getElementById(e.key).scrollIntoView({ block: 'center', behavior: 'smooth' })
  }

  // 网站 logo 预解析
  const getICO = (logo, url) => {
    return logo ? logo : UrlParse(url).origin + '/favicon.ico'
  }

  // 配置文件更改
  const onConfigEdit = (text) => {
    try {
      // 验证合法性
      YAML.parse(text)
    } catch {
      // 配置文件格式错误
      return setSetting({ ...setting, error: true })
    }
    // 解析配置文件
    const parse = YAML.parse(text)
    // 写入配置信息
    setSetting({ ...setting, error: false })
    setConfig({ ...config, yaml: text, json: parse })
    // 存储配置信息
    localStorage.setItem('tabox-config', JSON.stringify(parse))
  }

  // 点击搜索
  const onSearch = (e) => {
    // 遍历选中的配置项
    search.checkedKeys.forEach((key) => {
      // 打开网页
      window.open(config.json.Search[search.checkedMenu][key] + e)
    })
  }

  return config.loading ? (
    <Spin tip="Loading" size="large" style={{ width: '100vw', height: '100vh', marginTop: '16rem' }} />
  ) : (
    <Layout
      style={{
        minHeight: '100vh',
      }}>
      {/* 侧边导航栏 */}
      <Sider
        collapsible
        collapsed={navCollapsed}
        onCollapse={() => setNavCollapsed(!navCollapsed)}
        width="220px"
        style={{ position: 'fixed', height: '100vh' }}>
        {/* 网站标题 */}
        <Space direction="vertical" size="middle" style={{ margin: '1.3rem 1.3rem 0' }}>
          <a target="_blank" href={config.json.Config.link} rel="noreferrer">
            <Avatar shape="square" size="large" src={config.json.Config.logo} />
          </a>
          <Title level={2} style={{ color: '#eee', display: navCollapsed ? 'none' : null }}>
            {config.json.Config.title}
          </Title>
        </Space>
        {/* 侧边导航栏菜单 */}
        <Menu
          theme="dark"
          defaultSelectedKeys={[Object.keys(config.json.Tabox)[0]]}
          mode="inline"
          onSelect={onMenuSelect}>
          {Object.keys(config.json.Tabox).map((menuKey) => {
            const menuItem = config.json.Tabox[menuKey] // 菜单项
            return (
              <Menu.Item key={menuKey}>
                <Space>
                  <Avatar shape="square" size="small" src={menuItem.logo} />
                  {navCollapsed ? null : menuKey}
                </Space>
              </Menu.Item>
            )
          })}
        </Menu>
      </Sider>
      {/* 内容区 */}
      <Layout
        style={{
          marginLeft: navCollapsed ? '80px' : '220px',
          transition: navCollapsed ? 'margin-left 200ms' : 'margin-left 400ms',
        }}>
        {/* 顶部导航 */}
        <Header style={{ backgroundColor: '#abc' }}>
          {/* 时间 */}
          <Title
            level={3}
            style={{
              color: '#fff',
              marginTop: '1rem',
              float: 'left',
            }}>
            {time.getHours() < 10 ? '0' + time.getHours() : time.getHours()}:
            {time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()}:
            {time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()}
          </Title>
          {/* 图标 */}
          <Title
            level={3}
            style={{
              color: '#fff',
              marginTop: '1rem',
              float: 'right',
              cursor: 'pointer',
            }}>
            <Space size="middle">
              <a href="https://github.com/fzf404/Tabox" target="_blank" rel="noreferrer">
                <GithubFilled style={{ color: '#fff' }} />
              </a>
              {/* <ShareAltOutlined /> */}
              <SettingFilled onClick={() => setSetting({ ...setting, show: true })} />
            </Space>
          </Title>
          {/* 设置菜单 */}
          <Drawer
            title="设置"
            placement="right"
            width={document.body.clientWidth < 960 ? '500px' : '600px'}
            onClose={() => {
              setSetting({ ...setting, show: false })
            }}
            visible={setting.show}
            extra={
              <Space>
                {/* 重置设置 */}
                <Button
                  onClick={() => {
                    localStorage.clear()
                    window.location.reload()
                  }}
                  danger>
                  重置
                </Button>
              </Space>
            }>
            <Space direction="vertical" size="middle">
              <Space>
                <span>链接模式</span>
                <Switch
                  checked={setting.edit}
                  onChange={(checked) => {
                    setSetting({ ...setting, edit: checked })
                    localStorage.setItem('tabox-edit-mode', checked)
                  }}
                />
                <span>编辑模式</span>
              </Space>
              {setting.edit ? null : (
                <Space>
                  <span>配置链接</span>
                  <Input
                    value={config.url}
                    onChange={(e) => {
                      setConfig({ ...config, url: e.target.value })
                    }}
                  />
                  <Button type="primary" onClick={fetchConfig}>
                    确定
                  </Button>
                </Space>
              )}
              {/* 配置文件格式错误提醒 */}
              {setting.error ? (
                <Alert message="配置文件不合法" type="warning" style={{ marginBottom: '1rem' }} showIcon />
              ) : null}
            </Space>

            {/* 配置文件编辑器 */}
            {setting.edit ? (
              <Editor
                height="80vh"
                defaultLanguage="yaml"
                defaultValue={config.yaml}
                onChange={onConfigEdit}
                options={{
                  minimap: {
                    enabled: false,
                  },
                }}
              />
            ) : null}
          </Drawer>
        </Header>
        <Content>
          {/* 搜索栏 */}
          <div
            style={{
              width: '60%',
              maxWidth: '32rem',
              margin: '2rem auto',
            }}>
            {/* 搜索菜单 */}
            <Menu
              style={{ backgroundColor: 'transparent' }}
              mode="horizontal"
              selectedKeys={search.checkedMenu}
              onClick={(e) => {
                setSearch({ ...search, checkedMenu: e.key, checkedKeys: [] })
              }}>
              {Object.keys(config.json.Search).map((searchMenuKey) => {
                return <Menu.Item key={searchMenuKey}>{searchMenuKey}</Menu.Item>
              })}
            </Menu>
            {/* 搜索栏 */}
            <Search
              placeholder="Search"
              enterButton="搜 索"
              size="large"
              style={{ margin: '1rem 0' }}
              onSearch={onSearch}
            />
            {/* 搜索范围 */}
            <Checkbox.Group
              defaultValue={search.checkedKeys}
              style={{ width: '100%', margin: '0 1rem' }}
              onChange={(check) => {
                setSearch({ ...search, checkedKeys: check })
              }}>
              <Row>
                {Object.keys(config.json.Search[search.checkedMenu]).map((searchItemKey) => {
                  return (
                    <Col span={5} key={searchItemKey}>
                      <Checkbox value={searchItemKey}>{searchItemKey}</Checkbox>
                    </Col>
                  )
                })}
              </Row>
            </Checkbox.Group>
          </div>
          {/* 标签页内容 */}
          <main>
            {/* 遍历标签组 */}
            {Object.keys(config.json.Tabox).map((tabKey) => {
              const menuBox = config.json.Tabox[tabKey]
              return (
                <div
                  id={tabKey}
                  key={tabKey}
                  style={{
                    margin: navCollapsed
                      ? document.body.clientWidth < 960
                        ? '0 1rem 0 2rem'
                        : '0 4rem 0 6rem'
                      : document.body.clientWidth < 960
                      ? '0 1rem 0 2rem'
                      : '0 2rem 0 4rem',
                    transition: 'margin 300ms',
                  }}>
                  {/* 标签组标题 */}
                  <PageHeader
                    title={tabKey}
                    subTitle={menuBox.description}
                    avatar={{
                      src: menuBox.logo,
                      shape: 'square',
                    }}>
                    <Paragraph
                      style={{
                        marginLeft: '1rem',
                      }}>
                      {/* 标签组内容 */}
                      <Row gutter={[16, 16]}>
                        {Object.keys(menuBox).map((boxKey) => {
                          // 说明内容不渲染
                          if (
                            boxKey === 'url' ||
                            boxKey === 'logo' ||
                            boxKey === 'description' ||
                            boxKey === 'Ignore'
                          ) {
                            return null
                          }
                          const tabItem = config.json.Tabox[tabKey][boxKey]
                          // github 渲染
                          if (tabKey === 'Github' && boxKey === 'name') {
                            // 获取忽略的仓库
                            const ignoreItems = config.json.Tabox.Github.Ignore
                            // 判断 GIthub 仓库是否加载成功
                            return github.loading ? (
                              <Empty />
                            ) : (
                              github.data.map((githubItem) => {
                                if (ignoreItems.some((name) => name === githubItem.name)) {
                                  return null
                                }
                                return (
                                  <Col key={githubItem.name}>
                                    {/* 仓库信息 */}
                                    <a href={githubItem.html_url} target="_blank" rel="noreferrer">
                                      <Card
                                        size="small"
                                        hoverable
                                        style={{ width: '12rem', height: '5.4rem', borderRadius: '1rem' }}>
                                        <Meta
                                          className="github"
                                          // 仓库名称
                                          title={githubItem.name}
                                          // 仓库 star 数
                                          avatar={
                                            <div>
                                              <span style={{ color: '#08e', fontSize: '1rem', fontWeight: '600' }}>
                                                {githubItem.stargazers_count}
                                              </span>
                                            </div>
                                          }
                                          // 仓库描述
                                          description={
                                            githubItem.description
                                              ? githubItem.description.length > 24
                                                ? githubItem.description.substring(0, 22) + '..'
                                                : githubItem.description
                                              : null
                                          }
                                        />
                                      </Card>
                                    </a>
                                  </Col>
                                )
                              })
                            )
                          }
                          // 备忘录渲染
                          if (tabKey === 'Memo' && boxKey === 'content') {
                            return (
                              <pre
                                style={{
                                  width: '50%',
                                  maxWidth: '32rem',
                                  marginLeft: '1rem',
                                  padding: '.5rem 1rem',
                                }}>
                                {tabItem}
                              </pre>
                            )
                          }
                          // 默认渲染
                          return tabItem ? (
                            <Col key={boxKey}>
                              {/* 标签内容 */}
                              <a href={tabItem[0]} target="_blank" rel="noreferrer">
                                <Card size="small" hoverable style={{ width: '12rem', borderRadius: '1rem' }}>
                                  <Meta
                                    // 标签标题
                                    title={boxKey}
                                    // 标签头像
                                    avatar={<Avatar shape="square" size="large" src={getICO(tabItem[2], tabItem[0])} />}
                                    // 标签描述
                                    description={tabItem[1]}
                                  />
                                </Card>
                              </a>
                            </Col>
                          ) : null
                        })}
                      </Row>
                    </Paragraph>
                  </PageHeader>
                </div>
              )
            })}
          </main>
          {/* 回到顶部 */}
          <BackTop />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Tabox ©{new Date().getFullYear()} - Created by{' '}
          <a target="_blank" href="https://www.fzf404.top" rel="noreferrer">
            fzf404
          </a>
        </Footer>
      </Layout>
    </Layout>
  )
}
