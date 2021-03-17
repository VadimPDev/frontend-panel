import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouter from './components/AppRouter';
import Navbar from './components/UI/Navbar';
import { useActions } from './hooks/useActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import {check} from './http/userAPI'
import { useTypedSelector } from './hooks/useTypedSelector';
import SideBar from './components/UI/SideBar';


const App:React.FC = () => {

  const {setUser} = useActions()
  const {loading,isAuth} = useTypedSelector(state => state.user)

  useEffect(()=>{
    async function getUser() {
        const {email,role,id} = await check()
        setUser(email,role,id)
    }
    getUser()
  },[])


  if(loading){
    return (
      <>
      <Navbar />
      <div style={{display:'flex',height:window.innerHeight - 50,justifyContent:"center",alignItems:"center"}}>
          <CircularProgress />
      </div>
      </>
    )
  }

  return (
    <BrowserRouter>
        <div style={{display:'flex'}}>
          <Navbar />
          {isAuth && (<SideBar />)}
          <main className="main" style={{flexGrow:1,padding:isAuth ? '90px 30px 0px 50px' : '0'}}>
              <AppRouter />
          </main>
        </div>
    </BrowserRouter>
  );
}

export default App;
