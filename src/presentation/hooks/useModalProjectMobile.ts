import { useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import useStore from '../../../zustand';

export const useModalProjectMobile = (setModalProject: (value: boolean) => void) => {
  const [nombreProyecto, setNombreProyecto] = useState('');
  const { data: session } = useSession();
  const { setActualizador } = useStore();

  const crearProyecto = async () => {
    const idUser = session?.user?.id;

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
          style: { zIndex: 9999 },
        });
        setModalProject(false);
        setActualizador();
      }
    } catch (error) {
      console.error('Error al crear el proyecto:', error);
      toast.error('Error al crear el proyecto', {
        position: 'top-center',
        duration: 3500,
      });
    }
  };

  const handleCancel = () => {
    setNombreProyecto('');
    setModalProject(false);
  };

  return {
    nombreProyecto,
    setNombreProyecto,
    crearProyecto,
    handleCancel,
  };
};
