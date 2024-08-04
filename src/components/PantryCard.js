//display a pantry card

import { useRouter } from "next/navigation";
import styles from './PantryCard.module.css';
import { firestore } from "../firebase";
import { doc, deleteDoc} from "firebase/firestore";
import { Box, Button, Avatar } from "@mui/material";
import onRemove from '../app/pantries/page';

export default function PantryCard({pantry, onRemove}) {
    const router = useRouter()

    return(
        <Box borderRadius={'10px'}  padding={'20px'} border= '1px solid black' className={styles.card} height={'auto'} >
            <Button sx={{
               background: 'linear-gradient(135deg, #5b48f1, #6455d4)',
                color: 'white',
                '&:hover': {
                background: 'linear-gradient(135deg, #362e77, #5b48f1)',
           
             },
             padding: '5px 10px',
             borderRadius: '1px',
             boxShadow: '0px 5px 10px rgba(0, 0, 0, 1)',
             width:'100%',
             display:'flex',
             flex:"1"
             }}  onClick={() => router.push(`/pantry/${pantry.id}`)} >{pantry.name}</Button>
            <Box paddingTop={'20px'} className={styles.remove}>
                <Button sx={{
               background: 'linear-gradient(135deg, rgb(75, 75, 75), rgb(76, 76, 76))',
                color: 'red',
                '&:hover': {
                background: 'linear-gradient(135deg, rgb(75, 75, 75), rgb(75, 75, 75))',
                color: 'red'
             },
             padding: '3px 8px',
             borderRadius: '10px',
             boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.5)',
             border: '2px solid black',
             }}variant="contained" onClick={onRemove}>Remove</Button>
            </Box>
        </Box>
        
        
    )
}