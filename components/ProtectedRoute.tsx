import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

interface userProps {
  id: string
  title: string
  userId: string
}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [checkIsComplete, setcheckIsComplete] = useState<boolean>(false);

  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch('/api/getPerfil');
      if (!res.ok) {
        console.log(res);
      }
      return res.json();
    };
    getUsers().then(
      data => {        
        const userAdm = data.filter((item: userProps) => {      
          return item.userId === user.uid && item.title === 'ADMINISTRADOR';
        });
        if(userAdm.length > 0) { 
          setIsAdmin(true);
        }
      }   
    ).finally(() => {
      setcheckIsComplete(true);
    });
  }, []);
  
  useEffect(() => {
    if (!isAdmin && checkIsComplete) {
      router.push("/welcomepage");
    }
  }, [router, user]);

  return <div>{user ? children : null}</div>;
  
};

export default ProtectedRoute;