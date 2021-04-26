// import request from 'sync-request'
import { useState, useEffect } from 'react';
import axios from 'axios';


import {
  Card,
  Avatar,
  Typography,
  PageHeader,
  Row,
  Col,
  Space,
  Empty
} from 'antd';


const { Text } = Typography;

// 渲染Github的组件
export default function GithubBox(name, config) {
  const [data, setData] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://api.github.com/users/${name}/repos`,
      );
      let githubItems = []
      res.data.forEach(item => {
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
                  width: 242,
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
      setData(githubItems)
      setLoading(false)
    }
    fetchData()
  }, [name, config]);


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
        {loading ? <Empty /> : data}
      </Row>
    </PageHeader>
  </div>
}