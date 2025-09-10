export default async function ThemLoai() {
  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold text-center text-orange-500 mb-6">➕ Thêm loại</h1>
      <form action="/api/loai" method="POST" className="space-y-6">
        {/* Tên loại */}
        <div>
          <label htmlFor="ten_loai" className="block text-sm font-medium text-gray-700 mb-1">Tên loại</label>
          <input
            type="text"
        
            name="ten_loai"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 text-black"
          />
        </div>

        {/* Thứ tự */}
        <div>
          <label htmlFor="thu_tu" className="block text-sm font-medium text-gray-700 mb-1">Thứ tự (URL)</label>
          <input
            type="text"
           
            name="thu_tu"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 text-black"
          />
        </div>

        {/* Ẩn/Hiện */}
        <div>
          <span className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</span>
          <div className="flex items-center space-x-6">
            <label className="flex items-center space-x-2">
              <input type="radio" name="an_hien" value="1" defaultChecked className="accent-orange-500 " />
              <span className="text-black">Hiện</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="an_hien" value="0" className="accent-orange-500" />
              <span className="text-black">Ẩn</span>
            </label>
          </div>
        </div>

        {/* Nút submit */}
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md shadow transition duration-200"
        >
          Thêm loại
        </button>
      </form>
    </div>
  );
}
