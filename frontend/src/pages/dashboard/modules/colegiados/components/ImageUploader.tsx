import { RiImageAddFill } from "react-icons/ri";

interface ImageUploaderProps {
  imageUrl: string;
  fileName: string;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFileButtonClick: () => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ imageUrl, fileName, onFileChange, onFileButtonClick }) => (
  <div className="flex flex-col w-full xl:space-x-0 px-5">
    <img className="w-1/2 xl:w-5/6 mt-5 mx-auto" src={imageUrl} alt="Perfil colegiado" />
    <button
      type="button"
      className="flex flex-row justify-between bg-corlad hover:bg-hover-corlad text-start text-white font-nunito font-bold shadow-custom-input rounded-md transition duration-300 py-2 px-3 mt-10"
      onClick={onFileButtonClick}
    >
      <span>Seleccionar archivo</span>
      <RiImageAddFill size={"25px"} />
    </button>
    <input type="file" style={{ display: 'none' }} onChange={onFileChange} />
    <span className="mt-2">{fileName || "Ningún archivo seleccionado"}</span>
  </div>
);

export default ImageUploader;
