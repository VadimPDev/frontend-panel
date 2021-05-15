import React, { useEffect, useRef, useState } from 'react'
import { serverAPI } from '../http/serverApi'
import { Button, Card, CardActions, CardContent, TextField } from '@material-ui/core';
import { useActions } from '../hooks/useActions';
interface ConsoleProps {
    id:number
}
const ConsoleComponent:React.FC<ConsoleProps> = ({id}) => {

    const [consoleValue,setConsoleValue] = useState<string>('')
    const [command,setCommand] = useState<string>('')

    const scroll = useRef<HTMLTextAreaElement>(null)

    const {startLoading,stopLoading,setError} = useActions()

    useEffect(()=>{
        try{
            serverAPI.getConsole(id).then(res => setConsoleValue(res.data.response))
        }catch(e){}
    },[])

    const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>) =>{
        setConsoleValue(e.target.value)
    }

    const modify = (text:string) =>{
        return text.split('/').join('\n' + '/')
    }

    const changeCommand = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setCommand(event.target.value)
    }

    const sendRcon = async() =>{
        try{
            startLoading()
            const response = await serverAPI.sendRcon(id, command)
            setConsoleValue(prevValue => prevValue + modify(response.response))
            stopLoading()
        }catch(e){
            setError(e)
            stopLoading()
        }
    }

    useEffect(()=>{
        if(scroll && scroll.current){
            scroll.current.scrollTop = scroll.current.scrollHeight
        }
    })


    return (
        <Card>
          <CardContent>
              <textarea ref={scroll} readOnly={true} value={consoleValue} onChange={handleChange} rows={30} cols={125} spellCheck={false} style={{background:'#000',color:'#fff'}}></textarea>
          </CardContent>
          <CardActions>
              <div style={{display:"flex",alignItems:"center",width:'100%'}}>
                <TextField onChange={changeCommand} value={command} fullWidth label='Введите команду' />
                <Button color='primary' variant='contained' onClick={() => sendRcon()}>Выполнить</Button>
              </div>
          </CardActions>
        </Card>
    );
}

export default ConsoleComponent;