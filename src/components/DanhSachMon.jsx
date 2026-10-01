import MonAnCard from "./MonAnCard";

export default function DanhSachMon({ dsMon, monDangChon, onChon, onDat }) {
  return (
    <div className="danh-sach-mon">
      {dsMon.map((mon) => (
        <MonAnCard
          key={mon.id}
          mon={mon}
          dangChon={monDangChon === mon.id}
          onChon={onChon}
          onDat={onDat}
        />
      ))}
    </div>
  );
}