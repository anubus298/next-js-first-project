import { atom } from "jotai";
import commandsAtom from "./commandsAtom";
import accountAtom from "./accountAtom";
import notificationAtom from "./notificationAtom";
const userAtom = atom(
  (get) => get(commandsAtom) + get(accountAtom) + get(notificationAtom)
);

export default userAtom;
