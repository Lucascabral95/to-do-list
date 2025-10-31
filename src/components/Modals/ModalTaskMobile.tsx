'use client';

import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';
import './Modals.scss';
import { useModalTaskMobile } from '@/presentation/hooks';

interface ModalTaskMobileProps {
  setIsOpenModalTask: (value: boolean) => void;
}

const ModalTaskMobile: React.FC<ModalTaskMobileProps> = ({ setIsOpenModalTask }) => {
  const {
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
  } = useModalTaskMobile(setIsOpenModalTask);

  return (
    <motion.div
      // className="modal-task-mobile"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="contenedor-modal-task-mobile">
        <div className="formulario-largo-tareas">
          <div className="caja">
            <input
              type="text"
              placeholder="Nombre de la tarea"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="caja-tarea"
            />
          </div>

          <div className="caja">
            <textarea
              placeholder="Nombre de la descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="caja-descripcion"
            />
          </div>

          <div className="caja-fecha-prioridad">
            <div className="caj">
              <input
                type="date"
                value={vencimiento}
                onChange={(e) => setVencimiento(e.target.value)}
                className="caja-fecha"
              />
            </div>

            <div className="caj">
              <Dropdown>
                <DropdownTrigger>
                  <Button color="secondary">{prioridad || 'Prioridad 1'}</Button>
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
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>

        <div className="botones">
          <div className="bot">
            <div className="boton-accion-cancelar" onClick={handleCancel}>
              Cancelar
            </div>
            <div className="boton-accion-agregar" onClick={crearTarea}>
              Añadir tarea
            </div>
          </div>
        </div>

        <Toaster />
      </div>
    </motion.div>
  );
};

export default ModalTaskMobile;
