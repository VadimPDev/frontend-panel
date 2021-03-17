import React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



interface FtpProps {
    ip:string;
    password:string;
    id:number;
}

const FtpComponent:React.FC<FtpProps> = ({ip,password,id}) => {
    return (
        <>
        
        <Card variant="outlined">
        <CardContent style={{display:'flex',justifyContent:'center',flexDirection:"column",alignItems:'center'}}>
        <TableContainer component={Paper} style={{maxWidth:700}}>
      <Table  aria-label="custom pagination table">
        <TableBody>
      
            <TableRow>
              <TableCell component="th" scope="row">
                IP адресс
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {ip}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Логин 
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                gs{id}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Пароль
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {password}
              </TableCell>
            </TableRow>

        </TableBody>
      </Table>
    </TableContainer>
        <form noValidate autoComplete="off" style={{minWidth:500}} >
                <TextField id="password" fullWidth label="Пароль" />
                <TextField id="password-repeat" fullWidth label="Повторите пароль" />
        </form>
        </CardContent>
        <CardActions style={{display:'flex',justifyContent:'center'}}>
            <Button color='primary' variant="contained">Сохранить</Button>
        </CardActions>
    </Card>
    </>
    );
}

export default FtpComponent;