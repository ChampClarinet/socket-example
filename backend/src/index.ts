import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { CRUDHandler } from "./crud";
import { ws } from "./ws";

const app = new Elysia().use(swagger()).use(CRUDHandler).use(ws).listen(3001);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);