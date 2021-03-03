import {
  Menu,
  Avatar,
  Space,
} from 'antd';

import Logo from './LogoBox'


export default function MenuBox(props) {

  const { collapsed, headConfig, taboxConfig } = props
  let tagItem = []
  for (let i in taboxConfig) {
    let item = <Menu.Item key={i}>
      <Space>
        <Avatar
          shape="square"
          size={20}
          src={'logo/' + taboxConfig[i].logo}
          style={{
            'margin-bottom': 4
          }}
        />
        <span style={{ marginLeft: collapsed ? '20px' : '' }} >{i}</span>
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