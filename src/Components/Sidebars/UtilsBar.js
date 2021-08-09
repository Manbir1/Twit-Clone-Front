import React from 'react'
import SearchBar from './SearchBar'
import SideBarContainer from './SideBarContainer'

export default function UtilsBar() {
    return (
        <div>
            <SearchBar />
            <SideBarContainer title={"Who to Follow"} />
            <SideBarContainer title={"Trending"} />
        </div>
    )
}
