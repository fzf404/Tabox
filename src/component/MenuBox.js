import {
  Menu,
  Avatar,
  Space
} from 'antd';

import Logo from './LogoBox'

export default function SearchBox(props) {

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
            'margin-bottom':4
          }}
        />
        {i}
      </Space>
    </Menu.Item>
    tagItem.push(item)
  }

  const onSelect = (e) => {
    let item = document.getElementById(e.key)
    if (item) { item.scrollIntoView() }
  }

  return <Menu
    defaultSelectedKeys={['2']}
    mode="inline"
    theme="dark"
    onSelect={onSelect}
  >
    <Logo collapsed={collapsed} config={headConfig} />
    {tagItem}
  </Menu>
}