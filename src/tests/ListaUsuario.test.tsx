import { render, screen, waitFor } from "@testing-library/react";
import ListaUsuario from "../components/ListaUsuario";
import { server } from "./msw/server";
import { http, HttpResponse } from "msw";

test("muestra la lista de usuarios", async () => {
  render(<ListaUsuario />);
  const tabla = await screen.findByRole("table", { name: /usaurios/i });
  expect(tabla).toBeInTheDocument();
  expect(screen.getByText("Ada Lovelace")).toBeInTheDocument();
  expect(screen.getByText("Alexandra")).toBeInTheDocument();
});

//tobeinTheDocument;

test("muestra de errores de errores si la api falla", async () => {
  server.use(
    http.get("https://skojryaxbquqtwvuyhfv.supabase.co/rest/v1/usuarios", () =>
      HttpResponse.text("Error del servidor", { status: 500 })
    )
  );
});
render(<ListaUsuario />);
await waitFor(() => {
  expect(screen.getByRole("Alert")).toHaveTextContent("problemitas");
});
