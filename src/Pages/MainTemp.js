import React from 'react'
import { Grid, Hidden } from '@material-ui/core'
import UtilsBar from '../Components/Sidebars/UtilsBar'
import SideBar from '../Components/Sidebars/SideBar'

export default function MainTemp(props) {
    return (
        <Grid container>
            <Grid item sm={0} md={3}>
                <Hidden smDown>
                    <SideBar />
                </Hidden>
            </Grid>
        <Grid item sm={12} md={6}>
            {props.children}
        </Grid>
        <Grid item sm={0} md={3}>
            <Hidden smDown>
                <UtilsBar />
            </Hidden>
        </Grid>
    </Grid>
    )
}
