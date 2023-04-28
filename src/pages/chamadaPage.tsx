import ProtectedRouteChamada from "../../components/ProtectedRoute";
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

export default function chamadaPage() {
  return (
    <ProtectedRouteChamada>
      <div className={"flex justify-center"}>
        <Player
          autoplay
          loop
          src="https://assets1.lottiefiles.com/packages/lf20_mv7XEWVcaw.json"
          style={{ height: '300px', width: '300px' }}
        >
        </Player>
      </div>
      
    </ProtectedRouteChamada>
  );
}
