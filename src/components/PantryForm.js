//for editing or adding a pantry

import {Modal, Box, TextField, Button} from '@mui/material';
import { useState } from 'react';
import styles from "./PantryForm.module.css";
import { getApp } from 'firebase/app';

export default function PantryForm({open, onClose, onSave}) {
    const[name,setName] = useState('')

    const handleSave = () => {
        onSave(name)
        setName('')
        onClose()
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: "flex",
        flex: 1
      };

    return(
        <Modal open={open} onClose={onClose}>
            <Box display='flex' sx={style}className={styles.modalStyle}>
             <TextField label="Pantry Name" value={name} onChange={(e) => setName(e.target.value)} />
             <Button sx={{
               background: 'linear-gradient(135deg, #5b48f1, #6455d4)',
                color: 'white',
                '&:hover': {
                background: 'linear-gradient(135deg, #362e77, #5b48f1)',
                },
                padding: '10px 20px',
                borderRadius: '10px',
                boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.5)',
                border: '2px solid black',
             }}variant={'contained'} onClick={handleSave}>Save</Button>
            </Box>
        </Modal>
    )
}