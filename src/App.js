import { Button, Layout, Menu } from 'antd'
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
import { STORAGE_AUTH_KEY } from './utils/constants'
import useLocalStorage from './pages/hook/userLocalStorage'
import PaymentSetup from './pages/PaymentSetup'

const { Header } = Layout
function App() {
  const [savedAuth, setAuth] = useLocalStorage(STORAGE_AUTH_KEY)


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
            <Menu.Item key="dashboard">
              <Link to="/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="payment-setup">
              <Link to="/payment-setup">Payment Setup</Link>
            </Menu.Item>
            <Menu.Item key="log-out">
              <Button type="text" onClick={() => setAuth()}>Log out</Button>
            </Menu.Item>
          </Menu>
        </Header>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ui-kit" element={<UIKit />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/payment-setup" element={<PaymentSetup />} />
        </Routes>
      </ConfigProvider>
    </main>
  )
}

export default App
