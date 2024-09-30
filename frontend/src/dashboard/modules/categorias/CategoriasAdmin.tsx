import React, { useState, useEffect } from "react";
import { FaArrowCircleLeft, FaEdit, FaTrashAlt } from "react-icons/fa";
import { deleteCategoria, getAllCategoriasAdmin } from "../../../api/categoria.api";
import { Categoria } from "../../../interfaces/model/Categoria";
import { AgregarCategoria } from "./AgregarCategoria";
import { ActualizarCategoria } from "./ActualizarCategoria";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Divider } from "primereact/divider";
import { useNavigate } from "react-router-dom";

export default function CategoriasAdmin() {
  const navigate = useNavigate();

  const [categoriasList, setCategoriasList] = useState<Categoria[]>([]);
  const [isCategoriaModalOpen, setIsCategoriaModalOpen] = useState(false);
  const [isCategoriaEditModalOpen, setIsCategoriaEditModalOpen] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(null);
  const [searchTermCategoria, setSearchTermCategoria] = useState("");

  const cargarDatos = async () => {
    try {
      const categoriasRes = await getAllCategoriasAdmin();
      setCategoriasList(categoriasRes.data as Categoria[]);
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleAddCategoria = () => {
    setIsCategoriaModalOpen(true);
  };

  const handleEditCategoria = (categoria: Categoria) => {
    setSelectedCategoria(categoria);
    setIsCategoriaEditModalOpen(true);
  };

  const handleCloseCategoriaModal = () => {
    setIsCategoriaModalOpen(false);
  };

  const handleCloseCategoriaEditModal = () => {
    setIsCategoriaEditModalOpen(false);
    setSelectedCategoria(null);
  };

  const handleDeleteCategoria = async (id: number) => {
    try {
      await deleteCategoria(id);
      cargarDatos();
      console.log('Categoría eliminada con éxito');
    } catch (error) {
      console.error('Error al eliminar la categoría:', error);
    }
  };

  const handleSearchChangeCategoria = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTermCategoria(event.target.value);
  };

  const filteredCategorias = categoriasList.filter((categoria) =>
    categoria.nombre_categoria.toLowerCase().includes(searchTermCategoria.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col my-5 space-y-5">
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
              className="flex flex-row bg-[#007336] text-lg text-white font-nunito font-semibold hover:bg-[#00330A] shadow-black shadow-md rounded-lg transition duration-300 hover:scale-110 ease-in-out delay-150 space-x-3 my-auto px-4 py-1" onClick={handleAddCategoria}
            >
              <IoMdAddCircleOutline className="my-auto" size={"25px"} />
              <span className="my-auto">Agregar Categoría</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row space-x-0 md:space-x-5 space-y-5 md:space-y-0">
          <div className="flex flex-col w-full md:w-1/3 h-full">
            <span className="text-[#3A3A3A] font-semibold font-nunito">Usa el siguiente campo para buscar una categoría </span>
            <input
              type="text"
              placeholder="Buscar categoría"
              value={searchTermCategoria}
              onChange={handleSearchChangeCategoria}
              className="bg-[#ECF6E8] text-[#3A3A3A] font-nunito font-semibold rounded-md shadow-custom-input focus:outline-none px-4 py-3 mt-2"
              required
            />
          </div>

          <Divider layout="vertical" className="border border-solid" />


          <div className="w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
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
                  <div className="flex items-center">
                    <button className="text-xl text-[#00330A] mx-2" onClick={() => handleEditCategoria(categoria)}>
                      <FaEdit />
                    </button>
                    <button className="text-xl text-[#00330A] mx-2" onClick={() => handleDeleteCategoria(categoria.id)}>
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay categorías disponibles.</p>
            )}
          </div>
        </div>
      </div>
      <AgregarCategoria
        isOpen={isCategoriaModalOpen}
        onClose={handleCloseCategoriaModal}
        onCategoryAdded={cargarDatos}
      />
      {selectedCategoria && (
        <ActualizarCategoria
          isOpen={isCategoriaEditModalOpen}
          onClose={handleCloseCategoriaEditModal}
          onCategoryUpdated={cargarDatos}
          categoria={selectedCategoria}
        />
      )}
    </>
  );
}
