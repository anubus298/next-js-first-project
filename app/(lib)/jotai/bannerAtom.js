import { atomWithStorage } from "jotai/utils";

const bannerAtom = atomWithStorage("bannerShow", false);
export default bannerAtom;
