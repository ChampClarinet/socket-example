import { Elysia } from "elysia";
import db from "../db";
import { Server } from "bun";

export const ws = new Elysia().ws("/ws", {
  open(ws) {
    console.log(ws.id + " is connected");
    ws.subscribe("orders");
    ws.send(JSON.stringify(get()));
  },
  close(ws) {
    console.log(ws.id + " is disconnected");
    ws.unsubscribe("orders");
  },
  message(ws, message) {
    console.log(ws.id + " sends: " + message);
  },
});

const get = () => {
  return db
    .query(
      `SELECT * FROM orders WHERE deletedAt IS NULL ORDER BY updatedAt DESC`
    )
    .all();
};

export const broadcast = (server: Server) => {
  const data = get();

  server.publish("orders", JSON.stringify(data));
};
