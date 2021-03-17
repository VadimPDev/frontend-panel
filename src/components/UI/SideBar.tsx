import React from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Toolbar from '@material-ui/core/Toolbar';
import MailIcon from '@material-ui/icons/Mail';
import StyledLink from './StyledLink'
import {sidebarRoutes} from '../../routes'


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
            drawerContainer: {
            overflow: 'auto',
            },
        }),
);


const SideBar:React.FC = () => {

    const classes = useStyles()
    return (
        <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {sidebarRoutes.map((route,index) => (
              <StyledLink to={route.path} key={index}>
                <ListItem button key={route.title}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={route.title} />
                </ListItem>
              </StyledLink>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={index}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    );
}



export default SideBar;