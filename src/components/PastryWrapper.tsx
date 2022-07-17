import { trpc } from "../utils/trpc";
import { Pastry } from "@prisma/client";
import PastryCard from "./PastryCard";
import { useState } from "react";

const PastryWrapper: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="py-2">Pick your Pastry</h1>
      <PastryData />
    </div>
  );
};

const PastryData = () => {
  const { data, isError, isLoading, refetch, isFetched } = trpc.useQuery([
    "pastries.get-matchup",
  ]);
  const eloMutation = trpc.useMutation(["pastries.vote"]);

  const handleVote = (id: string) => {
    const winner = data!.find((pastry) => pastry?.id === id);
    const loser = data!.find((pastry) => pastry?.id !== id);

    if (!winner || !loser) return;

    eloMutation.mutate({
      winnerId: winner!.id,
      winnerElo: winner!.elo,
      loserId: loser!.id,
      loserElo: loser!.elo,
    });

    setTimeout(() => {
      eloMutation.reset();
      refetch();
    }, 1500);
  };
  const getStatus = () => {
    if (eloMutation.isLoading || isLoading) {
      return "Loading...";
    } else if (eloMutation.isError || isError) {
      return "Error";
    } else if (eloMutation.isSuccess) {
      return "Success";
    }
  };

  const getStatusClass = () => {
    let baseStyle = "text-center py-2 font-bold";

    if (eloMutation.isLoading) {
      baseStyle += " text-gray-500";
    } else if (eloMutation.isError) {
      baseStyle += " text-red-700";
    } else if (eloMutation.isSuccess) {
      baseStyle += " text-green-700";
    }
    return baseStyle;
  };

  if (isLoading) {
    return <h1>Fetching Pastries...</h1>;
  }

  if (isError || !data) {
    return <h1>No Pastries</h1>;
  }

  return (
    <>
      <button
        disabled={eloMutation.isLoading || isLoading}
        className="py-1 my-1 px-4 text-xs rounded-sm bg-gray-400 text-gray-50"
        onClick={() => refetch()}
      >
        New Matchup
      </button>
      <div className="w-8/12 lg:w-6/12 h-full flex flex-col sm:flex-row justify-evenly items-center">
        {data!.map((currPastry, idx) => (
          <PastryCard
            key={idx}
            {...currPastry!}
            handleVote={handleVote}
            loadState={isLoading || eloMutation.isLoading}
            hasHigherElo={(() => {
              let oppIdx = idx == 0 ? 1 : 0;
              return data[oppIdx]!.elo <= currPastry!.elo;
            })()}
          />
        ))}
      </div>
      <p className={getStatusClass()}>{getStatus()}</p>
    </>
  );
};

export default PastryWrapper;
