import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/Signin'
import SignUp from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Header from './components/Header'
import FooterComponent from './components/Footer'


function App() {

  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/projects' element={<Projects />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  )
}

export default App
