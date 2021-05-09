import React,{useEffect, useState} from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import { ITicket } from '../types/ticket';
import { ticketAPI } from '../http/ticketAPI';
import TicketRow from '../components/TicketRow';
import { useActions } from '../hooks/useActions';
import { useHistory } from 'react-router';
const MyTickets:React.FC = () => {
    const [tickets,setTickets] = useState<ITicket[]>([])

    const history = useHistory()

    const {startLoading,stopLoading,setError} = useActions()

    useEffect(()=>{
        async function fetchTickets(){
            try{
                startLoading()
                const res = await ticketAPI.getMy()
                stopLoading()
                setTickets(res)
            }catch(e){
                stopLoading()
                setError(e)
            }
        }
        fetchTickets()
    },[])

    const clickHandler = (id:number) =>{
        history.push(`/tickets/${id}`)
    }
    return (
        <Grid container justify={'center'}>
            <TableContainer component={Paper} style={{maxWidth:1400}}>
                    <Table style={{minWidth:'650px'}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                        <TableCell width={20}>ID</TableCell>
                        <TableCell align='center'>Заголовок</TableCell>
                        <TableCell align='center'>Статус</TableCell>
                        <TableCell align="center">Дата создания</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tickets.map(ticket => <TicketRow key={ticket.id} row={ticket} clickHandler={clickHandler} />)}
                    </TableBody>
                    </Table>
            </TableContainer>
        </Grid>
    );
}

export default MyTickets;