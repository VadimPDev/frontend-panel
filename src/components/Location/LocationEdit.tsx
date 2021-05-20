import React from 'react'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useFormik } from 'formik';
import { ILocation } from '../../types/location';
import { locationAPI } from '../../http/locationAPI';
import { useActions } from '../../hooks/useActions';

interface LocationEditProps {
    edit:boolean;
    close:() => void;
    location:ILocation;
}
const LocationEdit:React.FC<LocationEditProps> = ({edit,close,location}) => {

    const {setError,startLoading,stopLoading,setMessage} = useActions()

    const formik = useFormik({
        initialValues:location,
        enableReinitialize:true,
        onSubmit:async(values)=>{
            try{
                startLoading()
                await locationAPI.editLocation(values)
                setMessage('Изменения сохранены')
                stopLoading()
            }catch(e){
                stopLoading()
                setError(e)
            }
        },
    })
    return (
        <Dialog open={edit} onClose={close} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"></DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Редактирование локации
                  </DialogContentText>
                  <form onSubmit={formik.handleSubmit}>
                    <div style={{display:"flex",flexDirection:"column",minWidth:400,textAlign:'center'}}>
                    <TextField
                        fullWidth
                        id="l_name"
                        name="l_name"
                        label="Название"
                        type="text"
                        value={formik.values.l_name}
                        onChange={formik.handleChange}
                    />
                    <TextField
                        fullWidth
                        id="l_ip"
                        name="l_ip"
                        label="IP"
                        value={formik.values.l_ip}
                        onChange={formik.handleChange}
                    />
                    <TextField
                        fullWidth
                        id="l_cores"
                        name="l_cores"
                        label="Ядер"
                        value={formik.values.l_cores}
                        onChange={formik.handleChange}
                    />
                    <TextField
                        fullWidth
                        id="l_ram"
                        name="l_ram"
                        label="RAM, GB"
                        value={formik.values.l_ram}
                        onChange={formik.handleChange}
                    />
                    <TextField
                        fullWidth
                        id="l_port"
                        name="l_port"
                        label="Порт"
                        value={formik.values.l_port}
                        onChange={formik.handleChange}
                    />
                    </div>
                    <div style={{display:'flex', justifyContent:"space-around",marginTop:20}}>
                    <Button color="primary" onClick={close}>
                        Отмена
                    </Button>
                    <Button color="primary" variant="contained" type="submit">
                        Сохранить
                    </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
    );
}

export default LocationEdit;