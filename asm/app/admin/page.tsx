'use client'
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Trangchu() {
  const router = useRouter();

  useEffect(() => {
    const sessionUser = sessionStorage.getItem("user");
    if (!sessionUser) {
      alert("Bạn chưa đăng nhập!");
      router.push("/");
      return;
    }
    try {
      const user = JSON.parse(sessionUser);
      if (user.vai_tro !== 1) {
        alert("Bạn không phải là admin!");
        router.push("/");
      }
    } catch (error) {
      console.error("Lỗi parse user:", error);
      router.push("/");
    }
  }, [router]);
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg h-screen p-5">
        <h1 className="text-2xl font-bold text-blue-600 mb-8">Admin Panel</h1>
        <nav className="space-y-4">
          <a href="#" className="flex items-center text-gray-700 hover:text-blue-500">
            <i className="fas fa-home mr-3"></i> Dashboard
          </a>
                   <Link className="flex items-center text-gray-700 hover:text-blue-500" href={"/admin/loai"}><i className="fas fa-box mr-3"></i> Loại</Link>

          <Link className="flex items-center text-gray-700 hover:text-blue-500" href={"/admin/san_pham"}><i className="fas fa-box mr-3"></i> Products</Link>
    
          <a href="#" className="flex items-center text-gray-700 hover:text-blue-500">
            <i className="fas fa-cogs mr-3"></i> Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Dashboard</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            <i className="fas fa-plus mr-2"></i> Add New
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">1,204</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Sales</h3>
            <p className="text-3xl font-bold text-green-600">$24,800</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Visitors</h3>
            <p className="text-3xl font-bold text-purple-600">8,652</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Recent Users</h3>
          <table className="min-w-full table-auto">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="pb-2">Name</th>
                <th className="pb-2">Email</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-2">Alice Johnson</td>
                <td className="py-2">alice@example.com</td>
                <td className="py-2">
                  <span className="text-green-500 font-medium">Active</span>
                </td>
              </tr>
              <tr>
                <td className="py-2">Mark Smith</td>
                <td className="py-2">mark@example.com</td>
                <td className="py-2">
                  <span className="text-yellow-500 font-medium">Pending</span>
                </td>
              </tr>
              <tr>
                <td className="py-2">Jane Doe</td>
                <td className="py-2">jane@example.com</td>
                <td className="py-2">
                  <span className="text-red-500 font-medium">Inactive</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
