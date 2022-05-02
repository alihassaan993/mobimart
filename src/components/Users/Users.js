import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";

import CategoryIcon from '@mui/icons-material/Category';
import {PageHeader} from '../PageHeader.js';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import PersonIcon from '@mui/icons-material/Person';
import {UserList} from './UserList';
//import {ProductsList} from './ProductsList';

export function Users() {

  return (
    <div>
    <PageHeader
      title="Users"
      subTitle="Please find all the registered Users as below."
      icon={<PersonIcon />}
    />
    <UserList/>
    </div>
  )
}
