import { useState } from "react";

export default function useLocalStorage(khoa, giaTriDau) {
  const [giaTri, setGiaTri] = useState(() => {
    try {
      const raw = localStorage.getItem(khoa);
      return raw ? JSON.parse(raw) : giaTriDau;
    } catch {
      return giaTriDau;
    }
  });

  const setGiaTriVaLuu = (giaTriMoi) => {
    setGiaTri((prev) => {
      const giaTriThuc =
        typeof giaTriMoi === "function" ? giaTriMoi(prev) : giaTriMoi;
      try {
        localStorage.setItem(khoa, JSON.stringify(giaTriThuc));
      } catch {
        /* bỏ qua lỗi localStorage */
      }
      return giaTriThuc;
    });
  };

  return [giaTri, setGiaTriVaLuu];
}