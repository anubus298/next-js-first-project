"use client";
import PocketBase from "pocketbase";
function ShowAuth() {
  const pb = new PocketBase("http://127.0.0.1:8090");
  return (
    <button
      onClick={async () => {
        console.log(pb.authStore.model);
        const res = await pb.collection("ProLaptops").getFullList();
        let content = await res;
        console.log(content);
      }}
    >
      click me
    </button>
  );
}

export default ShowAuth;
