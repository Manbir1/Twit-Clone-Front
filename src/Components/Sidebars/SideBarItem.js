import React from 'react'
import { Button, Typography, makeStyles } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    text: {
      fontSize: 24
    }
  }));

export default function SideBarItem({ text, icon, action }) {
    const classes = useStyles()
    return (
        <div style={{display: "inline-block",marginTop: "20px"}}>
            <Button onClick={action} startIcon={icon} className={classes.button}><Typography className={classes.text} variant="body1">{text}</Typography></Button>
        </div>
    )
}
