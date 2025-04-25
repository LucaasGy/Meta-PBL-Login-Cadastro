// Aqui starta o server

//pra rodar emn desenvolvimento -> npm run dev
//pra rodar em produção -> npm run build
//                         npm start

import {app} from "./app";

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
