import { Card, CardContent, Container, Grid, Button} from '@material-ui/core';
import React from 'react';
import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import { serverAPI } from '../http/serverApi';
import { useActions } from '../hooks/useActions';
import { useDispatch } from 'react-redux';

interface ISettingsForm {
    s_rcon:string;
}
interface ISettingsProps {
    id:number;
    rcon:string;
}
const SettingsComponent:React.FC<ISettingsProps> = ({id,rcon}) => {

    const values:ISettingsForm = {
        s_rcon:rcon
    }

    const {setMessage,setError,changeRcon} = useActions()
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues:values,
        enableReinitialize:true,
        onSubmit:async(data) =>{
            try{
                const change = await serverAPI.changeRcon(id, data.s_rcon)
                changeRcon(data.s_rcon)
                setMessage('Пароль изменен')
            }catch(e){
                setError(e)
            }
        }
    })

    return (
        <Container>
            <Grid container item justify={'center'} md={12} xs={12}>
                <Card style={{width:'100%'}}>
                    <CardContent>
                        <form onSubmit={formik.handleSubmit}>
                                <div style={{display:'flex',flexDirection:'column',paddingBottom:15}}>
                                    <TextField
                                        id='s_rcon'
                                        name='s_rcon' 
                                        value={formik.values.s_rcon} 
                                        onChange={formik.handleChange}
                                        label='Rcon пароль'
                                        fullWidth 
                                    />
                                </div>
                                <Button color={'primary'} variant={'contained'} type='submit'>Сохранить</Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Container>
    );
}

export default SettingsComponent;