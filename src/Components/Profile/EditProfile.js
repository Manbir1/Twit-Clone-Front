import React from 'react'
import { Dialog, DialogTitle, DialogContent} from '@material-ui/core';
import EditForm from '../Forms/EditForm';

export default function EditProfile({ open, setOpen, name, username, description, editProfileAPI }) {
    return (
        <>
            <Dialog open={open} onClose={(e) => setOpen(false)}>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                    <EditForm nameProp={name} usernameProp={username} descriptionProp={description} editProfileAPI={editProfileAPI}/>
                </DialogContent>
            </Dialog>
        </>
    )
}
