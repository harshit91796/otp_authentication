import { BrowserRouter, Route, Routes,useNavigate, useParams } from 'react-router-dom'
import './App.css'
import Login from './components/login/Login'
import Success from './components/Success'

function App() {
 
  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/success' element={<Success/>}/>
    </Routes>
    </>
  )
}

export default App
