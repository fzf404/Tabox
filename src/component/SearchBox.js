
import { Input, Checkbox } from 'antd';
const { Search } = Input;

export default function SearchBox(props) {

  const {config} = props
  let checks = ['Google']
  let searchList = []

  for (let i in config.search) {
    searchList.push(i)
  }

  const onSearch = value => {
    checks.forEach((item) => {
      window.open(config.search[item][0] + value, '_blank')
    })
  }

  const onChange = checkedValues => {
    checks = checkedValues
  }

  return <div
    style={{
      width: '66%',
      'max-width': '560px',
      margin: '16px auto',
    }}>
    <Checkbox.Group
      options={searchList}
      defaultValue={searchList[0]}
      onChange={onChange}
      style={{
        margin: 'auto 6px'
      }}
    />
    <Search
      placeholder="input search text"
      enterButton="回车搜索"
      size="large"
      onSearch={onSearch}
      style={{
        margin: '12px auto'
      }}
    />
  </div>
}