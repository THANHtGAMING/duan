"use client"
import { useRef, useState, useEffect } from "react";
import { ILoai } from "@/app/components/cautrucdata";

import { useRouter } from "next/navigation";
import UploadImage from "../UploadImage";
export default function ThemSP() {
  const router = useRouter();
  const [loai, setLoai] = useState([] as ILoai[])
  useEffect(() => {
    fetch(`http://localhost:3000/api/loai`)
      .then(res => res.json())
      .then(data => setLoai(data))
  }, [])
  const ten_spRef = useRef<HTMLInputElement>(null)
  const giaRef = useRef<HTMLInputElement>(null)
  const giakmRef = useRef<HTMLInputElement>(null)
  const ngayRef = useRef<HTMLInputElement>(null)
  const loairef = useRef<HTMLSelectElement>(null)
  const hinhRef = useRef<HTMLInputElement>(null)
  const ttRef = useRef<HTMLInputElement>(null)
  const ahRef = useRef<HTMLInputElement>(null)
  const thongbaoRef = useRef<HTMLDivElement>(null)
  const luusp = async (e: React.FormEvent) => {
    e.preventDefault()
    const ten_sp = ten_spRef.current?.value
    const gia = giaRef.current?.value
    const gia_km = giakmRef.current?.value
    const ngay = ngayRef.current?.value
    const id_loai = loairef.current?.value
    const hinh = hinhRef.current?.value
    const an_hien = ttRef.current?.value
    const hot = ahRef.current?.value
    if (ten_sp?.trim() == '') {
      thongbaoRef.current!.innerHTML = "Chưa nhập tên sản phẩm"
      ten_spRef.current!.style.backgroundColor = "yellow";
      ten_spRef.current!.focus(); return;
    }
    else
      ten_spRef.current!.style.backgroundColor = "white";
    if (gia?.trim() == '') {
      thongbaoRef.current!.innerHTML = "Chưa nhập giá"
      giaRef.current!.style.backgroundColor = "yellow";
      giaRef.current!.focus(); return;
    }
    else
      giaRef.current!.style.backgroundColor = "white";
    if (gia_km?.trim() == '') {
      thongbaoRef.current!.innerHTML = "Chưa nhập giá km"
      giakmRef.current!.style.backgroundColor = "yellow";
      giakmRef.current!.focus(); return;
    }
    else
      giakmRef.current!.style.backgroundColor = "white";
    if (ngay?.trim() == '') {
      thongbaoRef.current!.innerHTML = "Chưa nhập ngày"
      ngayRef.current!.style.backgroundColor = "yellow";
      ngayRef.current!.focus(); return;
    }
    else
      ngayRef.current!.style.backgroundColor = "white";
    if (id_loai?.trim() == '') {
      thongbaoRef.current!.innerHTML = "Chưa nhập loại"
      loairef.current!.style.backgroundColor = "yellow";
      loairef.current!.focus(); return;
    }
    else
      loairef.current!.style.backgroundColor = "white";
    // if (hinh?.trim() == '') {
    //   thongbaoRef.current!.innerHTML = "Chưa nhập hình"
    //   hinhRef.current!.style.backgroundColor = "yellow";
    //   hinhRef.current!.focus(); return;
    // }
    // else
    //   hinhRef.current!.style.backgroundColor = "white";





    const otp = {
      method: "post",
      body: JSON.stringify({ ten_sp, gia, gia_km, ngay, id_loai, hinh, an_hien, hot }),
      headers: { 'Content-type': 'application/json' }

    }
    fetch(`http://localhost:3000/api/sanpham`, otp)
      .then(res => {
        if (!res.ok) throw new Error("Lỗi khi thêm sản phẩm");
        thongbaoRef.current!.innerHTML = "Thêm thành công!";
        thongbaoRef.current!.classList.remove("bg-green-500");
        thongbaoRef.current!.classList.add("bg-blue-500");


        setTimeout(() => {
          router.push('/admin/san_pham')
        }, 3000)// Đổi URL tùy theo định tuyến của bạn
          ;
      })
      .catch(err => {
        thongbaoRef.current!.innerHTML = `Lỗi khi thêm sản phẩm  ${err}`;
        thongbaoRef.current!.classList.remove("bg-blue-500");
        thongbaoRef.current!.classList.add("bg-red-500");
      });
  }
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Thêm sản phẩm mới</h2>
        <form onSubmit={luusp} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1">
            <label className="block text-sm font-semibold mb-2 text-gray-700">Tên sản phẩm</label>
            <input
              type="text"
              name="ten_sp"
              ref={ten_spRef}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-semibold mb-2 text-gray-700 t">Giá gốc (VNĐ)</label>
            <input
              type="number"
              name="gia"

              ref={giaRef}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-semibold mb-2 text-gray-700">Giá khuyến mãi (VNĐ)</label>
            <input
              type="number"
              name="gia_km"
              ref={giakmRef}

              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div className="col-span-1">
            <label className="block mb-1 font-medium text-black">Ngày</label>
            <input
              type="date"
              name="ngay"
              ref={ngayRef}
              required
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-semibold mb-2 text-gray-700 text-black">Danh mục</label>
            <select
              name="id_loai"

              ref={loairef}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              {loai.map((loai: ILoai) => {
                return (
                  <option key={loai.id} value={loai.id}>
                    {loai.ten_loai}
                  </option>
                );
              })}

            </select>
          </div>

          <div className="col-span-1">
            <div className="text-black">Hình ảnh (URL)
    <UploadImage name="hinh" />
    <input type="hidden" name="hinh" ref={hinhRef} />  {/* Ảnh sẽ lưu vào đây */}
</div>

          </div>

          <div className="col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Trạng thái */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Trạng thái</label>
                <div className="flex items-center gap-6">
                  <label className="text-gray-700">
                    <input ref={ttRef} type="radio" name="an_hien" value="1" defaultChecked className="mr-2" />
                    Hiện
                  </label>
                  <label className="text-gray-700">
                    <input type="radio" name="an_hien" value="0" className="mr-2" />
                    Ẩn
                  </label>
                </div>
              </div>

              {/* Nổi bật */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Nổi bật</label>
                <div className="flex items-center gap-6">
                  <label className="text-gray-700">
                    <input ref={ahRef} type="radio" name="hot" value="1" defaultChecked className="mr-2" />
                    Nổi bật
                  </label>
                  <label className="text-gray-700">
                    <input type="radio" name="hot" value="0" className="mr-2" />
                    Bình thường
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 text-right">
            <button

              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all"
            >
              Thêm sản phẩm
            </button>
            <div ref={thongbaoRef} className="fixed bottom-10 right-10 bg-green-500 text-white text-lg font-semibold px-6 py-3 rounded-xl shadow-lg transition-opacity duration-500"></div>
          </div>
        </form>
      </div>
    </div>
  )
}