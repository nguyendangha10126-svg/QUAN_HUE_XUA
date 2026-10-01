import { useEffect, useMemo, useRef, useState } from "react";
import Header from "./components/Header";
import Khung from "./components/Khung";
import DanhSachMon from "./components/DanhSachMon";
import GioHang from "./components/GioHang";
import useLocalStorage from "./hooks/useLocalStorage";
import dsMon from "./data/dsMon";
import "./App.css";

export default function App() {
  const tenQuan = import.meta.env.VITE_TEN_QUAN;

  const [gio, setGio] = useLocalStorage("gio-hang", []);
  const [monDangChon, setMonDangChon] = useState(null);
  const [thongBao, setThongBao] = useState("");
  const thongBaoRef = useRef(null);

  const tongPhan = useMemo(
    () => gio.reduce((tong, dong) => tong + dong.soLuong, 0),
    [gio]
  );

  useEffect(() => {
    document.title = tongPhan > 0 ? `(${tongPhan}) ${tenQuan}` : tenQuan;
  }, [tongPhan, tenQuan]);

  useEffect(() => {
    if (thongBao && thongBaoRef.current) {
      thongBaoRef.current.focus();
    }
  }, [thongBao]);

  const xuLyChonMon = (id) => {
    setMonDangChon((prev) => (prev === id ? null : id));
  };

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

  const xuLyXoaGio = () => {
    setGio([]);
    setMonDangChon(null);
    setThongBao("Đã xóa giỏ hàng");
  };

  return (
    <div className="app">
      <Header tongPhan={tongPhan} />

      <main className="app-main">
        <Khung tieuDe="Thực đơn">
          <DanhSachMon
            dsMon={dsMon}
            monDangChon={monDangChon}
            onChon={xuLyChonMon}
            onDat={xuLyDatMon}
          />
        </Khung>

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