import React, { useState } from 'react'
import { Button , Dialog, DialogTitle, DialogContent} from '@material-ui/core';
import EditForm from '../Forms/EditForm';

export default function EditProfile({ open, setOpen, name, username, description }) {
    return (
        <>
            <Dialog open={open} onClose={(e) => setOpen(false)}>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                    <EditForm name={name} username={username} description={description}/>
                </DialogContent>
            </Dialog>
        </>
    )
}
