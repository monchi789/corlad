import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { School, Payment, Publish, OpenInBrowser, Slideshow, AccountBalance } from "@mui/icons-material";

const AccesoRapido = () => {
  const { hasGroup } = useAuth();

  const buttons = [
    { label: "Nuevo colegiado", icon: School, link: "/admin/colegiado/nuevo-colegiado", group: ["secretaria", "admin"] },
    { label: "Nuevo capítulo", icon: AccountBalance, link: "/admin/capitulos", group: ["secretaria", "admin"] },
    { label: "Nuevo pago", icon: Payment, link: "/admin/pagos/nuevo-pago", group: ["secretaria", "admin"] },
    { label: "Nueva publicación", icon: Publish, link: "/admin/publicaciones/nueva-publicacion", group: ["publicador", "admin"] },
    { label: "Administrar anuncio", icon: OpenInBrowser, link: "/admin/anuncios", group: ["publicador", "admin"] },
    { label: "Administrar galería", icon: Slideshow, link: "/admin/galeria", group: ["publicador", "admin"] },
  ];

  const filteredButtons = buttons.filter(button => button.group.some(group => hasGroup(group)));

  return (
    <div className="w-full">
      <h4 className="text-2xl text-[#3A3A3A] font-nunito font-bold my-5">Acceso rápido</h4>
      <div className="grid grid-cols-3 gap-10">
        {filteredButtons.map((button, index) => (
          <Link key={index} to={button.link} aria-label={button.label}>
            <button className="lg:w-[300px] bg-[#ECF6E8] rounded-lg hover:shadow-none shadow-[#00330A] shadow-md transition duration-300 flex items-center space-x-3 p-5">
              <button.icon className="text-[#3A3A3A]" />
              <span className="text-[#3A3A3A] font-nunito font-bold">{button.label}</span>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AccesoRapido;
