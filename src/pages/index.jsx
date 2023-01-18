import { useEffect, useState } from 'react'

import YAML from 'yaml'
import Editor from '@monaco-editor/react'

// 组件
import {
  Alert,
  Avatar,
  BackTop,
  Button,
  Card,
  Col,
  Drawer,
  Empty,
  Input,
  Layout,
  Menu,
  message,
  PageHeader,
  Radio,
  Result,
  Row,
  Space,
  Spin,
  Switch,
  Typography,
} from 'antd'

// 图标
import { GithubFilled, SettingFilled } from '@ant-design/icons'

// 组件解构
const { Header, Content, Footer, Sider } = Layout
const { Paragraph, Title } = Typography
const { Search } = Input
const { Meta } = Card

// 通知设置
message.config({ maxCount: 3 })

export default function App() {
  // 配置信息
  const [config, setConfig] = useState(() => {
    // 默认配置
    const config = {
      url: 'config.yaml', // 配置路径
      yaml: '', // yaml 格式配置文件
      json: {}, // json 格式配置文件
      edit: false, // 编辑模式
      error: false, // 配置异常
      loading: true, // 正在加载
    }

    // 编辑模式
    if (localStorage.getItem('tabox-edit') === 'true') {
      const storeConfig = localStorage.getItem('tabox-config')
      config.yaml = storeConfig
      config.json = YAML.parse(storeConfig)
      config.edit = true
    }

    // 链接模式
    if (localStorage.hasOwnProperty('tabox-url')) {
      config.url = localStorage.getItem('tabox-url')
    }

    return config
  })

  // 侧栏折叠
  const [navCollapsed, setNavCollapsed] = useState(false)

  // 设置折叠
  const [settingCollapsed, setSettingCollapsed] = useState(false)

  // 搜索配置
  const [search, setSearch] = useState({
    checkedMenu: '', // 当前选中的菜单
    checkedKeys: '', // 当前选中的配置项
  })

  // github 配置
  const [github, setGithub] = useState({
    data: [], // 个人仓库数据
    loading: true, // 是否加载中
  })

  // 时间数据
  const [time, setTime] = useState(new Date().toLocaleTimeString())

  // 更新时间
  setInterval(() => {
    setTime(new Date().toLocaleTimeString())
  }, 1000)

  // 加载配置
  useEffect(() => {
    if (!config.edit) {
      fetchConfig()
    }
  }, [])

  // 更新配置
  useEffect(() => {
    if (config.json.hasOwnProperty('Config')) {
      // 默认折叠状态
      setNavCollapsed(config.json.Config.hide)
      // 默认搜索配置
      const defaulCheckedMenu = Object.keys(config.json.Search)[0]
      const defaultCheckedKey = Object.keys(config.json.Search[defaulCheckedMenu])[0]
      setSearch({
        checkedMenu: defaulCheckedMenu,
        checkedKeys: defaultCheckedKey,
      })
      // 加载成功
      setConfig({ ...config, loading: false })
      // github 配置
      if (config.json.Tabox.hasOwnProperty('Github')) {
        // 加载 github 仓库信息
        fetch(`https://api.github.com/users/${config.json.Tabox.Github.name}/repos?per_page=100`)
          .then((res) => res.json())
          .then((data) => {
            if (data.length > 0) {
              // 按照 star 数排序
              data.sort((a, b) => {
                return b.stargazers_count - a.stargazers_count
              })
              // 设置 Github 信息
              setGithub({ loading: false, data: data })
            }
          })
      }
    }
  }, [config.json])

  // 请求配置文件
  const fetchConfig = () => {
    // 请求配置文件
    fetch(config.url)
      .then((res) => res.text())
      .then((text) => {
        try {
          // 验证合法性
          const parse = YAML.parse(text)
          // 配置文件格式错误
          if (!parse.hasOwnProperty('Config')) {
            return setConfig({ ...config, error: true })
          }
        } catch {
          // 解析错误
          return setConfig({ ...config, error: true })
        }
        // 设置配置文件
        setConfig({ ...config, error: false, yaml: text, json: YAML.parse(text) })
      })
      // 请求失败
      .catch(() => {
        return setConfig({ ...config, error: true })
      })
  }

  // 网站 logo 预解析
  const getICO = (logo, url) => {
    return logo ? logo : new URL(url).origin + '/favicon.ico'
  }

  // 重置设置
  const reset = () => {
    localStorage.clear()
    location.reload()
  }

  return config.loading ? (
    // 配置文件格式错误
    config.error ? (
      <Result
        status="warning"
        title="配置文件加载错误！"
        extra={
          <Space>
            <Button ghost type="primary" href="/">
              回到主页
            </Button>
            <Button danger type="primary" onClick={reset}>
              重置设置
            </Button>
          </Space>
        }
      />
    ) : (
      // 加载中
      <Spin size="large" style={{ width: '100vw', height: '100vh', marginTop: '30vh' }} />
    )
  ) : (
    <Layout
      style={{
        minHeight: '100vh',
      }}>
      {/* 侧边导航栏 */}
      <Sider
        collapsible
        width="220px"
        collapsed={navCollapsed}
        onCollapse={() => setNavCollapsed(!navCollapsed)}
        style={{ position: 'fixed', height: '100vh', zIndex: 10 }}>
        {/* 网站标题 */}
        <Space direction="vertical" size="middle" style={{ margin: '1.4rem 1.4rem 0' }}>
          <a target="_blank" href={config.json.Config.link} rel="noreferrer">
            <Avatar shape="square" size="large" src={config.json.Config.logo} />
          </a>
          <Title level={2} style={{ height: '2rem', color: '#eee', display: navCollapsed ? 'none' : null }}>
            <span style={{ position: 'absolute' }}> {config.json.Config.title}</span>
          </Title>
        </Space>
        {/* 侧边导航栏菜单 */}
        <Menu
          theme="dark"
          defaultSelectedKeys={Object.keys(config.json.Tabox)[0]}
          mode="inline"
          onSelect={(event) => {
            // 侧边栏点击滚动
            document.getElementById(event.key).scrollIntoView({ block: 'center', behavior: 'smooth' })
          }}>
          {Object.keys(config.json.Tabox).map((menuKey) => {
            // 菜单项
            const menuItem = config.json.Tabox[menuKey]
            return (
              <Menu.Item key={menuKey}>
                <Space>
                  <Avatar shape="square" size="small" className={{ height: '80%' }} src={menuItem.logo} />
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
            {time}
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
              {/* Github */}
              <a href="https://github.com/fzf404/Tabox" target="_blank" rel="noreferrer">
                <GithubFilled style={{ color: '#fff' }} />
              </a>
              {/* 设置 */}
              <SettingFilled onClick={() => setSettingCollapsed(true)} />
            </Space>
          </Title>
          {/* 设置菜单 */}
          <Drawer
            title="设置"
            placement="right"
            width={document.body.clientWidth < 960 ? '480px' : '560px'}
            open={settingCollapsed}
            onClose={() => {
              setSettingCollapsed(false)
            }}
            extra={
              <Space>
                {/* 保存设置 */}
                <Button
                  ghost
                  type="primary"
                  disabled={config.error}
                  onClick={() => {
                    // 保存配置模式
                    localStorage.setItem('tabox-edit', config.edit)
                    // 判断配置模式
                    if (config.edit) {
                      // 保存配置信息
                      localStorage.setItem('tabox-config', config.yaml)
                    } else {
                      // 保存配置文件地址
                      localStorage.setItem('tabox-url', config.url)
                    }
                    // 成功通知
                    message.success('保存成功')
                  }}>
                  保存
                </Button>
                {/* 重置设置 */}
                <Button danger type="primary" onClick={reset}>
                  重置
                </Button>
              </Space>
            }>
            {/* 设置内容 */}
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              {/* 模式配置 */}
              <Space>
                <span>链接模式</span>
                <Switch
                  checked={config.edit}
                  onChange={(checked) => {
                    setConfig({ ...config, error: false, edit: checked })
                  }}
                />
                <span>编辑模式</span>
              </Space>
              {/* 错误提醒 */}
              {config.error ? <Alert message="配置文件不合法" type="warning" showIcon /> : null}
              {/* 链接配置 */}
              {config.edit ? null : (
                <Space>
                  <span>配置链接</span>
                  <Input
                    value={config.url}
                    onPressEnter={fetchConfig}
                    onChange={(event) => {
                      setConfig({ ...config, url: event.target.value })
                    }}
                  />
                  <Button type="primary" onClick={fetchConfig}>
                    加载
                  </Button>
                </Space>
              )}
              {/* 配置文件编辑器 */}
              {config.edit ? (
                <Editor
                  height="80vh"
                  defaultLanguage="yaml"
                  defaultValue={config.yaml}
                  onChange={(text) => {
                    try {
                      // 验证合法性
                      YAML.parse(text)
                    } catch {
                      // 配置文件格式错误
                      return setConfig({ ...config, error: true })
                    }
                    // 写入配置信息
                    setConfig({ ...config, error: false, yaml: text, json: YAML.parse(text) })
                  }}
                  options={{
                    minimap: {
                      enabled: false,
                    },
                  }}
                />
              ) : null}
            </Space>
          </Drawer>
        </Header>
        <Content>
          {/* 搜索栏 */}
          <div
            style={{
              width: '50%',
              maxWidth: '32rem',
              minWidth: '26rem',
              margin: '2rem auto',
            }}>
            {/* 搜索菜单 */}
            <Menu
              style={{ backgroundColor: 'transparent' }}
              mode="horizontal"
              selectedKeys={search.checkedMenu}
              onClick={(event) => {
                setSearch({
                  ...search,
                  checkedMenu: event.key,
                  checkedKeys: Object.keys(config.json.Search[event.key])[0],
                })
              }}>
              {Object.keys(config.json.Search).map((searchMenuKey) => {
                return <Menu.Item key={searchMenuKey}>{searchMenuKey}</Menu.Item>
              })}
            </Menu>
            {/* 搜索栏 */}
            <Search
              autoFocus
              size="large"
              enterButton="搜 索"
              style={{ margin: '1rem 0' }}
              onSearch={(key) => {
                // 打开网页
                open(config.json.Search[search.checkedMenu][search.checkedKeys] + key)
              }}
            />
            {/* 搜索范围 */}
            <Radio.Group
              value={search.checkedKeys}
              style={{ width: '90%', padding: '0 1rem ' }}
              onChange={(event) => {
                setSearch({ ...search, checkedKeys: event.target.value })
              }}>
              <Row gutter={[8, 8]}>
                {Object.keys(config.json.Search[search.checkedMenu]).map((searchItemKey) => {
                  return (
                    <Col key={searchItemKey} span="6">
                      <Radio value={searchItemKey}>{searchItemKey}</Radio>
                    </Col>
                  )
                })}
              </Row>
            </Radio.Group>
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
                          // 标签内容
                          const tabItem = config.json.Tabox[tabKey][boxKey]
                          // Github 渲染
                          if (tabKey === 'Github' && boxKey === 'name') {
                            // 获取忽略的仓库
                            const ignoreItems = config.json.Tabox.Github.Ignore ? config.json.Tabox.Github.Ignore : []

                            // 判断 Github 仓库是否加载成功
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
                                      <Card size="small" hoverable style={{ width: '12rem', minHeight: '5.4rem' }}>
                                        <Meta
                                          className="github"
                                          // 仓库名称
                                          title={<span>{githubItem.name}</span>}
                                          // 仓库 star 数
                                          avatar={
                                            <span style={{ color: '#08e', fontSize: '1rem', fontWeight: '600' }}>
                                              {githubItem.stargazers_count}
                                            </span>
                                          }
                                          // 仓库描述
                                          description={
                                            githubItem.description
                                              ? githubItem.description.length > 26
                                                ? githubItem.description.substring(0, 24) + '..'
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
                                  width: '60%',
                                  maxWidth: '32rem',
                                  marginLeft: '0.6rem',
                                  padding: '0.4rem 0.8rem',
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
                                <Card size="small" hoverable style={{ width: '10rem' }}>
                                  <Meta
                                    // 标签标题
                                    title={boxKey}
                                    // 标签头像
                                    avatar={<Avatar shape="square" src={getICO(tabItem[2], tabItem[0])} />}
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
          Tabox {new Date().getFullYear()} © By{' '}
          <a target="_blank" href="https://www.fzf404.art/" rel="noreferrer">
            fzf404
          </a>
        </Footer>
      </Layout>
    </Layout>
  )
}
