// const API_URL = "https://api.jsonserve.com/Uw5CrX";
// const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

export const fetchQuizData = async () => {
  try {
    console.log("test");
    const response = await fetch("https://thingproxy.freeboard.io/fetch/https://api.jsonserve.com/Uw5CrX", {
      method: "GET",
      headers: {
        "X-Requested-With": "XMLHttpRequest", // Optional, depends on the proxy
      },
    });
   
    if (!response.ok) throw new Error("Failed to fetch quiz data");
    return await response.json();
  } catch (error) {
    console.error("Error:", error.message);
    throw new Error(error.message);
  }
};
