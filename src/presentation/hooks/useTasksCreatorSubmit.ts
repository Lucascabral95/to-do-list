import { useCallback, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';

import useStore from '../../../zustand';

interface FormData {
  titulo: string;
  descripcion: string;
  prioridad: string;
  vencimiento: string;
}

interface UseTasksCreatorSubmitProps {
  onSuccess: () => void;
  childrenProject?: string;
}

export const useTasksCreatorSubmit = ({
  onSuccess,
  childrenProject,
}: UseTasksCreatorSubmitProps) => {
  const { data: session } = useSession();
  const { setActualizador } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createTask = useCallback(
    async (formData: FormData) => {
      setIsSubmitting(true);
      try {
        const inputDate = new Date(formData.vencimiento);
        inputDate.setDate(inputDate.getDate() + 1);
        const adjustedDate = inputDate.toISOString().split('T')[0];

        await axios.post('/addtasks', {
          tarea: formData.titulo,
          estado: 'Pendiente',
          prioridad: formData.prioridad || 'Prioridad 1',
          descripcion: formData.descripcion,
          client: session?.user?.id,
          fechaDeTarea: adjustedDate || new Date().toISOString().split('T')[0],
          proyecto: childrenProject || null,
        });

        toast.success('Tarea creada exitosamente', {
          duration: 3500,
          position: 'top-center',
          style: { fontWeight: 600 },
        });

        setActualizador();
        onSuccess();
      } catch (error) {
        console.error('Error al crear la tarea:', error);
        toast.error('Error al crear la tarea', {
          duration: 3500,
          position: 'top-center',
          style: { fontWeight: 600 },
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [session?.user?.id, childrenProject, onSuccess, setActualizador]
  );

  return {
    createTask,
    isSubmitting,
  };
};
