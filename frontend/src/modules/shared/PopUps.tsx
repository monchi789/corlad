import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { PopUp } from "../../interfaces/PopUp";
import { getPopUp } from "../../shared/api/popup.api";

export function PopUps() {

  const [data, setData] = useState<PopUp[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const modalShown = localStorage.getItem('modalShown');

    if (!modalShown) {
      setVisible(true);
      localStorage.setItem('modalShown', 'true');
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
  )

  useEffect(() => {
    async function cargarPopUp() {
      const res = await getPopUp();

      /*
        Mapeo del api 
      */
      const popups: PopUp[] = res.data.map((element: any) => ({
        id: element.id,
        imagen: element.imagen,
        estado_popup: element.estado_popup,
      }));

      setData(popups)

    }
    cargarPopUp();
  }, []);

  const popUpsActivo = data.filter(item => item.estado_popup)

  return (
    <div className={`${visible ? 'fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm' : ''} flex justify-center items-center z-20`}>
      <div className="w-5/6 lg:w-1/2">
        <Dialog className="w-5/6 lg:w-1/2 bg-white rounded items-center lg:px-10" header={headerContent} visible={visible} draggable={false} closable={false} closeOnEscape onHide={() => { if (!visible) return; setVisible(false); }}>
          {popUpsActivo.map(element => (
            <img key={element.id} className="w-full" src={element.imagen} alt="" />
          ))}
        </Dialog>
      </div>
    </div>
  )
}
