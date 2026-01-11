import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/login'
import HomePage from './pages/home'
import SignUpPage from './pages/signup'
import Header from './components/header'
import AdminPage from './pages/adminPage'
import TestPage from './pages/testPage'
import { Toaster } from 'react-hot-toast'


function App() {
 

  return (
    <BrowserRouter>
      
   <div >
    <Toaster position='top-right'/>
      <Routes path="/*">
        
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/admin/*" element={<AdminPage/>}/>
          <Route path="/test" element={<TestPage/>}/>
          <Route path="*" element={<h1>404 not found</h1>}/>
      </Routes>
   </div>
    </BrowserRouter>
  )
}

export default App
