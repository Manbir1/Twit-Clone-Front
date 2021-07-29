import React, { useState } from 'react'
import { Button , Dialog, DialogTitle, DialogContent} from '@material-ui/core';
import EditForm from '../Forms/EditForm';

export default function EditProfile() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button onClick = {(e) => setOpen(true)}>Edit Profile</Button>
            <Dialog open={open} onClose={(e) => setOpen(false)}>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                    <EditForm />
                </DialogContent>
            </Dialog>
        </>
    )
}
