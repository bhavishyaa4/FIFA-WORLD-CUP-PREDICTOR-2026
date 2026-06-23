import { useLocation } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import NavBar from "../components/NavBar";
import countryFlags from "../utils/flags";

function Bracket() {
  useEffect(() => {
    document.title = "FWCP | ALL BRACKETS";
  }, []);
  const { state } = useLocation();
  const round16Winners = state?.roundOf16 || [];

  const [showModal, setShowModal] = useState(false);
  const [runnerUp, setRunnerUp] = useState("");
  const [semiFinalLoser, setSemiFinalLoser] = useState("");

  if (!round16Winners.length) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        No bracket data found
      </div>
    );
  }

  const winnerMap = useMemo(() => {
    const map = {};
    round16Winners.forEach((m) => {
      map[m.matchId] = m.winner;
    });
    return map;
  }, [round16Winners]);

  const [round16, setRound16] = useState([]);
  const [quarter, setQuarter] = useState(
    Array(4)
      .fill()
      .map(() => ({ teams: ["", ""], winner: null })),
  );
  const [semi, setSemi] = useState(
    Array(2)
      .fill()
      .map(() => ({ teams: ["", ""], winner: null })),
  );
  const [final, setFinal] = useState([{ teams: ["", ""], winner: null }]);
  const [third, setThird] = useState([{ teams: ["", ""], winner: null }]);
  const [champion, setChampion] = useState("");
  const [thirdPlace, setThirdPlace] = useState("");

  useEffect(() => {
    setRound16([
      { id: 89, a: winnerMap[74], b: winnerMap[77], winner: null },
      { id: 90, a: winnerMap[73], b: winnerMap[75], winner: null },
      { id: 91, a: winnerMap[76], b: winnerMap[78], winner: null },
      { id: 92, a: winnerMap[79], b: winnerMap[80], winner: null },
      { id: 93, a: winnerMap[83], b: winnerMap[84], winner: null },
      { id: 94, a: winnerMap[81], b: winnerMap[82], winner: null },
      { id: 95, a: winnerMap[86], b: winnerMap[88], winner: null },
      { id: 96, a: winnerMap[85], b: winnerMap[87], winner: null },
    ]);
  }, [winnerMap]);

  const matchMeta = {
    r16: [
      {
        id: 89,
        date: "July 4, 2026",
        stadium: "Lincoln Financial Field, Philadelphia",
      },
      { id: 90, date: "July 4, 2026", stadium: "NRG Stadium, Houston" },
      { id: 93, date: "July 6, 2026", stadium: "AT&T Stadium, Arlington" },
      { id: 94, date: "July 6, 2026", stadium: "Lumen Field, Seattle" },
      {
        id: 91,
        date: "July 5, 2026",
        stadium: "MetLife Stadium, East Rutherford",
      },
      { id: 92, date: "July 5, 2026", stadium: "Estadio Azteca, Mexico City" },
      {
        id: 95,
        date: "July 7, 2026",
        stadium: "Mercedes-Benz Stadium, Atlanta",
      },
      { id: 96, date: "July 7, 2026", stadium: "BC Place, Vancouver" },
    ],
    qf: [
      { id: 97, date: "July 9, 2026", stadium: "Gillette Stadium, Foxborough" },
      {
        id: 99,
        date: "July 11, 2026",
        stadium: "Hard Rock Stadium, Miami Gardens",
      },
      { id: 98, date: "July 10, 2026", stadium: "SoFi Stadium, Inglewood" },
      {
        id: 100,
        date: "July 11, 2026",
        stadium: "Arrowhead Stadium, Kansas City",
      },
    ],
    sf: [
      { id: 101, date: "July 14, 2026", stadium: "AT&T Stadium, Arlington" },
      {
        id: 102,
        date: "July 15, 2026",
        stadium: "Mercedes-Benz Stadium, Atlanta",
      },
    ],
    third: [
      {
        id: 103,
        date: "July 18, 2026",
        stadium: "Hard Rock Stadium, Miami Gardens",
      },
    ],
    final: [
      {
        id: 104,
        date: "July 19, 2026",
        stadium: "MetLife Stadium, East Rutherford",
      },
    ],
  };

  const Flag = (team) =>
    team ? (
      <img
        src={`https://flagcdn.com/w40/${countryFlags[team]}.png`}
        className="w-5 h-4 rounded-sm object-cover"
        alt={team}
      />
    ) : null;

  const handlePick = (stage, index, team) => {
    if (!team) return;

    if (stage === "r16") {
      setRound16((prev) => {
        const updated = [...prev];
        updated[index].winner = team;
        return updated;
      });

      const r16ToQFMap = {
        0: { qf: 0, slot: 0 },
        1: { qf: 0, slot: 1 },
        2: { qf: 1, slot: 0 },
        3: { qf: 1, slot: 1 },
        4: { qf: 2, slot: 0 },
        5: { qf: 2, slot: 1 },
        6: { qf: 3, slot: 0 },
        7: { qf: 3, slot: 1 },
      };

      const target = r16ToQFMap[index];

      if (target) {
        setQuarter((prev) => {
          const copy = [...prev];
          copy[target.qf].teams[target.slot] = team;
          return copy;
        });
      }
    }

    if (stage === "qf") {
      setQuarter((prev) => {
        const updated = [...prev];
        updated[index].winner = team;
        return updated;
      });

      setSemi((prev) => {
        const copy = [...prev];

        const qfMap = {
          0: { sf: 0, slot: 0 },
          1: { sf: 1, slot: 0 },
          2: { sf: 0, slot: 1 },
          3: { sf: 1, slot: 1 },
        };

        const target = qfMap[index];
        if (target) {
          copy[target.sf].teams[target.slot] = team;
        }

        return copy;
      });
    }

    if (stage === "sf") {
      setSemi((prev) => {
        const updated = [...prev];
        updated[index].winner = team;

        const loser =
          updated[index].teams[0] === team
            ? updated[index].teams[1]
            : updated[index].teams[0];

        const slot = index === 0 ? 0 : 1;

        setFinal((prevF) => {
          const copy = [...prevF];
          copy[0].teams[slot] = team;
          return copy;
        });

        setThird((prevT) => {
          const copy = [...prevT];
          copy[0].teams[slot] = loser;
          return copy;
        });

        return updated;
      });
    }

    if (stage === "final") {
      setFinal((prev) => {
        const updated = [...prev];
        updated[0].winner = team;

        const loser = updated[0].teams.find((t) => t && t !== team);
        setRunnerUp(loser);
        setChampion(team);

        return updated;
      });
    }

    if (stage === "third") {
      setThird((prev) => {
        const updated = [...prev];
        updated[0].winner = team;

        const fourthPlace =
          updated[0].teams[0] === team
            ? updated[0].teams[1]
            : updated[0].teams[0];

        setSemiFinalLoser(fourthPlace || "");

        return updated;
      });

      setThirdPlace(team);

      setTimeout(() => setShowModal(true), 300);
    }
  };

  const Match = ({ match, stage, index }) => {
    const teamA = match.a ?? match.teams?.[0];
    const teamB = match.b ?? match.teams?.[1];

    const meta =
      matchMeta[stage]?.find((m) => m.id === match.id) ||
      matchMeta[stage]?.[index];

    const matchNumber = match.id || meta?.id || "";

    return (
      <div className="w-64 bg-white/15 backdrop-blur-xl border font-semibold border-white/30 rounded-xl p-3 shadow-2xl shadow-black/40 text-black">
        <div className="flex justify-between items-center p-2">
          <div className="flex items-center gap-2">
            {Flag(teamA)}
            <span className="text-sm">{teamA || "-"}</span>
          </div>

          <button
            onClick={() => handlePick(stage, index, teamA)}
            disabled={!teamA}
            className="px-2 py-1 text-xs rounded bg-gray-800 text-white hover:bg-green-500 hover:text-black cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          >
            Pick
          </button>
        </div>

        <div className="text-center text-black text-xs my-1 font-bold">VS</div>

        <div className="flex justify-between items-center p-2">
          <div className="flex items-center gap-2">
            {Flag(teamB)}
            <span className="text-sm">{teamB || "-"}</span>
          </div>

          <button
            onClick={() => handlePick(stage, index, teamB)}
            disabled={!teamB}
            className="px-2 py-1 text-xs rounded bg-gray-800 text-white hover:bg-green-500 hover:text-black cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          >
            Pick
          </button>
        </div>

        {meta && (
          <div className="mt-3 text-[10px] border-t border-black/20 pt-2 flex justify-between text-black/70">
            <div>
              <div className="font-bold text-black">Match {matchNumber}</div>
              <div>{meta.stadium}</div>
            </div>
            <div className="text-right">{meta.date}</div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-blue-900 to-green-600 text-black overflow-x-auto font-poppins">
      <NavBar />

      <div className="p-10">
        <div className="mt-24 lg:mt-15 mb-10 lg:mb-5 hidden lg:grid grid-cols-4 text-center text-white/70 font-bold text-sm uppercase">
          <div>- ROUND OF 16 -</div>
          <div>- QUARTER FINALS - </div>
          <div>- SEMI FINALS -</div>
          <div>- FINALS -</div>
        </div>

        <div className="grid grid-cols-5 gap-105 items-center mt-10">
          <div className="flex flex-col gap-10 ml-10">
            {round16.map((m, i) => (
              <Match key={m.id} match={m} stage="r16" index={i} />
            ))}
          </div>

          <div className="flex flex-col gap-[220px]">
            {quarter.map((m, i) => (
              <Match key={i} match={m} stage="qf" index={i} />
            ))}
          </div>

          <div className="flex flex-col gap-[545px]">
            {semi.map((m, i) => (
              <Match key={i} match={m} stage="sf" index={i} />
            ))}
          </div>

          <div className="flex flex-col justify-center items-center ml-10">
            {final.map((m, i) => (
              <Match key={i} match={m} stage="final" index={i} />
            ))}

            {champion && (
              <div className="mt-5 text-lg text-black font-bold">
                {champion}
              </div>
            )}

            <div className="mt-10">
              <div className="text-white/70 font-bold mb-3">THIRD PLACE</div>
              {third.map((m, i) => (
                <Match key={i} match={m} stage="third" index={i} />
              ))}
              {thirdPlace && (
                <div className="mt-5 text-lg text-center text-black font-bold">
                  {thirdPlace}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-[350px] text-white shadow-2xl">
            <h2 className="text-xl font-bold text-center mb-4">
              FIFA WORLD CUP - <span className="text-green-500">2 </span>
              <span className="text-red-500">0 </span>
              <span className="text-white">2 </span>
              <span className="text-blue-500">6</span>
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>1st Place</span>
                <span className="text-[#FFD700] font-bold">{champion}</span>
              </div>

              <div className="flex justify-between">
                <span>2nd Place</span>
                <span className="text-[#C0C0C0]">{runnerUp}</span>
              </div>

              <div className="flex justify-between">
                <span>3rd Place</span>
                <span className="text-[#CD7F32]">{thirdPlace}</span>
              </div>

              <div className="flex justify-between">
                <span>4th Place</span>
                <span className="text-gray-400">{semiFinalLoser}</span>
              </div>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-5 w-full bg-green-500 hover:bg-green-600 text-black font-bold py-2 rounded-lg cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bracket;
