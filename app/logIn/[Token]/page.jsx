import PocketBase from "pocketbase";
import SupportForServer from "./supportForServer";
export const metadata = {
  title: 'Login',
}
async function Page() {
  const pb = new PocketBase(process.env.pocketBaseUrl);
  const authMethods = await pb.collection("users").listAuthMethods();
  return <SupportForServer providers={authMethods.authProviders} />;
}

export default Page;
