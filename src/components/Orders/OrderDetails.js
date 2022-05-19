import React,{useState,useEffect} from 'react'
import {Paper,Typography,Grid,Button} from '@material-ui/core';
import Moment from 'moment';
import {URL} from '../commons.js';
import { DataGrid, GridColDef} from '@material-ui/data-grid';
import CheckIcon from '@mui/icons-material/Check';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {ConfirmDialog} from '../ConfirmDialog';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';



export function OrderDetails(props){

  const {order,fetchOrders,setOpen,setNotify}=props;
  const [confirmDialog,setConfirmDialog]=useState({isOpen:false,title:'',subTitle:''});
  const [data,setData]=useState([]);
  const columns:GridColDef[]=[
    {field:'productName',headerName:'Product Name', flex: 1},
    {field:'quantity',headerName:'Quantity', flex: 1},
    {field:'unitPrice',headerName:'Unit Price', flex: 1}
  ]

  useEffect(() => {
    console.log("FETCHING ORDER DETAILS " + order.status);
      fetchOrderDetails(order.orderID);
  }, []);

  async function fetchOrderDetails(orderID){
    try{
      const res = await fetch(URL+'/order/'+orderID);
      const responseData= await res.json();
      console.log("Response " + responseData);
      if(responseData.status!=="Fail"){
        let responseStr=JSON.parse(responseData.response);
        setData(responseStr);
      }

    }catch(exception){
      console.log(exception);
      alert("Unable to communicate to server. Please check your internet connection!!!");
    }

  }

  const  accept = async(status) =>
    {
      try{


          const res = await fetch(URL+"/order/accept?orderID="+order.orderID+"&status="+status, {
              method: 'POST'
          });
          const responseData= await res.json();
          if(responseData.status!=='Fail'){
            setNotify({isOpen:true,message:responseData.message,type:'success'});
            setOpen(false);
            fetchOrders(1);
          }else{
            setNotify({isOpen:true,message:responseData.message,type:'error'});
          }


        }catch(exception){
          setNotify({isOpen:true,message:'Unable to save product at this time. Please try again later',type:'error'});
        }
    }

  return(
    <Paper style={{paddingLeft:10,paddingRight:10}}>
      <Grid container spacing={0.5} >
        <Grid item xs={6}>
          <Typography variant="normal">Order No.</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="normal">{order.orderNo}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="normal">Order Date</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="normal">{Moment(order.orderDate).format("DD MMM, yyyy")}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="normal">Order Status</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="normal">{order.status}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="normal">Address</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="normal">{order.address}</Typography>
        </Grid>
        <Grid item xs={12}>
        {data.map((product)=>(
            <Button variant="outlined" 
              fullWidth style={{height:'80px', marginBottom:10}}>
            <ListItem key={product.productID}>
              <ListItemAvatar>
                  <Avatar>
                    {product.productName.substring(0,1)}
                  </Avatar>
              </ListItemAvatar>
              <ListItemText primary={product.productName} secondary={'Total: ' + product.quantity}/>
            </ListItem>
            </Button>
          ))} 
        </Grid>
        {order.status==='confirm'&&(
        <Grid item xs={12}>
          <div align="center">
              <Button variant="contained" style={{margin:10}}
               onClick={()=>{accept('Accepted')}}
               color="primary" startIcon={<CheckIcon />}>
                Accept
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<HighlightOffIcon />}
                onClick={()=>{
                  setConfirmDialog({
                    isOpen:true,
                    title:'Are you sure you want to reject the Order?',
                    subTitle:'You cannot undo this operation',
                    onConfirm:()=>{accept('Rejected')}
                  })
                }

                }
              >
                Reject
              </Button>
            </div>
        </Grid>
        )}
      </Grid>
        <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog}/>
    </Paper>
  );

}
