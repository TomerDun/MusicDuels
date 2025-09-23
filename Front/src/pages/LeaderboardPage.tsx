import { useEffect, useState } from "react";
import Leaderboard from "../components/leaderboardArea/Leaderboard";
import LeaderboardFilter from "../components/leaderboardArea/LeaderboardFilter";
import TopPlayerList from "../components/leaderboardArea/TopPlayerList";
import { getGlobalLeaderboard } from "../services/leaderboardService";
import type { LeaderboardItemType } from "../types/LeaderboardTypes";
import { Loader } from "@mantine/core";


export default function LeaderboardPage() {
  const [allItems, setAllItems] = useState<LeaderboardItemType[]>([]);
  const [items, setItems] = useState<LeaderboardItemType[]>([]);
  const [topThree, setTopThree] = useState<LeaderboardItemType[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);


  async function updateLeaderboard() {
    setLoading(true);
    const res = await getGlobalLeaderboard();
    setAllItems(res);
    setItems(res);
    setTopThree(res.slice(0, 3));
    setLoading(false);
  }

  useEffect(() => {
    updateLeaderboard();
  }, []);

  useEffect(() => {
    const filtered = allItems.filter((item) =>
      item.username.toLowerCase().includes(searchInput.toLowerCase())
    );
    setItems(filtered);
  }, [searchInput, allItems]);

  function handleSearchInput(text: string) {
    setSearchInput(text);
  }

  return (
    <div className="background-gradient min-h-screen" id="leaderboard-page">
      <div className="inner-container pb-10">
        <div
          id="header-container"
          className="flex flex-col items-center w-full p-5"
        >
          <h1 className="font-bold text-white text-4xl">Global Leaderboard</h1>
          <h2 className="text-gray-300">
            See how you stack up against the world's best music duelists
          </h2>
        </div>
        {loading ? (
          <div
            id="loader-container"
            className="flex justify-center items-center w-full h-[400px]"
          >
            <Loader color="indigo" size="xl" type="dots" />
          </div>
        ) : (
          <>
            <TopPlayerList items={topThree} />
            <LeaderboardFilter
              text={searchInput}
              handleChange={handleSearchInput}
            />
            <Leaderboard items={items} />
          </>
        )}
      </div>
    </div>
  );
}