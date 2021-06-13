import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
import Modal from 'react-bootstrap/Modal'


const useStyles = makeStyles((theme) => ({
    root: {
       display: 'flex',
       flexGrow: 1,
       position: 'relative',
       overflow: 'auto',
       maxHeight: 100,
      '& > *': {
        margin: theme.spacing(0.5),
        width: theme.spacing(20),
        height: theme.spacing(8),
      },
    },
    paper:
    {
        textAlign: 'center',
        marginTop: 20
    },
    btn:
    {
        marginTop: 15,
        justify:'flex-end',
         alignItems:'center',
    }
  }));

export default function Order(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let { order, selectOrder, orderStt } = props;
    const classes = useStyles();
    return (
        <section>
    <Paper variant="outlined" square  onClick={() => {selectOrder(order)}}>
        <Grid container  className={classes.root}   
        direction="row"
        justify="space-between"
        alignItems="flex-start">
            <Grid item xs={7}>
                <Paper className={classes.paper} elevation={0} >
                        <h5>{order.orderID}</h5>
                </Paper>
            </Grid>
            <Grid  xs={3}>
            <div className={classes.btn}>
                <Button variant="contained" size="small" color="primary" onClick={handleShow}>
                    Confirm
                </Button>
            </div>
            </Grid>
        </Grid>
    </Paper>
                      <Modal      
                      show={show}
                      onHide={handleClose}
                      backdrop="static"
                      keyboard={false}
                      centered
                      size="md"
                      >
                      <Modal.Body>
                          Are you sure to confirm order "<b> {order.orderID}</b>"?
                      </Modal.Body>
                      <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                          Close
                          </Button>
                          <Button variant="contained" size="small" color="primary" onClick={() => {selectOrder(order)}}>Confirm</Button>
                      </Modal.Footer>
                      </Modal>
    </section>
    )
}
