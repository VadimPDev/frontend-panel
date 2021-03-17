import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'
import CssBaseline from '@material-ui/core/CssBaseline';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import {useActions} from '../../hooks/useActions'
import Button from '@material-ui/core/Button'
const Navbar = () => {
    const {isAuth} = useTypedSelector(state => state.user)
    const {logOutUser} = useActions()

    const useStyles = makeStyles((theme: Theme) =>
            createStyles({
                appBar: {
                zIndex: theme.zIndex.drawer + 1,
                },
            }))
    const classes = useStyles()        

    return (
      <>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
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