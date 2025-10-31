import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import useStore from '../../../zustand';
import { usePathname } from 'next/navigation';

export const useHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(true);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('/app/hoy');
  const [nombreProyecto, setNombreProyecto] = useState('');
  const [arrayProyectos, setArrayProyectos] = useState([]);
  const [isOpenModalTask, setIsOpenModalTask] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const [imagenPerfil, setImagenPerfil] = useState('');

  const { data: session } = useSession();
  const { actualizador, setActualizador } = useStore();
  const pathName = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const cerrarSesion = () => signOut();

  const crearProyecto = async () => {
    const idUser = session?.user.id;
    try {
      const result = await axios.post('/nuevo-proyecto', {
        proyecto: nombreProyecto,
        client: idUser,
      });

      if (result.status === 200 || result.status === 201) {
        setNombreProyecto('');
        toast.success('Proyecto nuevo creado exitosamente', {
          position: 'top-center',
          duration: 3500,
        });
        setActualizador();
        return true;
      }
    } catch (error) {
      console.error('Error al crear el proyecto:', error);
    }
  };

  const eliminarProyecto = async (id: string) => {
    try {
      const response = await axios.delete('/nuevo-proyecto', {
        data: { id },
      });

      if (response.status === 200) {
        toast.success('Proyecto eliminado exitosamente', {
          position: 'top-center',
          duration: 3500,
        });
        setArrayProyectos(arrayProyectos.filter((proyecto) => proyecto.id !== id));
        setActualizador();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axios
      .get('/nuevo-proyecto')
      .then((response) => setArrayProyectos(response.data.datos))
      .catch((error) => console.log(error))
      .finally(() => setIsLoadingSkeleton(false));
  }, [actualizador]);

  useEffect(() => {
    setCategoriaSeleccionada(pathName);
  }, [pathName]);

  useEffect(() => {
    const imagenDefecto = '/img/imagen-perfil.jpg';
    setImagenPerfil(session?.user?.image || imagenDefecto);
  }, [session?.user?.image]);

  return {
    isMenuOpen,
    setIsMenuOpen,
    toggleMenu,
    isLoadingSkeleton,
    categoriaSeleccionada,
    nombreProyecto,
    setNombreProyecto,
    arrayProyectos,
    isOpenModalTask,
    setIsOpenModalTask,
    activeModal,
    setActiveModal,
    imagenPerfil,
    session,
    cerrarSesion,
    crearProyecto,
    eliminarProyecto,
  };
};
