import { redirect } from "next/navigation";
import { TinTucModel } from "@/app/components/database";

export default async function chitiettin({params } : {params: {id:string}}) {
    const id = params.id
    const chitiettin = await TinTucModel.findByPk(id)
    if (chitiettin===null)   
redirect ('/')
 
   return(
    <>
    <div className="w-[1330px] mx-auto shadow-lg">
        <h1 className="bg-red-500 text-white p-3 rounded-xl my-3 mx-2 font-semibold font-sans text-xl">{chitiettin.tieu_de}</h1>
        <h2 className="text-[#3a3a3a] p-3 text-base font-sans font-semibold">{chitiettin.mo_ta}</h2>
        <hr className="my-3 text-[#3a3a3a]"></hr> 
        <p className="text-right text-[#3a3a3a] p-3 text-base font-sans font-semibold  ">
       Cập nhật: { new Date(chitiettin.ngay).toLocaleString("vi") }
       <span className="ml-2 text-[#3a3a3a] p-3 text-base font-sans font-semibold"> Lượt xem: {chitiettin?.luot_xem}</span>
        </p>
         <div className="p-3 text-[#3a3a3a] leading-relaxed text-base font-sans font-semibold" dangerouslySetInnerHTML={{ __html: chitiettin?.noi_dung ?? '' }} />
    </div>
    </>
   )
     
}