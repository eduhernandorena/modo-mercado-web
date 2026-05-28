import { Route, Routes } from "react-router-dom";

function HomePage() {
  return <h1>Modo Mercado Web</h1>;
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
