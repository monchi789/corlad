import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface FormHeaderProps {
  title: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row mb-5">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-700 hover:text-gray-900 transition duration-300 hover:scale-110 p-2"
      >
        <FaArrowCircleLeft className="mr-2" size={"25px"} />
      </button>
      <h4 className="text-2xl text-[#3A3A3A] font-nunito font-extrabold my-auto">{title}</h4>
    </div>
  )
};

export default FormHeader;
