import {makeStyles } from "@material-ui/core";


export const myStyle = makeStyles({

    sideMenu:{
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      left: '0px',
      width: '250px',
      height: '100%',
      backgroundColor: '#253053'
    },
    appMain:{
      paddingLeft:'10px',
      paddingRight:'10px'
      //width:'100%'
    },
    root:{
      backgroundColor:'#fff'
    },
    searchInput:{
      opacity:'0.6',
      padding:'0px 8px',
      fontSize:'0.8rem',
      '&:hover':{
        backgroundColor:'#fff'
      }
    }
})
