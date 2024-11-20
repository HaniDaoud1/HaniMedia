import './App.css'
import HomePage from './screens/homePage'
import {Route,BrowserRouter,Routes,Navigate} from 'react-router-dom'
import LoginPage from './screens/loginPage'
import ProfilePage from './screens/profilePage'
import Navbar from './screens/navbar'
import Regester from './screens/loginPage/regester'
import { useSelector } from 'react-redux';
import AllUsers from './screens/widgets/AllUsers'
import FriendsList from './screens/widgets/FriendsList'
import Footer from './screens/navbar/Footer'

function App() {
  const Auth=Boolean(useSelector((state)=>state.token))

  return (
    <>
   
      <Navbar/>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/regester' element={<Regester/>}/>
        <Route path='/profile/:userId' element={<ProfilePage/>}/>
        <Route path='/users/:userId' element={<AllUsers/>}/>
      </Routes>
      </BrowserRouter>
      <Footer/>
     
    
    </>
  )
}

export default App
