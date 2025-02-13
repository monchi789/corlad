import { MdErrorOutline } from "react-icons/md"

const ErrorSpan = ({ mensaje }: { mensaje: string | null }) => {
  return (
    <div className="flex flex-row text-red-500 space-x-1 mt-2">
      <MdErrorOutline className="my-auto"  />
      <span className=" text-sm font-nunito">{mensaje}</span>
    </div>
  )
}

export default ErrorSpan
