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
        src={'logo/' + config.config.logo}
        preview={false}
      />
      <Title
        level={2}
        style={{ color: '#fffc', margin: '12px auto', display: collapsed ? 'none' : '' }}
      >
        {config.config.name}
      </Title>
    </a>
  </div>
}