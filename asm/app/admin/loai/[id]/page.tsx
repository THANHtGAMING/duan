
import { ILoai } from "@/app/lib/cautrucdata";

export default async function SuaLoai({ params }: { params: { id: string } }) {
    const id = Number(params.id);
    
    const data = await fetch(`${process.env.APP_URL}/api/loai/${id}`);
    const loai: ILoai = await data.json() as ILoai

    if (!loai) return <p className="text-red-500">Loai khong ton tai </p>
    return (
        <>
            <h1 className="text-2xl font-bold text-white bg-orange-500 px-4 py-2 rounded-t-md">
                ✏️ Chỉnh sửa loại
            </h1>

            <form action={`/api/loai/${id}`} method="POST" className="bg-white p-6 shadow-md rounded-b-md space-y-6">
                {/* Method override for PUT */}
                <input type="hidden" name="_method" value="PUT" />

                {/* Tên loại */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Tên loại</label>
                    <input
                        type="text"
                        name="ten_loai"
                        defaultValue={loai.ten_loai}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                </div>

                {/* Thứ tự */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1 ">Thứ tự</label>
                    <input
                        type="number"
                        name="thu_tu"
                        defaultValue={loai.thu_tu}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                </div>

                {/* Ẩn/Hiện */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Trạng thái</label>
                    <div className="flex items-center space-x-6">
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="an_hien"
                                value="0"
                                defaultChecked={loai.an_hien}
                                className="form-radio text-blue-500 text-black"
                            />
                            <span className="text-black">Hiện</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="an_hien"
                                value="0"
                                defaultChecked={!loai.an_hien}
                                className="form-radio text-blue-500 text-black"
                            />
                            <span className="text-black">Ẩn</span>
                        </label>
                    </div>
                </div>

                {/* Nút submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
                >
                    💾 Lưu loại
                </button>
            </form>
        </>
    )
}