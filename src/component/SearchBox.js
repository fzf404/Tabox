
import { Input, Checkbox, Row, Col } from 'antd';
const { Search } = Input;

export default function SearchBox(props) {

  const { config } = props
  let checked = ['Baidu']
  let searchList = []

  for (let i in config.search) {
    let item = <Col span={6}>
      <Checkbox value={i}>{i}</Checkbox>
    </Col>
    searchList.push(item)
  }

  const onSearch = value => {
    if (checked[0] === undefined) {
      window.open(config.search['Baidu'][0] + value, '_blank')
      return
    }
    checked.forEach((item) => {
      window.open(config.search[item][0] + value, '_blank')
    })
  }

  const onChange = checkedValues => {
    checked = checkedValues
  }

  return <div
    style={{
      width: '66%',
      maxWidth: '560px',
      margin: '16px auto',
    }}>
    <Search
      placeholder="Search"
      enterButton="搜索"
      size="large"
      onSearch={onSearch}
    />
    <Checkbox.Group
      onChange={onChange}
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