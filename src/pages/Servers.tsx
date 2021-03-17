import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import { Grid } from '@material-ui/core';
import {getMyServers, startServer,stopServer} from '../http/serverApi'
import { IServer } from '../types/server';
import { green,red,grey } from '@material-ui/core/colors';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import RefreshIcon from '@material-ui/icons/Refresh';
import StopIcon from '@material-ui/icons/Stop';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(id: number, game: string, location: string, ip: string, slots: number) {
  return { id, game, location, ip, slots };
}

const Servers:React.FC = () => {
    const classes = useStyles();

    const history = useHistory()

    const [servers,setServers] = useState<IServer[]>([])

    useEffect(()=>{
      async function fetchServers(){
          const response = await getMyServers()
          setServers(response)
      }
      fetchServers() 
    },[])
    

    return (
        <Grid container justify={'center'}>
        <TableContainer component={Paper} style={{maxWidth:1400}}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell width={20}>ID</TableCell>
              <TableCell align='center'>Статус</TableCell>
              <TableCell align="center">Игра</TableCell>
              <TableCell align="center">Локация</TableCell>
              <TableCell align="center">IP - адрес</TableCell>
              <TableCell align="center">Кол.во слотов</TableCell>
              <TableCell align="center">Дейтсвия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {servers ? servers.map((row) => (
              <TableRow key={row.id} style={{cursor:'pointer'}} onClick={() => history.push('/servers/'+ row.id)}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="center">{row.s_status === 1 ? 'Работает' : 'Выключен'}</TableCell>
                <TableCell align="center">{row.game.g_name}</TableCell>
                <TableCell align="center">{row.location.l_name}</TableCell>
                <TableCell align="center">{row.location.l_ip}:{row.s_port}</TableCell>
                <TableCell align="center">{row.s_slots}</TableCell>
                <TableCell align="center">
                <Tooltip title="Запустить сервер">
                  <PlayArrowIcon style={{ color: green[500],cursor:'pointer',margin:2 }} onClick={() => startServer(row.id)} />
                </Tooltip>
                <Tooltip title="Остановить сервер">
                   <StopIcon style={{ color: red[500],cursor:'pointer',margin:2 }} onClick={() => stopServer(row.id)}/> 
                   </Tooltip>
                   <Tooltip title="Перезапустить сервер">
                   <RefreshIcon style={{ color: grey[500],cursor:'pointer',margin:2 }}/>
                   </Tooltip>
                </TableCell>
              </TableRow>
            )) : <p>Закажите новый сервер</p>}
          </TableBody>
        </Table>
      </TableContainer>
      </Grid>
    );
}

export default Servers;