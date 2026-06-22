"use client";

import { io, Socket } from "socket.io-client";
import { appConfig } from "@/config/app-config";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io(appConfig.socketUrl, {
      autoConnect: false,
    });
  }

  return socket;
}

export default getSocket;
