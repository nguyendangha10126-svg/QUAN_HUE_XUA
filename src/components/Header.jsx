export default function Header({ tongPhan }) {
  const tenQuan = import.meta.env.VITE_TEN_QUAN;

  return (
    <header className="header">
      <h1>{tenQuan}</h1>
      <div className="gio-info">
        🛒 Giỏ hàng:{" "}
        <span data-testid="tong-phan">{tongPhan}</span> phần
      </div>
    </header>
  );
}