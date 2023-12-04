import PocketBase from "pocketbase";
import ConfirmationIcon from "./confirmationIcon";
async function Page({ params }) {
  async function getConfirmationStatue() {
    const pb = new PocketBase("https://remarkable-gate.pockethost.io");
    if (params.slug[0] == "verif") {
      try {
        const res = await pb
          .collection("users")
          .confirmVerification(params.slug[1]);
        return "success";
      } catch (error) {
        return "failed";
      }
    }
  }
  const result = await getConfirmationStatue();
  return <ConfirmationIcon statue={result} />;
}

export default Page;
