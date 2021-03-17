import React from 'react'
import { Link } from 'react-router-dom';
interface PropsType {
    children:JSX.Element;
    to:string
}
const StyledLink = ({to,children}:PropsType) => {
    return <Link to={to} style={{textDecoration:"none",color:'inherit'}}>{children}</Link>
}

export default StyledLink;