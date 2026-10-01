import dinhDangGia from "../utils/dinhDangGia";

export default function MonAnCard({ mon, dangChon, onChon, onDat }) {
  const { ten, gia, moTa, daHet } = mon;

  const xuLyChon = () => {
    if (daHet) return;
    onChon && onChon(mon.id);
  };

  const xuLyDat = (e) => {
    e.stopPropagation();
    if (daHet) return;
    onDat && onDat(mon);
  };

  return (
    <article
      className={`mon-an-card ${dangChon ? "dang-chon" : ""} ${
        daHet ? "het-hang" : ""
      }`}
      onClick={xuLyChon}
      data-testid={`mon-${mon.id}`}
    >
      <h3>{ten}</h3>
      <p className="mo-ta">{moTa}</p>
      <p className="gia">{dinhDangGia(gia)}</p>

      {daHet && <span className="het-mon">Hết món</span>}

      {!daHet && (
        <button type="button" onClick={xuLyDat}>
          Đặt món
        </button>
      )}
    </article>
  );
}