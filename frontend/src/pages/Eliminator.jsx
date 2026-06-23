import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import countryFlags from "../utils/flags";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

function Eliminator() {
  useEffect(() => {
document.title = "FWCP | ROUND OF 32";
  }, []);
  const { state } = useLocation();
  const navigate = useNavigate();

  const matches = state?.matches || [];

  const [winners, setWinners] = useState({});

  const Flag = (team) => {
    if (!team) return null;

    return (
      <img
        src={`https://flagcdn.com/w40/${countryFlags[team]}.png`}
        className="w-6 h-4 rounded-sm object-cover"
        alt={team}
      />
    );
  };

  const toggleWinner = (matchId, team) => {
    setWinners((prev) => ({
      ...prev,
      [matchId]: team,
    }));
  };

  const handleNext = () => {
    if (Object.keys(winners).length !== matches.length) {
      toast.error("Select all winners to proceed.");
      return;
    }

    const roundOf16Teams = matches.map((m) => ({
      matchId: m.id,
      winner: winners[m.id],
    }));

    navigate("/bracket", {
      state: { roundOf16: roundOf16Teams },
    });
  };
  const stadiumMap = {
    73: { stadium: "SoFi Stadium, Inglewood", date: "28 Jun 2026" },
    74: { stadium: "Gillette Stadium, Foxborough", date: "29 Jun 2026" },
    75: { stadium: "Estadio BBVA, Guadalupe", date: "29 Jun 2026" },
    76: { stadium: "NRG Stadium, Houston", date: "29 Jun 2026" },
    77: { stadium: "MetLife Stadium, East Rutherford", date: "30 Jun 2026" },
    78: { stadium: "AT&T Stadium, Arlington", date: "30 Jun 2026" },
    79: { stadium: "Estadio Azteca, Mexico City", date: "30 Jun 2026" },
    80: { stadium: "Mercedes-Benz Stadium, Atlanta", date: "01 Jul 2026" },
    81: { stadium: "Levi's Stadium, Santa Clara", date: "01 Jul 2026" },
    82: { stadium: "Lumen Field, Seattle", date: "01 Jul 2026" },
    83: { stadium: "BMO Field, Toronto", date: "02 Jul 2026" },
    84: { stadium: "SoFi Stadium, Inglewood", date: "02 Jul 2026" },
    85: { stadium: "BC Place, Vancouver", date: "02 Jul 2026" },
    86: { stadium: "Hard Rock Stadium, Miami Gardens", date: "03 Jul 2026" },
    87: { stadium: "Arrowhead Stadium, Kansas City", date: "03 Jul 2026" },
    88: { stadium: "AT&T Stadium, Arlington", date: "03 Jul 2026" },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-blue-900 to-green-600 text-white font-poppins">
      <NavBar />

      <div className="px-4 py-20">
        <h1 className="text-2xl md:text-3xl font-bold text-center mt-12 mb-10">
          ROUND OF 32 - KNOCKOUT BRACKET
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {matches.map((match) => {
            const info = stadiumMap[match.id];

            return (
              <div
                key={match.id}
                className="bg-black/70 p-4 rounded-xl border border-gray-700"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-green-400 font-bold">
                      Match {match.id}
                    </h3>

                    <div className="text-xs text-gray-300 mt-1">
                      {info?.stadium}
                    </div>
                  </div>

                  <div className="text-right text-xs text-yellow-300">
                    {info?.date}
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {Flag(match.a)}
                      <span>{match.a}</span>
                    </div>

                    <button
                      onClick={() => toggleWinner(match.id, match.a)}
                      className={`px-2 py-1 rounded cursor-pointer ${
                        winners[match.id] === match.a
                          ? "bg-green-500 text-black"
                          : "bg-gray-800"
                      }`}
                    >
                      Pick
                    </button>
                  </div>

                  <div className="text-center my-2 text-gray-400 font-bold">
                    VS
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {Flag(match.b)}
                      <span>{match.b}</span>
                    </div>

                    <button
                      onClick={() => toggleWinner(match.id, match.b)}
                      className={`px-2 py-1 rounded cursor-pointer ${
                        winners[match.id] === match.b
                          ? "bg-green-500 text-black"
                          : "bg-gray-800"
                      }`}
                    >
                      Pick
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-10">
          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 sm:px-8 py-3 bg-green-500 text-black font-bold rounded-full cursor-pointer"
          >
            PROCEED TO ROUND OF 16
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default Eliminator;
