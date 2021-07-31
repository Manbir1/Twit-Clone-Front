import React from 'react'
import { CircularProgress, makeStyles } from '@material-ui/core';


const useStyles = makeStyles({
    loading: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "80vh",
        margin: "auto"
    }
});



export default function CircularLoad() {
    const classes = useStyles()

    return (
        <CircularProgress className={classes.loading}/> 
    )
}
