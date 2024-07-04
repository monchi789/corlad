import { Footer } from "../../shared/components/Footer";
import { Header } from "../../shared/components/Header";
import noticia_example from "../../assets/corlad_banner.jpg"
import { Divider } from 'primereact/divider';

export function Noticias() {
  return (
    <>
      <Header />
      <div className="container flex flex-col my-48 mx-auto">
        <h1 className="text-4xl text-[#a67102] font-extrabold font-nunito text-center mb-24">NOTICIAS</h1>
        <div className="flex flex-row mx-auto justify-center">
          <div className="w-1/6 mx-10">
            <p className="font-nunito font-extrabold text-2xl text-[#a67102]">Categorías</p>
          </div>
          <div className="w-4/6 mx-5 space-y-10 mb-24">
            <div className="flex flex-row rounded-3xl">
              <img className="w-1/3 object-cover" src={noticia_example} alt="" />
              <div className="flex flex-col mx-12 space-y-3">
                <h3 className="text-[#a67102] text-3xl">EPG - Escuela de Posgrado  - CORLAD CUSCO</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et orci sagittis leo faucibus faucibus a non nisi.
                  Cras placerat finibus risus. Quisque at sapien vel nisl feugiat sollicitudin. Vestibulum nisi turpis, commodo in scelerisque nec,
                  volutpat ut elit. Quisque ac elementum tellus. Ut vitae ex eget tellus varius gravida. Nulla id bibendum turpis, lacinia eleifend est.
                  Ut eget lorem quis lectus porttitor congue sit amet vitae odio. Ut tortor sapien, tincidunt et orci in, molestie semper ipsum.
                  Donec est eros, tempus ut lorem sed, interdum suscipit neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                  Proin ultricies tellus eget dolor pretium tincidunt. Donec et mattis enim.
                </p>
                <p className="text-[#00330A] font-semibold">Leer más » </p>
              </div>
            </div>
            <Divider className="border border-solid"/>
            <div className="flex flex-row rounded-3xl">
              <img className="w-1/3 object-cover" src={noticia_example} alt="" />
              <div className="flex flex-col mx-12 space-y-3">
                <h3 className="text-[#a67102] text-3xl">EPG - Escuela de Posgrado  - CORLAD CUSCO</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et orci sagittis leo faucibus faucibus a non nisi.
                  Cras placerat finibus risus. Quisque at sapien vel nisl feugiat sollicitudin. Vestibulum nisi turpis, commodo in scelerisque nec,
                  volutpat ut elit. Quisque ac elementum tellus. Ut vitae ex eget tellus varius gravida. Nulla id bibendum turpis, lacinia eleifend est.
                  Ut eget lorem quis lectus porttitor congue sit amet vitae odio. Ut tortor sapien, tincidunt et orci in, molestie semper ipsum.
                  Donec est eros, tempus ut lorem sed, interdum suscipit neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                  Proin ultricies tellus eget dolor pretium tincidunt. Donec et mattis enim.
                </p>
                <p className="text-[#00330A] font-semibold">Leer más » </p>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
