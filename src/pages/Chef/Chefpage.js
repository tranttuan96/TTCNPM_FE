import React, {useState, useEffect} from 'react'
import Button from '@material-ui/core/Button';
import "./Chefstyle.scss"
import OrderList from './OrderList';
import { qlDonHangService } from "../../services/quanLyDonHangService.js"
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CurrencyFormat from "react-currency-format";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
       padding: theme.spacing(1),
      textAlign: 'center',
    },
  }));
export default function Chefpage() {

    const classes = useStyles();
      

   function say() {
    qlDonHangService.capNhatDaNau(curOrder.orderID).then(res => {
        console.log(res.data);
        setCurOrder(res.data);
        let danhSachReduce = layDonHang.reduce((mangOrder, order, index) => {
            console.log(order)
            if(order.orderID !== res.data.orderID) {
                mangOrder.push(order);
            }
            return mangOrder;
        }, []);
        console.log(danhSachReduce)
        setDanhSachDon(danhSachReduce);
    }).catch(error => {
        console.log(error.response);
    });
    }
     

   
     const [layDonHang, setDanhSachDon] = useState([]);
     const [curOrder, setCurOrder] = useState({});

    useEffect(() => {
        //Gọi service Api set lại state danhSachMonAn
        if(layDonHang.length === 0) {
            qlDonHangService.layDonHang().then(res => {
                setDanhSachDon(res.data);
                // console.log(res.data);
            }).catch(error => {
                console.log(error.response);
            });
        }
        else {
            setTimeout(() => {
                qlDonHangService.layDonHang().then(res => {
                    setDanhSachDon(res.data);
                    // console.log(res.data);
                }).catch(error => {
                    console.log(error.response);
                });
            }, 60000);
        }
    });

    const selectOrder = (order) => {
        // console.log(order)
        setCurOrder(order);
    }

    const renderOrderDetail = () => {
        
        if(Object.keys(curOrder).length === 0) {
            
            return <div>
                Vui lòng chọn đơn hàng...
                </div>
        }
        else {
            
            return <div className="order_view_panel_right col-md-12" >
            <Grid item xs={12}><Paper className={classes.paper} elevation={0}><b><h5>ORDER DETAILS</h5></b></Paper></Grid>
            <Grid container 
                direction="row"
                justify="flex-start"
                alignItems="baseline" >
                    <Paper variant ="outlined" elevation={0}>
                    <Grid container xs={12} spacing={3}> 
                    <Grid item xs={6} >
                        <Paper elevation={0}  className={classes.paper} ><b><h5>Order No: {curOrder.orderID}</h5></b></Paper>
                    </Grid>
                    <Grid  item xs={6}>
                        <Paper elevation={0} className={classes.paper}  >Status: {curOrder.orderStatus}</Paper>
                    </Grid >
                    <Grid item xs={6}>
                        <Paper elevation={0}  className={classes.paper}> Time: {curOrder.createTime} </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper elevation={0}  className={classes.paper}  >Total:<CurrencyFormat
                      value={curOrder.totalPrice}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"đ"}
                    /></Paper>
                    </Grid >
                    <Grid item xs={12}>
                    {curOrder.orderItems.map((orderItem, index) => {
                        return  <Grid container spacing={3}>
                            <Grid item xs={6} >
                            <Paper elevation={0}  className={classes.paper} >{orderItem.name}</Paper>
                            </Grid>
                            <Grid  item xs>
                            <Paper elevation={0}  className={classes.paper} >Price: <CurrencyFormat
                      value={orderItem.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"đ"}
                    /></Paper>
                            </Grid>
                            <Grid  item xs>
                            <Paper elevation={0}  className={classes.paper}>Qty:{orderItem.quantity}</Paper>
                            </Grid>
                        </Grid>
                    })}
                    </Grid>
                    </Grid>
                    <br/>
                </Paper>
               
                <Grid container xs={12}
                            spacing={0}
                            direction="row"
                            justify="center"
                            alignItems="flex-end">
                                 <Paper elevation={0}  className={classes.paper} >
                                
                                        <Button 
                                           variant="outlined"
                                            color="primary"
                                            size="large"
                                            >
                                                Print
                                        </Button>{' '}
                                        <Button         
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                       onClick={say} >
                                            Confirm
                                    </Button>{' '}
                                </Paper>
                        </Grid>
                        
            </Grid>
        </div>
        }
    }
   return (
       <section className ="container">     
               <div className="order_list_panel_left">
               <Grid item xs={12}><Paper className={classes.paper} elevation={0}><b><h5>NEW ORDERS</h5></b></Paper></Grid>
                   <div className="one_order">

                  <OrderList layDonHang={layDonHang} selectOrder={selectOrder}/>  
                   </div>

               </div>
                       {/* RIGHT PANEL */}
                       <Grid item xs={12}>{renderOrderDetail()}</Grid>             
       </section> 

   )
}



