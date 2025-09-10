import { ISanpham } from "./cautrucdata";
import { useDispatch } from "react-redux";
import { themSP } from "@/app/lib/cartslice";
import { useState } from "react";

export default function ShowDetailSP( { sp }:{sp:ISanpham}) {
 const disPatch = useDispatch();
 const [message, setMessage] = useState("");
  const handleAddToCart = () => {
    disPatch(themSP(sp));
    setMessage(`Đã thêm "${sp.ten_sp}" vào giỏ hàng`);
    setTimeout(() => setMessage(""), 3000); // 3 giây sau ẩn
  };
    return (
        <>
          <div className=" rounded-xl mt-2 ">
        <a href=""> <img className=" h-[480px] w-[100%]  " src={sp.hinh} alt=""/></a>
      </div>
      <div className="mt-3">
        <p className="text-3xl text-[#003F62] font-medium font-sans mb-[11px]">{sp.ten_sp}</p><span
          className="text-3xl font-semibold text-[#4A4A4A] font-sans pb-[20px]">{Number(sp.gia).toLocaleString("vi")} VND</span><br/>
        <i className="fa-thin fa-star text-[#D4A80A]"></i><i className="fa-thin fa-star text-[#D4A80A] mx-2 my-4"></i><i
          className="fa-thin fa-star text-[#D4A80A] mr-2"></i><i className="fa-thin fa-star text-[#D4A80A] mr-2"></i><i
          className="fa-thin fa-star text-[#D4A80A] mr-2"></i>
        <h1 className="text-[#232323] text-lg font-medium font-sans my-2 ">Availability: <span
            className="text-[#30BD57] font-medium text-lg font-sans"><i className="fa-thin fa-check mx-2"></i>instock</span>
        </h1>
        <h2 className="text-base text-[#5D5D5D] font-sm font-sans ">Hurry up! only 34 product left in stock!</h2>
        <hr className="mt-5 mb-7"/>
        {/* <h3 className="mb-7">Color</h3>
        <h4 className="mb-7">Size</h4>
        <h5 className="mb-7">Quantity</h5><br/> */}
        <button onClick={handleAddToCart} className="font-semibold font-sans text-xl text-white bg-[#EDA415] rounded-full px-[60px] py-4" >Add to
          cart</button>
        <a className="font-semibold font-sans text-xl text-white bg-[#EDA415] rounded-full px-[60px] py-4 ml-3" href="">Buy it now</a>
             <hr className=" mt-[50px]"/>
      </div>
        {message && (
        <div className="fixed bottom-10 right-10 bg-green-500 text-white text-lg font-semibold px-6 py-3 rounded-xl shadow-lg transition-opacity duration-500">
          {message}
        </div>
      )}
        </>
    )
}