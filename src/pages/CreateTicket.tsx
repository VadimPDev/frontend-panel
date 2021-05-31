import { Button, Grid, Card,CardContent, Container } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import React from 'react'
import { useHistory } from 'react-router';
import { useActions } from '../hooks/useActions';
import { ticketAPI } from '../http/ticketAPI';
import { MY_TICKETS } from '../utils/consts';
interface ITicketForm {
    name:string;
    text:string;
}
const CreateTicket:React.FC = () => {

    const  values:ITicketForm = {
        name:'',
        text:'',
    }

    const {setMessage} = useActions()
    const history = useHistory()

    const formik = useFormik({
        initialValues:values,
        onSubmit:async(data) =>{
            try{
                const res = await ticketAPI.create(data.name,data.text)
                setMessage(res.message)
                history.push(MY_TICKETS)
            }catch(e){
                console.log(e)
            }
        }
    })
    return (
        <Container maxWidth={'md'}>
            <Grid container justify={"center"} xs={12} sm={12} md={12}>
                <Card style={{width:'100%'}}>
                <CardContent>
                <form onSubmit={formik.handleSubmit}>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center',paddingBottom:20}}>
                    <TextField
                        id="name"
                        name='name'
                        label="Заголовок"
                        variant="outlined"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        fullWidth
                    />
                    <textarea
                        id='text'
                        name='text'
                        placeholder='Введите ваш запрос'
                        className='ticket__create'
                        value={formik.values.text}
                        onChange={formik.handleChange}
                        rows={20}
                        style={{marginTop:20,border:'1px solid grey',width:'100%'}}
                    >
                    </textarea>
                    </div>
                    <Button color={'primary'} variant={'contained'} type='submit'>Создать</Button>
                </form>
                </CardContent>
                </Card>
            </Grid>
        </Container>
    );
}

export default CreateTicket;