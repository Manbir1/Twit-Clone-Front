import React from 'react'
import SideBarItem from './SideBarItem'
import HomeIcon from '@material-ui/icons/Home';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

const arr = [["Home",<HomeIcon />],["Explore",<SearchOutlinedIcon />],["Messages",<MailOutlineIcon />],["Profile", <PersonOutlineIcon />]]

export default function SideBar() {
    return (
        <div style={{
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "space-evenly",
            alignItems: "flex-start",
            position: "fixed"
            }}>
            {arr.map(elem => <SideBarItem icon={elem[1]} text={elem[0]}/>)}
        </div>
    )
}
