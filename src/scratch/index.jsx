import { useEffect } from "react";
import { createMachine, assign, send } from "xstate";
import { useMachine } from "@xstate/react";

const saveAlarm = async () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(50);
    }, 2000);
  });
};
const alarmMachine = createMachine({
  initial: "inactive",
  context: {
    count: 0,
  },
  states: {
    inactive: {
      on: {
        TOGGLE: [
          {
            target: "pending",
            actions: "incrementCount",
            cond: "lessThan5",
          },
          { target: "rejected" },
        ],
      },
    },
    active: {
      on: {
        TOGGLE: {
          target: "inactive",
        },
      },
    },
    pending: {
      invoke: {
        id: "timeout",
        src: (context, event) => (sendBack, receive) => {
          receive((event) => {
            console.log(event);
          });

          const timeout = setTimeout(() => {
            sendBack({
              type: "SUCCESS",
            });
          }, 2000);

          return () => {
            console.log("cleaning up");
            clearTimeout(timeout);
          };
        },
        onError: { target: "rejected" },
      },
      on: {
        SUCCESS: "active",
        TOGGLE: {
          // target: "inactive",
          action: send({ type: "GOODBYE" }, { to: "timeout" }),
        },
      },
    },
    rejected: {},
  },
}).withConfig({
  actions: {
    incrementCount: assign({
      count: (context) => {
        return context.count + 1;
      },
    }),
  },
  guards: {
    lessThan5: (context) => {
      return context.count < 5;
    },
  },
});

export const ScratchApp = () => {
  const [state, send] = useMachine(alarmMachine);

  const status = state.value;
  const { count } = state.context;

  return (
    <div className="scratch">
      <div className="alarm">
        <div className="alarmTime">
          {new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          ({count}) ({JSON.stringify(status)})
        </div>
        <div
          className="alarmToggle"
          data-active={status === "active" || undefined}
          style={{
            opacity: status === "pending" ? 0.5 : 1,
          }}
          onClick={() => send({ type: "TOGGLE" })}
        ></div>
      </div>
    </div>
  );
};
