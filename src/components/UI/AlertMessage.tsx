import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import React from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ResetGlobal } from "../../store/actions/global";


function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const AlertMessage:React.FC = () => {

    const {message, error} = useTypedSelector(state => state.global)
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        dispatch(ResetGlobal())

    };

    return (
            <Snackbar anchorOrigin={{ vertical:'top', horizontal:'right' }} open={!!message || !!error} autoHideDuration={4000} onClose={handleClose}>
                    {message
                    ?
                    <Alert onClose={handleClose} severity="success">
                        {message}
                    </Alert>
                    :
                    <Alert onClose={handleClose} severity="error">
                        {error}
                    </Alert>
                }
            </Snackbar>
    );
}

export default AlertMessage;