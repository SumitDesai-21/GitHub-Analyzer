import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Profile from './components/Profile'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/profile/:userName' element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
