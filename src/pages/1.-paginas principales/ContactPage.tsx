import { Outlet } from "react-router-dom";

export default function ContactPage() {
    return (
      <>
        <h1>Contáctanos</h1>
          <p>Esta es la página de contacto</p>
          <main>
            <Outlet/>
          </main>
      </>
    );
  }