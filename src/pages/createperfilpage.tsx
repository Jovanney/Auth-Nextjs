import ProtectedRoute from "../../components/ProtectedRoute";
import { Player } from '@lottiefiles/react-lottie-player';
import { useEffect, useState } from "react";

interface perfil {
  userId: string
  title: string
}

interface User {
  email: string;
  id: string;
}

export default function CreatePerfilPage() {
  const [users, setUsers] = useState<User[]>([] as User[]);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [isEmailSelected, setIsEmailSelected] = useState<boolean>(false);


  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch('/api/getUsers')
      if (!res.ok) {
        console.log(res)
      }
      return res.json()
    }
    getUsers().then(
      data => setUsers(data)   
      )
  }, []);


  
  const handleEmailClick = async (userId: string) => {
    setSelectedUserId(userId);
    setIsEmailSelected(true);
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsEmailSelected(false);
    try {
      const body = {} as perfil;
      body.userId = selectedUserId;
      body.title = title.toUpperCase();
      await fetch('/api/createPerfil', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }

  }

  const handleCancelClick = () => {
    setIsEmailSelected(false);
  }

  return (
    <ProtectedRoute>
      <div className="flex py-2 bg-silver">
        <div className="text-gray-600 px-12 py-24 mt-24 overflow-y-hidden mx-auto">
          <h2 className="text-2xl font-semibold text-center">Create Perfil</h2>
          {users?.map(user => (
            <p className="cursor-pointer mt-3" key={user.id} onClick={() => handleEmailClick(user.id)}>
              {user.email}
            </p>
          ))}
          {isEmailSelected && (
            <form onSubmit={handleFormSubmit} className="flex flex-col justify-center items-center mt-8">
              <label>
                Title:
                <input type="text" value={title} onChange={handleTitleChange} className="bg-gray-100 text-gray-700 border border-gray-300 rounded-md py-2 px-4 block w-full appearance-none leading-normal focus:outline-none focus:bg-white focus:border-gray-500 mb-4"/>
              </label>
              <div className="flex justify-between w-full">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Save</button>
                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={handleCancelClick}>X</button>
              </div>
            </form>
          )}
        </div>
      </div>
      <Player
        autoplay
        loop
        src="https://assets9.lottiefiles.com/packages/lf20_fN91t3YtTf.json"
        style={{ height: '300px', width: '300px' }}
      >
      </Player>
    </ProtectedRoute>
  );
}
