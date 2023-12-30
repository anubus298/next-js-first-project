import Image from "next/image";

function NotFound() {
  return (
    <div className="h-[75vh] w-full flex justify-center items-center flex-col">
      <Image
        alt="not-found illustration"
        height={400}
        width={400}
        src={"/404.png"}
      />
      <p>Oops!</p>
    </div>
  );
}

export default NotFound;
