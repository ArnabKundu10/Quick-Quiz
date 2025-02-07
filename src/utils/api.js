// const API_URL = "https://api.jsonserve.com/Uw5CrX";
// const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
import axios from "axios";
export const fetchQuizData = async () => {
  try {
    console.log("test");
    const response = await axios.get(
      // "https://thingproxy.freeboard.io/fetch/https://api.jsonserve.com/Uw5CrX",
      "http://localhost:3000/auth"
    );

    if (!response) throw new Error("Failed to fetch quiz data");
    console.log(response.data);
    console.log("response:-", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
    throw new Error(error.message);
  }
};
