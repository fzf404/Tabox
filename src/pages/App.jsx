/*
 * @Author: fzf404
 * @Date: 2022-04-23 19:52:16
 * @LastEditTime: 2022-05-09 17:30:57
 * @Description: 主页
 */
import { useState, useEffect } from 'react'
import YAML from 'yaml'
import UrlParse from 'url-parse'

import { Layout, Menu, Space, Avatar, Typography, Input, Checkbox, Row, Col, BackTop } from 'antd'
import { GithubFilled, SettingFilled, ShareAltOutlined } from '@ant-design/icons'
const { Header, Content, Footer, Sider } = Layout
const { Title } = Typography
const { Search } = Input

export default function App() {
  // 展示
  // const [loading, setILoading] = useState(true)
  // 配置数据
  const [config, setConfig] = useState({})
  // 侧边栏折叠
  const [collapsed, setCollapsed] = useState(false)
  // 侧边栏菜单
  const [menuItems, setMenuItems] = useState([])
  // 选中的搜索菜单
  const [searchMenu, setSearchMenu] = useState([])
  // 搜索菜单内容
  const [searchKey, setSearchKey] = useState([])
  // 选中的搜索内容
  const [searchCheck, setSearchCheck] = useState([])

  // 时间
  const [time, setTime] = useState(new Date())

  setInterval(() => {
    setTime(new Date())
  }, 1000)

  // 获取配置数据
  useEffect(() => {
    // 读取配置文件
    const fetchConfig = async () => {
      const res = await fetch('/config.yaml')
      const config = YAML.parse(await res.text())
      setConfig(config) // 写入配置数据
      // setILoading(false) // 加载完成
    }
    fetchConfig() // 发起请求
  }, [])

  // config 更改后更新配置
  useEffect(() => {
    // 写入默认折叠状态
    if (config.Config !== undefined) {
      setCollapsed(config.Config.hide)
    }
    // 处理侧边栏菜单
    if (config.Tabox !== undefined) {
      setMenuItems(config.Tabox)
    }
    // 处理搜索菜单
    if (config.Search !== undefined) {
      setSearchMenu([Object.keys(config.Search)[0]])
      setSearchKey(Object.keys(config.Search[Object.keys(config.Search)[0]]))
    }
  }, [config])

  // 搜索菜单更改
  const onSearchChange = (e) => {
    setSearchMenu(e.key)
    setSearchKey(Object.keys(config.Search[e.key]))
    setSearchCheck([])
  }

  // 搜索
  const onSearch = (e) => {
    console.log(e)
    console.log(searchCheck)
  }
  return (
    <main>
      {Object.keys(config).length ? (
        <Layout
          style={{
            minHeight: '100vh',
          }}>
          {/* 侧边栏 */}
          <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
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
              {Object.keys(menuItems).map((key, index) => {
                const menuItem = menuItems[key] // 菜单项
                const menuUrl = UrlParse(menuItem.url) // 菜单链接
                return (
                  <Menu.Item key={index}>
                    <Space>
                      <Avatar
                        shape="square"
                        size="small"
                        src={menuItem.logo ? menuItem.logo : menuUrl + '/favicon.ico'}
                      />
                      {collapsed ? '' : key}
                    </Space>
                  </Menu.Item>
                )
              })}
            </Menu>
          </Sider>
          {/* 内容区 */}
          <Layout>
            {/* 头部 */}
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
                <GithubFilled style={{ marginLeft: '.5rem' }} />
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
                {/* 搜索设定 */}
                <Checkbox.Group
                  style={{ width: '100%', margin: '0 1rem' }}
                  onChange={(check) => {
                    setSearchCheck(check)
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
      ) : null}
    </main>
  )
}
