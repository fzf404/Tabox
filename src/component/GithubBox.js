/*
 * @Author: fzf404
 * @Date: 2021-04-26 21:38:58
 * @LastEditTime: 2021-06-19 21:19:19
 * @Description: 渲染Github组件
 */
import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';


import {
  Card,
  Avatar,
  Typography,

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
      setData(res.data)
      setLoading(false)
    }
    fetchData()
  }, [name, config]);


  return <Fragment>
    {loading ? <Empty /> :
      data.map((item, index) => {
        let repoName = item.name
        let repoUrl = item.html_url
        let repoDesc = item.description
        if (config['Github'].Ignore.indexOf(repoName) === -1) {
          return <Col key={index}>
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
                      src={config['Github'][repoName] ? config['Github'][repoName] : 'logo/github.png'}
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
        }
        return null
      })
    }
  </Fragment>
}