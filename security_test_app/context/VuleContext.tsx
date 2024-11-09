import { createContext } from "react";

const VuleContext = createContext({
  vule: false,
  changeVule: (vule: boolean) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    vule;
  },
});

export default VuleContext;
