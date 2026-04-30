import app from "./app";
import { iniciarBanco } from "./config/db";

async function iniciarServidor() {
  await iniciarBanco();

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log("Servidor rodando");
  });
}
iniciarServidor();
