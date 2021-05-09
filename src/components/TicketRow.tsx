import React from 'react'
import TableCell from '@material-ui/core/TableCell';
import moment from 'moment';
import TableRow from '@material-ui/core/TableRow';
import { ITicket } from '../types/ticket';

interface ITicketRowProps {
    row:ITicket;
    clickHandler:(id:number) => void
}
const TicketRow:React.FC<ITicketRowProps> = ({row,clickHandler}) => {
    return (
        <TableRow key={row.id} style={{cursor:'pointer'}} onClick={(e) => clickHandler(row.id)}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="center">{row.t_name}</TableCell>
                <TableCell align="center">Открыт</TableCell>
                <TableCell align="center">{moment(row.createdAt).format('DD.MM.YYYY')}</TableCell>
            </TableRow>
    );
}

export default TicketRow;