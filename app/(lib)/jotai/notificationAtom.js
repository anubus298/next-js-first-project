import { atomWithStorage } from "jotai/utils";

const notificationAtom = atomWithStorage("notificationNotifications", 0);
export default notificationAtom