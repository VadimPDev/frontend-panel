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
import { IVersion } from '../../types/version';
import { versionAPI } from '../../http/versionAPI';

interface VersionEditProps {
    edit:boolean;
    close:() => void;
    version:IVersion;
}
const VersionEdit:React.FC<VersionEditProps> = ({edit,close,version}) => {

    const {setError,startLoading,stopLoading,setMessage} = useActions()

    const formik = useFormik({
        initialValues:version,
        enableReinitialize:true,
        onSubmit:async(values)=>{
            try{
                startLoading()
                await versionAPI.editVersion(values)
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
                        id="v_name"
                        name="v_name"
                        label="Название"
                        type="text"
                        value={formik.values.v_name}
                        onChange={formik.handleChange}
                    />
                    <TextField
                        fullWidth
                        id="v_code"
                        name="v_code"
                        label="Код версии"
                        value={formik.values.v_code}
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

export default VersionEdit;