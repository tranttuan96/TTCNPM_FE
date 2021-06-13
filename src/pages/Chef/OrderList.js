import React, { useState, useEffect } from 'react'
import Order from './Order';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      margin: 'auto',
    },
    button: {
      margin: theme.spacing(0.5, 0),
    },
  }));
export default function OrderList(props) {  
  // const {ordersList: {isLoading, errMess, display}} = props;
    let {layDonHang, selectOrder ,gioHang} = props;
    const classes = useStyles();
    const renderOrderList = () => {
            return layDonHang.map((order, index) => {
                if(order.orderStatus === "paid") {
                    return <Order key={index} order={order} selectOrder={selectOrder}></Order>
                } 
            }) 
    }
    return (
        <div  className={classes.panel} >
             <Grid container spacing={2} justify="center" alignItems="center">
                {renderOrderList()}
            </Grid>
        </div>
    )
}
