'use client';

import { memo, useCallback } from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Textarea,
} from '@nextui-org/react';
import { Toaster } from 'react-hot-toast';
import './TasksCreator.scss';
import { useTasksCreatorForm, useTasksCreatorSubmit } from '@/presentation/hooks';

interface TasksCreatorProps {
  setIsOpenCreatorTasks: (isOpen: boolean) => void;
  childrenProject?: string;
}

const TasksCreator = memo<TasksCreatorProps>(({ setIsOpenCreatorTasks, childrenProject }) => {
  const { formData, setTitulo, setDescripcion, setPrioridad, setVencimiento, validateForm, resetForm } =
    useTasksCreatorForm();

  const handleSuccess = useCallback(() => {
    resetForm();
    setIsOpenCreatorTasks(false);
  }, [resetForm, setIsOpenCreatorTasks]);

  const { createTask, isSubmitting } = useTasksCreatorSubmit({
    onSuccess: handleSuccess,
    childrenProject,
  });

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) {
      return;
    }
    await createTask(formData);
  }, [validateForm, createTask, formData]);

  const handleCancel = useCallback(() => {
    resetForm();
    setIsOpenCreatorTasks(false);
  }, [resetForm, setIsOpenCreatorTasks]);

  return (
    <div className="tasks-creator">
      <div className="contenedor">
        <div className="inputs">
          <form>
            <Textarea
              variant="underlined"
              label="Nombre de la tarea"
              labelPlacement="outside"
              placeholder="Nombre de la tarea"
              value={formData.titulo}
              onValueChange={setTitulo}
              color="warning"
              className="w-full textarea-superior"
            />
            <Textarea
              variant="underlined"
              label="Descripción"
              labelPlacement="outside"
              placeholder="Descripción de la tarea"
              value={formData.descripcion}
              color="warning"
              onValueChange={setDescripcion}
              className="w-full"
            />
          </form>

          <div className="detalles-de-tarea">
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4 detalle-vencimiento">
              <div className="fecha-de-vencimiento">
                <label htmlFor="vencimiento">Fecha de vencimiento</label>
                <input
                  id="vencimiento"
                  type="date"
                  className="max-w-sm fecha-input"
                  value={formData.vencimiento}
                  onChange={(e) => setVencimiento(e.target.value)}
                />
              </div>
            </div>

            <div className="detalle">
              <Dropdown>
                <DropdownTrigger>
                  <Button color="danger">
                    {formData.prioridad === '' ? 'Prioridad' : formData.prioridad}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Seleccionar prioridad">
                  <DropdownItem onClick={() => setPrioridad('Prioridad 1')}>
                    Prioridad 1
                  </DropdownItem>
                  <DropdownItem onClick={() => setPrioridad('Prioridad 2')}>
                    Prioridad 2
                  </DropdownItem>
                  <DropdownItem onClick={() => setPrioridad('Prioridad 3')}>
                    Prioridad 3
                  </DropdownItem>
                  <DropdownItem
                    className="text-danger"
                    color="danger"
                    onClick={() => setPrioridad('')}
                  >
                    Ninguna prioridad
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>

          <div className="acciones">
            <div className="boton-de-agregacion">
              <Button color="default" onClick={handleCancel} disabled={isSubmitting}>
                Cancelar
              </Button>
            </div>
            <div className="boton-de-agregacion">
              <Button color="warning" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Creando...' : 'Añadir tarea'}
              </Button>
            </div>cuale
          </div>
        </div>

        <Toaster />
      </div>
    </div>
  );
});

TasksCreator.displayName = 'TasksCreator';

export default TasksCreator;
