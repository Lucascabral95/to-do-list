"use client";
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import { GrConfigure } from "react-icons/gr";
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import useStore from '../../../zustand.jsx';
import { Avatar } from "@nextui-org/react";
import { FaPlusCircle } from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { CiInboxIn, CiCalendarDate, CiLogout } from "react-icons/ci";
import { PiTrashSimple } from "react-icons/pi";
import axios from 'axios';
import { signOut } from 'next-auth/react';
import Configuration from '../Footer/Configuration/Configuration.jsx';
import { toast, Toaster } from 'react-hot-toast';
import { GoPlus } from "react-icons/go";
import ModalProjectMobile from '../Modals/ModalProjectMobile.jsx';
import ModalTaskMobile from '../Modals/ModalTaskMobile.jsx';

const HeaderMobile = () => {
    const [activeModal, setActiveModal] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session } = useSession();
    const { actualizador, setActualizador } = useStore();
    const [longitudTareasVarias, setLongitudTareasVarias] = useState({
        tareasHoy: 0,
        historial: 0,
        tareasTotal: 0
    });
    const [proyectos, setProyectos] = useState([]);
    const [modalProject, setModalProject] = useState(false);
    const [isOpenModalTask, setIsOpenModalTask] = useState(false);

    useEffect(() => {
        const traerDatos = async () => {
            try {
                // const response = await axios.get('http://localhost:3000/nuevo-proyecto');
                const response = await axios.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/nuevo-proyecto`);
                setProyectos(response.data.datos);
            } catch (error) {
                console.log(error);
            }
        };

        traerDatos();
    }, [actualizador]);

    const cerrarSesion = () => {
        signOut();
    }

    const eliminarProyecto = async (id) => {
        try {
            // const eliminarTarea = await axios.delete(`http://localhost:3000/nuevo-proyecto`, {
            const eliminarTarea = await axios.delete(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/nuevo-proyecto`, {
                data: {
                    id: id
                }
            });

            if (eliminarTarea.status === 200) {
                toast.success('Proyecto eliminado exitosamente', {
                    position: "top-center",
                    duration: 3500
                });
                console.log(`El id mandado es: ${id}`);
                setArrayProyectos(arrayProyectos.filter((proyecto) => proyecto.id !== id));
            } else {
                console.log('Error en la respuesta:', eliminarTarea);
            }
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <header className='header-mobile'>
            <div className="contenedor-header-mobile">
                <div className="icono" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <MdOutlineSpaceDashboard className="icon" />
                </div>
                <div className="icono" onClick={() => setActiveModal(!activeModal)}>
                    <GrConfigure className="icon" />
                </div>
            </div>

            <motion.div className="contenido-header-mobile" style={{ display: isMenuOpen ? 'block' : 'none' }}>

                <div className="estructura-del-header-mobile">
                    <div className="dddiiivvv">
                        <div className="cont-header-mobile">
                            <div className="categoria">
                                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" style={{ cursor: 'pointer' }} className='avat' size="md" />
                                <p> {session?.user.email} </p>
                            </div>
                            <div className="categoria">
                                <Link href="/app/hoy" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                    <div className="icono">
                                        <MdOutlineSpaceDashboard className='icon' />
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className="c-m">
                            <Link href="/app/hoy">
                                <div className="categorias-mobile">
                                    <div className="contenedor-de-categorias" onClick={() => {setIsOpenModalTask(true); setIsMenuOpen(!isMenuOpen)}}>
                                        <div className="categorias">
                                            <FaPlusCircle className="icon" color='var(--color-principal)' />
                                            <p> Añadir Tarea </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link href="/app/bandeja-de-entrada">
                                <div className="categorias-mobile">
                                    <div className="contenedor-de-categorias">
                                        <div className="categorias">
                                            <CiInboxIn className="icon" />
                                            <p> Bandeja de entrada </p>
                                        </div>
                                        <div className="longitud">
                                            <p> 12 </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link href="/app/hoy">
                                <div className="categorias-mobile">
                                    <div className="contenedor-de-categorias">
                                        <div className="categorias">
                                            <CiCalendarDate className="icon" />
                                            <p> Hoy </p>
                                        </div>
                                        <div className="longitud">
                                            <p> 12 </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link href="/app/historial-de-tareas">
                                <div className="categorias-mobile">
                                    <div className="contenedor-de-categorias">
                                        <div className="categorias">
                                            <CiCalendarDate className="icon" />
                                            <p> Historial de tareas </p>
                                        </div>
                                        <div className="longitud">
                                            <p> 12</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <div className="categoria-proyectos">
                                <div className="mis-projects">
                                    <div className="pro">
                                        <p> Mis proyectos </p>
                                    </div>
                                    <div className="more-projects" onClick={() => setModalProject(!modalProject)}>
                                        <GoPlus className='icon' />
                                    </div>
                                </div>
                                <div className="longitudess">
                                    {proyectos?.map((tareas, index) => (
                                        <div key={index} className='contenedor-de-array-de-proyectos'>
                                            <div className='array-de-proyectos'>
                                                <p className="arr"> # </p> <p className='arr-texto'> {tareas.project}  </p>
                                            </div>
                                            <div className="iconoo">
                                                <PiTrashSimple className="icon" onClick={() => { eliminarProyecto(tareas._id); setActualizador() }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="boton-cierre-sesion">
                        <div className="boton" onClick={cerrarSesion}>
                            <CiLogout className="icon" />
                            <p> Cerrar sesion </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {activeModal &&
                <Configuration setActiveModal={setActiveModal} />
            }

            <Toaster />

            {modalProject &&
                <ModalProjectMobile setModalProject={setModalProject} />
            }

            {isOpenModalTask &&
                <ModalTaskMobile setIsOpenModalTask={setIsOpenModalTask} />
            }

        </header>
    )
}

export default HeaderMobile