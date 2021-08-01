import React, { useEffect, useState } from 'react'
import Follow from './Follow'
import CircularLoad from './CircularLoad';

import { useParams } from 'react-router';

// const arr = [
//     {
//         username: "mana24129",
//         name: "Manbir Sandhu",
//         description: "This is some description",
//         follow: true
//     },
//     {
//         username: "samiZ",
//         name: "Sami Zeremariam",
//         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//         follow: false
//     },
//     {
//         username: "gjakes",
//         name: "Jake Kim",
//         description: "Short description",
//         follow: true
//     },
//     {
//         username: "ACZ",
//         name: "Austin Ficzere",
//         description: "We are going to make a medium length description to see how the view will work in the medium size,.... hmm this is now long enough",
//         follow: false
//     },
// ]


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
