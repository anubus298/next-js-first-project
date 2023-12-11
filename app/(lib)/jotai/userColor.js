import { atomWithStorage } from "jotai/utils";

const userColorAtom = atomWithStorage("userColor", "#ffffff");
export default userColorAtom;
