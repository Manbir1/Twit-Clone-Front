import React from 'react'
import { TextField, Box, makeStyles} from '@material-ui/core'

const useStyles = makeStyles({
    search: {
        borderRadius: "20px"
    }
})

export default function SearchBar() {
    const classes = useStyles()
    return (
        <Box>
            <TextField />
        </Box>
    )
}
