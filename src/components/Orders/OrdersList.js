import React,{useEffect,useState} from 'react';
import {Button} from '@material-ui/core';
import {ToggleButton,ToggleButtonGroup} from '@mui/material';
import Moment from 'moment';
import {URL} from '../commons.js';
import {Popup} from '../Popup';
import {OrderDetails} from './OrderDetails';

import {Notification} from '../Notification';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import LoadingOverlay from 'react-loading-overlay-ts';


export function OrdersList() {
  let lorder = {
    orderid:0,
    orderdate:'',
    status:'',
    phoneno:'',
    address:'',
    fullname:''
  }

  const [loading,setLoading]=useState(false);
  const [order,setOrder]=useState();
  const [data,setData] = useState([]);
  const [open,setOpen]=useState(false);
  const [notify,setNotify]=useState({isOpen:false,message:'',type:''});

  const [alignment, setAlignment] = React.useState('today');
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
    fetchOrders(1,newAlignment);
  };

  useEffect(() => {
    console.log("FETCHING ORDERS");
      fetchOrders(1,'today');
  }, []);


  async function fetchOrders(storeID,duration){
    console.log("Fetching orders");
    try{
      setLoading(true);
      const res = await fetch(URL+'/order/bystoreid?storeID='+storeID+'&duration='+duration);
      const responseData= await res.json();
      setLoading(false);
      if(responseData.status!=="Fail"){
        let responseStr=JSON.parse(responseData.response);
        setData(responseStr);
      }
    }catch(exception){
      console.log(exception);
      alert("Unable to communicate to server. Please check your internet connection!!!");
    }

  }
  let statusColor="green";
  return(
    <>
    <LoadingOverlay
      active={loading}
      spinner
      text='Loading Orders...'
    >  
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value="today">
        Today
      </ToggleButton>
      <ToggleButton value="old">Older</ToggleButton>
    </ToggleButtonGroup>

      <div style={{ height: 400, width: '100%'
        ,'& .super-app-theme--header': {
            backgroundColor: 'blue',
          }
        }}
        >
          
          {data.map((order)=>(
            <Button variant="outlined" 
              onClick={()=>{setOrder(order); setOpen(true);}}
              fullWidth style={{height:'80px', marginBottom:10}}>
            <ListItem key={order}>
              <ListItemAvatar>
                  <Avatar sx={{bgcolor:order.status==='Rejected'?'red':order.status==='confirm'?'orange':'green'}}>
                    {order.status.substring(0,1)}
                  </Avatar>
              </ListItemAvatar>
              <ListItemText primary={order.orderNo} secondary={Moment(order.orderDate).format("DD MMM, yyyy hh:mm")}/>
            </ListItem>
            </Button>
          ))}  

      </div>
      </LoadingOverlay>
      <Popup
       openPopup={open}
       setOpenPopup={setOpen}
       title="Order Details"
      >
       <OrderDetails order={order}
       setOpen={setOpen}
       fetchOrders={fetchOrders}
        setNotify={setNotify}
       />
      </Popup>
      <Notification setNotify={setNotify} notify={notify}/>
    </>
  );
}
