import React,{useEffect,useState} from 'react'
import {useActions} from '../hooks/useActions'
import {useTypedSelector} from '../hooks/useTypedSelector'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Select from '@material-ui/core/Select';
import {ILocation} from '../types/location'
import {IGame} from '../types/game'
import {IVersion} from '../types/version'
import {serverAPI} from '../http/serverApi'
import { useHistory } from 'react-router';
import OrderTotal from '../components/UI/OrderTotal';
import { useDispatch } from 'react-redux';
import { setError , setMessage,ResetGlobal} from '../store/actions/global';
import { resetOrdersPage } from '../store/actions/order';


const OrderServer:React.FC = () => {

    const {fetchGames,fetchLocations,fetchVersion,startLoading,stopLoading} = useActions()
    const {games,locations,versions} = useTypedSelector(state => state.order)

    const history = useHistory()
    const dispatch = useDispatch()

    const [game,setGame] = useState<IGame>({} as IGame)
    const [version,setVersion] = useState<IVersion>({} as IVersion)
    const [location,setLocation] = useState<ILocation>({} as ILocation)
    const [slots,setSlots] = useState<number | number[]>(10)
    const [period,setPeriod] = useState<number>(30)
    const [price,setPrice] = useState<number>(0)


    useEffect(()=>{
        fetchGames()
        fetchLocations()
        return () =>{
            dispatch(resetOrdersPage())
        }
    },[])

    useEffect(()=>{
        fetchVersion(game.id)
        setVersion({} as IVersion)
    },[game])


    useEffect(()=>{
        calculatePrice()
    },[slots,game,period])



    function valuetext(value: number) {
        return `${value}°C`;
    }

    const orderServerHandler = async() =>{
        try{
            startLoading()
            const {data} = await serverAPI.orderServer(game.id,location.id,slots,period,version.id)
            dispatch(setMessage(data.message))
            setTimeout(()=>{
                dispatch(ResetGlobal())
                history.push('/')
            },3000)
        }catch(e){
            dispatch(setError(e))
            stopLoading()
        }
    }

    const calculatePrice = () =>{
        if(typeof slots === 'number'){
            console.log(game?.g_price )
            let price = game?.g_price * slots
            switch(period){
                case 30:
                    break
                case 90:
                    price *= 3
                    break
                case 180:
                    price *= 6
                    break
                case 360:
                    price *=12
                    break
            }
            setPrice(price)
        }
    }

    const changeHandler = (event:any):void =>{
        if(event.target.name === 'game'){
            const currentGame = games.find(i => i.id === event.target.value)!
            setGame(currentGame)
        }else if(event.target.name === 'version'){
            const currentVersion = versions.find(i => i.id === event.target.value)!
            setVersion(currentVersion)
        }else if (event.target.name === 'location'){
            const currentLocation = locations.find(i => i.id === event.target.value)!
            setLocation(currentLocation)
        }
    }

    const handleSliderChange = (event: any, newValue: number | number[]) => {
        setSlots(newValue);
      };



    return (
        <Grid container justify={'center'} >
            <Grid container item md={8} lg={7} sm={5}>
                <Card style={{width:'100%',margin:5}}>
                <CardContent>
                    <Typography  color="textSecondary" gutterBottom>
                    Заказ сервера
                    </Typography>
                    <Grid container item direction={"column"}>
                        <FormControl style={{maxWidth:650,marginTop:15}}>
                            <InputLabel id="game-label">Игра</InputLabel>
                            <Select
                            labelId="game-label"
                            id="game"
                            value={game.g_name}
                            name='game'
                            onChange={changeHandler}
                            >
                                {games.map(game =>{
                                    return <MenuItem value={game.id} key={game.id}>{game.g_name}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <FormControl style={{maxWidth:650,marginTop:15}}>
                            <InputLabel id="location-label">Локация</InputLabel>
                            <Select
                            labelId="location-label"
                            id="location"
                            name='location'
                            value={location.l_name}
                            onChange={changeHandler}
                            >
                            {locations.map(location =>{
                                return <MenuItem value={location.id} key={location.id}>{location.l_name}</MenuItem>
                            })}

                            </Select>
                        </FormControl>
                        <FormControl style={{maxWidth:650,marginTop:15}}>
                            <InputLabel id="location-label">Версия</InputLabel>
                            <Select
                            labelId="location-label"
                            id="version"
                            name='version'
                            value={version.v_name}
                            onChange={changeHandler}
                            >
                            {versions.map(version =>{
                                return <MenuItem value={version.id} key={version.id}>{version.v_name}</MenuItem>
                            })}

                            </Select>
                        </FormControl>
                        <FormControl style={{maxWidth:650,marginTop:15}}>
                            <InputLabel id="period">Период</InputLabel>
                            <Select
                            labelId="period-label"
                            id="period"
                            onChange={(e:any) => setPeriod(e.target.value)}
                            value={period}
                            >
                            <MenuItem value={30}>30 дней</MenuItem>
                            <MenuItem value={90}>90 дней</MenuItem>
                            <MenuItem value={180}>180 дней</MenuItem>
                            <MenuItem value={360}>1 год </MenuItem>
                            </Select>
                        </FormControl>
                        <Typography id="slots-slider" gutterBottom style={{marginTop:15}}>
                            Количество слотов
                        </Typography>
                        <Slider
                            value={slots}
                            key="slots"
                            getAriaValueText={valuetext}
                            aria-labelledby="slots-slider"
                            id="slots-slider"
                            valueLabelDisplay="auto"
                            step={10}
                            onChange={handleSliderChange}
                            marks
                            min={game?.g_min_slots}
                            max={game?.g_max_slots}
                            style={{maxWidth:650,marginTop:10}}
                        />
                    </Grid>
                </CardContent>

                </Card>
                </Grid>

                <Grid item md={3} sm={4}>
                    <OrderTotal
                        game={game}
                        location={location}
                        slots={slots}
                        price={price}
                        period={period}
                        version={version}
                        orderServerHandler={orderServerHandler}
                />
                </Grid>
        </Grid>
    );
}

export default OrderServer;