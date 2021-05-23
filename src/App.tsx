import React, { useEffect,useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouter from './components/AppRouter';
import Navbar from './components/UI/Navbar';
import { useActions } from './hooks/useActions';
import {userAPI} from './http/userAPI'
import { useTypedSelector } from './hooks/useTypedSelector';
import SideBar from './components/UI/SideBar';
import AlertMessage from './components/UI/AlertMessage';
import Loader from './components/UI/Loader';


const App:React.FC = () => {

  const {setUser} = useActions()
  const {isAuth} = useTypedSelector(state => state.user)
  const {loading} = useTypedSelector(state => state.global)
  const [mobileOpen,setMobileOpen] = useState<boolean>(false)

  useEffect(()=>{
    async function getUser() {
        const {email,role,id} = await userAPI.check()
        setUser(email,role,id)
    }
    getUser()
  },[])



  return (
    <BrowserRouter>
        <div style={{display:'flex'}}>
          <Navbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
          {isAuth && (<SideBar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />)}
          <main className="main" style={{flexGrow:1,padding:isAuth ? '90px 30px 0px 50px' : '0',position:'relative'}}>
            {loading ? <Loader /> : '' }
              <AlertMessage />
              <AppRouter />
          </main>
        </div>
    </BrowserRouter>
  );
}

export default App;
