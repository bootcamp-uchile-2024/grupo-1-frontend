import { Outlet } from "react-router-dom";

export default function AboutPage() {
    return (
      <> 
        <h1>Quienes Somos</h1>
          <p>Esta es la página de Quienes Somos</p>
          <main>
            <Outlet/>
          </main>
      </>
      );
  }