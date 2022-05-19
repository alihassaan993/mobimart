import React from 'react';
import {Paper,Card,Typography,makeStyles} from '@material-ui/core';
import {User} from './Users/User';
import Moment from 'moment';

const useStyles=makeStyles(theme=>({
  root:{
    backgroundColor:'lightblue',
    display:'flex',
    justifyContent: "space-between"
  },
  pageHeader:{
    padding:theme.spacing(2),
    display:'flex',
    marginBottom:theme.spacing(1)
  },
  pageIcon:{
    display:'inline-block',
    padding:theme.spacing(2),
    color:'#3c44b1'
  },
  pageTitle:{
    paddingLeft:theme.spacing(4)
  }
}))

export function PageHeader(props){

  const classes=useStyles();
  const {icon,title,subTitle}=props;

  return(
    <Paper elevation={0} square className={classes.root}>
      <div className={classes.pageHeader}>
        <Card className={classes.pageIcon}>
          {icon}
        </Card>
        <div className={classes.pageTitle}>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="subTitle2" component="div">
            {subTitle}
          </Typography>
        </div>
      </div>
      {/* <div style={{marginTop:15,paddingRight:'10px'}}>
        <Typography variant="h6" component="div">
          Welcome {User.getName()}
        </Typography>
        <Typography variant="subTitle2" component="div">
          Date:{Moment(Date.now()).format('DD MMM yyyy')}
        </Typography>
      </div> */}
    </Paper>
  );

}
