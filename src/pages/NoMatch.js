import { Result, Button } from 'antd'

export default function App() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="这里什么都没有哦~"
      extra={
        <Button type="primary" href="#">
          回到主页
        </Button>
      }
    />
  )
}
