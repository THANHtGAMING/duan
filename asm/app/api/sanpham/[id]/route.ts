import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { SanPhamModel } from "@/app/lib/models";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const formData = await req.formData();

    const ten_sp = formData.get("ten_sp")?.toString() || "";
    const gia = Number(formData.get("gia"));
    const gia_km = Number(formData.get("gia_km"));
    const ngay = formData.get("ngay")?.toString() || "";
    const id_loai = Number(formData.get("id_loai"));
    const an_hien = Number(formData.get("an_hien"));
    const hot = Number(formData.get("hot"));
    const hinh_cu = formData.get("hinh_cu")?.toString() || "";

    const file = formData.get("file") as File | null;

    let hinh = hinh_cu;

    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const filename = Date.now() + "_" + file.name;
      const filepath = join(process.cwd(), "public", "uploads", filename);
      await writeFile(filepath, buffer);
      hinh = filename;
    }

    // Cập nhật DB, ví dụ với Sequelize hoặc model bạn có
    await SanPhamModel.update(
      { ten_sp, gia, gia_km, ngay, id_loai, an_hien, hot, hinh },
      { where: { id: Number(params.id) } }
    );

    return NextResponse.json({ message: "Sửa sản phẩm thành công", hinh });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Lỗi khi sửa sản phẩm" }, { status: 500 });
  }
}

