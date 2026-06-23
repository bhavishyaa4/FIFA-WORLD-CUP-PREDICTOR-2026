import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import countryFlags from "../utils/flags";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

function Groups() {
  useEffect(() => {
    document.title = "FWCP | GROUP STAGE";
  }, []);
  const navigate = useNavigate();

  const groupsData = {
    "Group A": ["Mexico", "South Africa", "South Korea", "Czechia"],
    "Group B": ["Canada", "Bosnia and Herzegovina", "Qatar", "Switzerland"],
    "Group C": ["Brazil", "Morocco", "Haiti", "Scotland"],
    "Group D": ["United States Of America", "Paraguay", "Australia", "Turkey"],
    "Group E": ["Germany", "Curacao", "Ivory Coast", "Ecuador"],
    "Group F": ["Netherlands", "Japan", "Sweden", "Tunisia"],
    "Group G": ["Belgium", "Egypt", "Iran", "New Zealand"],
    "Group H": ["Spain", "Cape Verde", "Saudi Arabia", "Uruguay"],
    "Group I": ["France", "Senegal", "Iraq", "Norway"],
    "Group J": ["Argentina", "Algeria", "Austria", "Jordan"],
    "Group K": ["Portugal", "DR Congo", "Uzbekistan", "Colombia"],
    "Group L": ["England", "Croatia", "Ghana", "Panama"],
  };

  const [ranking, setRanking] = useState({});

  const isRankingComplete = (ranking) => {
    const groups = Object.keys(ranking);

    if (groups.length < 12) return false;

    for (let group of groups) {
      if (!ranking[group] || ranking[group].length !== 4) {
        return false;
      }
    }

    return true;
  };

  const handleProceed = () => {
    if (!isRankingComplete(ranking)) {
      toast.error("Please select rankings for all teams in each group.");
      return;
    }

    navigate("/round-of-32", {
      state: ranking,
    });
  };

  const handleSelect = (group, team) => {
    setRanking((prev) => {
      const current = prev[group] || [];

      if (current.includes(team)) {
        return {
          ...prev,
          [group]: current.filter((t) => t !== team),
        };
      }

      if (current.length >= 4) return prev;

      return {
        ...prev,
        [group]: [...current, team],
      };
    });
  };

  const getRankIndex = (group, team) => {
    return ranking[group]?.indexOf(team);
  };

  const getRankColor = (index) => {
    if (index === 0) return "bg-green-500 text-black";
    if (index === 1) return "bg-yellow-400 text-black";
    if (index === 2) return "bg-orange-500 text-black";
    if (index === 3) return "bg-red-500 text-black";
    return "";
  };

  const getRankLabel = (index) => {
    if (index === 0) return "1st";
    if (index === 1) return "2nd";
    if (index === 2) return "3rd";
    if (index === 3) return "4th";
    return "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-blue-900 to-green-600 text-white font-poppins">
      <NavBar />

      <div className="px-3 sm:px-6 py-20">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mt-12 mb-10">
          GROUP DIVISION
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {Object.entries(groupsData).map(([groupName, teams]) => (
            <div
              key={groupName}
              className="bg-black/80 rounded-xl p-3 sm:p-4 border border-gray-800"
            >
              <h2 className="text-green-400 font-bold text-base sm:text-lg mb-4">
                {groupName}
              </h2>

              <div className="flex flex-col gap-2">
                {teams.map((team) => {
                  const index = getRankIndex(groupName, team);
                  const isSelected = index !== -1;

                  return (
                    <button
                      key={team}
                      onClick={() => handleSelect(groupName, team)}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg transition text-sm sm:text-base cursor-pointer ${
                        isSelected
                          ? getRankColor(index)
                          : "bg-gray-900 hover:bg-gray-800 border-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={`https://flagcdn.com/w40/${countryFlags[team]}.png`}
                          alt={team}
                          className="w-6 h-4 rounded-sm object-cover shadow"
                        />

                        <span>{team}</span>
                      </div>

                      {isSelected && (
                        <span className="font-bold text-xs">
                          {getRankLabel(index)}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleProceed}
            className="px-6 sm:px-8 py-2 sm:py-3 bg-green-500 text-black font-bold rounded-full shadow-lg hover:bg-green-400 cursor-pointer text-sm sm:text-base"
          >
            PROCEED TO NEXT PHASE
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default Groups;
