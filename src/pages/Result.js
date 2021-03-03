
export default function App(props) {
  let urls = []
  props.location.state.checkUrl.forEach((url) => {
    urls.push(<iframe
      title="聚合搜索"
      src={url}
      frameborder="0"
      width="50%"
        height="720px"
    ></iframe>)
  })
  return <div>
    {urls}
  </div>
}