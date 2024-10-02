import React, { useState, useEffect } from "react";
import { FaArrowCircleLeft, FaEdit, FaTrashAlt } from "react-icons/fa";
import { getAllCategoriasAdmin } from "../../../api/categoria.api";
import { Categoria, defaultCategoria } from "../../../interfaces/model/Categoria";
import { AgregarCategoria } from "./AgregarCategoria";
import { EditarCategoria } from "./EditarCategoria";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Divider } from "primereact/divider";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../../components/ui/Spinner"; // Asegúrate de tener tu Spinner importado
import { EliminarCategoria } from "./EliminarCategoria";

export default function CategoriasAdmin() {
  const navigate = useNavigate();

  const [categoriasList, setCategoriasList] = useState<Categoria[]>([]);

  const [isCategoriaModalOpen, setIsCategoriaModalOpen] = useState(false);
  const [isCategoriaEditModalOpen, setIsCategoriaEditModalOpen] = useState(false);
  const [isCategoriaDeleteModalOpen, setIsCategoriaDeleteModalOpen] = useState(false);

  const [selectedCategoria, setSelectedCategoria] = useState<Categoria>(defaultCategoria);

  const [searchTermCategoria, setSearchTermCategoria] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar la carga de datos

  const fetchCategorias = async () => {
    setIsLoading(true);
    try {
      const res = await getAllCategoriasAdmin();
      setCategoriasList(res.data as Categoria[]);
    } catch (error) {
      toast.error('Error al cargar las categorias');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategorySuccess = (success: boolean, godMessage: string, badMessage: string) => {
    if (success) {
      fetchCategorias();
      toast.success(godMessage);
    } else {
      toast.error(badMessage);
    }
  };

  // Funciones para abrir los modals
  const handleAddCategoria = () => setIsCategoriaModalOpen(true);

  const handleEditCategoria = (categoria: Categoria) => {
    setSelectedCategoria(categoria);
    setIsCategoriaEditModalOpen(true);
  };

  const handleDeleteCategoria = async (categoria: Categoria) => {
    setSelectedCategoria(categoria);
    setIsCategoriaDeleteModalOpen(true);
  };

  // Funciones para cerrar los modals
  const handleCloseCategoriaModal = () => setIsCategoriaModalOpen(false);

  const handleCloseCategoriaEditModal = () => {
    setIsCategoriaEditModalOpen(false);
    setSelectedCategoria(defaultCategoria);
  };

  const handleCloseCategoriaDeleteModal = () => {
    setIsCategoriaDeleteModalOpen(false);
    setSelectedCategoria(defaultCategoria);
  };

  const handleSearchChangeCategoria = (event: React.ChangeEvent<HTMLInputElement>) => setSearchTermCategoria(event.target.value);


  const filteredCategorias = categoriasList.filter((categoria) =>
    categoria.nombre_categoria.toLowerCase().includes(searchTermCategoria.toLowerCase())
  );

  useEffect(() => {
    fetchCategorias();
  }, []);

  return (
    <>
      <div className="flex flex-col space-y-5 my-5">
        <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0">
          <div className="flex flex-row">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-700 hover:text-gray-900 p-2"
            >
              <FaArrowCircleLeft className="mr-2" size={"30px"} />
            </button>
            <h4 className="text-3xl text-[#3A3A3A] font-nunito-sans font-bold my-auto">Categorías</h4>
          </div>
          <div className="flex flex-row space-x-3 my-auto">
            <button
              className="flex flex-row w-full justify-center bg-corlad text-lg text-white font-nunito font-semibold hover:bg-hover-corlad shadow-black shadow-md rounded-lg transition duration-300 hover:scale-110 ease-in-out delay-50 space-x-3 my-auto px-4 py-1"
              onClick={handleAddCategoria}
            >
              <IoMdAddCircleOutline className="my-auto" size={"25px"} />
              <span className="my-auto">Agregar Categoría</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col space-y-10">
          <div className="flex flex-col w-full md:w-1/2 text-default pe-5">
            <span className=" font-semibold font-nunito">Usa el siguiente campo para buscar una categoría</span>
            <input
              type="text"
              placeholder="Buscar categoría"
              value={searchTermCategoria}
              onChange={handleSearchChangeCategoria}
              className="bg-custom-light-turquoise font-nunito font-semibold rounded-md shadow-md focus:shadow-custom-input focus:outline-none mt-2 px-4 py-3"
              required
            />
          </div>

          <Divider layout="horizontal" className="border border-solid" />

          {/* Mostrar Spinner mientras se cargan los datos */}
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Spinner size="w-12 h-12" /> {/* Tu componente Spinner */}
            </div>
          ) : (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[800px] overflow-y-auto pb-5 pt-1 pr-5">
              {filteredCategorias.length > 0 ? (
                filteredCategorias.map((categoria, index) => (
                  <div
                    key={index}
                    className="relative bg-[#ECF6E8] rounded-lg shadow-lg p-5 flex justify-between items-center"
                    style={{ boxShadow: "0 4px 6px rgba(0, 51, 10, 0.1)" }}
                  >
                    <div>
                      <h5 className="text-xl font-bold font-nunito-sans text-[#00330A]">
                        {categoria.nombre_categoria}
                      </h5>
                    </div>
                    <div className="flex items-center text-default-green">
                      <button className="text-xl mx-2" onClick={() => handleEditCategoria(categoria)}>
                        <FaEdit className="hover:text-corlad transition duration-300" />
                      </button>
                      <button className="text-xl mx-2" onClick={() => handleDeleteCategoria(categoria)}>
                        <FaTrashAlt className="hover:text-corlad transition duration-300" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-lg font-semibold mx-auto">No se encontró ninguna categoría</p>
              )}
            </div>
          )}
        </div>
      </div>
      <AgregarCategoria
        isOpen={isCategoriaModalOpen}
        onClose={handleCloseCategoriaModal}
        onCategoryAdded={(success: boolean) => handleCategorySuccess(success, "Categoría guardada con éxito", "Algo ha ocurrido al guardar la categoría")}
      />
      {selectedCategoria && (
        <EditarCategoria
          isOpen={isCategoriaEditModalOpen}
          onClose={handleCloseCategoriaEditModal}
          onCategoryUpdated={(success: boolean) => handleCategorySuccess(success, "Categoría actualizada con éxito", "Algo ha ocurrido al actualizar la categoría")}
          categoria={selectedCategoria as Categoria}
        />
      )}
      {selectedCategoria && (
        <EliminarCategoria
          isOpen={isCategoriaDeleteModalOpen}
          onClose={handleCloseCategoriaDeleteModal}
          onCategoryDeleted={(success: boolean) => handleCategorySuccess(success, "Categoría eliminada con éxito", "Algo ha ocurrido al eliminar la categoría")}
          categoria={selectedCategoria}
        />
      )}
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}
