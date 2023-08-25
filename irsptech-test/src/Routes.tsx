import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Register } from './pages/Register'

export const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='' element={<Home />}/>
        <Route path='Register' element={<Register />}/>
      </Routes>
    </Router>
  )
}
