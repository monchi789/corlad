import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { PopUp } from "../../../../../interfaces/model/PopUp";
import { getPopUp } from "../../../../../api/popup.api";

export function PopUps() {
  const [data, setData] = useState<PopUp[]>([]);
  const [visible, setVisible] = useState(false); // Inicialmente false

  const hideDialog = () => {
    setVisible(false);
  };

  const headerContent = (
    <div className="py-1">
      <button 
        className="text-black text-2xl font-bold hover:text-white hover:bg-[#00330A] focus:outline-none transition duration-300 rounded px-4 py-1"
        aria-label="Cerrar ventana emergente"
        onClick={hideDialog}
      >
        ✕
      </button>
    </div>
  );

  useEffect(() => {
    async function cargarPopUp() {
      const res = await getPopUp();
      setData(res.data);
      
      // Solo mostrar el popup si hay elementos activos
      const elementosActivos = res.data.filter(item => item.estado_popup);
      if (elementosActivos.length > 0) {
        setVisible(true);
      }
    }

    cargarPopUp();
  }, []);

  const popUpsActivo = data.filter(item => item.estado_popup);

  // Si no hay popups activos, no renderizar nada
  if (popUpsActivo.length === 0) {
    return null;
  }

  return (
    <div className={`${visible ? 'fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm' : ''} flex justify-center items-center z-20`}>
      <div className="w-5/6 lg:w-1/2">
        <Dialog
          className="w-5/6 md:1/2 lg:w-1/2 xl:w-1/3 bg-white rounded-xl items-center"
          header={headerContent}
          visible={visible}
          draggable={false}
          closable={false}
          closeOnEscape
          onHide={() => { if (!visible) return; setVisible(false); }}
        >
          {popUpsActivo.map(element => (
            <img 
              key={element.id} 
              className="w-full rounded-b-xl" 
              src={import.meta.env.VITE_API_URL_ALTER + element.imagen} 
              alt="" 
            />
          ))}
        </Dialog>
      </div>
    </div>
  );
}

export default PopUps
