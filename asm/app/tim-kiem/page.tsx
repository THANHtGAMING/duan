
"use client"
import { useState , useEffect } from "react";
import { useParams } from "next/navigation";
import Show1SP from "@/app/components/show1sp";
import { ISanpham } from "../components/cautrucdata";
export default  function SearchPage( ) {
  const searchParams = useParams();
   const tu_khoa = searchParams.tu_khoa;
   const page = Number(searchParams.page) || 1; // dấu || là falsy(NaN, O , null , undefine) thì dùng 1 nếu page có giá trị khác thì dùng giá trị khác không thì dùng 1
   const [sp_arr , gansp_arr] = useState([] as ISanpham[])
   useEffect(() =>{
    fetch(`http://localhost:3000/api/timkiem/${tu_khoa}/${page}`)
    .then( res => res.json())
    .then (data => gansp_arr(data))
   }, [ tu_khoa])
   

    return (

      <>
       <div className="w-[1330px] mx-auto flex flex-row flex-wrap  items-center justify-between   ">
                   {sp_arr.map((sp:ISanpham) => <Show1SP key={sp.id} sp={sp}/> )}
               </div>
      </>
    )

}