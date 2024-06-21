import { Header } from "../../shared/components/Header";
import corlad_banner from "../../assets/corlad_banner.jpg"

export function Inicio() {
    return (
        <>
            <Header/>
            <div className="mx-auto max-w-full">
                <img className="mx-auto w-full h-auto" src={corlad_banner} alt="Slider principal" />
            </div>
            <div className="bg-cover bg-center h-64" style={{ backgroundImage: `../../assets/corlad_banner.jpg')` }}>
            <div className="container mx-auto flex items-center justify-center h-full">
                {/* Contenido opcional dentro del banner */}
                <h1 className="text-4xl text-white font-bold">Tu título aquí</h1>
            </div>
        </div>
        </>
    )
}