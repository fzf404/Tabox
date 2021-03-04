
import GithubBox from './GithubBox'

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
  let boxItems = []
  
  // 静态部分的渲染
  for (let boxName in config) {
    let tagItems = []
    if (boxName === "Github") {
      // 调用动态部分的渲染
      boxItems.push(GithubBox(config[boxName].name,config))
      continue
    } else {
      for (let tagName in config[boxName]) {
        if (Object.prototype.toString.call(config[boxName][tagName]) === '[object Array]') {
          let tagUrl = config[boxName][tagName][0]
          let tagDesc = config[boxName][tagName][1]
          let tagAvatar = config[boxName][tagName][2]
          let item = <Col key={tagName}>
            <a href={tagUrl} target="_blank" rel="noreferrer">
              <Card
                size='small'
                hoverable={true}
                style={{
                  width: 200,
                  borderRadius: 10
                }}>
                <Row>
                  <Col span={8}>
                    <Avatar
                      shape="square"
                      size={46}
                      src={'logo/' + tagAvatar}
                    />
                  </Col>
                  <Col span={16}>
                    <Space direction="vertical" size={2}>
                      <Text strong>{tagName}</Text>
                      <Text>{tagDesc}</Text>
                    </Space>
                  </Col>
                </Row>
              </Card>
            </a>
          </Col>
          tagItems.push(item)
        }
      }
    }
    let boxItem = <div
      id={boxName}
      key={boxName}
      style={{
        margin: '4px auto'
      }}>
      <PageHeader
        title={boxName}
        avatar={{ src: 'logo/' + config[boxName].logo, shape: "square" }}
        subTitle={config[boxName].description}
      >
        <Row gutter={[32, 24]}>
          {tagItems}
        </Row>
      </PageHeader>
    </div>
    boxItems.push(boxItem)
  }
  return boxItems
}