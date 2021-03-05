import './App.css'
import { useState } from 'react'

import YAML from 'yamljs'
import headboxFile from '../config/headbox.yml'
import taboxFile from '../config/tabox.yml'

import Tabox from '../component/TaboxBox'
import Search from '../component/SearchBox'
import MenuBox from '../component/MenuBox'

import {
  Layout,
  BackTop,
  Typography
} from 'antd';

const { Title } = Typography;

const { Header, Content, Footer, Sider } = Layout;

export default function App() {
  // 加载配置文件
  const headConfig = YAML.load(headboxFile)
  const taboxConfig = YAML.load(taboxFile)
  // 侧边栏折叠状态的钩子
  const [collapsed, setCollapsed] = useState(headConfig.config.hide);
  // 基础框架
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
      <MenuBox collapsed={collapsed} headConfig={headConfig} taboxConfig={taboxConfig}></MenuBox>
    </Sider>
    <Layout className="site-layout">
      <Header
        style={{
          background: '#a7b0bb',
        }}
      >
        <Title
          level={3}
          style={{
            color: '#eee',
            marginLeft: collapsed ? 140 : 220,
            marginTop: 16,
          }}>
          {new Date().getHours() < 10 ? "0" + new Date().getHours() : new Date().getHours()}:
          {new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes()}
        </Title>
      </Header>
      <BackTop />
      <Content style={{
        margin: '24px 16px 0',
        marginLeft: collapsed ? 160 : 240
      }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Search config={headConfig} />
          <Tabox config={taboxConfig} />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Tabox ©2021 Created by <a href="https://fzf404.top/">fzf404</a></Footer>
    </Layout>
  </Layout >
}
