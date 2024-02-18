export const timerMachineConfig = {
  initial: "idle",
  states: {
    idle: {
      on: {
        TOGGLE: "running",
      },
    },
    paused: {
      on: {
        RESET: "idle",
        TOGGLE: "running",
      },
    },
    running: {
      on: {
        RESET: "idle",
        TOGGLE: "paused",
      },
    },
  },
};

export const timerMachine = (state, event) => {
  const nextState = timerMachineConfig.states[state]?.on[event.type] || state;

  return nextState;
};
