import { Outlet } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <h1>Inicio</h1>
      <p>Esta es la pagina de inicio</p><main>
        <Outlet />
      </main>
    </>
  );
}