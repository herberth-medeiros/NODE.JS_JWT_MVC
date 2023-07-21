import "dotenv/config";
import app from "./src/app.js";

const port =  process.env.PORT || 3000

app.listen(port, (req, res) =>{
  console.log(`Servidor funcionando http://localhost:${port}`);
});




