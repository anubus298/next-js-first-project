import { atomWithStorage } from "jotai/utils";

const commandsAtom = atomWithStorage("notificationCommands", 0);
export default commandsAtom;
