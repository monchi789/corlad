import map from '../../../assets/map-pin.svg'
import phone from '../../../assets/phone.svg'
import mail from '../../../assets/mail.svg'
import background from "../../../assets/machupicchu.jpg"

export function Contacto() {
  return (
    <div className="w-full">
      <h3 className="font-extrabold text-center text-4xl text-[#a67102] mb-12">CONTÁCTANOS</h3>
      <div className="mx-auto py-24 bg-cover bg-center" style={{ backgroundImage: `url(${background})` }}>
        <div className="bg-[#03853D] p-8 rounded-3xl flex max-w-5xl mx-auto relative">
          <div className="bg-[#00330A] text-[#a67102] p-5 rounded-2xl w-2/5 absolute -left-24 top-4 bottom-4 shadow-lg z-10 my-10">
            <div className="py-5 ms-8">
              <h3 className="text-center text-2xl font-bold mb-6">Contacto</h3>
              <div className="space-y-8">
                <div className="flex flex-row space-x-5 items-center">
                  <img src={map} alt="icon_map" className="w-8 h-8" />
                  <div className="space-y-1">
                    <p className="font-semibold">Ubicación</p>
                    <p className="text-white">Av. Garcilaso 806-3, Cusco 08002</p>
                  </div>
                </div>
                <div className="flex flex-row space-x-5 items-center">
                  <img src={mail} alt="icon_map" className="w-8 h-8" />
                  <div className="space-y-1">
                    <p className="font-semibold">Correo electrónico</p>
                    <p className="text-white">example@gmail.com</p>
                  </div>
                </div>
                <div className="flex flex-row space-x-5 items-center">
                  <img src={phone} alt="icon_map" className="w-8 h-8" />
                  <div className="space-y-1">
                    <p className="font-semibold">Celulares</p>
                    <p className="text-white">+999887232</p>
                    <p className="text-white">+987674534</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-2/6 me-10"></div>

          <div className="w-3/5 pl-8 my-5">
            <form className="space-y-4 me-10">
              <div>
                <label htmlFor="nombre" className="block text-white mb-1">Nombre</label>
                <input type="text" id="nombre" name="nombre" className="w-full p-2 rounded" />
              </div>
              <div>
                <label htmlFor="correo" className="block text-white mb-1">Correo electrónico</label>
                <input type="email" id="correo" name="correo" className="w-full p-2 rounded" />
              </div>
              <div>
                <label htmlFor="celular" className="block text-white mb-1">Número de celular</label>
                <input type="tel" id="celular" name="celular" className="w-full p-2 rounded" />
              </div>
              <div>
                <label htmlFor="mensaje" className="block text-white mb-1">Mensaje</label>
                <textarea id="mensaje" name="mensaje" rows={4} className="w-full p-2 rounded resize-none"></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className="bg-[#00330A] text-white px-10 py-1 rounded hover:bg-green-800">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contacto
