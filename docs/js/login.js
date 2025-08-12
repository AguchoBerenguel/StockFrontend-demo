document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombreUsuario = document.getElementById("usuario").value;
  const contraseña = document.getElementById("contrasena").value;

  try {
    const response = await fetch("https://stockapi-demo-production.up.railway.app/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        NombreUsuario: nombreUsuario, // Corregido: Mayúscula inicial
        Contraseña: contraseña         // Corregido: Mayúscula inicial
      })
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.status);
    }

    const data = await response.json();

    if (data.rol === "admin") {
      window.location.href = "./pages/Empleados.html";
    } else if (data.rol === "empleado") {
      window.location.href = "./pages/GestionProductos.html";
    } else {
      document.getElementById("mensaje").textContent = "Usuario o contraseña incorrectos.";
    }
  } catch (error) {
    console.error(error);
    document.getElementById("mensaje").textContent = "Error al iniciar sesión.";
  }
});