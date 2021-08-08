import React, { useEffect, useState } from 'react'
import Follow from './Follow'
import CircularLoad from './Utils/CircularLoad';
import { Tabs, Tab, Paper } from '@material-ui/core';
import { useHistory } from 'react-router'
import { useParams } from 'react-router';


export default function FollowContainer( {userForContainer} ) {
    let { type } = useParams();
    const history = useHistory()
    const [value, setValue] = useState(type=="followers" ? 0 : 1)
    const [arr,setArr] = useState(null)

    const handleChange = (event, newValue) => {
        if(newValue == 0){
            history.push('followers')
        }else{
            history.push('following')
        }
        setValue(newValue);
      };

    useEffect(function handleAPI(){
        const API_PATH = type;
        (async() => {
            const passedArr = await(await fetch(`http://localhost:8000/follow/${API_PATH}/${userForContainer}`,
            {
                method: 'get',
                credentials: 'include'
            })).json()

            setArr(passedArr)
        })()
    }, [type])
    
    return (
        <>
            <Paper 
            square 
            elevation={0}
            variant="outlined">
                <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    onChange={handleChange}
                >
                    <Tab label="Followers" />
                    <Tab label="Following" />
                </Tabs>
            </Paper>
            { arr==null 
            ? <CircularLoad />
            : arr.map(user => <Follow key = {user.id} user={user}/>)
            }
        </>
    )
}
