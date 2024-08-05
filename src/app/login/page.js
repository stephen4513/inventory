"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "../../firebase";
import { useAuth } from "../../components/AuthProvider";
import styles from "./login.module.css";


export default function Login() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/pantries");
    }
  }, [user, router]);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Sign-in error", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src="/inventory.jpg" alt="inventory" />
      </div>
      <div className={styles.right}>
        <h2>Inventory Management System</h2>
        <p>Sign up or Log in with <span className={styles.google1}>G</span ><span className={styles.google2}>o</span><span className={styles.google3}>o</span><span className={styles.google4}>g</span><span className={styles.google5}>l</span><span className={styles.google6}>e</span></p>
        <button onClick={handleSignIn}>Sign in</button>
      </div>
      
    </div>
  );
}
