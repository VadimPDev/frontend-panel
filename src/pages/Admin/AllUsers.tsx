import React, { useEffect, useState } from 'react'
import { usersAdminAPI } from '../../http/admin/usersAdminAPI'
import { IUserProfile } from '../../types/user'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import UserRow from '../../components/UserRow'
import { startLoading,stopLoading } from '../../store/actions/global';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useFormik } from 'formik';
import { useActions } from '../../hooks/useActions';

const AllUsers:React.FC = () => {


    const [users,setUsers] = useState<IUserProfile[]>([])
    const {startLoading,stopLoading,editAdminUser} = useActions()

    const [edit, setEdit] = useState<boolean>(false)

    const [reload,setReload] = useState<boolean>(false)
    const [user,setUser] = useState<IUserProfile>()


    const values:IUserProfile = {
      id:0,
      email:'',
      name:'',
      family:'',
      balance:0,
      role:'',
      number:'',
      createdAt:''
    }
    const formik = useFormik({
      initialValues:user || values,
      enableReinitialize:true,
      onSubmit: async(values) => {
          editAdminUser(values.id,values.email,values.name,values.family,values.balance,values.number)
          setReload(prev => !prev)
      }
    })

    const closeHandler = () =>{
      setEdit(!edit)
    }

    const clickHandler = (id:number):void =>{
        setUser(users[id-1])
        setEdit(!edit)
        closeHandler()
    }

    useEffect(()=>{
        async function fetchUsers(){
            startLoading()
            const users = await usersAdminAPI.getAllUsers()
            setUsers(users)
            stopLoading()
        }
        fetchUsers()
    },[reload])

    return (
      <>
        <Grid container justify={'center'}>
              <Dialog open={edit} onClose={closeHandler} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"></DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Редактирование пользователя
                    <Button variant="contained" color="secondary" style={{marginLeft:20}}>
                        Заблокировать
                    </Button>
                    <Button variant="contained" color="secondary" style={{marginLeft:20}}>
                        Удалить
                    </Button>
                  </DialogContentText>
                  <form onSubmit={formik.handleSubmit}>
                    <div style={{display:"flex",flexDirection:"column",minWidth:400,textAlign:'center'}}>
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Имя"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField
                        fullWidth
                        id="family"
                        name="family"
                        label="Фамилия"
                        value={formik.values.family}
                        onChange={formik.handleChange}
                        error={formik.touched.family && Boolean(formik.errors.family)}
                        helperText={formik.touched.family && formik.errors.family}
                    />
                    <TextField
                        fullWidth
                        id="number"
                        name="number"
                        label="Телефон"
                        value={formik.values.number}
                        onChange={formik.handleChange}
                        error={formik.touched.number && Boolean(formik.errors.number)}
                        helperText={formik.touched.number && formik.errors.number}
                    />
                    <TextField
                        fullWidth
                        id="balance"
                        name="balance"
                        label="Баланс"
                        value={formik.values.balance}
                        onChange={formik.handleChange}
                        error={formik.touched.balance && Boolean(formik.errors.balance)}
                        helperText={formik.touched.balance && formik.errors.balance}
                    />
                    </div>
                    <div style={{display:'flex', justifyContent:"space-around",marginTop:20}}>
                    <Button color="primary" onClick={closeHandler}>
                        Отмена
                    </Button>
                    <Button color="primary" variant="contained" type="submit">
                        Сохранить
                    </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
          {users.length ?
        <TableContainer component={Paper} style={{maxWidth:1400}}>
        <Table style={{minWidth:'650px'}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell width={20}>ID</TableCell>
              <TableCell align='center'>Имя</TableCell>
              <TableCell align="center">Фамилия</TableCell>
              <TableCell align="center">E-Mail</TableCell>
              <TableCell align="center">Баланс</TableCell>
              <TableCell align="center">Роль</TableCell>
              <TableCell align="center">Статус</TableCell>
              <TableCell align="center">Дата регистрации</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => <UserRow row={row} clickHandler={clickHandler}/>) }
          </TableBody>
        </Table>
      </TableContainer> : '' }
      </Grid>
      </>
    );
}

export default AllUsers;