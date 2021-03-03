import YAML from 'yamljs'
import headbox from '../config/headbox.yml'

import {
  Menu,
  Image,
  Typography
} from 'antd';


const { Title } = Typography;

export default function Logobox(props) {
  const { collapsed } = props
  const config = YAML.load(headbox)
  return <Menu.Item key='1' style={{ margin: '20px' }}>
    <Image
      width={40}
      src={'logo/' + config.config[2]}
      preview={false}
    />
    <Title
      level={2}
      style={{ color: '#fffc', margin: '12px auto', display: collapsed ? 'none' : '' }}
    >
      {config.config[1]}
    </Title>
  </Menu.Item>
}