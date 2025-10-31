import { useState, useEffect } from 'react';
import axios from 'axios';
import useStore from '../../../zustand';

interface Task {
  _id: string;
  tarea: string;
  prioridad: string;
  estado: string;
  fechaDeTarea: string;
}

type FilterType = 'todas' | 'Terminada' | 'Pendiente' | 'sinRealizar';
type ColorType = 'default' | 'success' | 'warning' | 'danger';

export const useTableTasks = () => {
  const [datos, setDatos] = useState<Task[]>([]);
  const [selectedColor, setSelectedColor] = useState<ColorType>('default');
  const [filtroSeleccionado, setFiltroSeleccionado] = useState<FilterType>('todas');
  const [isEmptyTask, setIsEmptyTask] = useState(false);
  const { actualizador } = useStore();

  useEffect(() => {
    fetchTasks();
  }, [filtroSeleccionado, actualizador]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (datos.length === 0) {
        setIsEmptyTask(true);
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, [datos]);

  const fetchTasks = async () => {
    try {
      const result = await axios.get('/addtasks');
      const sortedTasks = result.data.tasks.sort((a: Task, b: Task) =>
        new Date(b.fechaDeTarea).getTime() - new Date(a.fechaDeTarea).getTime()
      );

      switch (filtroSeleccionado) {
        case 'Terminada':
          setDatos(sortedTasks.filter((task: Task) => task.estado === 'Terminada'));
          setSelectedColor('success');
          break;
        case 'Pendiente':
          setDatos(sortedTasks.filter((task: Task) => task.estado === 'Pendiente'));
          setSelectedColor('warning');
          break;
        case 'sinRealizar':
          setDatos(
            sortedTasks.filter(
              (task: Task) =>
                task.estado === 'Pendiente' && new Date(task.fechaDeTarea) < new Date()
            )
          );
          setSelectedColor('danger');
          break;
        default:
          setDatos(sortedTasks);
          setSelectedColor('default');
      }
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  return {
    datos,
    selectedColor,
    filtroSeleccionado,
    setFiltroSeleccionado,
    isEmptyTask,
  };
};
