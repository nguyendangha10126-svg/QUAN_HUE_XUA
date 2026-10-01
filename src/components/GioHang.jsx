import dinhDangGia from "../utils/dinhDangGia";

export default function GioHang({ gio, dsMon }) {
  const tongTien = gio.reduce((tong, dong) => {
    const mon = dsMon.find((m) => m.id === dong.id);
    if (!mon) return tong;
    return tong + mon.gia * dong.soLuong;
  }, 0);

  if (gio.length === 0) {
    return (
      <div data-testid="gio-hang" className="gio-hang">
        <p className="gio-rong">Giỏ hàng trống</p>
      </div>
    );
  }

  return (
    <div data-testid="gio-hang" className="gio-hang">
      <ul className="gio-list">
        {gio.map((dong) => {
          const mon = dsMon.find((m) => m.id === dong.id);
          if (!mon) return null;
          const thanhTien = mon.gia * dong.soLuong;
          return (
            <li key={dong.id} className="gio-dong">
              <span>
                {mon.ten} × {dong.soLuong} — {dinhDangGia(thanhTien)}
              </span>
            </li>
          );
        })}
      </ul>
      <p className="gio-tong">
        Tổng tiền:{" "}
        <span data-testid="tong-tien">{dinhDangGia(tongTien)}</span>
      </p>
    </div>
  );
}