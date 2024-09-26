import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import ProductForm from "./ProductForm";
import MainLayout from "../layouts/MainLayout";

export function AdminPage() {
  return (
    <>
        <h1>Admin Page</h1>
        <p>Esta es la página de administración</p>
        <main>
          <Outlet/>
        </main>
    </>
    
  );
}