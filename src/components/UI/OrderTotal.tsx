import React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

interface OrderTotalProps {
    game:{
        g_name:string;
    };
    location:{
        l_name:string;
    };
    version:{
        v_name:string;
    };
    period:number;
    price:number;
    slots:number | number[];
    orderServerHandler: () => void;
}

const OrderTotal:React.FC<OrderTotalProps> = ({game,slots,location,version,period,price,orderServerHandler}) => {
    return (
        <Card style={{width:330,margin:5,display:'flex',flexDirection:'column',alignItems:"center"}}>
                <CardContent>
                    <Typography variant="h6" component="h3">
                    Игра: {game?.g_name}
                    </Typography>
                    <Typography  variant="h6" component="h3">
                    Локация: {location?.l_name}
                    </Typography>
                    <Typography  variant="h6" component="h3">
                    Версия: {version?.v_name}
                    </Typography>
                    <Typography  variant="h6" component="h3">
                    Количество слотов: {slots}
                    </Typography>
                    <Typography  variant="h6" component="h3">
                    Период: {period} дней
                    </Typography>
                    <Typography  variant="h6" component="h3">
                    Итоговая цена: {price ? price : 0} рублей
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="large" color="primary" variant='contained' onClick={orderServerHandler}>Оплатить</Button>
                </CardActions>
        </Card>
    );
}

export default OrderTotal;