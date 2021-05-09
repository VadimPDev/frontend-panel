import React from "react";
import { IUserProfile } from "../types/user";
import TableCell from '@material-ui/core/TableCell';
import moment from 'moment';
import TableRow from '@material-ui/core/TableRow';


interface UserRowProps {
    row:IUserProfile;
    clickHandler:(id:number) => void;
}

const UserRow:React.FC<UserRowProps> = ({row,clickHandler}) => {


    return (
            <TableRow key={row.id} style={{cursor:'pointer'}} onClick={(e) => clickHandler(row.id)}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.family}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.balance}</TableCell>
                <TableCell align="center">{row.role === 'USER' ? 'Пользователь' : 'Администратор'}</TableCell>
                <TableCell align="center">Активен</TableCell>
                <TableCell align="center">{moment(row.createdAt).format('DD.MM.YYYY')}</TableCell>
            </TableRow>
    );
}

export default UserRow;