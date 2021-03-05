
import { useState } from 'react'
import { Input, Checkbox, Row, Col, Menu } from 'antd';

const { Search } = Input;

export default function SearchBox(props) {
  // 从父组件获得的config
  const { config } = props
  // 默认选中的box
  const [selected, setSelected] = useState([Object.keys(config.search)[0]])
  // 默认选中的check
  const [checked, setChecked] = useState([Object.keys(config.search[Object.keys(config.search)[0]])[0]])
  // 刚进入时的check
  let firstItem = []
  for (let itemName in config.search[selected]) {
    let item = <Col span={6} key={itemName}>
      <Checkbox value={itemName}>{itemName}</Checkbox>
    </Col>
    firstItem.push(item)
  }
  // 默认展示的check
  const [searchList, setSearchList] = useState(firstItem)

  // 渲染搜索Item
  let boxList = []
  for (let boxName in config.search) {
    let boxItem = <Menu.Item key={boxName} >
      {boxName}
    </Menu.Item>
    boxList.push(boxItem)
  }

  // 搜索事件处理函数
  const onSearch = (value, event) => {
    console.log(event._reactName)
    // 是否为删除事件
    if (event.target.className === 'ant-input ant-input-lg' && event._reactName === 'onClick') {
      return
    }
    if (checked[0] === undefined) {
      window.open(config.search[selected][Object.keys(config.search[selected])[0]] + value, '_blank')
      return
    }
    checked.forEach((item) => {
      window.open(config.search[selected][item] + value, '_blank')
    })
  }

  // 切换搜索box
  const handleClick = e => {
    let items = []
    for (let itemName in config.search[e.key]) {
      let item = <Col span={6} key={itemName}>
        <Checkbox value={itemName}>{itemName}</Checkbox>
      </Col>
      items.push(item)
    }
    setSelected(e.key)
    setChecked([])
    setSearchList(items)
  }

  return <div
    style={{
      width: '66%',
      maxWidth: '560px',
      margin: '16px auto',
    }}>
    <Menu
      onClick={handleClick}
      selectedKeys={selected}
      mode="horizontal"
      style={{
        backgroundColor: 'transparent',
      }}>
      {boxList}
    </Menu>
    <Search
      placeholder="Search"
      enterButton="搜索"
      size="large"
      allowClear
      onSearch={onSearch}
    />
    <Checkbox.Group
      onChange={check => setChecked(check)}
      defaultValue={checked}
      style={{
        margin: '12px 8px',
        width: '100%'
      }}
    >
      <Row>
        {searchList}
      </Row>
    </Checkbox.Group>
  </div>
}