import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { PopUp } from "../../interfaces/model/PopUp";
import { getPopUp } from "../../api/popup.api";

export function PopUps() {
  const [data, setData] = useState<PopUp[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Verificar si el modal ya se ha mostrado en esta sesión
    const popupShown = sessionStorage.getItem('popupShown');

    if (!popupShown) {
      setVisible(true);
      // Marcar modal como mostrado en la sesión actual
      sessionStorage.setItem('popupShown', 'true');
    }
  }, []);

  const hideDialog = () => {
    setVisible(false);
  };

  const headerContent = (
    <div className="py-2">
      <button className="focus:outline-none" onClick={hideDialog}>
        <i className="pi pi-times text-black hover:bg-[#00330A] hover:text-white transition duration-300 text-xl px-2 py-1 rounded"></i>
      </button>
    </div>
  );

  useEffect(() => {
    async function cargarPopUp() {
      const res = await getPopUp();

      setData(res.data);
    }

    cargarPopUp();
  }, []);

  const popUpsActivo = data.filter(item => item.estado_popup);

  return (
    <div className={`${visible ? 'fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm' : ''} flex justify-center items-center z-20`}>
      <div className="w-5/6 lg:w-1/2">
        <Dialog className="w-5/6 lg:w-1/2 bg-white rounded items-center lg:px-10" header={headerContent} visible={visible} draggable={false} closable={false} closeOnEscape onHide={() => { if (!visible) return; setVisible(false); }}>
          {popUpsActivo.map(element => (
            <img key={element.id} className="w-full" src={import.meta.env.VITE_API_URL_ALTER + element.imagen} alt="" />
          ))}
        </Dialog>
      </div>
    </div>
  );
}
