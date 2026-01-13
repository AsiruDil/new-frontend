import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/login'
import HomePage from './pages/home'
import SignUpPage from './pages/signup'
import Header from './components/header'
import AdminPage from './pages/adminPage'
import TestPage from './pages/testPage'
import { Toaster } from 'react-hot-toast'
import RegisterPage from './pages/signup'


function App() {
 

  return (
    <BrowserRouter>
      
   <div >
    <Toaster position='top-right'/>
      <Routes path="/*">
        
        
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<RegisterPage/>}/>
          <Route path="/admin/*" element={<AdminPage/>}/>
          <Route path="/test" element={<TestPage/>}/>
          <Route path="/*" element={<HomePage/>}/>
      </Routes>
   </div>
    </BrowserRouter>
  )
}

export default App

//https://xhafhbkamswznkhywyph.supabase.co
//sb_publishable_njZBjpKXF5UFuMqu1PEsCA_3mb0DiCC

