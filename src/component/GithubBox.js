import request from 'sync-request'

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

export default function GithubBox(name, config) {
  let githubItems = []
  let res = request('GET', `https://api.github.com/users/${name}/repos`)
  res = JSON.parse(res.body)
  res.forEach((item) => {
    let repoName = item.name
    let repoUrl = item.html_url
    let repoDesc = item.description
    if (config['Github'].Ignore.indexOf(repoName) === -1) {
      let repoItem = <Col key={repoName}>
        <a href={repoUrl} target="_blank" rel="noreferrer">
          <Card
            size='small'
            hoverable={true}
            style={{
              width: 256,
              height: 108,
              borderRadius: 10
            }}>
            <Row>
              <Col span={6}>
                <Avatar
                  shape="square"
                  size={46}
                  src={config['Github'][repoName] ? 'logo/' + config['Github'][repoName] : 'logo/github.png'}
                />
              </Col>
              <Col span={18}>
                <Space direction="vertical" size={2}>
                  <Text strong>{repoName}</Text>
                  <Text>{repoDesc}</Text>
                </Space>
              </Col>
            </Row>
          </Card>
        </a>
      </Col>
      githubItems.push(repoItem)
    }
  })
  return <div
    id={'Github'}
    key={'Github'}
    style={{
      margin: '4px auto'
    }}>
    <PageHeader
      title={'Github'}
      avatar={{ src: 'logo/' + config['Github'].logo, shape: "square" }}
      subTitle={config['Github'].description}
    >
      <Row gutter={[32, 24]}>
        {githubItems}
      </Row>
    </PageHeader>
  </div>
}