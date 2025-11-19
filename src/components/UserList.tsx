const UserList: React.FC = () => {
  const guardar = async () => {
    await fetch("https://skojryaxbquqtwvuyhfv.supabase.co/rest/v1/users", {
      method: "POST",
      headers: {
        apiKey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrb2pyeWF4YnF1cXR3dnV5aGZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MTQ0MTUsImV4cCI6MjA3MzA5MDQxNX0.nZMSWKNIve_UmSe1KEehy9ocL2FIR25QflnccDRQ998",
        Authotization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrb2pyeWF4YnF1cXR3dnV5aGZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MTQ0MTUsImV4cCI6MjA3MzA5MDQxNX0.nZMSWKNIve_UmSe1KEehy9ocL2FIR25QflnccDRQ998",
      },
    });
  };

  return (
    <div>
      <h1>CREAR USUARIOS</h1>
      <form onSubmit={guardar()}>
        <label htmlFor="name">Nombre:</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="email">Email: </label>
        <input type="email" id="email" name="email" />
        <button type="submit">Crear Usuario</button>
      </form>
    </div>
  );
};
export default UserList;
