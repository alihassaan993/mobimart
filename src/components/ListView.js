import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

export function ListView(props){

    const {data,setData} = props;

    return (

        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {data.map((item)=>(
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <img src={item.imageURL}/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.categoryName} secondary="Jan 9, 2014" />
        </ListItem>
        ))}      
        </List>

    )
}