// src/presentation/components/common/Modals/ModalTaskMobile/hooks/useModalTaskMobile.ts

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import useStore from '../../../zustand';

export const useModalTaskMobile = (setIsOpenModalTask: (value: boolean) => void) => {
  const [vencimiento, setVencimiento] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [prioridad, setPrioridad] = useState('');
  const { data: session } = useSession();
  const { setActualizador } = useStore();

  const crearTarea = async () => {
    try {
      const inputDate = new Date(vencimiento);
      inputDate.setDate(inputDate.getDate() + 1);
      const adjustedDate = inputDate.toISOString().split('T')[0];

      await axios.post('/addtasks', {
        tarea: titulo,
        estado: 'Pendiente',
        prioridad: prioridad || 'Prioridad 1',
        descripcion: descripcion,
        client: session?.user?.id,
        fechaDeTarea: adjustedDate || new Date().toISOString().split('T')[0],
      });

      setTitulo('');
      setDescripcion('');
      setPrioridad('');
      setVencimiento('');

      toast.success('Tarea creada', {
        duration: 3500,
        position: 'top-center',
        style: { fontWeight: 600 },
      });

      setIsOpenModalTask(false);
      setActualizador();
    } catch (error) {
      console.error('Error al crear la tarea:', error);
      toast.error('Error al crear la tarea', {
        duration: 3500,
        position: 'top-center',
        style: { fontWeight: 600 },
      });
    }
  };

  const handleCancel = () => {
    setTitulo('');
    setDescripcion('');
    setPrioridad('');
    setVencimiento('');
    setIsOpenModalTask(false);
  };

  return {
    vencimiento,
    setVencimiento,
    titulo,
    setTitulo,
    descripcion,
    setDescripcion,
    prioridad,
    setPrioridad,
    crearTarea,
    handleCancel,
  };
};
