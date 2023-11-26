"use client";
function Shipping_Billing({ userInfo }) {
  return (
    <div className="w-full gap-y-4  min-h-[450px] flex flex-col md:flex-row justify-evenly items-center bg-secondarySecondarylight p-4 mt-5">
      <div class="w-1/2 mx-auto bg-white p-6 rounded-md shadow-md">
        <h2 class="text-2xl font-extrabold mb-4">Payment Summary</h2>

        <div class="bg-gray-200 text-lg w-full p-4 rounded-md mb-4">
          <div class="flex justify-between mb-2">
            <span class="font-extrabold">First Name:</span>
            <span>{userInfo.first_name}</span>
          </div>

          <div class="flex justify-between mb-2">
            <span class="font-extrabold">Last Name:</span>
            <span>{userInfo.last_name}</span>
          </div>

          <div class="flex justify-between mb-2">
            <span class="font-extrabold">Phone:</span>
            <span>{userInfo.phone}</span>
          </div>

          <div class="flex justify-between mb-2">
            <span class="font-extrabold">Address:</span>
            <span>{userInfo.address}</span>
          </div>

          <div class="flex justify-between mb-2">
            <span class="font-extrabold">Postal Code:</span>
            <span>{userInfo.code_postal}</span>
          </div>

          <div class="flex justify-between mb-2">
            <span class="font-extrabold">Country:</span>
            <span>{userInfo.country}</span>
          </div>

          <div class="flex justify-between mb-2">
            <span class="font-extrabold">Town/City:</span>
            <span>{userInfo.town_city}</span>
          </div>

          <div class="flex justify-between mt-4">
            <span class="font-extrabold">Payment Amount:</span>
            <span>$100.00</span>
          </div>

          <div class="flex justify-between">
            <span class="font-extrabold">Shipping Amount:</span>
            <span>$10.00</span>
          </div>

          <div class="flex justify-between">
            <span class="font-extrabold">Taxes:</span>
            <span>$15.00</span>
          </div>
          <div className="h-[2px] w-full bg-main mt-3"></div>

          <div class="flex justify-between ">
            <span class="font-extrabold">Total:</span>
            <span className="text-green-600 font-semibold">$125.00</span>
          </div>
        </div>

        <div class="text-center">
          <button
            type="button"
            class="bg-green-500 text-white p-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:border-indigo-300"
          >
            Make Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Shipping_Billing;
