'use client';

import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import './Modals.scss';
import { useModalProjectMobile } from '@/presentation/hooks';

interface ModalProjectMobileProps {
  setModalProject: (value: boolean) => void;
}

const ModalProjectMobile: React.FC<ModalProjectMobileProps> = ({ setModalProject }) => {
  const { nombreProyecto, setNombreProyecto, crearProyecto, handleCancel } =
    useModalProjectMobile(setModalProject);

  return (
    <motion.div
      // className="modal-project-mobile"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="contenedor-modal-project-mobile">
        <div className="formulario-del-modal">
          <textarea
            placeholder="Nombre del proyecto"
            className="input-del-proyecto"
            value={nombreProyecto}
            onChange={(e) => setNombreProyecto(e.target.value)}
          />
        </div>

        <div className="botones">
          <div className="bot">
            <div className="boton-accion-cancelar" onClick={handleCancel}>
              Cancelar
            </div>
            <div className="boton-accion-agregar" onClick={crearProyecto}>
              Añadir proyecto
            </div>
          </div>
        </div>

        <Toaster />
      </div>
    </motion.div>
  );
};

export default ModalProjectMobile;
