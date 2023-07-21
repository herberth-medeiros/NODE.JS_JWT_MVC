import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";

const app = express();
app.use(express.json());

routes(app);

db.once("open", () => {
  console.log("Conexao com o banco realizada");
})

app.get("/", (req, res) => {
  res.status(200).json({message: "Bem vindo a nossa API"});
});

export default app;
