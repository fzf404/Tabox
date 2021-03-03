import './App.css'
import { useState } from 'react'

import Logo from '../component/Logo'
import Tabox from '../component/Tabox'
import Search from '../component/Search'

import {
  Layout,
  Menu,
} from 'antd';

import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
} from '@ant-design/icons';

const { Content, Footer, Sider } = Layout;

export default function App() {

  const [collapsed, setCollapsed] = useState(false);

  return <Layout style={{ minHeight: '100vh' }}>
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      width='240px'
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
    >
      <Menu
        defaultSelectedKeys={['2']}
        mode="inline"
        theme="dark"
      >
        <Logo collapsed={collapsed} />
        <Menu.Item key="2" icon={<PieChartOutlined />}>
          Option 1
            </Menu.Item>
        <Menu.Item key="3" icon={<DesktopOutlined />}>
          Option 2
            </Menu.Item>
        <Menu.Item key="4" icon={<FileOutlined />}>
          Files
            </Menu.Item>
      </Menu>
    </Sider>
    <Layout className="site-layout" style={ collapsed?{marginLeft: 160}:{marginLeft: 240} }>
      <Content style={{
        margin: '24px 16px 0',
      }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Search />
          <Tabox />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Tabox ©2021 Created by fzf404</Footer>
    </Layout>
  </Layout >
}
