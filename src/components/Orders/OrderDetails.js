import React,{useState,useEffect} from 'react'
import {Container,Paper,Typography,Grid,Button,Table,TableHead,TableRow,TableCell} from '@material-ui/core';
import Moment from 'moment';
import {URL,IMGURL} from '../commons.js';
import { DataGrid, GridColDef, GridValueGetterParams,GridToolbar,GridApi } from '@material-ui/data-grid';
import CheckIcon from '@mui/icons-material/Check';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {ConfirmDialog} from '../ConfirmDialog';

const initialValues={
  orderno:'Initial Value',
  orderdate:''
}

export function OrderDetails(props){

  const {order,fetchOrders,setOpen,setNotify}=props;
  const [confirmDialog,setConfirmDialog]=useState({isOpen:false,title:'',subTitle:''});
  const [data,setData]=useState([]);
  const columns:GridColDef[]=[
    {field:'productname',headerName:'Product Name', flex: 1},
    {field:'quantity',headerName:'Quantity', flex: 1},
    {field:'unitprice',headerName:'Unit Price', flex: 1}
  ]

  useEffect(() => {
    console.log("FETCHING ORDER DETAILS " + order.status);
      fetchOrderDetails(order.orderid);
  }, []);

  async function fetchOrderDetails(orderID){
    try{
      const res = await fetch(URL+'webapi/order/'+orderID);
      const responseData= await res.json();
      console.log("Response " + responseData);
      if(responseData.status!="Fail"){
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
        const requestOptions = {
              method: 'POST',
              headers: { 'Access-Control-Allow-Origin': '*' }
          };

          const res = await fetch(URL+"webapi/order/accept?orderID="+order.orderid+"&status="+status, {
              method: 'POST'
          });
          const responseData= await res.json();
          if(responseData.status!='Fail'){
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
          <Typography variant="normal">{order.orderno}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="normal">Order Date</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="normal">{Moment(order.orderdate).format("DD MMM, yyyy")}</Typography>
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
            <DataGrid
              rows={data}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5]}
              getRowId={(row) => row.orderdetailid}
              style={{height:250}}
            />
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
