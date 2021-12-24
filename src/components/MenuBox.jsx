/*
 * @Author: fzf404
 * @Date: 2021-03-08 23:04:06
 * @LastEditTime: 2021-12-24 17:37:10
 * @Description: 渲染侧边栏
 */
import { Menu, Avatar, Space } from 'antd'

import Logo from './LogoBox'

export default function MenuBox(props) {
  const { collapsed, headConfig, taboxConfig } = props

  const onSelect = (e) => {
    let item = document.getElementById(e.key)
    if (item) {
      item.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
  }

  return (
    <Menu defaultSelectedKeys={['']} mode="inline" theme="dark" onSelect={onSelect}>
      <Logo collapsed={collapsed} config={headConfig} />
      {Object.keys(taboxConfig).map((item, index) => {
        return (
          <Menu.Item key={item}>
            <Space>
              <Avatar
                shape="square"
                size={20}
                src={taboxConfig[item].logo}
                style={{
                  marginBottom: 4,
                }}
              />
              <span
                style={{
                  marginLeft: collapsed ? '2em' : '',
                  marginRight: collapsed ? '1em' : '',
                }}>
                {item}
              </span>
            </Space>
          </Menu.Item>
        )
      })}
    </Menu>
  )
}
