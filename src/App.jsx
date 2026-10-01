import { useEffect, useMemo, useRef, useState } from "react";
import Header from "./components/Header";
import Khung from "./components/Khung";
import DanhSachMon from "./components/DanhSachMon";
import GioHang from "./components/GioHang";
import FormDatMon from "./components/FormDatMon";
import useLocalStorage from "./hooks/useLocalStorage";
import dsMon from "./data/dsMon";
import "./App.css";

export default function App() {
  const tenQuan = import.meta.env.VITE_TEN_QUAN;

  // C3.1 — Giỏ hàng lưu localStorage với khóa "gio-hang"
  const [gio, setGio] = useLocalStorage("gio-hang", []);

  const [monDangChon, setMonDangChon] = useState(null);
  const [thongBao, setThongBao] = useState("");
  const [formKey, setFormKey] = useState(0); // C4 — đặt lại form bằng key

  // ref dùng cho thông báo (C3.3)
  const thongBaoRef = useRef(null);

  // C3.2 — useMemo: tổng số phần trong giỏ
  const tongPhan = useMemo(
    () => gio.reduce((tong, dong) => tong + dong.soLuong, 0),
    [gio]
  );

  // C3.3 — useEffect: cập nhật tiêu đề tab trình duyệt
  useEffect(() => {
    document.title = tongPhan > 0 ? `(${tongPhan}) ${tenQuan}` : tenQuan;
  }, [tongPhan, tenQuan]);

  // C3.3 — useEffect: focus vào thông báo khi có thông báo mới
  useEffect(() => {
    if (thongBao && thongBaoRef.current) {
      thongBaoRef.current.focus();
    }
  }, [thongBao]);

  // C2.1 — Chọn thẻ món
  const xuLyChonMon = (id) => {
    setMonDangChon((prev) => (prev === id ? null : id));
  };

  // C2.2 — Đặt món: nâng trạng thái lên cha
  const xuLyDatMon = (mon) => {
    if (mon.daHet) return;
    setGio((prev) => {
      const daCo = prev.find((d) => d.id === mon.id);
      if (daCo) {
        return prev.map((d) =>
          d.id === mon.id ? { ...d, soLuong: d.soLuong + 1 } : d
        );
      }
      return [...prev, { id: mon.id, soLuong: 1 }];
    });
    setThongBao(`Đã thêm "${mon.ten}" vào giỏ`);
  };

  // C2.3 — Xóa giỏ hàng
  const xuLyXoaGio = () => {
    setGio([]);
    setMonDangChon(null);
    setThongBao("Đã xóa giỏ hàng");
  };

  // C4 — Nhận đơn: hiển thị thông báo và reset form bằng key
  const xuLyGuiDon = (thongTin) => {
    setThongBao(`Đã nhận đơn của ${thongTin.hoTen}`);
    setFormKey((k) => k + 1); // đặt lại form
  };

  const choPhepGui = tongPhan > 0;

  return (
    <div className="app">
      <Header tongPhan={tongPhan} />

      <main className="app-main">
        {/* Khung thực đơn */}
        <Khung tieuDe="Thực đơn">
          <DanhSachMon
            dsMon={dsMon}
            monDangChon={monDangChon}
            onChon={xuLyChonMon}
            onDat={xuLyDatMon}
          />
        </Khung>

        {/* Khung giỏ hàng */}
        <Khung
          tieuDe="Giỏ hàng"
          hanhDong={
            <button
              type="button"
              onClick={xuLyXoaGio}
              disabled={gio.length === 0}
            >
              Xóa giỏ hàng
            </button>
          }
        >
          <GioHang gio={gio} dsMon={dsMon} />
        </Khung>

        {/* Khung form nhận món — C4 */}
        <Khung tieuDe="Thông tin nhận món">
          <FormDatMon
            key={formKey}
            onGui={xuLyGuiDon}
            choPhepGui={choPhepGui}
          />
        </Khung>

        {/* Thông báo thành công — C4 */}
        {thongBao && (
          <p
            role="status"
            tabIndex={-1}
            ref={thongBaoRef}
            className="thong-bao"
          >
            {thongBao}
          </p>
        )}
      </main>
    </div>
  );
}