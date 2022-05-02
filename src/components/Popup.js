import React from 'react';
import {Dialog,DialogTitle,DialogContent,makeStyles,Typography,Button} from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';

const useStyles=makeStyles(theme=>({
  dialogWrapper:{
    padding:theme.spacing(0),
    position:'absolute',
    top:theme.spacing(5)
  },
  dialogTitle:{
    padding:0
  }
}))

export function Popup(props){

  const {title,children,openPopup,setOpenPopup} = props;
  const classes=useStyles();

  return (
    <Dialog open={openPopup} maxWidth="sm" classes={{paper:classes.dialogWrapper}}>
      <DialogTitle style={{backgroundColor:'#3f51b5'}}>
          <div style={{display:'flex'}}>
          <Typography  variant="h6" component="div" style={{flexGrow:1,color:"white"}}>
            {title}
          </Typography>
          <Button onClick={()=>{setOpenPopup(false)}}>
          <CloseIcon sx={{ color: "white"}} />
          </Button>
          </div>
      </DialogTitle>
      <DialogContent dividers>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  )

}
