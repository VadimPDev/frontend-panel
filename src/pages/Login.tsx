import React,{useState, ChangeEvent} from 'react'
import Button from '@material-ui/core/Button';
import {Grid,TextField,Container} from '@material-ui/core';
import { useActions } from '../hooks/useActions';



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

    const [isLogin,setIsLogin] = useState(true)

    const onChangeHandler = (event:ChangeEvent<HTMLInputElement>):void =>{
        const {name,value} = event.target

        setData({...data,[name]:value})
    }


    const loginHandler = () =>{
        loginUser(data.email,data.password)
    }

    const changeScreen = (screen:boolean) =>{
        setData({
            email:"",
            password:"",
            name:'',
            family:'',
            number:""
        })
        setIsLogin(screen)
    }



    return (
        <Container>
            {isLogin ? 
            <Grid container justify={"center"} style={{marginTop:100}}>
            <div style={{display:"flex",flexDirection:"column",minWidth:400,textAlign:'center'}}>
                <h2>Авторизация</h2>
                <TextField 
                    error={false} 
                    variant={'outlined'} 
                    label='Email' 
                    value={data.email} 
                    name='email'
                    required 
                    fullWidth 
                    onChange={onChangeHandler}
                />

                <TextField 
                    variant={'outlined'} 
                    label='Пароль' 
                    value={data.password} 
                    name='password'
                    type='password' 
                    fullWidth
                    required 
                    style={{marginTop:20}} 
                    onChange={onChangeHandler}
                />

                <div style={{display:"flex",justifyContent:'space-around'}}>
                    <Button variant={"outlined"} style={{marginTop:20}} color={'primary'} >Восстановить</Button>
                    <Button variant={"outlined"} style={{marginTop:20}} color={'primary'} onClick={() => changeScreen(false)}>Регистрация</Button>
                </div>
                <Button variant={"outlined"} style={{marginTop:20}} color={'primary'} onClick={loginHandler}>Войти</Button>
            </div>
        </Grid> : 
            <Grid container justify={"center"} style={{marginTop:100}}>
                    <div style={{display:"flex",flexDirection:"column",minWidth:400,textAlign:'center'}}>
                        <h2>Регистрация</h2>
                        <TextField 
                            variant={'outlined'} 
                            label='Имя' 
                            name='name'
                            value={data.name} 
                            fullWidth
                            required 
                            onChange={onChangeHandler}
                        />

                        <TextField 
                            variant={'outlined'} 
                            label='Фамилия' 
                            name='family'
                            value={data.family} 
                            fullWidth
                            required 
                            style={{marginTop:20}} 
                            onChange={onChangeHandler}
                        />
                        <TextField 
                            variant={'outlined'} 
                            label='Email' 
                            name='email' 
                            value={data.email} 
                            type={"email"} 
                            fullWidth
                            required 
                            style={{marginTop:20}} 
                            onChange={onChangeHandler}
                        />
                        <TextField variant={'outlined'} label='Пароль' name='password' type={"password"} fullWidth required style={{marginTop:20}} onChange={onChangeHandler}/>
                        <TextField variant={'outlined'} label='Номер телефона' name='number' type={"tel"} fullWidth required style={{marginTop:20}} onChange={onChangeHandler}/>

                        <div style={{display:"flex",justifyContent:'space-around'}}>
                            <Button variant={"outlined"} style={{marginTop:20}} color={'primary'} >Восстановить</Button>
                            <Button variant={"outlined"} style={{marginTop:20}} color={'primary'} onClick={() => changeScreen(true)}>Войти</Button>
                        </div>
                        <Button variant={"outlined"} style={{marginTop:20}} color={'primary'} onClick={loginHandler} type={"submit"}>Регистрация</Button>
                    </div>
            </Grid>
            }
        </Container>
    );
}

export default Login;