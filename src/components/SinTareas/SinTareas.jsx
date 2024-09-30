import "./SinTareas.scss"
import SkeletonEstructura from "../Skeleton/Skeleton.jsx"

const SinTareas = ({ isEmptyTask, datos, titulo, subtitulo }) => {
  return (
    <>

      {isEmptyTask ? (
        <div className="contenedor-imagen-consejo">
          <div className="imagen">
            <img src="../../img/empty-task-uno.webp" alt="Sin tarea(s) diaria(s)" />
          </div>
          <div className="consejos">
            <div className="consejos-texto">
              <p> {titulo} </p>
              <span> {subtitulo} </span>
            </div>
          </div>
        </div>
      ) : (
        datos.length === 0 && !isEmptyTask && <SkeletonEstructura />
      )}

    </>
  )
}

export default SinTareas