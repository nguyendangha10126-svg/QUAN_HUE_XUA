import dinhDangGia from "../utils/dinhDangGia";

export default function MonAnCard({ mon, dangChon, onChon, onDat }) {
  function chonMon() {
    if (mon.daHet) return;
    onChon(mon.id);
  }

  function datMon(e) {
    e.stopPropagation();
    if (mon.daHet) return;
    onDat(mon);
  }

  return (
    <article
      className={"mon-an-card" + (dangChon ? " dang-chon" : "")}
      onClick={chonMon}
    >
      <h3>{mon.ten}</h3>
      <p className="mo-ta">{mon.moTa}</p>
      <p className="gia">{dinhDangGia(mon.gia)}</p>

      {mon.daHet ? (
        <span className="het-mon">Hết món</span>
      ) : (
        <button type="button" onClick={datMon}>
          Đặt món
        </button>
      )}
    </article>
  );
}