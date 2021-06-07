import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import { useActions } from '../../hooks/useActions';
import { versionAPI } from '../../http/versionAPI';
import { IVersion } from '../../types/version';
import VersionRow from '../../components/Version/VersionRow'
import VersionEdit from '../../components/Version/VersionEdit'
const AllVersions:React.FC = () => {
    const [versions,setVersions] = useState<IVersion[]>([])
    const [version,setVersion] = useState<IVersion>({} as IVersion)
    const [edit,setEdit] = useState<boolean>(false)

    const {stopLoading,setError,startLoading} = useActions()

    useEffect(()=>{
        async function fetchVersions(){
            try{
                startLoading()
                const data = await versionAPI.getAllVersions()
                setVersions(data)
                stopLoading()
            }catch(e){
                stopLoading()
                setError(e)
            }
        }
        fetchVersions()
    },[])

    const clickHandler = (id:number) =>{
        setVersion(versions.find(el => el.id === id)!)
        setEdit(!edit)
    }

    const closeHandler = () =>{
        setEdit(!edit)
    }
    return (
        <Grid container justify={'center'}>
            <VersionEdit close={closeHandler} edit={edit} version={version} />
            <TableContainer component={Paper} style={{maxWidth:1400}}>
                    <Table style={{minWidth:'650px'}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                        <TableCell width={20}>ID</TableCell>
                        <TableCell width={20}>Игра</TableCell>
                        <TableCell align='center'>Название</TableCell>
                        <TableCell align='center'>Код</TableCell>
                        <TableCell align='center'>Действие</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {versions.length
                            ?
                            versions.map(ver => <VersionRow key={ver.id} row={ver} clickHandler={clickHandler} />)
                            : ''
                        }
                    </TableBody>
                    </Table>
            </TableContainer>
        </Grid>
    );
}

export default AllVersions;