/*
 * @Author: fzf404
 * @Date: 2022-04-23 19:50:31
 * @LastEditTime: 2022-06-03 14:20:47
 * @Description: 路由
 */
import { HashRouter, Routes, Route } from 'react-router-dom'

import App from './pages/App'

export default function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </HashRouter>
  )
}
