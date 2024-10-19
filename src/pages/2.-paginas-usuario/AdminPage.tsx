import { Outlet } from "react-router-dom";

export function AdminPage() {
  return (
    <>
        <h1>Admin Page</h1>
        <p>Esta es la página de administración. Aquí puedes crear tus productos</p>
        <main>
          <Outlet/>
        </main>
    </>
    
  );
}