import { Button } from "@material-ui/core"
import axios from '../../resources/axios';
import { NotificationManager } from "react-notifications";
import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const DeleteModal = ({ userID }) => {
    console.log("data is", userID);
    const [open, setOpen] = React.useState(true);
   
    const handleClose = () => {
        setOpen(false);
    };

    const deleteUserData = (userID) => {
        axios.delete('/demographics' + '/' + userID)
        NotificationManager.success("User Deleted Successfully");
    }
    
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>

                    <Button variant="contained" color="primary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => deleteUserData(userID)}>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
export default DeleteModal;