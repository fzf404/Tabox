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
} from 'antd';


const { Content, Footer, Sider } = Layout;

export default function App() {

  const [collapsed, setCollapsed] = useState(false);
  const headConfig = YAML.load(headboxFile)
  const taboxConfig = YAML.load(taboxFile)

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
    <Layout className="site-layout" style={ collapsed?{marginLeft: 160}:{marginLeft: 240} }>
      <Content style={{
        margin: '24px 16px 0',
      }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Search config={headConfig}/>
          <Tabox config={taboxConfig}/>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Tabox ©2021 Created by fzf404</Footer>
    </Layout>
  </Layout >
}
