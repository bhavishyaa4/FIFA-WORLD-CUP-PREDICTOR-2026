import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

function Home_Page() {
  useEffect(() => {
    document.title = "FWCP | HOME PAGE";
  }, []);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/");
        const data = await response.json();
        setMessage(data.message);
        console.log("Message from server:", data.message);
      } catch (error) {
        console.log("Error connecting to server.", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen relative text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-blue-900 to-green-600 font-poppins">
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10">
          <NavBar />

          <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 text-center pt-20 sm:pt-16">
            <motion.h1
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
            >
              FIFA WORLD CUP PREDICTION{" "}
              <span className="text-green-500">2</span>
              <span className="text-red-500">0</span>
              <span className="text-white">2</span>
              <span className="text-blue-500">6</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-200 text-sm sm:text-base md:text-lg max-w-xs sm:max-w-md md:max-w-xl mb-8"
            >
              Make your prediction for the FIFA World Cup 2026 and share with
              your friends
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/groups")}
              className="px-6 sm:px-8 py-2 sm:py-3 bg-green-500 text-black font-bold rounded-full shadow-lg hover:bg-green-400 cursor-pointer text-sm sm:text-base"
            >
              PREDICT YOUR WINNER
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home_Page;
