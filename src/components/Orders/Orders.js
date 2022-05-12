import React from "react";
import {PageHeader} from '../PageHeader.js';
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
