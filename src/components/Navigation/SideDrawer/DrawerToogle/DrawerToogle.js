import React from 'react';
import classes from './DrawerToogle.css';

const drawerToogle = (props) => (
    <div onClick = {props.clicked} className = {classes.DrawerToogle} >
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default drawerToogle;