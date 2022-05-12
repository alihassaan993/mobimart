import React from "react";
import {PageHeader} from '../PageHeader.js';
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
