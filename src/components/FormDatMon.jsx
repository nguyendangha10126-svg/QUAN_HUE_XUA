import { useState } from "react";

export default function FormDatMon({ onGui, choPhepGui }) {
  const [hoTen, setHoTen] = useState("");
  const [soDienThoai, setSoDienThoai] = useState("");
  const [ghiChu, setGhiChu] = useState("");
  const [loi, setLoi] = useState({});

  const kiemTra = () => {
    const loiMoi = {};
    if (hoTen.trim().length < 2) {
      loiMoi.hoTen = "Họ tên cần ít nhất 2 ký tự";
    }
    if (!/^0\d{9}$/.test(soDienThoai.trim())) {
      loiMoi.soDienThoai = "Số điện thoại gồm 10 chữ số, bắt đầu bằng 0";
    }
    return loiMoi;
  };

  const xuLyGui = (e) => {
    e.preventDefault();
    if (!choPhepGui) return;

    const loiMoi = kiemTra();
    setLoi(loiMoi);
    if (Object.keys(loiMoi).length > 0) return;

    onGui &&
      onGui({
        hoTen: hoTen.trim(),
        soDienThoai: soDienThoai.trim(),
        ghiChu: ghiChu.trim(),
      });

    // reset form sau khi gửi thành công
    setHoTen("");
    setSoDienThoai("");
    setGhiChu("");
    setLoi({});
  };

  return (
    <form className="form-dat-mon" onSubmit={xuLyGui} noValidate>
      <div className="form-field">
        <label htmlFor="hoTen">Họ tên</label>
        <input
          id="hoTen"
          type="text"
          value={hoTen}
          onChange={(e) => setHoTen(e.target.value)}
          placeholder="Nhập họ tên"
        />
        {loi.hoTen && <p role="alert">{loi.hoTen}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="soDienThoai">Số điện thoại</label>
        <input
          id="soDienThoai"
          type="text"
          value={soDienThoai}
          onChange={(e) => setSoDienThoai(e.target.value)}
          placeholder="Nhập số điện thoại"
        />
        {loi.soDienThoai && <p role="alert">{loi.soDienThoai}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="ghiChu">Ghi chú</label>
        <textarea
          id="ghiChu"
          value={ghiChu}
          onChange={(e) => setGhiChu(e.target.value)}
          placeholder="Ghi chú (không bắt buộc)"
        />
      </div>

      <button type="submit" disabled={!choPhepGui}>
        Gửi đơn
      </button>
    </form>
  );
}