import { useEffect } from "react";
import { AppManager } from "../App/Application";

function Scene() {
  useEffect(() => {
    AppManager.init();
  }, []);
  return null;
}

export default Scene;
