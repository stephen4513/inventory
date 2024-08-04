"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs, doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { firestore } from "../../../firebase";
import { useAuth } from "../../../components/AuthProvider";
import styles from "./pantry.module.css";
import { TextField, Button, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Chatbox from "../../../components/chatbox";
import CaptureAndClassify from "../../../components/CaptureAndClassify";

export default function Pantry({ params }) {
  const { id } = params;
  const { user } = useAuth();
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [showChatbox, setShowChatbox] = useState(false);
  const [showCapture, setShowCapture] = useState(false);

  useEffect(() => {
    if (user && id) {
      fetchItems();
    } else {
      router.push("/login");
    }
  }, [user, id, router]);

  const fetchItems = async () => {
    const snapshot = await getDocs(collection(firestore, `users/${user.uid}/pantries/${id}/items`));
    const itemList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setItems(itemList);
  };

  const handleAddClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    const itemRef = doc(collection(firestore, `users/${user.uid}/pantries/${id}/items`), itemName);
    const itemSnap = await getDoc(itemRef);
    if (itemSnap.exists()) {
      const { count } = itemSnap.data();
      await setDoc(itemRef, { count: count + parseInt(itemQuantity) });
    } else {
      await setDoc(itemRef, { count: parseInt(itemQuantity) });
    }
    fetchItems();
    setOpen(false);
    setItemName('');
    setItemQuantity('');
  };

  const removeItem = async (item) => {
    const itemRef = doc(collection(firestore, `users/${user.uid}/pantries/${id}/items`), item);
    const itemSnap = await getDoc(itemRef);
    if (itemSnap.exists()) {
      const { count } = itemSnap.data();
      if (count === 1) {
        await deleteDoc(itemRef);
      } else {
        await setDoc(itemRef, { count: count - 1 });
      }
    }
    fetchItems();
  };

  const handleClassify = async (classification) => {
    console.log('Classified item:', classification);
    const itemRef = doc(collection(firestore, `users/${user.uid}/pantries/${id}/items`), classification);
    const itemSnap = await getDoc(itemRef);
    if (itemSnap.exists()) {
      const { count } = itemSnap.data();
      await setDoc(itemRef, { count: count + 1 });
    } else {
      await setDoc(itemRef, { count: 1 });
    }
    fetchItems();
    setShowCapture(false);
  };

  const filteredItems = items.filter((item) => item.id.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className={styles.container}>
      <h1>Pantry</h1>
      <Box className={styles.controls}>
        <Button
          onClick={handleAddClick}
          sx={{
            background: 'linear-gradient(135deg, #5b48f1, #6455d4)',
            color: 'white',
            '&:hover': {
              background: 'linear-gradient(135deg, #362e77, #5b48f1)',
            },
            padding: '10px 20px',
            borderRadius: '5px',
            boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          Add Item
        </Button>
        <Button
          onClick={() => setShowChatbox(!showChatbox)}
          sx={{
            background: 'linear-gradient(135deg, #5b48f1, #6455d4)',
            color: 'white',
            '&:hover': {
              background: 'linear-gradient(135deg, #362e77, #5b48f1)',
            },
            padding: '10px 20px',
            borderRadius: '5px',
            boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
            marginLeft: '10px',
          }}
        >
          {showChatbox ? 'Close Chatbox' : 'Get Recipe'}
        </Button>
        <Button
          onClick={() => setShowCapture(!showCapture)}
          sx={{
            background: 'linear-gradient(135deg, #5b48f1, #6455d4)',
            color: 'white',
            '&:hover': {
              background: 'linear-gradient(135deg, #362e77, #5b48f1)',
            },
            padding: '10px 20px',
            borderRadius: '5px',
            boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
            marginLeft: '10px',
          }}
        >
          {showCapture ? 'Close Camera' : 'Capture Item'}
        </Button>
        <TextField
          label="Search Item"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
          sx={{ marginLeft: 'auto'}}
        />
      </Box>
      <ul className={styles.itemList}>
        {filteredItems.map((item) => (
          <li key={item.id}>
            {item.id} - {item.count}
            <Button
              onClick={() => removeItem(item.id)}
              sx={{
                background: '#f44336',
                color: 'white',
                '&:hover': {
                  background: '#c62828',
                },
                padding: '5px 10px',
                borderRadius: '5px',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
              }}
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the name and quantity of the item you want to add.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Item Name"
            type="text"
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Quantity"
            type="number"
            fullWidth
            value={itemQuantity}
            onChange={(e) => setItemQuantity(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>

      {showChatbox && <Chatbox pantryItems={items.map(item => item.id)} />}
      {showCapture && <CaptureAndClassify onClassify={handleClassify} />}
    </div>
  );
}
