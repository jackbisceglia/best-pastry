/* eslint-disable @next/next/no-img-element */
import { Pastry } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

type PastryCardProps = Pastry & {
  handleVote: (id: string) => void;
  loadState: boolean;
  hasHigherElo: boolean;
};

const PastryCard: React.FC<PastryCardProps> = ({
  name,
  id,
  elo,
  picture_url,
  handleVote,
  loadState,
  hasHigherElo,
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-10/12 sm:w-4/12">
      <h1 className="text-lg font-semibold text-center py-2 capitalize w-11/12">
        {name}{" "}
        <span
          className={`font-normal text-xs text-${
            hasHigherElo ? "emerald" : "red"
          }-700`}
        >
          {elo}
        </span>
      </h1>

      <div className="h-32 w-32 relative">
        <Image
          src={picture_url}
          alt={name}
          layout="fill" // required
          objectFit="cover" // change to suit your needs
          priority
          className="h-32 w-32 object-cover border-2 border-emerald-700 rounded-full"
        />
      </div>
      <div className="py-2"></div>
      <button
        disabled={loadState}
        onClick={() => handleVote(id)}
        className="py-1 px-4 rounded-sm bg-emerald-700 text-emerald-100"
      >
        vote
      </button>
      <div className="py-2"></div>
    </div>
  );
};

export default PastryCard;
