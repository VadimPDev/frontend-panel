import React from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { ILocation, LocationStatus } from '../../types/location';
import { Button } from '@material-ui/core';

interface ILocationRowProps {
    row:ILocation;
    clickHandler:(id:number) => void
}
const TicketRow:React.FC<ILocationRowProps> = ({row,clickHandler}) => {
    return (
        <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="center">{row.l_name}</TableCell>
                <TableCell align="center">{LocationStatus[row.l_status]}</TableCell>
                <TableCell align="center">{row.l_ip}</TableCell>
                <TableCell align="center">{row.l_cores}</TableCell>
                <TableCell align="center">{row.l_ram} GB</TableCell>
                <TableCell align="center"><Button onClick={() => clickHandler(row.id)}>Редактировать</Button></TableCell>
            </TableRow>
    );
}

export default TicketRow;