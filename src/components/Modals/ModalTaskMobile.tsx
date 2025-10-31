// "use client"
// import { useState } from "react"
// import { useSession } from "next-auth/react"
// import axios from "axios"
// import { motion } from "framer-motion"
// import { toast, Toaster } from "react-hot-toast"
// import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

// import useStore from "../../../zustand"
// import "./Modals.scss"

// const ModalTaskMobile = ({ setIsOpenModalTask }) => {
//     const { actualizador } = useStore();
//     const [vencimiento, setVencimiento] = useState(new Date());
//     const [titulo, setTitulo] = useState("")
//     const [descripcion, setDescripcion] = useState("")
//     const [prioridad, setPrioridad] = useState("")
//     const { data: session } = useSession();

//     const crearTarea = async () => {
//         const dest = descripcion;
//         const inputDate = new Date(vencimiento);
//         inputDate.setDate(inputDate.getDate() + 1);
//         const adjustedDate = inputDate.toISOString().split('T')[0];

//         try {
//             await axios.post(`/addtasks`, {
//                 tarea: titulo,
//                 estado: "Pendiente",
//                 prioridad: prioridad || "Prioridad 1",
//                 descripcion: dest,
//                 client: session?.user?.id,
//                 fechaDeTarea: adjustedDate || new Date().toISOString().split('T')[0]
//             });

//             setTitulo("");
//             setDescripcion("");
//             setPrioridad("");
//             setVencimiento(null);
//             toast.success("Tarea creada", {
//                 duration: 3500,
//                 position: "top-center",
//                 style: {
//                     fontWeight: 600,
//                 },
//             })
//         } catch (error) {
//             console.error("Error al crear la tarea:", error);
//             toast.error("Error al crear la tarea", {
//                 duration: 3500,
//                 position: "top-center",
//                 style: {
//                     fontWeight: 600,
//                 },
//             })
//         }
//     }

//     return (
//         <motion.div className='modal-task-mobile'
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//         >
//             <div className="contenedor-modal-task-mobile">

//                 <div className="formulario-largo-tareas">
//                     <div className="caja">
//                         <input type="text" placeholder="Nombre de la tarea" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="caja-tarea" />
//                     </div>
//                     <div className="caja">
//                         <textarea
//                             type="text"
//                             placeholder="Nombre de la descripción"
//                             value={descripcion}
//                             onChange={(e) =>
//                                 setDescripcion(e.target.value)} className="caja-descripcion"
//                         />
//                     </div>
//                     <div className="caja-fecha-prioridad">
//                         <div className="caj">
//                             <input type="date" value={vencimiento} onChange={(e) => setVencimiento(e.target.value)} className="caja-fecha" />
//                         </div>
//                         <div className="caj">
//                             <Dropdown>
//                                 <DropdownTrigger>
//                                     <Button color="secondary" >
//                                         {prioridad || "Prioridad 1"}
//                                     </Button>
//                                 </DropdownTrigger>
//                                 <DropdownMenu aria-label="Static Actions">
//                                     <DropdownItem onClick={() => setPrioridad("Prioridad 1")}> Prioridad 1 </DropdownItem>
//                                     <DropdownItem onClick={() => setPrioridad("Prioridad 2")}> Prioridad 2  </DropdownItem>
//                                     <DropdownItem onClick={() => setPrioridad("Prioridad 3")} > Prioridad 3 </DropdownItem>
//                                 </DropdownMenu>
//                             </Dropdown>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="botones">
//                     <div className="bot">
//                         <div className="boton-accion-cancelar" onClick={() => setIsOpenModalTask(false)} >
//                             Cancelar
//                         </div>
//                         <div className="boton-accion-agregar" onClick={() => { crearTarea(); actualizador }}>
//                             Añadir tarea
//                         </div>
//                     </div>
//                 </div>

//                 <Toaster />

//             </div>
//         </motion.div>
//     )
// }

// export default ModalTaskMobile;

// src/presentation/components/common/Modals/ModalTaskMobile/ModalTaskMobile.tsx

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
      className="modal-task-mobile"
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
