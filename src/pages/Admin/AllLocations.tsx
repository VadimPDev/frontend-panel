import React,{useEffect, useState} from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import LocationRow from '../../components/Location/LocationRow';
import LocationEdit from '../../components/Location/LocationEdit';
import { useActions } from '../../hooks/useActions';
import { locationAPI } from '../../http/locationAPI';
import { ILocation } from '../../types/location';
const AllLocations:React.FC = () => {
    const [locations,setLocations] = useState<ILocation[]>([])
    const [location,setLocation] = useState<ILocation>({} as ILocation)

    const {startLoading,stopLoading,setError} = useActions()

    const [edit,setEdit] = useState<boolean>(false)

    useEffect(()=>{
        async function fetchTickets(){
            try{
                startLoading()
                const res = await locationAPI.getAllLocations()
                stopLoading()
                setLocations(res)
            }catch(e){
                stopLoading()
                setError(e)
            }
        }
        fetchTickets()
    },[])

    const clickHandler = (id:number) =>{
        setLocation(locations.find(el => el.id === id)!)
        setEdit(!edit)
    }

    const closeHandler = () =>{
        setEdit(!edit)
    }
    return (
        <Grid container justify={'center'}>
            <LocationEdit close={closeHandler} edit={edit} location={location} />
            <TableContainer component={Paper} style={{maxWidth:1400}}>
                    <Table style={{minWidth:'650px'}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                        <TableCell width={20}>ID</TableCell>
                        <TableCell align='center'>Имя</TableCell>
                        <TableCell align='center'>Статус</TableCell>
                        <TableCell align="center">IP</TableCell>
                        <TableCell align="center">Ядер</TableCell>
                        <TableCell align="center">Ram</TableCell>
                        <TableCell align="center">Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {locations.length
                            ?
                            locations.map(location => <LocationRow key={location.id} row={location} clickHandler={clickHandler} />)
                            : ''
                        }
                    </TableBody>
                    </Table>
            </TableContainer>
        </Grid>
    );
}

export default AllLocations;