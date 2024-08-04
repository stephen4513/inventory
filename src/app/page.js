"use client";
import { useEffect } from "react";
import { useAuth } from "../components/AuthProvider"; 
import { useRouter } from "next/navigation";
import styles from './page.module.css'; 

export default function Page() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/pantries');
    } else {
      router.push('/login');
    }
  }, [user, router]);

  return (
    <div className={styles.container}>
      <h1>Loading...</h1>
    </div>
  );
}
