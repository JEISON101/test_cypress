import { useEffect, useState } from "react";

type Usuario = {
  id: number;
  name: string;
};

const ListaUsuario: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]|null>(null);
  const [error, setError] = useState<string|null>(null);
  useEffect(() => {
    traerDatos();
  }, []);
  const traerDatos = async () => {
    try {
      const res = await fetch(
        "https://skojryaxbquqtwvuyhfv.supabase.co/rest/v1/users?select=*",
        {
          headers: {
            apiKey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrb2pyeWF4YnF1cXR3dnV5aGZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MTQ0MTUsImV4cCI6MjA3MzA5MDQxNX0.nZMSWKNIve_UmSe1KEehy9ocL2FIR25QflnccDRQ998",
            Authotization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrb2pyeWF4YnF1cXR3dnV5aGZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MTQ0MTUsImV4cCI6MjA3MzA5MDQxNX0.nZMSWKNIve_UmSe1KEehy9ocL2FIR25QflnccDRQ998",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Error del servidor");
      } else {
        const data = await res.json();
        setUsuarios(data);
      }
    } catch {
      setError("problemitas");
    }
  };
  if (error) {
    return <div role="alert">{error}</div>;
  }
  return (
    <div>
      <table aria-label="usuarios">
        <thead>
          <th>ID</th>
          <th>NAME</th>
        </thead>
        <tbody>
          {usuarios.map((user) => (
            <tr>
              <td>{user.id}</td>
              <td>{user.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ListaUsuario;
