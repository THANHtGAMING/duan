import Link from "next/link";
import { ISanpham } from "./cautrucdata";
import { useDispatch } from "react-redux";
import { themSP } from "../lib/cartslice";
import { useState } from "react";

export default function Show1SP(props: any) {
  const sp = props.sp as ISanpham;
  const disPatch = useDispatch();

  const [message, setMessage] = useState("");

  const handleAddToCart = () => {
    disPatch(themSP(sp));
    setMessage(`Đã thêm "${sp.ten_sp}" vào giỏ hàng`);
    setTimeout(() => setMessage(""), 3000); // 3 giây sau ẩn
  };

  return (
    <>
      <div className="w-1/4 px-[13px] h-[346px] my-5">
        <div className="border border-[#B6B6B6] rounded-2xl px-[14px] py-[22px] relative group overflow-hidden">
          <a href="">
            <img className="mx-auto" src={sp.hinh} alt="" />
          </a>
          <h1 className="text-xl font-semibold text-[#003F62] whitespace-nowrap">
            <Link href={`/sp/${sp.id}`}>{sp.ten_sp}</Link>
          </h1>
          <h2 className="text-base text-[#4A4A4A] font-semibold my-5">
            {Number(sp.gia).toLocaleString("vi")} VND
          </h2>
          <div className="flex flex-grow justify-between items-center gap-2 absolute bottom-[-100px] group-hover:bottom-3">
            <button
              onClick={handleAddToCart}
              className="px-7 py-2 bg-[#87BCD9] font-semibold rounded-xl cursor-pointer"
            >
              Add to cart <span><i className="fa-regular fa-cart-shopping"></i></span>
            </button>
            <button className="px-3 py-2 bg-[#87BCD9] border rounded-xl cursor-pointer">
              <Link href={`/sp/${sp.id}`}>
                <i className="fa-light fa-eye"></i>
              </Link>
            </button>
          </div>
          <div className="rating">
            <i className="fa-light fa-star mr-2 text-black"></i>
            <i className="fa-light fa-star mr-2 text-black"></i>
            <i className="fa-light fa-star mr-2 text-black"></i>
            <i className="fa-light fa-star mr-2 text-black"></i>
            <i className="fa-light fa-star mr-2 text-black"></i>
          </div>
          <div className="absolute right-4 top-5 px-2 py-1 bg-[#B3D4E5] rounded-full">
            <i className="fa-light fa-heart"></i>
          </div>
        </div>
      </div>

      {/* Toast thông báo */}
      {message && (
        <div className="fixed bottom-10 right-10 bg-green-500 text-white text-lg font-semibold px-6 py-3 rounded-xl shadow-lg transition-opacity duration-500">
          {message}
        </div>
      )}
    </>
  );
}
