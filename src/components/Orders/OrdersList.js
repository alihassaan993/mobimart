import React,{useEffect,useState} from 'react';
import {Typography} from '@material-ui/core';
import { DataGrid, GridColDef} from '@mui/x-data-grid';
import {ToggleButton,ToggleButtonGroup} from '@mui/material';
import Moment from 'moment';
import {URL} from '../commons.js';
import {Popup} from '../Popup';
import {OrderDetails} from './OrderDetails';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DoneIcon from '@mui/icons-material/Done';
import LoopIcon from '@mui/icons-material/Loop';
import {Notification} from '../Notification';

export function OrdersList() {
  let lorder = {
    orderid:0,
    orderdate:'',
    status:'',
    phoneno:'',
    address:'',
    fullname:''
  }
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

  //const [order,setOrder] = useState(Order);
  //const order=Order;
  const columns:GridColDef[]=[
    {field:'orderID',headerName:'ID', flex: 1,headerClassName: 'super-app-theme--header'},
    {field:'orderNo',headerName:'Order No', flex: 1,headerClassName: 'super-app-theme--header'},
    {field:'fullName',headerName:'Customer Name', flex: 1,headerClassName: 'super-app-theme--header'},
    {field:'address',headerName:'Address', flex: 1,headerClassName: 'super-app-theme--header'},
    {field:'phoneNo',headerName:'Phone No.', flex: 1,headerClassName: 'super-app-theme--header'},
    {field:'orderDate',headerName:'Order Date', flex: 1,
      renderCell:(params)=><Typography variant="normal">{Moment(params.value).format("DD MMM, yyyy")}</Typography>
    },
    {field:'status',headerName:'Status', flex: 1,headerClassName: 'super-app-theme--header',
      renderCell:(params)=>renderStatus(params.value)
    }
  ];

  function renderStatus(status){
    if(status==='Rejected'){
      return (<div style={{display:"flex",alignItems:"center",flex:1}}><HighlightOffIcon fontSize="small" style={{ color: 'red' }}/><Typography variant="normal" style={{color:'red'}}>{status}</Typography></div>)
    }else if (status==='Accepted') {
      return (<div style={{display:"flex",alignItems:"center",flex:1}}><DoneIcon  fontSize="small" style={{ color: 'blue' }}/><Typography variant="normal" style={{color:'blue'}}>{status}</Typography></div>)
    }else{
      return (<div style={{display:"flex",alignItems:"center",flex:1}}><LoopIcon fontSize="small" style={{ color: 'green' }}/><Typography variant="normal" style={{color:'green'}}>{status}</Typography></div>)
    }
  }

  useEffect(() => {
    console.log("FETCHING ORDERS");
      fetchOrders(1,'today');
  }, []);

  function currentlySelected(params: GridCellParams) {


      //const order = Order
      lorder.orderID = Number(params.row.orderID);
      lorder.orderDate = params.row.orderDate.toString();
      lorder.orderNo = params.row.orderNo.toString();
      lorder.status = params.row.status.toString();
      lorder.phoneNo = params.row.phoneNo.toString();
      lorder.address = params.row.address.toString();

      setOrder(lorder);
      setOpen(true);
    }

  async function fetchOrders(storeID,duration){
    console.log("Fetching orders");
    try{
      const res = await fetch(URL+'/order/bystoreid?storeID='+storeID+'&duration='+duration);
      const responseData= await res.json();
      if(responseData.status!=="Fail"){
        let responseStr=JSON.parse(responseData.response);
        setData(responseStr);
      }
    }catch(exception){
      console.log(exception);
      alert("Unable to communicate to server. Please check your internet connection!!!");
    }

  }

  return(
    <>
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

        <DataGrid
          rows={data}
          columns={columns}
          pageSize={20}
          autoHeight
          rowsPerPageOptions={[20]}
          getRowId={(row) => row.orderID}
          onCellDoubleClick={currentlySelected}
         sx={{
           boxShadow: 2,
           borderColor: 'primary.dark',
           '& .MuiDataGrid-cell:hover': {
             color: 'secondary',
           },
          }}
        />
      </div>
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
