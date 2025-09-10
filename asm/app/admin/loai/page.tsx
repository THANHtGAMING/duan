
import { ILoai } from "@/app/components/cautrucdata";
import Link from "next/link";
import NutXoaLoai from "./NutxoaLoai";
export default async function Loailist() {
  const data = await fetch(`${process.env.APP_URL}/api/loai`);
  const loai_arr: ILoai[] = await data.json() as ILoai[];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📂 Danh sách loại</h1>
      
      <div className="flex justify-end mb-4">
        <Link href="/admin/loai/them" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          ➕ Thêm loại
        </Link>
      </div>

      <div className="overflow-x-auto rounded shadow-md">
        <table className="min-w-full border border-gray-200 bg-white">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-center">Tên loại</th>
              <th className="py-3 px-4 text-center">Thứ tự</th>
              <th className="py-3 px-4 text-center">Ẩn/Hiện</th>
              <th className="py-3 px-4 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loai_arr.map((loai: any) => (
              <tr key={loai.id} className="border-t hover:bg-gray-50">
                <td className="py-2 px-4 text-black">{loai.id}</td>
                <td className="py-2 px-4 text-center text-black">{loai.ten_loai}</td>
                <td className="py-2 px-4 text-center text-black">{loai.thu_tu}</td>
                <td className="py-2 px-4 text-center">
                  {loai.an_hien ? "✅" : "❌"}
                </td>
                <td className="py-2 px-4 text-center space-x-2">
                 <Link href={`/admin/loai/${loai.id}`} className="text-blue-500 mx-2"> Sửa </Link>
               <NutXoaLoai id={loai.id}></NutXoaLoai>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
