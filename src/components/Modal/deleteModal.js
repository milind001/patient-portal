import { Button } from "@material-ui/core"
// import axios from '../../resources/axios';
// import { useDispatch } from 'react-redux';
// import * as actions from '../../store/action';
// import { NotificationManager } from "react-notifications";
import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const DeleteModal = (props) => {

    // const dispatch = useDispatch();
    const [open, setOpen] = React.useState(true);
   
    const handleClose = () => {
        setOpen(!open);
    };

    // const deleteUserData = (userID) => {
    //     dispatch(actions.phyDeleteDemographicData(userID))
    // }
    
    const deleteUserData = (user) =>{
        props.fromDeleteModel(user);
        handleClose()
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
                    <Button variant="contained" color="primary" onClick={() => deleteUserData(props.Data)}>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
export default DeleteModal;