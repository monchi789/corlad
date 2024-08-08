import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SessionHeader } from "../../shared/SessionHeader";
import { Sidebar } from "../../shared/Sidebar";
import { Dropdown } from "primereact/dropdown";
import { Categoria } from "../../../interfaces/model/Categoria";
import { getAllCategoriasAdmin } from "../../../api/categoria.api";
import JoditEditor from 'jodit-react';
import imagen_default from "../../../assets/dashboard/default_image.jpg";
import { defaultPublicacion, Publicacion } from "../../../interfaces/model/Publicacion";
import { editPublicacion, getPublicacionesById } from "../../../api/publicacion.api";
import toast from "react-hot-toast";

export function EditarPublicacion() {
  const navigate = useNavigate();

  const { id } = useParams();
  const editor = useRef(null);
  const [content, setContent] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
  const [publicacion, setPublicacion] = useState<Publicacion>(defaultPublicacion);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setPublicacion(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCategoriaChange = (e: { value: number }) => {
    setSelectedOption(e.value);

    const selectedCategoria = categorias.find(cat => cat.id === e.value);
    
    if (selectedCategoria) {
      setPublicacion(prevState => ({
        ...prevState,
        id_categoria: selectedCategoria,
      }));
    }

  };

  const fetchPagoData = async () => {
    if (id) {
      try {
        const response = await getPublicacionesById(parseInt(id));
        const publicacion: Publicacion = response.data;

        setPublicacion(publicacion);
        setSelectedOption(publicacion.id_categoria.id); 
        setContent(publicacion.contenido)
        setImagePreview(`${import.meta.env.VITE_API_URL_ALTER}${publicacion.imagen_publicacion}`)

      } catch (error) {
        toast.error('Error al cargar los datos del pago');
      }
    }
  };

  const fetchCategoria = async () => {
    try {
      const res = await getAllCategoriasAdmin();
      setCategorias(res.data);
    } catch (error) {
      console.error('Error fetching categorias:', error);
    }
  };

  useEffect(() => {
    fetchCategoria();
    fetchPagoData();
  }, []);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setImagePreview(imagen_default);
    }
  }, [image]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      console.log('Document file selected:', event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedOption || !content) {
      console.error('Please fill in all the required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('titulo', publicacion.titulo);
    formData.append('contenido', content);
    formData.append('fecha_publicacion', publicacion.fecha_publicacion);

    if (image) {
      formData.append('imagen_publicacion', image);
    }
    
    if (publicacion.id_categoria.id) {
      formData.append('id_categoria_id', publicacion.id_categoria.id.toString());
    }

    const documentFile = event.currentTarget.documento?.files[0];
    if (documentFile) {
      formData.append('documento', documentFile);
    }

    await editPublicacion(parseInt(id as string),formData);

    navigate("/admin/publicaciones/")
  };

  const config = {
    height: 350,
    width: '100%',
    theme: 'light',
    placeholder: 'Empieza a publicar...',
    language: 'es'
  };


  const itemCategoria = (option: any) => {
    return (
      <div className="flex hover:bg-[#E6F3E6] text-[#00330a] items-center justify-between px-3 py-2">
        <span>{option.label}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-row w-full">
      <Sidebar />
      <div className="w-full xl:w-4/5 m-3 p-3">
        <SessionHeader />
        <div className="flex flex-col space-y-5 my-10">
          <div className="flex flex-row justify-between">
            <h4 className="text-3xl text-[#3A3A3A] font-nunito font-extrabold my-auto">Editar publicación</h4>
          </div>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex flex-row space-x-5">
            <div className="flex flex-col w-full bg-[#EAF1E8] rounded-lg space-y-2 p-5">
              <label htmlFor="titulo" className="text-lg text-[#00330A] font-nunito font-extrabold">Título</label>
              <textarea
                id="titulo"
                name="titulo"
                className="h-full bg-[#ECF6E8] border-2 border-[#5F4102] focus:outline-none shadow-custom-input resize-none rounded-lg p-3"
                value={publicacion.titulo}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-full bg-[#EAF1E8] rounded-lg space-y-5 p-5">
              <div className="flex flex-col space-y-2">
                <label htmlFor="categoria" className="text-lg text-[#00330A] font-nunito font-extrabold">Categoría</label>
                <Dropdown
                  id="categoria"
                  className="w-full text-[#5F4102] border-solid border-2 border-[#5F4102] rounded-lg items-center shadow-custom-input font-bold py-1 px-3"
                  panelClassName="bg-[#FAFDFA] border border-gray-200 rounded-md shadow-lg"
                  value={selectedOption}
                  onChange={handleCategoriaChange}
                  options={categorias.map(element => ({
                    label: element.nombre_categoria,
                    value: element.id
                  }))}
                  optionLabel="label"
                  placeholder="Elegir categoría..."
                  itemTemplate={itemCategoria}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="fecha_publicacion" className="text-lg text-[#00330A] font-nunito font-extrabold">Fecha</label>
                <input
                  id="fecha_publicacion"
                  name="fecha_publicacion"
                  type="date"
                  className="text-amber-900 bg-transparent font-nunito font-extrabold border-2 border-[#5F4102] shadow-custom-input rounded-lg py-1 px-3"
                  value={publicacion.fecha_publicacion}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row space-x-5 mt-5">
            <div className="flex flex-col w-3/4 bg-[#EAF1E8] rounded-lg space-y-2 p-5">
              <span className="text-lg text-[#00330A] font-nunito font-extrabold">Contenido</span>
              <div className="no-tailwind-base">
                <JoditEditor
                  ref={editor}
                  value={content}
                  config={config}
                  onBlur={newContent => setContent(newContent)}
                />
              </div>
            </div>
            <div className="flex flex-col w-1/4 space-y-5">
              <div className="flex flex-col w-full bg-[#EAF1E8] rounded-lg p-5">
                <div className="flex flex-col space-y-2">
                  <img className="w-full h-40 object-cover rounded-lg" src={imagePreview as string} alt="Imagen para subir la publicación" />
                  <span className="text-lg text-[#00330A] font-nunito font-extrabold">Modificar</span>
                  <input type="file" onChange={handleImageChange} />
                </div>
              </div>
              <div className="flex flex-col w-full bg-[#EAF1E8] rounded-lg p-5">
                <div className="flex flex-col space-y-2">
                  <span className="text-lg text-[#00330A] font-nunito font-extrabold">Documento adjunto</span>
                  <span>{publicacion.documento}</span>
                  <input type="file" onChange={handleFileChange} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full justify-end text-lg font-nunito font-extrabold mt-5 space-x-5">
            <button type="submit" className="w-2/6 text-white bg-[#007336] rounded-2xl p-2">Crear nueva publicación</button>
            <button type="button" className="w-1/6 rounded-2xl text-[#5F4102] border border-[#5F4102] p-2">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  )
}