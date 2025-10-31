"use client";
import { memo, useState } from "react";
import moment from "moment";
import { MdOutlineDone } from "react-icons/md";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import { Toaster } from "react-hot-toast";

import { useTaskActions } from "@/presentation/hooks/useTaskActions";
import type { Task } from "@/infrastructure/types/task.types";
import "./CardTask.scss";

interface CardTaskProps {
  task: Task[];
}

const CardTask = memo<CardTaskProps>(({ task }) => {
  const [hoverCard, setHoverCard] = useState<number | null>(null);
  const { deleteTask, completeTask } = useTaskActions();

  const getPriorityColor = (prioridad: string): string => {
    switch (prioridad) {
      case "Prioridad 1":
        return "#F44336";
      case "Prioridad 2":
        return "#FFC107";
      case "Prioridad 3":
        return "#4CAF50";
      default:
        return "";
    }
  };

  return (
    <div className="card-task">
      <div className="contenedor">
        {task.map((tarea, index: number) => (
          <div
            key={index}
            className="task-card"
            onMouseEnter={() => setHoverCard(index)}
            onMouseLeave={() => setHoverCard(null)}
          >
            <h2 className="task-title">{tarea.tarea}</h2>
            <div className="fecha-iconos">
              <div>
                <p className="task-date">
                  Fecha:
                  {tarea?.fechaDeTarea
                    ? moment(tarea?.fechaDeTarea).format("DD/MM/YYYY")
                    : ""}
                </p>
              </div>
              <motion.div
                transition={{ duration: 0.5 }}
                animate={{ opacity: hoverCard === index ? 1 : 0 }}
                style={{ pointerEvents: hoverCard === index ? "auto" : "none" }}
              >
                <MdOutlineDone
                  className="icono-check"
                  style={{
                    display: tarea?.estado === "Terminada" ? "none" : "block",
                  }}
                  onClick={() => completeTask(tarea._id)}
                />
                <FaTrash
                  className="icono-basura"
                  onClick={() => deleteTask(tarea._id)}
                />
              </motion.div>
            </div>
            <p className="task-description">{tarea?.descripcion}</p>
            <div className="task-info">
              <span
                className="priority"
                style={{
                  backgroundColor: getPriorityColor(tarea?.prioridad),
                }}
              >
                {tarea?.prioridad}
              </span>
              <span className="status">{tarea?.estado}</span>
            </div>
          </div>
        ))}

        <Toaster />
      </div>
    </div>
  );
});

CardTask.displayName = "CardTask";

export default CardTask;
