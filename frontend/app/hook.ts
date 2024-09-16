import { useEffect, useState } from "react";
import { Order } from "./orders";

const deepEquals = <T>(a: T, b: T) => JSON.stringify(a) == JSON.stringify(b);

export const useData = () => {
  const [data, setData] = useState<Map<string, Order>>(new Map());

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3001/ws");

    socket.onmessage = (event) => {
      const message: Order[] = JSON.parse(event.data);
      setData((prevData) => {
        message.forEach((dto) => {
          if (!prevData.has(dto.id)) {
            //? New
            return prevData.set(dto.id, dto);
          }
          const oldData = prevData.get(dto.id);
          if (deepEquals(oldData, dto)) return;
          prevData.set(dto.id, { ...oldData, ...dto });
        });

        return prevData;
      });
    };

    return () => {
      socket.close();
    };
  }, []);

  return data;
};
