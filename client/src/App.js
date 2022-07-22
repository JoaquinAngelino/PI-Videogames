import './App.css';
import LandingPage from './pages/Landing';
import Home from './pages/Home'
import Detail from './pages/Detail';
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/detail/:id' element={<Detail/>}/>
        {/* <Route path='/form' element={<FormPage />} />
        <Route path='*' element={<NotFound />} /> */}
      </Routes> 
    </>
  );
}

export default App;
