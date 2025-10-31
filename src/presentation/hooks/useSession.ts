import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

export const useUserSession = () => {
  const { data: session } = useSession();
  const [imagenPerfil, setImagenPerfil] = useState('');

  useEffect(() => {
    const imagenDefecto = '/img/imagen-perfil.jpg';
    setImagenPerfil(session?.user?.image || imagenDefecto);
  }, [session?.user?.image]);

  const cerrarSesion = () => {
    signOut();
  };

  return {
    session,
    imagenPerfil,
    cerrarSesion,
  };
};
