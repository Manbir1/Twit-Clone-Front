import React from 'react'
import SideBarItem from './SideBarItem'
import SettingsIcon from '@material-ui/icons/Settings';

const arr = ["Home","Explore","Messages","Profile"]

export default function SideBar() {
    return (
        <div style={{
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "space-evenly", 
            }}>
            {arr.map(elem => <SideBarItem text={elem}/>)}
        </div>
    )
}
