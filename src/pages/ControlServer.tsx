import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import {useTypedSelector} from '../hooks/useTypedSelector'
import {useActions} from '../hooks/useActions'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InfoComponent from '../components/InfoComponent';
import FtpComponent from '../components/FtpComponent';
import { serverAPI} from '../http/serverApi';
import {IInfoServer} from '../types/server'
import ConfigComponent from '../components/ConfigComponent';
import ConsoleComponent from '../components/ConsoleComponent';
import SampImage from '../assets/img/games/samp.png'
import MtaImage from '../assets/img/games/mtasa.png'
import Cs16Image from '../assets/img/games/cs16.png'
import MinecraftImage from '../assets/img/games/minecraft.png'


interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: any;
    value: any;
  }
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box m={1}>
            {children}
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: any) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }




const ControlServer:React.FC = () => {


    const {sid} = useParams<Record<string,string>>()

    const {StartServer,StopServer,getMyserver} = useActions()

    const {s_status,s_port,location,game,id,version,s_password} = useTypedSelector(state => state.server)

    const [value, setValue] = React.useState(0);
    const [info,setInfo] = useState<IInfoServer>({} as IInfoServer)

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue);
    };

    const getImage = (code:string) => {
      switch(code){
        case 'samp':
          return SampImage
        case 'mtasa':
          return MtaImage
        case 'cs16':
          return Cs16Image
        case 'minecraft':
          return MinecraftImage  
      }
    }

    useEffect(()=>{
      async function fetchInfo(){
        const data = await serverAPI.getServerInfo(sid)
        setInfo(data.data)
      }

      if(s_status === 0 ){
        return
      }else{
        fetchInfo()
      }
    },[s_status])




    useEffect(()=>{
        getMyserver(sid)
    },[])


    return (
        <Grid container justify='center'>
              <Card variant="outlined" style={{minWidth:300,margin:5}}>
                <CardContent>
                    <CardMedia style={{paddingTop:'100%',height:0}} image={getImage(game?.g_code)} title='server' />
                    <Grid container justify='center' direction='column'>
                        {s_status === 0
                        ?
                        <Button size="large" color="primary" variant='contained' style={{margin:5}} onClick={() => StartServer(id)}>Включить</Button>
                        :
                        <>
                        <Button size="large" color="primary" variant='contained' style={{margin:5}} onClick={() => StopServer(id)}>Выключить</Button>
                        <Button size="large" color="primary" variant='contained' style={{margin:5}}>Перезапустить</Button>
                        </>
                        }
                    </Grid>
                    <Typography variant="h6" component="h3">
                        Игра: {game?.g_name}
                    </Typography>
                    <Typography variant="h6" component="h3">
                        Версия: {version?.v_name}
                    </Typography>
                    <Typography variant="h6" component="h3">
                        Локация: {location?.l_name}
                    </Typography>
                    <Typography variant="h6" component="h3">
                        Адрес: {location?.l_ip + ':' + s_port}
                    </Typography>
                    {s_status === 1
                    ?
                    <>
                    <Typography variant="h6" component="h3">
                        Имя: {info.name}
                    </Typography>
                    <Typography variant="h6" component="h3">
                        Онлайн: {info.raw?.numplayers} / {info.maxplayers}
                    </Typography>
                    </>
                    : null
                    }

                </CardContent>
                <CardActions>

                </CardActions>
            </Card>

        <div style={{margin:5}}>
        <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Информация" {...a11yProps(0)} />
          <Tab label="FTP Доступ" {...a11yProps(1)} />
          <Tab label="Редактор конфига" {...a11yProps(2)} />
          <Tab label="Консоль" {...a11yProps(3)} />
          <Tab label="Репозиторий" {...a11yProps(4)} />
          <Tab label="Настройки" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <InfoComponent />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FtpComponent ip={location.l_ip} password={s_password} id={id} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ConfigComponent id={id} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ConsoleComponent id={id} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      </div>
    </Grid>
    );
}

export default ControlServer;