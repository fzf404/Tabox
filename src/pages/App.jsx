/*
 * @Author: fzf404
 * @Date: 2022-04-23 19:52:16
 * @LastEditTime: 2022-06-04 22:41:33
 * @Description: 主页
 */
import { useState, useEffect } from 'react'

import { CopyToClipboard } from 'react-copy-to-clipboard'
import YAML from 'yaml'
import Editor from '@monaco-editor/react'

// 组件库
import {
  Spin,
  Layout,
  Menu,
  Space,
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
  Result,
  message,
} from 'antd'
// 图标
import { GithubFilled, SettingFilled, ShareAltOutlined } from '@ant-design/icons'

const { Header, Content, Footer, Sider } = Layout
const { Paragraph, Title } = Typography
const { Search } = Input
const { Meta } = Card

message.config({ maxCount: 3 })

export default function App() {
  // 配置信息
  const [config, setConfig] = useState(() => {
    // 默认配置
    const config = {
      url: 'config.yaml', // 配置文件路径
      loading: true, // 是否加载中
      error: false, // 配置文件格式错误
      edit: false, // 是否可编辑
      yaml: '', // yaml格式的配置文件
      json: {}, // json格式的配置文件
    }

    // 解析路由参数
    const params = new URL(document.location).searchParams
    const paramsURL = params.get('c')

    // 从 路由 中读取 配置文件 路径
    if (paramsURL) {
      config.url = paramsURL
      return config
    }

    // 是否为编辑模式
    if (localStorage.getItem('tabox-edit') === 'true') {
      // 从 本地存储 中读取配置
      const storeConfig = localStorage.getItem('tabox-config')
      config.yaml = storeConfig
      // 解析为 json
      config.json = YAML.parse(storeConfig)
      config.edit = true
    }

    // 从 本地存储 中读取配置链接
    const storeURL = localStorage.getItem('tabox-url')
    // 如果有配置链接, 则读取配置
    if (storeURL) {
      config.url = storeURL
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

  //
  useEffect(() => {
    // 不为编辑模式则加载配置
    if (!config.edit) {
      fetchConfig()
    }
  }, [])

  // config 更改后更新配置
  useEffect(() => {
    if (config.json.hasOwnProperty('Config')) {
      // 写入默认折叠状态
      setNavCollapsed(config.json.Config.hide)
      // 写入默认搜索配置
      const defaulCheckedMenu = Object.keys(config.json.Search)[0]
      const defaultCheckedKey = Object.keys(config.json.Search[Object.keys(config.json.Search)[0]])[0]
      setSearch({
        checkedMenu: defaulCheckedMenu,
        checkedKeys: [defaultCheckedKey],
      })
      // 加载成功
      setConfig({ ...config, loading: false })
      // 判断是否将配置 github 信息
      if (config.json.Tabox.Github !== undefined) {
        // 加载 github 仓库信息
        fetch(`https://api.github.com/users/${config.json.Tabox.Github.name}/repos?per_page=100`)
          .then((res) => res.json())
          .then((data) => {
            let repoInfo = data
            if (repoInfo.length > 0) {
              // 按照 star 数排序
              repoInfo.sort((a, b) => {
                return b.stargazers_count - a.stargazers_count
              })
              // 设置 Github 信息
              setGithub({ loading: false, data: repoInfo })
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
    window.location.reload()
  }

  return config.loading ? (
    // 配置文件格式错误
    config.error ? (
      <Result
        status="warning"
        title="配置文件加载错误"
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
      <Spin size="large" style={{ width: '100vw', height: '100vh', marginTop: '8rem' }} />
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
          onSelect={(e) => {
            // 侧边栏点击滚动
            document.getElementById(e.key).scrollIntoView({ block: 'center', behavior: 'smooth' })
          }}>
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
            {time.toLocaleTimeString()}
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
              {/* Github 地址 */}
              <a href="https://github.com/fzf404/Tabox" target="_blank" rel="noreferrer">
                <GithubFilled style={{ color: '#fff' }} />
              </a>
              {/* 分享 */}
              {config.edit ? null : (
                <CopyToClipboard
                  text={new URL(document.location).origin + '/?c=' + config.url}
                  onCopy={() => {
                    message.success('已复制链接')
                  }}>
                  <ShareAltOutlined />
                </CopyToClipboard>
              )}
              {/* 设置 */}
              <SettingFilled onClick={() => setSettingCollapsed(true)} />
            </Space>
          </Title>
          {/* 设置菜单 */}
          <Drawer
            title="设置"
            placement="right"
            width={document.body.clientWidth < 960 ? '500px' : '600px'}
            visible={settingCollapsed}
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
                    if (config.edit) {
                      // 保存配置信息
                      localStorage.setItem('tabox-config', config.yaml)
                    } else {
                      // 保存配置文件URL
                      localStorage.setItem('tabox-url', config.url)
                    }
                    // 保存编辑模式
                    localStorage.setItem('tabox-edit', config.edit)
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
                    onChange={(e) => {
                      setConfig({ ...config, url: e.target.value })
                    }}
                    onPressEnter={fetchConfig}
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
                  style={{ marginTop: '100px' }}
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
                    // 解析配置文件
                    const parse = YAML.parse(text)
                    // 写入配置信息
                    setConfig({ ...config, error: false, yaml: text, json: parse })
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
              onSearch={(e) => {
                // 遍历选中的配置项
                search.checkedKeys.forEach((key) => {
                  // 打开网页
                  window.open(config.json.Search[search.checkedMenu][key] + e)
                })
              }}
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
                            const ignoreItems = config.json.Tabox.Github.Ignore ? config.json.Tabox.Github.Ignore : []

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
