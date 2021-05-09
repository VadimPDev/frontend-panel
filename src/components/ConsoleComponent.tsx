import React, { useEffect, useRef, useState } from 'react'
import { serverAPI } from '../http/serverApi'
import { Button, Card, CardActions, CardContent, TextField } from '@material-ui/core';
interface ConsoleProps {
    id:number
}
const ConsoleComponent:React.FC<ConsoleProps> = ({id}) => {

    const [console,setConsole] = useState<string>('')

    const scroll = useRef<HTMLTextAreaElement>(null)

    useEffect(()=>{
        try{
            serverAPI.getConsole(id).then(res => setConsole(res.data.response))
        }catch(e){}
    },[])

    const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>) =>{
        setConsole(e.target.value)
    }

    useEffect(()=>{
        if(scroll && scroll.current){
            scroll.current.scrollTop = scroll.current.scrollHeight
        }
    })

    return (
        <Card>
          <CardContent>
              <textarea ref={scroll} readOnly={true} value={console} onChange={handleChange} rows={30} cols={125} spellCheck={false} style={{background:'#000',color:'#fff'}}></textarea>
          </CardContent>
          <CardActions>
              <div style={{display:"flex",alignItems:"center",width:'100%'}}>
                <TextField fullWidth label='Введите команду' />
                <Button color='primary' variant='contained'>Выполнить</Button>
              </div>
          </CardActions>
        </Card>
    );
}

export default ConsoleComponent;