// "use client"
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { GoPlus } from "react-icons/go";

// import Structure from "@/components/Structure/Structure";
// import CardTask from "@/components/CardTask/CardTask";
// import TasksCreator from "@/components/TasksCreator/TasksCreator";
// import useStore from "../../../../zustand";
// import SinTareas from "@/components/SinTareas/SinTareas";
// import "./hoy.scss"

// const Hoy = () => {
//     const [datos, setDatos] = useState([]);
//     const [isOpenCreatorTasks, setIsOpenCreatorTasks] = useState(false);
//     const [setUpdateData] = useState(false);
//     const { actualizador } = useStore();
//     const [isEmptyTask, setIsEmptyTask] = useState(false);

//     useEffect(() => {
//         axios.get(`/addtasks`)
//             .then((result) => {
//                 setDatos(
//                     result.data.tasks.filter(
//                         (task) => new Date(task.fechaDeTarea).toDateString() === new Date().toDateString()
//                     )
//                 );
//             })
//             .catch((error) => {
//                 console.error("Error al obtener datos:", error);
//             });
//     }, [isOpenCreatorTasks, actualizador]);

//     useEffect(() => {
//         if (datos.length === 0) {
//             setIsEmptyTask(true);
//         } else {
//             setIsEmptyTask(false);
//         }
//     }, [datos]);

//     return (
//         <Structure>
//             <section className="desktop-hoy">
//                 <div className="titulo">
//                     <h2> Hoy </h2>
//                 </div>
//                 <div className="agregar-tareas">
//                     <div className="icons" onClick={() => setIsOpenCreatorTasks(true)}>
//                         <GoPlus className="icon" />
//                         <p> Añadir tareas </p>
//                     </div>
//                 </div>

//                 <SinTareas
//                     datos={datos}
//                     isEmptyTask={isEmptyTask}
//                     titulo={"¡Que nada se te escape hoy!"}
//                     subtitulo={"Anotá tus tareas y convertí el día en un día."}
//                 />

//                 {isOpenCreatorTasks &&
//                     <TasksCreator setUpdateData={setUpdateData} setIsOpenCreatorTasks={setIsOpenCreatorTasks} />
//                 }

//                 <CardTask task={datos} />

//             </section>
//         </Structure>
//     )
// }

// export default Hoy

// presentation/components/Hoy/Hoy.tsx
"use client";

import { memo, useState } from "react";
import { GoPlus } from "react-icons/go";
import Structure from "@/components/Structure/Structure";
import CardTask from "@/components/CardTask/CardTask";
import TasksCreator from "@/components/TasksCreator/TasksCreator";
import SinTareas from "@/components/SinTareas/SinTareas";
import { useTodayTasks } from "@/presentation/hooks/useTodayTasks";
import { MESSAGES } from "@/infrastructure/constants/messages.constants";
import "./hoy.scss";

const Hoy = memo(() => {
    const { tasks, isEmpty } = useTodayTasks();
    const [isOpenCreatorTasks, setIsOpenCreatorTasks] = useState(false);

    return (
        <Structure>
            <section className="desktop-hoy">
                <div className="titulo">
                    <h2> Hoy </h2>
                </div>
                <div className="agregar-tareas">
                    <div className="icons" onClick={() => setIsOpenCreatorTasks(true)}>
                        <GoPlus className="icon" />
                        <p> Añadir tareas </p>
                    </div>
                </div>

                <SinTareas
                    datos={tasks}
                    isEmptyTask={isEmpty}
                    titulo={MESSAGES.EMPTY_TODAY_TASKS.TITLE}
                    subtitulo={MESSAGES.EMPTY_TODAY_TASKS.SUBTITLE}
                />

                {isOpenCreatorTasks && (
                    <TasksCreator setIsOpenCreatorTasks={setIsOpenCreatorTasks} />
                )}

                <CardTask task={tasks} />
            </section>
        </Structure>
    );
});

Hoy.displayName = 'Hoy';

export default Hoy;
