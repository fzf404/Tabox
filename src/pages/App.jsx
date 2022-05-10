/*
 * @Author: fzf404
 * @Date: 2022-04-23 19:52:16
 * @LastEditTime: 2022-05-10 15:37:58
 * @Description: 主页
 */
import { useState, useEffect } from 'react'
import YAML from 'yaml'
import UrlParse from 'url-parse'

import {
  Spin,
  Layout,
  Menu,
  Space,
  Avatar,
  Typography,
  Input,
  Checkbox,
  Row,
  Col,
  PageHeader,
  Card,
  BackTop,
} from 'antd'
import { GithubFilled, SettingFilled, ShareAltOutlined, StarTwoTone } from '@ant-design/icons'
const { Header, Content, Footer, Sider } = Layout
const { Paragraph, Title } = Typography
const { Search } = Input
const { Meta } = Card

export default function App() {
  // 配置数据
  const [config, setConfig] = useState({})
  // 配置地址
  // https://gist.githubusercontent.com/fzf404/cc3f839a5efa58c4d23422e08fd5ecbd/raw/tabox.yaml
  const [configURL, setConfigURL] = useState('/config.yaml')

  // 侧边栏折叠
  const [collapsed, setCollapsed] = useState(false)

  // 标签组内容
  const [menuItems, setMenuItems] = useState([])

  // 选中的搜索菜单
  const [searchMenu, setSearchMenu] = useState([])
  // 搜索菜单内容
  const [searchKey, setSearchKey] = useState([])
  // 选中的搜索内容
  const [searchChecked, setSearchChecked] = useState([])

  // github 信息
  const [githubItems, setGithubItems] = useState([])

  // 时间
  const [time, setTime] = useState(new Date())
  setInterval(() => {
    setTime(new Date())
  }, 1000)

  // ico 解析
  const getICO = (logo, url) => {
    return logo ? logo : UrlParse(url).origin + '/favicon.ico'
  }

  // 获取配置数据
  useEffect(() => {
    // 读取配置文件
    const fetchConfig = async () => {
      const res = await fetch(configURL)
      const config = YAML.parse(await res.text())
      setConfig(config) // 写入配置数据
    }
    fetchConfig() // 发起请求
  }, [])

  // config 更改后更新配置
  useEffect(() => {
    if (Object.keys(config).length) {
      // 写入默认折叠状态
      setCollapsed(config.Config.hide)
      // 处理侧边栏菜单
      setMenuItems(config.Tabox)
      // 配置默认搜索菜单
      setSearchMenu(Object.keys(config.Search)[0])
      // 配置默认选中搜索菜单
      setSearchKey(Object.keys(config.Search[Object.keys(config.Search)[0]]))
      // 配置默认选中搜索范围
      setSearchChecked([Object.keys(config.Search[Object.keys(config.Search)[0]])[0]])
      // 配置 github
      if (config.Tabox.Github !== undefined) {
        fetch(`https://api.github.com/users/${config.Tabox.Github.name}/repos?per_page=100`)
          .then((res) => res.json())
          .then((data) => {
            let repoInfo = data
            repoInfo.sort((a, b) => {
              return b.stargazers_count - a.stargazers_count
            })
            setGithubItems(repoInfo)
          })
      }
    }
  }, [config])

  // 切换搜索菜单
  const onSearchChange = (e) => {
    setSearchMenu(e.key)
    setSearchKey(Object.keys(config.Search[e.key]))
    setSearchChecked([])
  }

  // 搜索
  const onSearch = (e) => {
    searchChecked.forEach((key) => {
      window.open(config.Search[searchMenu][key] + e)
    })
  }

  return (
    <main>
      {/* 加载 config */}
      {Object.keys(config).length ? (
        <Layout
          style={{
            minHeight: '100vh',
          }}>
          {/* 侧边栏 */}
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
            width="220px"
            style={{ position: 'fixed', height: '100vh' }}>
            {/* 网站标题 */}
            <Space direction="vertical" size="middle" style={{ margin: '1.3rem 1.3rem 0' }}>
              <a target="_blank" href={config.Config.link}>
                <Avatar shape="square" size="large" src={config.Config.logo} />
              </a>
              <Title level={2} style={{ color: '#eee', display: collapsed ? 'none' : '' }}>
                {config.Config.title}
              </Title>
            </Space>
            {/* 侧边栏菜单 */}
            <Menu theme="dark" defaultSelectedKeys={[]} mode="inline">
              {Object.keys(menuItems).map((key) => {
                const menuItem = menuItems[key] // 菜单项
                return (
                  <Menu.Item key={key}>
                    <Space>
                      <Avatar shape="square" size="small" src={getICO(menuItem.logo, menuItem.url)} />
                      {collapsed ? '' : key}
                    </Space>
                  </Menu.Item>
                )
              })}
            </Menu>
          </Sider>
          {/* 内容区 */}
          <Layout style={{ marginLeft: collapsed ? '80px' : '220px', transition: 'margin-left 200ms' }}>
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
              {/* 设置 */}
              <Title
                level={3}
                style={{
                  color: '#fff',
                  marginTop: '1rem',
                  float: 'right',
                  cursor: 'pointer',
                }}>
                <a href="https://github.com/fzf404/Tabox" target="_blank">
                  <GithubFilled style={{ marginLeft: '1rem', color: '#fff' }} />
                </a>
                <ShareAltOutlined style={{ marginLeft: '1rem' }} />
                <SettingFilled style={{ marginLeft: '1rem' }} />
              </Title>
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
                  selectedKeys={searchMenu}
                  onClick={onSearchChange}>
                  {Object.keys(config.Search).map((key) => {
                    return <Menu.Item key={key}>{key}</Menu.Item>
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
                  defaultValue={searchChecked}
                  style={{ width: '100%', margin: '0 1rem' }}
                  onChange={(check) => {
                    setSearchChecked(check)
                  }}>
                  <Row>
                    {searchKey.map((key) => {
                      return (
                        <Col span={5} key={key}>
                          <Checkbox value={key}>{key}</Checkbox>
                        </Col>
                      )
                    })}
                  </Row>
                </Checkbox.Group>
              </div>
              {/* 标签页内容 */}
              <div>
                {/* 遍历标签组 */}
                {Object.keys(config.Tabox).map((key) => {
                  const menuBox = config.Tabox[key]
                  return (
                    <div
                      id={key}
                      key={key}
                      style={{
                        margin: collapsed ? '0 4rem 0 6rem' : '0 2rem 0 4rem',
                        transition: 'margin 200ms',
                      }}>
                      {/* 标签组标题 */}
                      <PageHeader
                        title={key}
                        subTitle={menuBox.description}
                        avatar={{
                          src: getICO(menuBox.logo, menuBox.url),
                          shape: 'square',
                        }}>
                        <Paragraph
                          key={key}
                          style={{
                            marginLeft: '1rem',
                          }}>
                          {/* 标签组内容 */}
                          <Row gutter={[16, 16]}>
                            {Object.keys(menuBox).map((item) => {
                              // 说明内容不渲染
                              if (item === 'url' || item === 'logo' || item === 'description') {
                                return ''
                              }
                              const tabBox = config.Tabox[key][item]
                              // github 渲染
                              if (key === 'Github' && item === 'name') {
                                return githubItems.map((githubItem) => {
                                  return (
                                    <Col key={githubItem.name}>
                                      {/* 仓库信息 */}
                                      <a href={githubItem.html_url} target="_blank">
                                        <Card
                                          size="small"
                                          hoverable
                                          style={{ width: '12rem', height: '5.4rem', borderRadius: '1rem' }}>
                                          <Meta
                                            className="github"
                                            // 仓库名称
                                            title={githubItem.name}
                                            avatar={
                                              <div>
                                                <span style={{color:'#08e',fontSize:'1rem',fontWeight:'600'}}>{githubItem.stargazers_count}</span>
                                              </div>
                                            }
                                            // 仓库描述
                                            description={
                                              githubItem.description
                                                ? githubItem.description.length > 24
                                                  ? githubItem.description.substring(0, 22) + '..'
                                                  : githubItem.description
                                                : ''
                                            }
                                          />
                                        </Card>
                                      </a>
                                    </Col>
                                  )
                                })
                              }
                              // 默认渲染
                              return (
                                <Col key={item}>
                                  {/* 标签内容 */}
                                  <a href={tabBox[0]} target="_blank">
                                    <Card size="small" hoverable style={{ width: '12rem', borderRadius: '1rem' }}>
                                      <Meta
                                        avatar={
                                          <Avatar shape="square" size="large" src={getICO(tabBox[2], tabBox[0])} />
                                        }
                                        title={item}
                                        description={tabBox[1]}
                                      />
                                    </Card>
                                  </a>
                                </Col>
                              )
                            })}
                          </Row>
                        </Paragraph>
                      </PageHeader>
                    </div>
                  )
                })}
              </div>
              {/* 回到顶部 */}
              <BackTop />
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Tabox ©{new Date().getFullYear()} Created by{' '}
              <a target="_blank" href="https://www.fzf404.top">
                fzf404
              </a>
            </Footer>
          </Layout>
        </Layout>
      ) : (
        <Spin tip="Loading" size="large" style={{ width: '100vw', height: '100vh', marginTop: '16rem' }} />
      )}
    </main>
  )
}
