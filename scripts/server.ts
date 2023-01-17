import { LiveServerParams } from "live-server";
import * as liveServer from "live-server";
import * as path from "path";

const params: LiveServerParams = {
  port: 5500,
  host: "localhost",
  root: path.join(__dirname, "../.."),
};

liveServer.start(params);
