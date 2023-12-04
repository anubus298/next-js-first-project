import { atomWithStorage } from "jotai/utils";

const isUserProvidedNewsLetter = atomWithStorage("isUserProvidedNewsLetter", false);
export default isUserProvidedNewsLetter;
