"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../components/AuthProvider";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const router = useRouter()
  const showNavBar = router.pathname !== "/login"

  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          {showNavBar && <Navbar />}
          <main>{children}</main>
          <footer>
            <p>&copy; 2024 Stephen Monahan. All rights reserved.</p>
          </footer>
        </body>
      </html>
    </AuthProvider>
  );
}

