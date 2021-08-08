import React from 'react'
import { Button, Typography, makeStyles } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

export default function SideBarItem({ text, icon }) {
    const classes = useStyles()
    return (
        <div style={{marginTop: "20px"}}>
            <Button startIcon={<SettingsIcon />} className={classes.button}><Typography variant="body1">{text}</Typography></Button>
        </div>
    )
}
