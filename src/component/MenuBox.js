import {
  Menu,
  Avatar,
  Space,
} from 'antd';

import Logo from './LogoBox'


export default function MenuBox(props) {

  const { collapsed, headConfig, taboxConfig } = props
  // 渲染侧边菜单
  let tagItem = []
  for (let boxName in taboxConfig) {
    let item = <Menu.Item key={boxName}>
      <Space>
        <Avatar
          shape="square"
          size={20}
          src={'logo/' + taboxConfig[boxName].logo}
          style={{
            marginBottom: 4
          }}
        />
        <span style={{ marginLeft: collapsed ? '20px' : '' }} >{boxName}</span>
      </Space>
    </Menu.Item>
    tagItem.push(item)
  }

  const onSelect = (e) => {
    let item = document.getElementById(e.key)
    if (item) { item.scrollIntoView() }
  }

  return <Menu
    defaultSelectedKeys={['']}
    mode="inline"
    theme="dark"
    onSelect={onSelect}
  >
    <Logo collapsed={collapsed} config={headConfig} />
    {tagItem}
  </Menu>
}