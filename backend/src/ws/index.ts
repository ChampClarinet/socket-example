import { Elysia } from "elysia";
import db from "../db";

const clients: Set<any> = new Set();

export const ws = new Elysia().ws("/ws", {
  open(ws) {
    console.log(ws.id + " is connected");
    clients.add(ws);
    broadcast();
  },
  close(ws) {
    console.log(ws.id + " is disconnected");
  },
  message(ws, message) {
    console.log(ws.id + " sends: " + message);
  },
});

const get = () => {
  return db.query(`SELECT * FROM orders WHERE deletedAt IS NULL ORDER BY updatedAt DESC`).all();
};

export const broadcast = () => {
  const data = get();

  clients.forEach((ws) => ws.send(data));
};
