import React from 'react'
import Tweet from './Tweets/Tweet'

const test = {
    name: "Manbir Sandhu",
    username: "mana24129",
    date: new Date(),
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis urna et lorem finibus fermentum. Proin iaculis, lacus eu iaculis efficitur, justo tellus fringilla diam, id mollis augue ligula ac sapien. Proin fringilla sapien dui, eu hendrerit ex egestas vel. Vestibulum sagittis dignissim est sed consectetur. Nulla facilisi. Aenean nulla lectus, congue sed efficitur quis, vestibulum nec magna. Nulla semper, quam in tincidunt sagittis, lorem lectus consectetur massa, sed pellentesque ex mauris sit amet arcu. Nullam nibh tortor, feugiat hendrerit elit at, mattis venenatis elit. Nunc lacinia sem ac faucibus consectetur. Sed nec tristique nulla.",
    comments: 30,
    shares: 20,
    likes: 50
}

const arr = [test,test,test,test,test,test,test]

export default function Feed() {
    return (
        <>
            {arr.map(tweet => (
                <Tweet tweet={tweet}/>
            ))}
        </>
    )
}
