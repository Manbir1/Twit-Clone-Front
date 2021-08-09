import React from 'react'
import { Container, makeStyles, Typography, Box, Divider } from '@material-ui/core'
import Follow from '../Follow'
import { borderRadius } from '@material-ui/system'

const useStyles = makeStyles({
    container: {
        backgroundColor: "#FAFAFA",
        borderRadius: "15px",
        marginTop: "20px",
        marginBottom: "30px"
    }
})

const user={
    name: "Sami",
    username: "samiZ",
    description: "Hello this"
}

export default function SideBarContainer({ title, items}) {
    const classes = useStyles()
    return (
            <div className={classes.container} >
                <Box pt={2} ml={1} mb={1}>
                    <Typography variant="h5">{title}</Typography>
                </Box>
                <Divider />
                <Follow user={user} size={0} variant="elevation" backgroundColor="#FAFAFA" hoverColor={"#EFF1F1"}/>
                <Follow user={user} size={0} variant="elevation" backgroundColor="#FAFAFA" hoverColor={"#EFF1F1"}/>
                <Follow user={user} size={0} variant="elevation" backgroundColor="#FAFAFA" hoverColor={"#EFF1F1"}/>
            </div>
    )
}
