import React,{useState, ChangeEvent} from 'react'
import Button from '@material-ui/core/Button';
import {Grid,TextField,Container} from '@material-ui/core';
import { useActions } from '../hooks/useActions';
import {useForm, Controller} from 'react-hook-form'
import { userAPI } from '../http/userAPI';
import { useDispatch } from 'react-redux';
import { setError } from '../store/actions/global';

type Inputs = {
    email:string,
    password:string,
    family:string,
    name:string,
    number:string
}

const Login = () => {

    const [data,setData] = useState({
        email:"",
        password:"",
        name:'',
        family:'',
        number:""
    })

    const [errors,setErrors] = useState([])
    const {loginUser} = useActions()
    const dispatch = useDispatch()

    const {handleSubmit, control} = useForm<Inputs>()

    const [isLogin,setIsLogin] = useState(true)


    const loginHandler = async(data:any) =>{
        loginUser(data.email,data.password)
    }
    const registerHandler = async(data:Inputs) => {
       try{
        await userAPI.registration(data.email, data.name, data.family, data.password, data.number)
       }catch(e){
           if(e.response.status === 403){
               dispatch(setError(e.response.data.message))
           }
       }

    }

    const changeScreen = (screen:boolean) =>{
        setIsLogin(screen)
    }



    return (
        <Container>
            {isLogin ?
        <Grid container justify={"center"} style={{marginTop:100}}>
            <form onSubmit={handleSubmit(loginHandler)}>
                <div style={{display:"flex",flexDirection:"column",minWidth:400,textAlign:'center'}}>
                    <h2>Авторизация</h2>
                    <Controller
                        name='email'
                        control={control}
                        defaultValue={data.email}
                        render={({field}) => <TextField  variant={'outlined'} required label='Email' type='email' {...field} />}
                    />

                    <Controller
                        name='password'
                        control={control}
                        defaultValue={data.password}
                        render={({field}) => <TextField style={{marginTop:20}} variant={'outlined'} required label='Пароль' type='password' {...field} />}
                    />

                    <div style={{display:"flex",justifyContent:'space-around'}}>
                        <Button variant={"outlined"} style={{marginTop:20}} color={'primary'} >Восстановить</Button>
                        <Button variant={"outlined"} style={{marginTop:20}} color={'primary'} onClick={() => changeScreen(false)}>Регистрация</Button>
                    </div>
                    <Button variant={"outlined"} style={{marginTop:20}} color={'primary'} type='submit'>Войти</Button>
                </div>
            </form>
        </Grid> :
            <Grid container justify={"center"} style={{marginTop:100}}>
                <form onSubmit={handleSubmit(registerHandler)}>
                    <div style={{display:"flex",flexDirection:"column",minWidth:400,textAlign:'center'}}>
                        <h2>Регистрация</h2>
                        <Controller
                            name='name'
                            control={control}
                            defaultValue={data.name}
                            render={({field}) => <TextField variant={'outlined'} required label='Имя' type='text' {...field} />}
                        />

                        <Controller
                            name='family'
                            control={control}
                            defaultValue={data.family}
                            render={({field}) => <TextField style={{marginTop:20}} variant={'outlined'} required label='Фамилия' type='text' {...field} />}
                        />
                        <Controller
                            name='email'
                            control={control}
                            defaultValue={data.email}
                            render={({field}) => <TextField style={{marginTop:20}} variant={'outlined'} required label='Email' type='email' {...field} />}
                        />
                        <Controller
                            name='password'
                            control={control}
                            defaultValue={data.password}
                            render={({field}) => <TextField style={{marginTop:20}} variant={'outlined'} required label='Пароль' type='password' {...field} />}
                        />
                        <Controller
                            name='number'
                            control={control}
                            defaultValue={data.number}
                            render={({field}) => <TextField style={{marginTop:20}} variant={'outlined'} required label='Номер телефона' type='tel' {...field} />}
                        />

                        <div style={{display:"flex",justifyContent:'space-around'}}>
                            <Button variant={"outlined"} style={{marginTop:20}} color={'primary'} >Восстановить</Button>
                            <Button variant={"outlined"} style={{marginTop:20}} color={'primary'} onClick={() => changeScreen(true)}>Войти</Button>
                        </div>
                        <Button variant={"outlined"} style={{marginTop:20}} color={'primary'} type={"submit"}>Регистрация</Button>
                    </div>
                </form>
            </Grid>
            }
        </Container>
    );
}

export default Login;