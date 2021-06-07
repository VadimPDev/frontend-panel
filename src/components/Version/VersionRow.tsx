import React from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {IVersion} from '../../types/version'
import { Button } from '@material-ui/core';

interface IVersionRowProps {
    row:IVersion;
    clickHandler:(id:number) => void
}
const VersionRow:React.FC<IVersionRowProps> = ({row,clickHandler}) => {
    return (
        <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="center">{row.game.g_name}</TableCell>
                <TableCell align="center">{row.v_name}</TableCell>
                <TableCell align="center">{row.v_code}</TableCell>
                <TableCell align="center"><Button onClick={() => clickHandler(row.id)}>Редактировать</Button></TableCell>
            </TableRow>
    );
}

export default VersionRow;