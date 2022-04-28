import { Layout, Menu } from 'antd'
import { ConfigProvider } from 'antd-country-phone-input'
import 'antd-country-phone-input/dist/index.css'
import 'flagpack/dist/flagpack.css'
import { Link, Route, Routes } from 'react-router-dom'
import en from 'world_countries_lists/data/countries/en/world.json'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import UIKit from './pages/UIKit'
import Dashboard from './pages/Dashboard'
import './styles/antd.less'
import './styles/tailwind.css'
import './App.less'

const { Header } = Layout
function App() {
  const getFlag = (short) => {
    const data = require(`world_countries_lists/data/flags/24x24/${short.toLowerCase()}.png`)
    // for dumi
    if (typeof data === 'string') {
      return data
    }
    // for CRA
    return data.default
  }

  return (
    <main>
      <ConfigProvider
        locale={en}
        areaMapper={(area) => {
          return {
            ...area,
            emoji: <span className={`fp ${area.short.toLowerCase()}`} />,
          };
        }}
      >
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['mail']}>
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
            <Menu.Item key="ui-kit">
              <Link to="/dashboard">UI Kit</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ui-kit" element={<UIKit />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </ConfigProvider>
    </main>
  )
}

export default App
