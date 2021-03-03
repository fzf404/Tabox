import {
  Image,
  Typography
} from 'antd';

const { Title } = Typography;

export default function Logobox(props) {
  const { collapsed, config } = props
  return <div style={{ margin: '20px' }}>
    <a href={config.config.link} target="_blank"  rel="noreferrer">
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