"use client"
import { useEffect, useState } from "react";
import { ISanpham, ILoai } from "@/app/components/cautrucdata";
import Link from "next/link";

export default function ShowSP() {
  const [sanpham, setSanpham] = useState([] as ISanpham[]);
  const [loai, setLoai] = useState([] as ILoai[]);
  const [currentPage, setcurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // trạng thái tìm kiếm
  const producsPerpage = 15;
const [selectedLoai, setSelectedLoai] = useState("");
  const handleDelete = async (id: number) => {
    if (!confirm("Xóa sản phẩm này hả?")) return;
    const res = await fetch(`http://localhost:3000/api/sanpham/${id}`, { method: "DELETE" });
    if (res.ok) {
      const res1 = await fetch(`http://localhost:3000/api/sanpham/`);
      const data = await res1.json();
      setSanpham(data);
    } else alert("Xóa thất bại");
  };

  useEffect(() => {
    fetch(`http://localhost:3000/api/sanpham`)
      .then(res => res.json())
      .then(data => setSanpham(data));

    fetch(`http://localhost:3000/api/loai`)
      .then(res => res.json())
      .then(data => setLoai(data));
  }, []);

  // Lọc sản phẩm theo từ khóa tìm kiếm
  const filteredProducts = sanpham.filter(item =>
    item.ten_sp.toLowerCase().includes(searchTerm.toLowerCase()) &&
  (selectedLoai === "" || String(item.id_loai) === selectedLoai)
  );

  // Phân trang sau khi đã lọc
  const start = (currentPage - 1) * producsPerpage;
  const end = start + producsPerpage;
  const currentProducts = filteredProducts.slice(start, end);
  const tongtrang = Math.ceil(filteredProducts.length / producsPerpage);

  const pageButtons = [];
  for (let i = 1; i <= tongtrang; i++) {
    pageButtons.push(
      <button
        key={i}
        onClick={() => setcurrentPage(i)}
        className={`px-4 py-2 border rounded-md ${
          currentPage === i
            ? "bg-blue-600 text-white"
            : "bg-white text-blue-600 border-blue-600"
        }`}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white p-6 shadow-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          <a href="#" className="block text-gray-700 hover:text-blue-500"><i className="fas fa-home mr-2"></i> Dashboard</a>
          <a href="#" className="block text-blue-600 font-semibold"><i className="fas fa-box mr-2"></i>Sản phẩm</a>
          <a href="#" className="block text-gray-700 hover:text-blue-500"><i className="fas fa-users mr-2"></i> Người dùng</a>
          <a href="#" className="block text-gray-700 hover:text-blue-500"><i className="fas fa-cogs mr-2"></i> Cài đặt</a>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-black">Quản lí sản phẩm</h1>
          <Link
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            href={"/admin/san_pham/them"}
          >
            <i className="fas fa-plus mr-2"></i> Thêm sản phẩm
          </Link>
        </div>

        {/* Thanh tìm kiếm */}
     <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
  {/* Ô tìm kiếm */}
  <input
    type="text"
    placeholder="Tìm kiếm sản phẩm..."
    value={searchTerm}
    onChange={(e) => {
      setSearchTerm(e.target.value);
      setcurrentPage(1); // reset về trang 1 khi tìm kiếm
    }}
    className="w-full md:w-1/3 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black placeholder:text-black"
  />

  {/* Dropdown loại sản phẩm */}
  <select
    value={selectedLoai}
    onChange={(e) => {
      setSelectedLoai(e.target.value);
      setcurrentPage(1); // reset về trang 1
    }}
    className="w-full md:w-1/3 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black mt-2 md:mt-0"
  >
    <option value="">Tất cả loại</option>
    {loai.map((l) => (
      <option key={l.id} value={l.id}>
        {l.ten_loai}
      </option>
    ))}
  </select>
</div>
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm">
            <thead className="bg-gray-100 text-left text-gray-600">
              <tr>
                <th className="p-4">Hình</th>
                <th className="p-4">Tên</th>
                <th className="p-4">Loại</th>
                <th className="p-4">Gía</th>
                <th className="p-4">Ẩn</th>
                <th className="p-4">Ngày</th>
                <th className="p-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentProducts.map((item: ISanpham) => (
                <tr key={item.id}>
                  <td className="p-4">
                    <img
                      src={item.hinh}
                      alt={item.hinh}
                      className="w-12 h-12 rounded object-cover"
                    />
                  </td>
                  <td className="p-4 font-medium text-black">{item.ten_sp}</td>
                  <td className="p-4 font-medium text-black">
                    {loai.find((p) => p.id === item.id_loai)?.ten_loai || "Không rõ"}
                  </td>
                  <td className="p-4 text-green-600 font-semibold">
                    {Number(item.gia).toLocaleString("vi")} VND
                  </td>
                  <td className="p-4 font-medium text-black">{item.an_hien}</td>
                  <td className="p-4 font-medium text-black">{item.ngay}</td>
                  <td className="p-4 text-right space-x-2">
                    <Link className="text-blue-500 hover:underline" href={`/admin/san_pham/${item.id}`}>
                      <i className="fas fa-edit"></i> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:underline"
                    >
                      <i className="fas fa-trash-alt"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
              {currentProducts.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-gray-500">
                    Không tìm thấy sản phẩm nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mx-auto mt-6 flex justify-center space-x-2">
          {pageButtons}
        </div>
      </main>
    </div>
  );
}
