import YAML from 'yamljs'
import tabox from '../config/tabox.yml'

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

export default function Tabox() {
  const boxes = YAML.load(tabox)

  let boxesItem = []
  for (let i in boxes) {

    let tagItem = []

    for (let j in boxes[i]) {
      if (Object.prototype.toString.call(boxes[i][j]) === '[object Array]') {
        let item = <Col>
          <a href={boxes[i][j][0]} target="_blank" rel="noreferrer">
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
                    src={'logo/' + boxes[i][j][2]}
                  />

                </Col>
                <Col span={16}>
                  <Space direction="vertical" size={2}>
                    <Text strong>{j}</Text>
                    <Text>{boxes[i][j][1]}</Text>
                  </Space>
                </Col>
              </Row>
            </Card>
          </a>
        </Col>
        tagItem.push(item)
      }
    }
    let boxItem = <PageHeader
      title={i}
      avatar={{ src: 'logo/' + boxes[i].logo, shape: "square" }}
      subTitle={boxes[i].description}
      style={{
        margin: '22px auto'
      }}
    >

      <Row gutter={[32, 24]}>
        {tagItem}
      </Row>

    </PageHeader>
    boxesItem.push(boxItem)
  }
  return boxesItem
}