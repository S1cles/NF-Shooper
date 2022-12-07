import React from 'react'
import { Button } from "@mui/material";
import { purple } from "@mui/material/colors";
import { children } from 'react';

const MyButton = (props) => {
  return (
    <Button
    variant="contained"
    style={{ background: "purple" , width: '80%' }}
    className="btn"
    onClick={props.btn}
  >
    {props.children}
  </Button>
  )
}

export default MyButton