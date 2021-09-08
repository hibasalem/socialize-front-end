import React from 'react'
import './feedPage.css';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';


export default function NotLoggedIn() {
  return (
    <div>
      <h4 className='notLoggedIn'>Please Login First</h4>
      <a href="/" className='linkLogin'>
      <Fab variant="extended" className="buttnLog">
        <AccountCircleRoundedIcon />
        &nbsp; LOGIN PAGE
      </Fab>
      </a>
    </div>
  )
}
