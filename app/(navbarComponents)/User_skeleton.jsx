import { ColorRing } from 'react-loader-spinner'
function User_skeleton() {
  return (
    <div className="w-[139px] h-[40px] flex justify-center items-center">
      <ColorRing
        visible={true}
        height="35"
        width="35"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    </div>
  );
}

export default User_skeleton;
