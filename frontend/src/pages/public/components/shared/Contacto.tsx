import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import map from '../../../../assets/icons/map-pin.svg'
import phone from '../../../../assets/icons/phone.svg'
import mail from '../../../../assets/icons/mail.svg'
import { ContactoData } from '../../../../interfaces/Contacto';
import { sendEmail } from '../../../../api/contacto.api';

export function Contacto() {
  const [formData, setFormData] = useState<ContactoData>({ nombre: '', correo: '', celular: '', mensaje: '' });
  const [status, setStatus] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormData({ nombre: '', correo: '', celular: '', mensaje: '' });

    try {
      toast.promise(
        sendEmail(formData),
        {
          loading: 'Enviando...',
          success: 'Enviado con éxito!',
          error: 'Error al enviar.'
        }
      ).then(() => {
        // Limpiar el formulario después del envío
        setIsSubmitting(false);
        setFormData({ nombre: '', correo: '', celular: '', mensaje: '' });
      }).catch((error) => {
        console.error('Error al enviar el correo:', error);
      });
    } catch (error) {
      setStatus('Error al enviar el correo');
    }
  };

  return (
    <div className="flex flex-col relative xl:flex-row bg-[#03853D] max-w-5xl md:mx-10 xl:mx-auto p-8 md:px-12 font-nunito rounded-3xl">
      <div className="bg-[#00330A] text-[#F5D48F] p-5 rounded-2xl xl:w-2/5 xl:absolute -left-24 top-4 bottom-4 shadow-lg z-10 my-5 xl:my-10">
        <div className="py-5 md:ms-8">
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
                <p className="text-white">cuscocorlad@gmail.com</p>
              </div>
            </div>
            <div className="flex flex-row space-x-5 items-center">
              <img src={phone} alt="icon_map" className="w-8 h-8" />
              <div className="space-y-1">
                <p className="font-semibold">Celulares</p>
                <p className="text-white">+51940033003</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:w-2/6 me-10"></div>

      <div className="lg:w-3/5 my-5">
        <form className="space-y-4 md:mx-10" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombre" className="block text-white mb-1">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full p-2 rounded focus:outline-green-800"
              required
            />
          </div>
          <div>
            <label htmlFor="correo" className="block text-white mb-1">Correo electrónico</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className="w-full focus:outline-green-800 rounded p-2 "
              required
            />
          </div>
          <div>
            <label htmlFor="celular" className="block text-white mb-1">Número de celular</label>
            <input
              type="tel"
              id="celular"
              name="celular"
              value={formData.celular}
              onChange={handleChange}
              className="w-full focus:outline-green-800 rounded p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="mensaje" className="block text-white mb-1">Mensaje</label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows={4}
              value={formData.mensaje}
              onChange={handleChange}
              className="w-full resize-none focus:outline-green-800 rounded p-2"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#00330A] text-white px-10 py-1 rounded hover:bg-green-800 transition duration-300"
              disabled={isSubmitting}
            >
              Enviar
            </button>
            <Toaster
              position="bottom-center"
              reverseOrder={false} />
          </div>
          {status && <p className="text-center text-white">{status}</p>}
        </form>
      </div>
    </div>
  )
}

export default Contacto
