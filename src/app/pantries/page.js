//PAGE TO LIST AND MANAGE PANTRIES    
"use client";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useAuth } from "@/components/AuthProvider";
import PantryCard from "../../components/PantryCard"
import PantryForm from '../../components/PantryForm'
import styles from "./pantries.module.css"
import { Button } from "@mui/material";

export default function Pantries() {
    const {user} = useAuth()
    const router = useRouter()
    const [pantries, setPantries] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if(!user){
            router.push('/login')
        } else{
            fetchPantries()
        }
    },[user,router])

    const fetchPantries = async () => {
        const snapshot = await getDocs(collection(firestore, `users/${user.uid}/pantries`))
        const pantryList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPantries(pantryList);
    };

    const addPantry = async (name) => {
        await addDoc(collection(firestore,`users/${user.uid}/pantries`), { name })
        fetchPantries()
    }

    const handleRemovePantry = async (pantryId) => {
        try {
            await deleteDoc(doc(firestore, `users/${user.uid}/pantries`, pantryId));
            setPantries(prevPantries => prevPantries.filter(pantry => pantry.id !== pantryId));
          } catch (error) {
            console.error("Error removing pantry: ", error);
          }
    }


    return(
        <div className={styles.bigcontainer}>
            <h1>My Pantries</h1>
            <div className={styles.divider}>
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
             }} variant="contained" onClick={() => setOpen(true)}>Add Pantry</Button>
             </div>
            <PantryForm  open={open} onClose={() => setOpen(false)} onSave={addPantry}/>
            <div className={styles.pantryList}>
                {pantries.map(pantry => (
                    <PantryCard  key={pantry.id} pantry={pantry} onRemove={() => handleRemovePantry(pantry.id)}/>
                ))}
            </div>
        </div>
    ) 
}

