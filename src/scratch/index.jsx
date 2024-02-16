import { useState } from "react";
import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";

export const ScratchApp = () => {
  // inactive, pending, active
  const [status, setStatus] = useState("inactive");

  return (
    <div className="scratch">
      <div className="alarm">
        <div className="alarmTime">
          {new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
        <div
          className="alarmToggle"
          data-active={status === "active" || undefined}
          onClick={() => setStatus("pending")}
        ></div>
      </div>
    </div>
  );
};
