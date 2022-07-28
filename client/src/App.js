import './App.css';
import LandingPage from './pages/Landing';
import Home from './pages/Home'
import Detail from './pages/Detail';
import { Route, Routes } from 'react-router-dom'
import NotFound from './components/NotFound';
import Loading from './components/Loading';
import Form from './pages/Form'

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/detail/:id' element={<Detail/>}/>
        <Route path='/form' element={<Form />} />
        <Route path='*' element={<NotFound />} /> 
        <Route path='/loading' element={<Loading/>} />
      </Routes> 
    </>
  );
}

export default App;
