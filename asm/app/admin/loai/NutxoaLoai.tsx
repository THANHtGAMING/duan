"use client";
import { useRouter } from "next/navigation";
export default function NutXoaLoai({id} :{id:number}) {
    const router =useRouter()
    const handleDelete = async () =>{
        if(!confirm('Muon xoa loai nay sao')) return;
        const res = await fetch(`/api/loai/${id}`, {method:"DELETE",});
        if(res.ok) router.refresh();
        else alert("Xoa that bai!")
    };
    return (
        <button onClick={handleDelete} className="text-red-500 mx-2"> Xoa</button>
    )
}