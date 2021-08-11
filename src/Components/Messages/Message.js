import React from 'react'
import { Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    text: props => ({
        color: (props.sender ? "white" : "black"),
        padding: "5px",
        paddingLeft: "20px",
        paddingRight: "20px",
        marginTop: "5px",
        marginBottom: "5px",
        display: "inline-flex"
    }),
    backgroundBox: props =>
    ({
        backgroundColor: (props.sender ? "#248bf5" : "#F1F1F1"),
        borderRadius: "20px",
        display: "inline-flex",
        alignSelf: (props.sender ? "flex-end" : "flex-start"),
        margin: "5px",
        marginLeft: "20px",
        marginRight: "20px"
    })
})

export default function Message({ content, ...props}) {
    const classes = useStyles(props)
    return (
        <div className={classes.backgroundBox}>
            <Typography displayBlock className={classes.text}>{content}</Typography>
        </div>
    )
}
