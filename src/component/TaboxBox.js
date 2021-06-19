/*
 * @Author: fzf404
 * @Date: 2021-03-08 23:04:06
 * @LastEditTime: 2021-06-19 21:20:02
 * @Description: 渲染主界面
 */
import GithubBox from './GithubBox'

import {
  Card,
  Avatar,
  Typography,
  PageHeader,
  Row,
  Col,
  Space,
} from 'antd';


const { Text, Paragraph } = Typography;

export default function Tabox(props) {

  const { config } = props

  return <div>
    {
      Object.keys(config).map((item, index) => {
        return <div
          key={index}
          style={{
            margin: '4px auto'
          }}>
          <PageHeader
            title={item}
            avatar={{ src: config[item].logo, shape: "square" }}
            subTitle={config[item].description}
          >
            <Paragraph style={{ marginLeft: 20, }} key={index}>
              <Row gutter={[32, 24]}>
                {
                  item === "Github" ?
                    // Github部分的渲染
                    GithubBox(config[item].name, config)
                    // null
                    : item === "Memo" ?
                      // 备忘录的渲染
                      <pre>{config[item].content}</pre>

                      :
                      // 其他标签页的渲染
                      Object.keys(config[item]).map((subItem, subIndex) => {
                        let tagUrl = config[item][subItem][0]
                        let tagDesc = config[item][subItem][1]
                        let tagAvatar = config[item][subItem][2]
                        return Object.prototype.toString.call(config[item][subItem]) === '[object Array]' ?
                          <Col key={subIndex}>
                            <a href={tagUrl} target="_blank" rel="noreferrer">
                              <Card
                                size='small'
                                hoverable={true}
                                style={{
                                  width: 190,
                                  borderRadius: 10
                                }}>
                                <Row>
                                  <Col span={8}>
                                    <Avatar
                                      shape="square"
                                      size={46}
                                      src={tagAvatar}
                                    />
                                  </Col>
                                  <Col span={16}>
                                    <Space direction="vertical" size={2}>
                                      <Text strong>{subItem}</Text>
                                      <Text>{tagDesc}</Text>
                                    </Space>
                                  </Col>
                                </Row>
                              </Card>
                            </a>
                          </Col>
                          : null
                      })
                }
              </Row>
            </Paragraph>
          </PageHeader>
        </div>
      })
    }
  </div>
}