/*
 * @Author: fzf404
 * @Date: 2022-04-23 19:52:16
 * @LastEditTime: 2022-04-25 10:14:59
 * @Description: 主页
 */
import { useState, useEffect } from 'react'
import { Layout, Menu, Space, Avatar, Typography } from 'antd'
import YAML from 'yaml'
import UrlParse from 'url-parse'

const { Header, Content, Footer, Sider } = Layout
const { Title } = Typography

export default function App() {
  // 展示
  // const [loading, setILoading] = useState(true)
  // 配置数据
  const [config, setConfig] = useState({})
  // 侧边栏折叠
  const [collapsed, setCollapsed] = useState(false)
  // 侧边栏菜单
  const [menuItems, setMenuItems] = useState([])

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
  }, [config])

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}>
      {/* 侧边栏 */}
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        {/* 网站标题 */}
        <Space direction="vertical" size="middle" style={{ margin: '1.3rem 1.3rem 0' }}>
          <a target="_blank" href={config.Config ? config.Config.link : ''}>
            <Avatar shape="square" size="large" src={config.Config ? config.Config.logo : ''} />
          </a>
          <Title level={2} style={{ color: '#fffc', display: collapsed ? 'none' : '' }}>
            {config.Config ? config.Config.title : ''}
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
                  <Avatar shape="square" size="small" src={menuItem.logo ? menuItem.logo : menuUrl + '/favicon.ico'} />
                  {collapsed ? '' : key}
                </Space>
              </Menu.Item>
            )
          })}
        </Menu>
      </Sider>
    </Layout>
  )
}
