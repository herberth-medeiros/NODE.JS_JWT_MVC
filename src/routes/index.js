import express from "express";
import userRoutes from "./UserRoutes.js"

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.tatus(200).send({message: "API AUTENTICACAO"})
  });

  app.use(express.json(),
  userRoutes);
};

export default routes;