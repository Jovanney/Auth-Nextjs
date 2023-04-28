import { useEffect, useState } from "react"

interface User {
  email: string;
  id: string;
}

export default function Home() {

  const [users, setUsers] = useState<User[]>([] as User[]);
  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch('/api/getPerfil')
      if (!res.ok) {
        console.log(res)
      }
      return res.json()
    }
    getUsers().then(
      data => setUsers(data))     
  },[]);  

  useEffect(() => {
    users?.forEach(element => {
      //console.log(element) 
    })
  },[users]);

  return (
    <main className="flex h-screen align-middle justify-center mt-20">
      <p>You're at Home Page, Please Sign Up/Login with your UFPE Account</p>
    </main>
    
  )
}
