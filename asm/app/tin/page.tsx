import Link from "next/link";
import { TinTucModel } from "@/app/components/database";
export default async function ListTin() {
    const tin_arr = await TinTucModel.findAll({
        where: { an_hien: 1 },
        order: [ ['ngay', 'DESC'], ['luot_xem', 'ASC'] ],
        offset: 0, limit: 6,
    })
    return (
        <>
            <div className="w-[1330px] mx-auto grid grid-cols-3 gap-2 mt-[20px]">
                {tin_arr.map((tin) =>
                   
                
                       
                        
                        <div key={tin.id}   className="border border-[#B66B6] rounded-2xl p-2 shadow-lg">
                            <h1   className="text-red-500 mb-[20px] uppercase font-sans font-semibold p-2"><Link href={`/tin/${tin.id}`}>{tin.tieu_de}</Link></h1>
                            <p className="text-[#3a3a3a] leading-relaxed text-base font-sans font-semibold p-2">{tin.mo_ta}</p>
                        </div>
                  
                        
                    

                )}

            </div>
        </>
    )
}