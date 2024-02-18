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
      initial: "normal",
      states: {
        normal: {
          always: {
            cond: (ctx) => {
              return ctx.elapsed >= ctx.duration;
            },
            target: "overtime",
          },
          on: {
            RESET: undefined,
          },
        },
        overtime: {
          on: {
            TOGGLE: undefined,
          },
        },
      },
      on: {
        TICK: {
          actions: assign({
            elapsed: (ctx) => ctx.elapsed + ctx.interval,
          }),
        },
        TOGGLE: {
          target: "paused",
        },
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
      },
    },
  },
  on: {
    RESET: {
      target: ".idle",
    },
  },
});
