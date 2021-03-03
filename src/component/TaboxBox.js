
import {
  Card,
  Avatar,
  Typography,
  PageHeader,
  Row,
  Col,
  Space
} from 'antd';



const { Text } = Typography;

export default function Tabox(props) {
  const { config } = props
  let boxesItem = []
  for (let i in config) {

    let tagItem = []

    for (let j in config[i]) {
      if (Object.prototype.toString.call(config[i][j]) === '[object Array]') {
        let item = <Col>
          <a href={config[i][j][0]} target="_blank" rel="noreferrer">
            <Card
              size='small'
              hoverable={true}
              style={{
                width: 200,
                'border-radius': 10
              }}
            >
              <Row>
                <Col span={8}>
                  <Avatar
                    shape="square"
                    size={46}
                    src={'logo/' + config[i][j][2]}
                  />

                </Col>
                <Col span={16}>
                  <Space direction="vertical" size={2}>
                    <Text strong>{j}</Text>
                    <Text>{config[i][j][1]}</Text>
                  </Space>
                </Col>
              </Row>
            </Card>
          </a>
        </Col>
        tagItem.push(item)
      }
    }
    let boxItem = <div
      id={i}
      style={{
        margin: '22px auto'
      }}>
      <PageHeader
        title={i}
        avatar={{ src: 'logo/' + config[i].logo, shape: "square" }}
        subTitle={config[i].description}
      >

        <Row gutter={[32, 24]}>
          {tagItem}
        </Row>

      </PageHeader>
    </div>
    boxesItem.push(boxItem)
  }
  return boxesItem
}