import koa        from "koa";
import bodyparser from "koa-bodyparser";
import WebSocket  from "ws";

const HTTP_PORT  = process.env.HTTP_PORT  || "3000";
const P2P_PORT   = process.env.P2P_PORT   || "6000";
const INIT_PEERS = process.env.PEERS       ? process.env.PEERS.split(",") : [];