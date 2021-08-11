import React, { useContext } from 'react'
import UserContext from '../../Context/UserContext';
import SideBarItem from './SideBarItem'
import HomeIcon from '@material-ui/icons/Home';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { useHistory } from 'react-router';


export default function SideBar() {
    const history = useHistory()
    const user = useContext(UserContext)

    const homeIconOnClick = (e) => {
        history.push('/')
    }
    
    const searchOnClick = (e) => {
    
    }
    
    const messageOnClick = (e) => {
        history.push('/messages')
    }
    
    const profileOnClick = (e) => {
        history.push(`/users/${user.user}`)
    }
    
    const arr = [
        ["Home",<HomeIcon />, homeIconOnClick],
        ["Explore",<SearchOutlinedIcon />, searchOnClick],
        ["Messages",<MailOutlineIcon />, messageOnClick],
        ["Profile", <PersonOutlineIcon />,profileOnClick]]

    return (
        <div style={{
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "space-evenly",
            alignItems: "flex-start",
            position: "fixed"
            }}>
            {arr.map(elem => <SideBarItem icon={elem[1]} text={elem[0]} action={elem[2]}/>)}
        </div>
    )
}
