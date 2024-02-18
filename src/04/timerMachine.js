import { createMachine, assign } from "xstate";

export const timerMachine = createMachine({
  initial: "idle",
  context: {
    duration: 5,
    elapsed: 0,
    interval: 0.1,
  },
  states: {
    idle: {
      entry: assign({
        duration: 5,
        elapsed: 0,
      }),
      on: {
        TOGGLE: "running",
      },
    },
    running: {
      on: {
        TICK: [
          {
            cond: (ctx) => {
              return ctx.elapsed + ctx.interval <= ctx.duration;
            },
            actions: assign({
              elapsed: (ctx) => ctx.elapsed + ctx.interval,
            }),
          },
          { target: "expired" },
        ],
        TOGGLE: "paused",
        ADD_MINUTE: {
          actions: assign({
            duration: (ctx) => ctx.duration + 60,
          }),
        },
      },
    },
    paused: {
      on: {
        TOGGLE: "running",
        RESET: "idle",
      },
    },
    expired: {
      on: {
        RESET: "idle",
      },
    },
  },
});
