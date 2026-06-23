import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import countryFlags from "../utils/flags";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

function RoundOf32() {
  useEffect(() => {
    document.title = "FWCP | THIRD PLACE SELECTION";
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const ranking = location.state || {};

  const [bestThird, setBestThird] = useState([]);

  const groupOrder = [
    "Group A",
    "Group B",
    "Group C",
    "Group D",
    "Group E",
    "Group F",
    "Group G",
    "Group H",
    "Group I",
    "Group J",
    "Group K",
    "Group L",
  ];

  const thirdMap = Object.values(ranking)
    .map((g) => g?.[2])
    .filter(Boolean);

  const toggleThird = (team) => {
    setBestThird((prev) => {
      const isSelected = prev.includes(team);

      if (!isSelected && prev.length >= 8) {
        toast.error("Only 8 third-place teams allowed", {
          toastId: "third-limit",
        });
        return prev;
      }

      if (isSelected) {
        return prev.filter((t) => t !== team);
      }

      return [...prev, team];
    });
  };

  const Flag = (team) => (
    <img
      src={`https://flagcdn.com/w40/${countryFlags[team]}.png`}
      className="w-5 h-4 rounded-sm object-cover inline mr-2"
      alt={team}
    />
  );

  const buildBracket = () => {
    if (bestThird.length !== 8) {
      console.error("Select exactly 8 third-place teams");
      return;
    }

    let i = 0;
    const getThird = () => bestThird[i++];

    const fifaRoundOf32 = [
      { id: 73, a: ranking["Group A"][1], b: ranking["Group B"][1] },
      { id: 74, a: ranking["Group E"][0], b: getThird() },
      { id: 75, a: ranking["Group F"][0], b: ranking["Group C"][1] },
      { id: 76, a: ranking["Group C"][0], b: ranking["Group F"][1] },
      { id: 77, a: ranking["Group I"][0], b: getThird() },
      { id: 78, a: ranking["Group E"][1], b: ranking["Group I"][1] },
      { id: 79, a: ranking["Group A"][0], b: getThird() },
      { id: 80, a: ranking["Group L"][0], b: getThird() },
      { id: 81, a: ranking["Group D"][0], b: getThird() },
      { id: 82, a: ranking["Group G"][0], b: getThird() },
      { id: 83, a: ranking["Group K"][1], b: ranking["Group L"][1] },
      { id: 84, a: ranking["Group H"][0], b: ranking["Group J"][1] },
      { id: 85, a: ranking["Group B"][0], b: getThird() },
      { id: 86, a: ranking["Group J"][0], b: ranking["Group H"][1] },
      { id: 87, a: ranking["Group K"][0], b: getThird() },
      { id: 88, a: ranking["Group D"][1], b: ranking["Group G"][1] },
    ];

    navigate("/eliminator", {
      state: {
        ranking,
        bestThird,
        matches: fifaRoundOf32,
      },
    });
  };

  const getQualifiedData = () => {
    const qualified = [];
    const thirdPlace = [];
    const eliminated = [];

    Object.entries(ranking).forEach(([group, teams]) => {
      teams.forEach((team, index) => {
        if (index === 0 || index === 1) {
          qualified.push({ team, group, rank: index + 1 });
        } else if (index === 2) {
          thirdPlace.push({ team, group, rank: 3 });
        } else {
          eliminated.push({ team, group, rank: 4 });
        }
      });
    });

    return { qualified, thirdPlace, eliminated };
  };

  const { qualified, thirdPlace, eliminated } = getQualifiedData();

  const getRankLabel = (i) =>
    i === 0 ? "1st" : i === 1 ? "2nd" : i === 2 ? "3rd" : "4th";

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-blue-900 to-green-600 text-white font-poppins">
      <NavBar />

      <div className="px-3 sm:px-6 lg:px-10 py-20">
        <h1 className="text-xl font-bold text-center mt-12 mb-10">
          ROUND OF 32 - GROUP STAGE SUMMARY
        </h1>

        <h2 className="font-bold mb-3">GROUP BREAKDOWN:</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-10">
          {groupOrder.map((group) => {
            const teams = ranking[group];
            if (!teams) return null;

            return (
              <div key={group} className="bg-black/70 p-4 rounded-lg">
                <h3 className="text-green-400 font-bold mb-3">{group}</h3>

                {teams.map((team, i) => (
                  <div key={team} className="flex justify-between py-1 text-sm">
                    <div className="flex items-center gap-2">
                      {Flag(team)}
                      <span>{team}</span>
                    </div>
                    <span>{getRankLabel(i)}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <h2 className="font-bold mb-3">QUALIFIED TEAMS:</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-10">
          {qualified.map((t) => (
            <div
              key={t.team}
              className="bg-green-600 text-black p-2 rounded flex gap-2"
            >
              {Flag(t.team)}
              {t.team}
            </div>
          ))}
        </div>

        <h2 className="font-bold mb-3">SELECT BEST THIRD-PLACE TEAMS (8):</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-10">
          {thirdPlace.map((t) => {
            const selected = bestThird.includes(t.team);
            const rank = bestThird.indexOf(t.team) + 1;

            return (
              <button
                key={t.team}
                onClick={() => toggleThird(t.team)}
                className={`p-2 rounded flex justify-between items-center cursor-pointer ${
                  selected ? "bg-yellow-400 text-black" : "bg-gray-800"
                }`}
              >
                <div className="flex gap-2 items-center">
                  {Flag(t.team)}
                  {t.team}
                </div>

                {selected && <span className="text-xs font-bold">{rank}</span>}
              </button>
            );
          })}
        </div>

        <h2 className="font-bold mb-3">ELIMINATED TEAMS:</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-10">
          {eliminated.map((t) => (
            <div
              key={t.team}
              className="bg-red-400 text-black p-2 rounded flex gap-2"
            >
              {Flag(t.team)}
              {t.team}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <motion.button
            onClick={buildBracket}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-green-500 text-black font-bold rounded-full cursor-pointer"
          >
            PROCEED ({bestThird.length}/8)
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default RoundOf32;
