import { atomWithStorage } from "jotai/utils";

const accountAtom = atomWithStorage("notificationAccount", 0);
export default accountAtom