import './styles/antd.less'
import './styles/tailwind.css'
import { Routes, Link, Route } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import UIKit from './pages/UIKit'
import { Menu, Layout } from 'antd'
const { Header } = Layout

function App() {
  return (
    <div>
      <Header>
        <Menu theme='dark' mode="horizontal" defaultSelectedKeys={['mail']}>
          <Menu.Item key="home">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="sign-up">
            <Link to="/sign-up">Sign Up</Link>
          </Menu.Item>
          <Menu.Item key="ui-kit">
            <Link to="/ui-kit">UI Kit</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="sign-up" element={<SignUp />} />
        <Route path="ui-kit" element={<UIKit />} />
      </Routes>
    </div>
  )
}

export default App
