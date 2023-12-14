function Feedback() {
  return (
    <div className="flex justify-center w-full">
      <div className="items-center justify-center w-1/3 p-3  bg-secondarySecondarylight">
        <h1 class="text-3xl font-semibold mb-6 text-gray-800">
          Give Us Your Feedback
        </h1>

        <form action="#" method="POST">
          <div class="mb-6">
            <label for="name" class="block text-sm font-medium text-gray-600">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div class="mb-6">
            <label for="email" class="block text-sm font-medium text-gray-600">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div class="mb-6">
            <label
              for="feedback"
              class="block text-sm font-medium text-gray-600"
            >
              Your Feedback
            </label>
            <textarea
              id="feedback"
              name="feedback"
              rows="4"
              class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            ></textarea>
          </div>

          <div class="mb-6">
            <label for="rating" class="block text-sm font-medium text-gray-600">
              Rating
            </label>
            <select
              id="rating"
              name="rating"
              class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
              <option value="4">⭐️⭐️⭐️⭐️</option>
              <option value="3">⭐️⭐️⭐️</option>
              <option value="2">⭐️⭐️</option>
              <option value="1">⭐️</option>
            </select>
          </div>

          <button
            type="submit"
            class="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}

export default Feedback;
