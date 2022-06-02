/*
 * @Author: fzf404
 * @Date: 2022-04-23 19:28:15
 * @LastEditTime: 2022-06-02 17:51:17
 * @Description: 挂载入口
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './router'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Router />)
