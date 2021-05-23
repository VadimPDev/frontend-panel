import React, { useState } from 'react'
import { createStyles, Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Toolbar from '@material-ui/core/Toolbar';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import Collapse from '@material-ui/core/Collapse';
import MailIcon from '@material-ui/icons/Mail';
import Hidden from '@material-ui/core/Hidden';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import StyledLink from './StyledLink'
import {adminRoutes, sidebarRoutes} from '../../routes'
import {useTypedSelector} from '../../hooks/useTypedSelector'
import {ALL_USERS_ADMIN, MAIN_ROUTE,MY_SERVERS,SERVER_BUY} from '../../utils/consts'

const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
            display: 'flex',
            },
            appBar: {
            zIndex: theme.zIndex.drawer + 10,
            },
            drawer: {
            width: 240,
            flexShrink: 0,
            },
            drawerPaper: {
            width: 240,
            },
            menuButton: {
              marginRight: theme.spacing(2),
              [theme.breakpoints.up('sm')]: {
                display: 'none',
              },
            },
            toolbar: theme.mixins.toolbar,
            drawerContainer: {
            overflow: 'auto',
            },
        }),
);


 const getIcon = (path:string) =>{
   switch (path){
    case MAIN_ROUTE:
       return <HomeIcon />
    case SERVER_BUY:
      return <ShoppingCartIcon />
    case MY_SERVERS:
      return <SportsEsportsIcon />
    case ALL_USERS_ADMIN:
      return <PeopleIcon />
    default:
      return <HomeIcon />
   }
 }
interface SideBarProps {
  mobileOpen:boolean;
  setMobileOpen:(mobile:boolean) => void;
}

const SideBar:React.FC<SideBarProps> = ({mobileOpen,setMobileOpen}) => {

    const classes = useStyles()
    const {user} = useTypedSelector(state => state.user)
    const [open, setOpen] = useState<boolean>(false)
    const theme = useTheme()

    const handleClick = () => {
      setOpen(!open);
    };

    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    }

    const drawer = (
      <div className={classes.drawerContainer}>
          <List>
            {sidebarRoutes.map((route,index) => (
              <StyledLink to={route.path} key={index}>
                <ListItem button key={route.title}>
                  <ListItemIcon>{getIcon(route.path)}</ListItemIcon>
                  <ListItemText primary={route.title} />
                </ListItem>
              </StyledLink>
            ))}
            {user.role === 'ADMIN'
            ?
          <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Админ панель" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            :''
          }
          </List>
          {user.role === 'ADMIN'
            ?
          <Collapse in={open} timeout="auto" unmountOnExit>
          <List>
            {adminRoutes.map((route, index) => (
              <StyledLink to={route.path} key={index}>
                <ListItem button key={route.title}>
                  <ListItemIcon>{getIcon(route.path)}</ListItemIcon>
                  <ListItemText primary={route.title} />
                </ListItem>
              </StyledLink>
            ))}
          </List>
        </Collapse>
          : ''
          }
        </div>
    )

    return (
      <>
      <Hidden smUp implementation="css">
          <Drawer
          className={classes.drawer}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          >
        <Toolbar />
          {drawer}
        </Drawer>
      </Hidden>
       <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
     </Hidden>
     </>
    );
}



export default SideBar;