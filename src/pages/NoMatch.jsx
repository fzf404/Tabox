/*
 * @Author: fzf404
 * @Date: 2022-04-23 20:50:43
 * @LastEditTime: 2022-04-23 21:02:26
 * @Description: 404
 */
import { Result, Button } from 'antd'

export default function NoMatch() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="这里什么都没有"
      extra={<Button type="primary" href="/">回到主页</Button>}
    />
  )
}
