import YAML from 'yamljs'
import headbox from '../config/headbox.yml'

// import { useHistory } from "react-router-dom";

import { Input, Checkbox } from 'antd';
const { Search } = Input;

export default function Searchbox() {

  const config = YAML.load(headbox)
  // const history = useHistory();
  let checks = ['Google']
  let searchList = []

  for (let i in config.search) {
    searchList.push(i)
  }

  const onSearch = value => {
    checks.forEach((item) => {
      window.open(config.search[item][0] + value, '_blank')
    })
    // let checkUrl = []
    // history.push({
    //   pathname: '/result/',
    //   state: {
    //     "checkUrl": checkUrl
    //   }
    // })
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