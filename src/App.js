import './styles/antd.less'
import './styles/tailwind.css'
import './App.less'
import { Routes, Link, Route } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import UIKit from './pages/UIKit'
import { Menu, Layout } from 'antd'
import Login from './pages/Login'
const { Header } = Layout

function App() {
  return (
    <main>
      <Header>
        <Menu theme='dark' mode="horizontal" defaultSelectedKeys={['mail']}>
          <Menu.Item key="home">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="sign-up">
            <Link to="/sign-up">Sign Up</Link>
          </Menu.Item>
          <Menu.Item key="login">
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="ui-kit">
            <Link to="/ui-kit">UI Kit</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ui-kit" element={<UIKit />} />
      </Routes>
    </main>
  )
}

export default App
