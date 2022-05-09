/*
 * @Author: fzf404
 * @Date: 2022-04-23 19:50:31
 * @LastEditTime: 2022-04-23 20:58:50
 * @Description: 路由
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './pages/App'
import NoMatch from './pages/NoMatch'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  )
}
