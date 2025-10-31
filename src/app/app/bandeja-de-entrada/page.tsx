// "use client";
// import Structure from "@/components/Structure/Structure";
// import "./bandeja.scss";
// import { GoPlus } from "react-icons/go";
// import TasksCreator from "@/components/TasksCreator/TasksCreator";
// import { useEffect, useState } from "react";
// import CardTask from "@/components/CardTask/CardTask";
// import axios from "axios";
// import SinTareas from "@/components/SinTareas/SinTareas";
// import useStore from "../../../../zustand";

// const BandejaDeEntrada = () => {
//   const [isOpenCreatorTasks, setIsOpenCreatorTasks] = useState(false);
//   const [datos, setDatos] = useState([]);
//   const [isEmptyTask, setIsEmptyTask] = useState(false);
//   const { actualizador } = useStore();

//   useEffect(() => {
//     axios
//       .get(`/addtasks`)
//       .then((result) => {
//         setDatos(result.data.tasks);
//         console.log("Datos:", result);
//       })
//       .catch((error) => {
//         console.error("Error al obtener datos:", error);
//       });
//   }, [actualizador]);

//   useEffect(() => {
//     if (datos.length === 0) {
//       setIsEmptyTask(true);
//     } else {
//       setIsEmptyTask(false);
//     }
//   }, [datos]);

//   return (
//     <Structure>
//       <section className="bandeja-de-entrada">
//         <div className="titulo">
//           <h2> Bandeja de entrada </h2>
//         </div>
//         <div className="agregar-tareas">
//           {!isOpenCreatorTasks && (
//             <div className="icons" onClick={() => setIsOpenCreatorTasks(true)}>
//               <GoPlus className="icon" />
//               <p> Añadir tareas </p>
//             </div>
//           )}
//         </div>

//         <SinTareas
//           datos={datos}
//           isEmptyTask={isEmptyTask}
//           titulo={"¡Bienvenido!"}
//           subtitulo={"No tenés tareas pendientes"}
//         />

//         {isOpenCreatorTasks && (
//           <TasksCreator setIsOpenCreatorTasks={setIsOpenCreatorTasks} />
//         )}

//         <CardTask task={datos} />
//       </section>
//     </Structure>
//   );
// };

// export default BandejaDeEntrada;

/////
/////
/////
/////
// presentation/components/BandejaDeEntrada/BandejaDeEntrada.tsx
"use client";

import { memo } from "react";
import { GoPlus } from "react-icons/go";
import Structure from "@/components/Structure/Structure";
import TasksCreator from "@/components/TasksCreator/TasksCreator";
import CardTask from "@/components/CardTask/CardTask";
import SinTareas from "@/components/SinTareas/SinTareas";
import { useTasks } from "@/presentation/hooks/useTasks";
import { useTaskCreator } from "@/presentation/hooks/useTaskCreator";
import { MESSAGES } from "@/infrastructure/constants/messages.constants";
import { ErrorBoundary } from "@/presentation/components/UI/ErrorBoundary";
import { LoadingSpinner } from "@/presentation/components/UI/LoadingSpinner";
import "./bandeja.scss";

const BandejaDeEntradaContent = memo(() => {
  const { tasks, loading, error, isEmpty } = useTasks();
  const { isOpen, open, close } = useTaskCreator();

  if (error) {
    return (
      <Structure>
        <section className="bandeja-de-entrada">
          <div className="error-message" role="alert">
            <p>{error.message}</p>
          </div>
        </section>
      </Structure>
    );
  }

  return (
    <Structure>
      <section className="bandeja-de-entrada">
        <header className="titulo">
          <h1>Bandeja de entrada</h1>
        </header>

        {!isOpen && !loading && (
          <div className="agregar-tareas">
            <button
              type="button"
              className="icons"
              onClick={open}
              aria-label="Añadir tareas"
            >
              <GoPlus className="icon" aria-hidden="true" />
              <span>Añadir tareas</span>
            </button>
          </div>
        )}

        {loading && <LoadingSpinner />}

        {!loading && (
          <>
            {isOpen && <TasksCreator setIsOpenCreatorTasks={close} />}

            <SinTareas
              datos={tasks}
              isEmptyTask={isEmpty}
              titulo={MESSAGES.EMPTY_TASKS.TITLE}
              subtitulo={MESSAGES.EMPTY_TASKS.SUBTITLE}
            />

            {!isEmpty && <CardTask task={tasks} />}
          </>
        )}
      </section>
    </Structure>
  );
});

BandejaDeEntradaContent.displayName = "BandejaDeEntradaContent";

const BandejaDeEntrada = () => (
  <ErrorBoundary>
    <BandejaDeEntradaContent />
  </ErrorBoundary>
);

export default BandejaDeEntrada;
