import { Elysia } from "elysia";
import db from "../db";

export const ws = new Elysia().ws("/ws", {
  open(ws) {
    console.log(ws.id + " is connected");
    ws.subscribe("orders");
    ws.send(get());
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
  return db.query(`SELECT * FROM orders`).all();
};

export const broadcast = () => {
  const data = get();

  ws.server?.publish("orders", JSON.stringify(data));
};
