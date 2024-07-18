import persona from "../../assets/web/person_perfil.webp"

export function SessionHeader() {
  return (
    <div className="flex flex-row w-full justify-end bg-[#00330A] space-x-5 rounded-3xl px-10 py-5">
      <img className="size-10" src={persona} alt="Vacio persona" />
      <p className="text-[#ECF6E8] font-nunito font-bold my-auto">Roberto</p>
    </div>
  )
}
