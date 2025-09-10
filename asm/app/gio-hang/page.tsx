"use client"
import { useRef  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../lib/store";
import { ICart } from "../components/cautrucdata";
import { suaSL, xoaGH, xoaSP } from "../lib/cartslice";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation"
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
export default function Giohang() {
    const cart_arr: ICart[] = useSelector((state: RootState) => state.cart.listSP) // hàm useSelector trong redux dùng để lấy dữ liệu từ store
    const disPatch = useDispatch();
    const tongTien = cart_arr.reduce((tong, sp) => tong + sp.so_luong * sp.gia, 0);
    const hotenRef = useRef<HTMLInputElement>(null)
    const sdtRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const ghichuRef = useRef<HTMLTextAreaElement>(null)
    const thongbaoRef = useRef<HTMLDivElement>(null) 
   const router = useRouter();
    const saveCart = () => {
       const user = sessionStorage.getItem("user");
       console.log(user);
       if (!user ){
      thongbaoRef.current!.innerHTML= "Bạn chưa đăng nhập"
      setTimeout (() =>{
         thongbaoRef.current!.innerHTML= ""
          router.push(`/dangnhap?redirect=${encodeURIComponent(window.location.pathname)}`);
      },3000)
          return;
       }
       

        const hoten = hotenRef.current?.value // dấu chấm hỏi hoten === undefined   // và không bị lỗi
        const sdt = sdtRef.current?.value
        const email = emailRef.current?.value
         
        if (cart_arr.length === 0) {
            window.alert("Ban chưa chọn sản phẩm nào . Vui lòng chọn sản phẩm rồi thanh toán ")
            redirect("/");

        };
        if (hoten?.trim() == '') {
            thongbaoRef.current!.innerHTML = "Chưa nhập họ tên"
            hotenRef.current!.style.backgroundColor = "yellow";
            hotenRef.current!.focus(); return;
        } else
            hotenRef.current!.style.backgroundColor = "white";
        if (sdt?.trim() == '') {
            thongbaoRef.current!.innerHTML = "Chưa nhập sdt"
            sdtRef.current!.style.backgroundColor = "yellow";
            sdtRef.current!.focus(); return;
        } else
            sdtRef.current!.style.backgroundColor = "white";
        if (email?.trim() == '') {
            thongbaoRef.current!.innerHTML = "Chưa nhập email"
            emailRef.current!.style.backgroundColor = "yellow";
            emailRef.current!.focus(); return;
        } else
            emailRef.current!.style.backgroundColor = "white";




        const opt = {
            method: "post",
            body: JSON.stringify({ ho_ten: hoten, sdt: sdt, email: email }),
            headers: { 'Content-type': 'application/json' }
        }
        fetch("http://localhost:3000/api/luudonhang", opt)
            .then(res => res.json())
            .then(data => {
                thongbaoRef.current!.innerHTML = data.thong_bao;
                if (data.dh!=undefined) {
                    const id_dh = data.dh.id
                       luuchitietdonhang (id_dh, cart_arr)
                  
                    hotenRef.current!.value = "";
                    sdtRef.current!.value = "";
                    emailRef.current!.value = "";
                    ghichuRef.current!.value = "";
                    thongbaoRef.current!.innerHTML = "";
                    disPatch(xoaGH());
                }
            })
    }
//luu chi tiet don hang

const luuchitietdonhang = async (id_dh: number, cart: ICart[]) => {
  const url = `http://localhost:3000/api/luugiohang`;
  const promises = cart.map(sp => {
    const t = { id_dh: id_dh, id_sp: sp.id, so_luong: sp.so_luong, ten_sp: sp.ten_sp, gia: sp.gia, hinh: sp.hinh };
    const opt = { 
      method: "POST",  
      body: JSON.stringify(t), 
      headers: { 'Content-Type': 'application/json' } 
    };
    return fetch(url, opt).then(res => res.json())
      .catch(err => console.log('Lỗi lưu sản phẩm', sp, err));
  });

  await Promise.all(promises);

  // Hiện thông báo thành công
  thongbaoRef.current!.innerHTML = "Thanh toán thành công 🎉";
  
  // Đợi 2 giây rồi chuyển trang
  setTimeout(() => {
    router.push(`/gio-hang/hoan-tat/${id_dh}`);
  }, 2000);
};



    return (
        <>

        <Header></Header>
          <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 py-10 px-4">
  {/* Left: Cart Items */}
  <div className="lg:col-span-2 space-y-5">
    <div className="bg-blue-100 p-4 rounded-lg flex justify-between items-center text-gray-800 font-semibold text-lg">
      <span className="w-[230px]">Sản phẩm</span>
      <span className="w-[100px] text-center">Gía</span>
      <span className="w-[100px] text-center">Số lượng</span>
      <span className="w-[120px] text-center">Tổng</span>
    </div>

    {cart_arr.map((sp: ICart, index: number) => (
      <div key={index} className="bg-white shadow-sm p-4 rounded-lg flex justify-between items-center">
        <div className="flex items-center gap-4 w-[230px]">
          <img src={sp.hinh} alt={sp.ten_sp} className="w-[60px] h-[60px] object-cover rounded-md" />
          <span className="text-base font-medium text-blue-800">{sp.ten_sp}</span>
        </div>

        <div className="w-[100px] text-center text-lg font-semibold text-gray-700">
          {Number(sp.gia).toLocaleString("vi")} VNĐ
        </div>

        <div className="w-[100px] flex items-center justify-center gap-1">
          <button
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded text-lg text-black"
            onClick={() => sp.so_luong > 1 && disPatch(suaSL([sp.id, sp.so_luong - 1]))}
          >−</button>
          <span className="px-2 text-base font-medium text-black">{sp.so_luong}</span>
          <button
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded text-lg text-black"
            onClick={() => disPatch(suaSL([sp.id, sp.so_luong + 1]))}
          >+</button>
        </div>

        <div className="w-[120px] text-center text-lg font-semibold text-gray-700">
          {Number(sp.gia * sp.so_luong).toLocaleString("vi")} VNĐ
        </div>

        <button
          onClick={() => disPatch(xoaSP(sp.id))}
          className="text-red-500 hover:text-red-700 ml-4"
        >
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>
      </div>
    ))}

    {/* Cart actions */}
    <div className="flex flex-wrap gap-4 justify-between items-center mt-4">
      <a href="#" className="bg-yellow-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-yellow-600 transition">Tiếp tục mua</a>
      <a href="#" className="border border-gray-500 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">Cập nhật giỏ</a>
      <button
        onClick={() => disPatch(xoaGH())}
        className="border border-red-500 text-red-600 px-6 py-3 rounded-xl font-semibold hover:bg-red-50 transition"
      >
        Xóa giỏ
      </button>
    </div>
  </div>

  {/* Right: Checkout Form */}
  <div className="bg-white shadow-md rounded-xl p-6 space-y-6 border border-gray-200">
    <h2 className="text-xl font-bold text-center text-blue-900">Thông tin đơn hàng</h2>

    <div className="flex justify-between font-medium text-lg text-gray-700">
      <span>Tổng:</span>
      <span>{tongTien.toLocaleString("vi-VN")} VNĐ</span>
    </div>

    <div className="space-y-4">
      <input
        ref={hotenRef}
        type="text"
        placeholder="Họ và tên"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder:text-base focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <input
        ref={sdtRef}
        type="text"
        placeholder="Số điện thoại"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder:text-base focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <input
        ref={emailRef}
        type="email"
        placeholder="Địa chỉ email"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder:text-base focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <textarea
        ref={ghichuRef}
        placeholder="Ghi chú"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder:text-base focus:outline-none focus:ring-2 focus:ring-blue-300"
        rows={4}
      ></textarea>
    </div>

    <div className="flex justify-between font-semibold text-base text-black">
      <span>Tổng tiền:</span>
      <span>{tongTien.toLocaleString("vi-VN")} VNĐ</span>
    </div>

    <button
      onClick={saveCart}
      className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-xl transition"
    >
      Proceed to Checkout
    </button>

    <div
      ref={thongbaoRef}
      className="fixed bottom-10 right-10 bg-red-500 text-white text-lg font-semibold px-6 py-3 rounded-xl shadow-lg transition-opacity duration-500"
    ></div>
  </div>
</div>

            <Footer></Footer>
        </>
    )
}