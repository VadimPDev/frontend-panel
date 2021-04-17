import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
const Loader:React.FC = () => {
    return (
        <div style={{position:'absolute',display:'flex',justifyContent:"center",alignItems:"center",zIndex:100,top:"50%",left:0,right:0}}>
              <CircularProgress />
        </div>
    );
}

export default Loader;