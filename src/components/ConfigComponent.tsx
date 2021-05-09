import { Button, Card, CardActions, CardContent } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { serverAPI } from '../http/serverApi';
interface ConfigProps {
    id:number
}
const ConfigComponent:React.FC<ConfigProps> = ({id}) => {

    const [config,setConfig] = useState<string>('')

    useEffect(()=>{
        serverAPI.getConfig(id).then(res => setConfig(res.data.response))
    },[])

    const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>) =>{
        setConfig(e.target.value)
    }

    const saveConfig = async() =>{
        try{
            const response = await serverAPI.putConfig(id, config)
            console.log(response)
        }catch(e){
            console.log(e)
        }
    }

    return (
      <Card>
          <CardContent>
              <textarea value={config} onChange={handleChange} rows={30} cols={125} spellCheck={false} style={{background:'#000',color:'#fff'}}></textarea>
          </CardContent>
          <CardActions>
              <Button color='primary' variant='contained' onClick={() => saveConfig()}>Сохранить</Button>
          </CardActions>
      </Card>
    );
}

export default ConfigComponent;