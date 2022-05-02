import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";

import {PageHeader} from '../PageHeader.js';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import {OrdersList} from './OrdersList.js';

export function Orders() {

  return (
    <>
    <PageHeader
      title="Orders"
      subTitle="All Orders are listed here"
      icon={<ShoppingCartIcon />}
    />
    <OrdersList/>
    </>
  )
}
