import React, { useEffect, useState } from 'react'
import Follow from './Follow'
import CircularLoad from './CircularLoad';

import { useParams } from 'react-router';


export default function FollowContainer( {userForContainer} ) {

    let { type } = useParams();
    const [arr,setArr] = useState(null)

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
            { arr==null 
            ? <CircularLoad />
            : arr.map(user => <Follow key = {user.id} user={user}/>)
            }
        </>
    )
}
