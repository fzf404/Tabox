/*
 * @Author: fzf404
 * @Date: 2021-03-08 23:04:06
 * @LastEditTime: 2021-06-19 20:13:16
 * @Description: 标题Logo组件
 */
import {
  Image,
  Typography
} from 'antd';

const { Title } = Typography;

// 侧边栏标题及logo的组件
export default function Logobox(props) {
  const { collapsed, config } = props
  return <div style={{ margin: '20px' }}>
    <a href={config.config.link} target="_blank" rel="noreferrer">
      <Image
        width={40}
        src={config.config.logo}
        preview={false}
      />
      <Title
        level={2}
        style={{
          color: '#fffc',
          margin: '12px auto',
          display: collapsed ? 'none' : '',
        }}
      >
        {config.config.name}
      </Title>
    </a>
  </div >
}