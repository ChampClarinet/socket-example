import { useEffect, useState } from "react";
import { Order } from "./orders";

const deepEquals = <T>(a: T, b: T) => JSON.stringify(a) == JSON.stringify(b);

export const useData = () => {
  const [data, setData] = useState<Order[]>([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3001/ws");

    socket.onmessage = (event) => {
      const newData: Order[] = JSON.parse(event.data);
      setData(newData);
    };

    return () => {
      socket.close();
    };
  }, []);

  return data;
};
