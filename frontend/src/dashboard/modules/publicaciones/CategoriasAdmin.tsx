import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { PersonAdd } from "@mui/icons-material";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { SessionHeader } from "../../shared/SessionHeader";
import { Sidebar } from "../../shared/Sidebar";
import { deleteCategoria, getAllCategoriasAdmin } from "../../../api/categoria.api";
import { Categoria } from "../../../interfaces/model/Categoria";
import { AgregarCategoria } from "./AgregarCategoria";
import { ActualizarCategoria } from "./ActualizarCategoria";

export function CategoriasAdmin() {
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
    <div className="flex flex-row w-full bg-white">
      <Sidebar />
      <div className="w-full xl:w-4/5 m-3 p-3">
        <SessionHeader />
        <div className="mt-10 space-y-5">
          <Grid container spacing={2} justifyContent="space-between" alignItems="center">
            <Grid item>
              <h4 className="text-3xl text-[#3A3A3A] font-nunito-sans font-bold">Categorías</h4>
            </Grid>
            <Grid item>
              <TextField
                label="Buscar Categoría"
                variant="outlined"
                value={searchTermCategoria}
                onChange={handleSearchChangeCategoria}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#007336',
                  color: 'white',
                  '&:hover': { backgroundColor: '#00330A' },
                }}
                startIcon={<PersonAdd />}
                onClick={handleAddCategoria}
              >
                <span className="font-nunito-sans font-extrabold">Agregar Categoría</span>
              </Button>
            </Grid>
          </Grid>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-6">
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
    </div>
  );
}
