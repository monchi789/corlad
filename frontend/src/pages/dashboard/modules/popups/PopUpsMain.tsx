import { useEffect, useState } from 'react';

import { getPopUps, createPopUps, updatePopUps } from '../../../../api/popup.api';
import { PopUp } from '../../../../interfaces/model/PopUp';
import { IoAdd } from "react-icons/io5";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { EliminarPopUp } from './components/EliminarPopUp';
import { EditarPopUps } from './components/EditarPopUp';
import Image from './components/ImagePopup';
import AddPopUpModal from './components/AddPopUpModal';

const PopUpsMain = () => {
  const navigate = useNavigate();

  const [listPopUps, setListPopUps] = useState<PopUp[]>([]);

  const [addModalIsOpen, setAddModalIsOpen] = useState(false);

  const [isPopUpUpdateModalOpen, setIsPopUpUpdateModalOpen] = useState(false);
  const [isPopUpDeleteModalOpen, setIsPopUpDeleteModalOpen] = useState(false);

  const [selectedPopUp, setSelectedPopUp] = useState<PopUp | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar la carga

  const fetchPopUps = async () => {
    setIsLoading(true); // Activa el estado de carga

    try {
      const res = await getPopUps();
      setListPopUps(res.data);
    } catch (error) {
      toast.error('Error al cargar los anuncios');
    } finally {
      setIsLoading(false); // Desactiva el estado de carga
    }
  };

  const handlePopUpSuccess = (success: boolean, godMessage: string, badMessage: string) => {
    if (success) {
      fetchPopUps();
      toast.success(godMessage);
    } else {
      toast.error(badMessage);
    }
  };

  const handleUpdatePopUp = (popup: PopUp) => {
    setSelectedPopUp(popup);
    setIsPopUpUpdateModalOpen(true);
  };

  const handleDeletePopUp = async (popup: PopUp) => {
    setSelectedPopUp(popup);
    setIsPopUpDeleteModalOpen(true);
  };

  const handleClosePopUpUpdateModal = () => {
    setIsPopUpUpdateModalOpen(false);
    setSelectedPopUp(null);
  };

  const handleClosePopUpDeleteModal = () => {
    setIsPopUpDeleteModalOpen(false);
    setSelectedPopUp(null);
  };

  const handleStatusChange = async (id: number, checked: boolean) => {
    try {
      const updatedList = listPopUps.map(popup => ({
        ...popup,
        estado_popup: checked && popup.id === id,
      }));

      setListPopUps(updatedList);

      await Promise.all(
        updatedList.map(popup =>
          updatePopUps(popup.id, { estado_popup: popup.estado_popup })
        )
      );

    } catch (error) {
      console.error('Error al actualizar el estado del anuncio:', error);
    }
  };

  const handleAdd = async (newImage: File) => {
    const formData = new FormData();
    formData.append('imagen', newImage);

    setIsLoading(true); // Comienza la carga antes de la solicitud

    try {
      await createPopUps(formData);
      fetchPopUps(); // Refresh the list
      setAddModalIsOpen(false);
    } catch (error) {
      toast.error('Error al agregar el anuncio');
      setAddModalIsOpen(false);
    } finally {
      setIsLoading(false); // Termina la carga después de la solicitud (tanto si es exitosa como si falla)
    }
  };

  useEffect(() => {
    fetchPopUps();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0">
        <div className="flex flex-row">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-700 hover:text-gray-900 p-2"
          >
            <FaArrowCircleLeft className="mr-2" size={"30px"} />
          </button>
          <h4 className="text-3xl text-[#3A3A3A] font-nunito-sans font-bold my-auto">Anuncios importantes</h4>
        </div>
      </div>
      <div className="text-default font-nunito font-bold my-5">
        <span>Bienvenido al panel de administración de anuncios, en este apartado se pueden crear anuncios importantes (máximo 5) que se quieran mostrar en la página web.</span>
      </div>
      <div className="flex flex-wrap justify-center md:justify-start gap-3">
        {listPopUps.map((popup, index) => (
          <Image
            key={index}
            id={popup.id}
            imagen={`${import.meta.env.VITE_API_URL_ALTER}${popup.imagen}`}
            estado_popup={popup.estado_popup}
            popup={popup}
            onStatusChange={handleStatusChange}
            onEdit={() => handleUpdatePopUp(popup)}
            onDelete={() => handleDeletePopUp(popup)}
          />
        ))}
        {listPopUps.length < 5 &&
          <button
            onClick={() => setAddModalIsOpen(true)}
            className="flex w-full sm:w-1/2 md:w-1/4 lg:w-1/6 h-48 bg-light items-center border-solid border-2 shadow-custom border-[#2A8B3D] rounded-xl"
          >
            <div className="text-center text-default mx-auto my-auto">
              <IoAdd className="mx-auto mb-3" size={45} />
              <span className="text-2xl font-nunito font-extrabold">Nuevo anuncio</span>
            </div>
          </button>
        }
      </div>

      <AddPopUpModal
        isOpen={addModalIsOpen}
        isLoading={isLoading}
        onClose={() => setAddModalIsOpen(false)}
        onSave={handleAdd}
      />

      {selectedPopUp && (
        <EliminarPopUp
          isOpen={isPopUpDeleteModalOpen}
          onClose={handleClosePopUpDeleteModal}
          onPopUpDeleted={(success: boolean) => handlePopUpSuccess(success, "Anuncio eliminado con éxito", "Algo ha ocurrido al eliminar el anuncio")}
          popup={selectedPopUp}
        />
      )}

      {selectedPopUp && (
        <EditarPopUps
          isOpen={isPopUpUpdateModalOpen}
          onClose={handleClosePopUpUpdateModal}
          onPopUpUpdated={(success: boolean) => handlePopUpSuccess(success, "Anuncio actualizado con éxito", "Algo ha ocurrido al actualizar el anuncio")}
          popup={selectedPopUp}
        />
      )}

    </div>
  );
}

export default PopUpsMain;
