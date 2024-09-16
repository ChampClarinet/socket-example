import { Elysia } from "elysia";
import db from "../db";

export const CRUDHandler = new Elysia()
  .post("/", ({ body }) => {
    //TODO create
  })
  .patch("/:id", ({ body, params: { id } }) => {
    //TODO update
  })
  .delete("/:id", ({ params: { id } }) => {
    //TODO delete
  })
  .get("/", () => {
    return db.query(`SELECT * FROM orders`).all();
  });
