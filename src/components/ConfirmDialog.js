import React from 'react';
import {Dialog,DialogTitle,DialogContent,DialogActions, Typography, Button,makeStyles ,IconButton} from '@material-ui/core'
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';

const useStyles=makeStyles(theme=>({
  dialog:{
    padding:theme.spacing(2),
    position:'absolute',
    top:theme.spacing(5)
  },
  dialogTitle:{
    textAlign:'center'
  },
  dialogContent:{
    textAlign:'center'
  },
  dialogActions:{
    justifyContent:'center'
  },
  titleIcon:{
    backgroundColor:"pink",
    color:theme.palette.secondary.main,
    '&:hover':{
      backgroundColor:theme.palette.secondary.light,
      color:'default'
    },
    '& .MuiSvgIcon-root':{
      fontSize:'8rem'
    }
  }
}))

export function ConfirmDialog(props){

  const {confirmDialog,setConfirmDialog} = props;
  const classes=useStyles();

  return(
    <Dialog open={confirmDialog.isOpen} classes={{paper:classes.dialog}}>
      <DialogTitle className={classes.dialogTitle}>
        <IconButton className={classes.titleIcon}>
            <NotListedLocationIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6">
          {confirmDialog.title}
        </Typography>
        <Typography variant="subtitle2">
          {confirmDialog.subTitle}
        </Typography>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button variant="contained" color="default" onClick={()=>setConfirmDialog({...confirmDialog,isOpen:false})}>No</Button>
        <Button variant="contained" color="secondary" onClick={confirmDialog.onConfirm}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
}
