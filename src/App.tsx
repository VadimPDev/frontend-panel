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
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
  }),
);



const App:React.FC = () => {

  const {setUser} = useActions()
  const {isAuth} = useTypedSelector(state => state.user)
  const {loading} = useTypedSelector(state => state.global)
  const [mobileOpen,setMobileOpen] = useState<boolean>(false)
  const classes = useStyles();

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
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {loading ? <Loader /> : '' }
              <AlertMessage />
              <AppRouter />
          </main>
        </div>
    </BrowserRouter>
  );
}

export default App;
