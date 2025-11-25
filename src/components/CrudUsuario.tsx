import { useEffect, useState } from "react";

export interface Usuario {
  id: number;
  name: string;
  email: string;
};


const CrudUsuario = () => { 
    const [name, setName] = useState<string | null>("");
    const [email, setEmail] = useState<string | null>("");
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [error, setError] = useState<string|null>(null);
  
    const guardar = async (e: React.FormEvent) => {
      e.preventDefault();
  
      try {
        await fetch(
          "https://skojryaxbquqtwvuyhfv.supabase.co/rest/v1/users",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apikey:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrb2pyeWF4YnF1cXR3dnV5aGZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MTQ0MTUsImV4cCI6MjA3MzA5MDQxNX0.nZMSWKNIve_UmSe1KEehy9ocL2FIR25QflnccDRQ998",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrb2pyeWF4YnF1cXR3dnV5aGZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MTQ0MTUsImV4cCI6MjA3MzA5MDQxNX0.nZMSWKNIve_UmSe1KEehy9ocL2FIR25QflnccDRQ998",
            },
            body: JSON.stringify({ name, email }),
          }
        );
        setName(null);
        setEmail(null);
      } catch (error) {
        console.error("Error al crear usuario:", error);
      }
    };

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

      const eliminar = async(id : number) => {
        try {
          await fetch('https://skojryaxbquqtwvuyhfv.supabase.co/rest/v1/users?id=eq.'+id, {
            method: 'DELETE',
            headers: {
              apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrb2pyeWF4YnF1cXR3dnV5aGZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MTQ0MTUsImV4cCI6MjA3MzA5MDQxNX0.nZMSWKNIve_UmSe1KEehy9ocL2FIR25QflnccDRQ998',
              authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrb2pyeWF4YnF1cXR3dnV5aGZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MTQ0MTUsImV4cCI6MjA3MzA5MDQxNX0.nZMSWKNIve_UmSe1KEehy9ocL2FIR25QflnccDRQ998'
            }
          });
          alert('usuario eliminado');
        } catch (error) {
          alert('error al eliminar usuario');
        }
      }
  
    return (
      <div>
        <h1>CREAR USUARIOS</h1>
        <form onSubmit={guardar}>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Crear Usuario</button>
        </form>
        <br />
        <br />
        <div>
          <table aria-label="usuarios">
            <thead>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>OPCIONES</th>
            </thead>
            <tbody>
              {usuarios.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <button onClick={()=> eliminar(user.id)}>Eliminar</button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default CrudUsuario
