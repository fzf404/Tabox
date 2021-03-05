
import { useState } from 'react'
import { Input, Checkbox, Row, Col, Menu } from 'antd';

const { Search } = Input;

export default function SearchBox(props) {

  const { config } = props
  const [checked, setChecked] = useState(['Baidu'])
  const [selected, setSelected] = useState(['Baidu'])
  let searchList = []

  // 渲染搜索Item
  for (let itemName in config.search) {
    let item = <Col span={6} key={itemName}>
      <Checkbox value={itemName}>{itemName}</Checkbox>
    </Col>
    searchList.push(item)
  }

  // 搜索事件处理函数
  const onSearch = value => {
    if (checked[0] === undefined) {
      window.open(config.search['Baidu'][0] + value, '_blank')
      return
    }
    checked.forEach((item) => {
      window.open(config.search[item][0] + value, '_blank')
    })
  }

  return <div
    style={{
      width: '66%',
      maxWidth: '560px',
      margin: '16px auto',
    }}>
    <Menu 
    onClick={select => setSelected(select.key)} 
    selectedKeys={selected} 
    mode="horizontal"
    style={{
      background:'#F0F2F5F'
    }}>
      <Menu.Item key="Baidu" >
        Normal
        </Menu.Item>
      <Menu.Item key="Google">
        Code
        </Menu.Item>
    </Menu>
    <Search
      placeholder="Search"
      enterButton="搜索"
      size="large"
      onSearch={onSearch}
    />
    <Checkbox.Group
      onChange={check => setChecked(check)}
      defaultValue={checked}
      style={{
        margin: '12px 8px'
      }}
    >
      <Row>
        {searchList}
      </Row>
    </Checkbox.Group>
  </div>
}