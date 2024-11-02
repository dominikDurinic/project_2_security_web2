import { createContext } from "react";

const ProfileContext = createContext({
  username: "",
  changeUsername: (user: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    user;
  },
});

export default ProfileContext;
