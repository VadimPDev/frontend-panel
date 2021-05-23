import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'
import CssBaseline from '@material-ui/core/CssBaseline';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import {useActions} from '../../hooks/useActions'
import Button from '@material-ui/core/Button'

interface NavbarProps {
  mobileOpen:boolean;
  setMobileOpen:(mobile:boolean) => void;
}
const Navbar:React.FC<NavbarProps> = ({mobileOpen,setMobileOpen}) => {
    const {isAuth} = useTypedSelector(state => state.user)
    const {logOutUser} = useActions()

    const useStyles = makeStyles((theme: Theme) =>
            createStyles({
                appBar: {
                zIndex: theme.zIndex.drawer + 1,
                },
                menuButton: {
                  marginRight: theme.spacing(2),
                  [theme.breakpoints.up('sm')]: {
                    display: 'none',
                  },
                },
            }))
    const classes = useStyles()
    
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    }

    return (
      <>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{flexGrow:1}}>
            Панель управления
          </Typography>
          {isAuth && (
                        <div>
                            <Button variant={"contained"} onClick ={() => logOutUser()}>Выход</Button>
                        </div>
                    )}
        </Toolbar>
      </AppBar>
      </>
    );
}

export default Navbar;