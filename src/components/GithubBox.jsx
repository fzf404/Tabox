/*
 * @Author: fzf404
 * @Date: 2021-04-26 21:38:58
 * @LastEditTime: 2021-12-24 17:37:06
 * @Description: 渲染Github组件
 */
import { useState, useEffect, Fragment } from 'react'

import { Card, Avatar, Typography, Row, Col, Space, Empty } from 'antd'

const { Text } = Typography

// 渲染Github的组件
export default function GithubBox(props) {
  const { name, config, collapsed } = props

  const [data, setData] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = () => {
      fetch(`https://api.github.com/users/${name}/repos`)
        .then((res) => res.json())
        .then((data) => {
          setData(data)
          setLoading(false)
        })
    }
    fetchData()
  }, [name, config])

  return (
    <Fragment>
      {loading ? (
        <Empty />
      ) : (
        data.map((item, index) => {
          let repoName = item.name
          let repoUrl = item.html_url
          let repoDesc = item.description
          if (config['Github'].Ignore.indexOf(repoName) === -1) {
            return (
              <Col
                key={index}
                style={{
                  paddingRight: collapsed ? '16px' : '6px',
                  transition: 'padding 300ms',
                }}>
                <a href={repoUrl} target='_blank" rel="noreferrer'>
                  <Card
                    size="small"
                    hoverable={true}
                    style={{
                      width: 242,
                      height: 108,
                      borderRadius: 10,
                    }}>
                    <Row>
                      <Col span={6}>
                        <Avatar
                          shape="square"
                          size={46}
                          src={
                            config['Github'][repoName]
                              ? config['Github'][repoName]
                              : 'logo/github.png'
                          }
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
            )
          }
          return null
        })
      )}
    </Fragment>
  )
}
