import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface FormData {
  titulo: string;
  descripcion: string;
  prioridad: string;
  vencimiento: string;
}

export const useTasksCreatorForm = () => {
  const [formData, setFormData] = useState<FormData>({
    titulo: '',
    descripcion: '',
    prioridad: '',
    vencimiento: '',
  });

  const setTitulo = (value: string) => {
    setFormData((prev) => ({ ...prev, titulo: value }));
  };

  const setDescripcion = (value: string) => {
    setFormData((prev) => ({ ...prev, descripcion: value }));
  };

  const setPrioridad = (value: string) => {
    setFormData((prev) => ({ ...prev, prioridad: value }));
  };

  const setVencimiento = (value: string) => {
    setFormData((prev) => ({ ...prev, vencimiento: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.titulo.trim()) {
      toast.error('El nombre de la tarea es requerido', {
        duration: 3500,
        position: 'top-center',
      });
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setFormData({
      titulo: '',
      descripcion: '',
      prioridad: '',
      vencimiento: '',
    });
  };

  return {
    formData,
    setTitulo,
    setDescripcion,
    setPrioridad,
    setVencimiento,
    validateForm,
    resetForm,
  };
};
