import { createRouter } from "./context";
import { z } from "zod";
import { Pastry } from "@prisma/client";

const getNewPastries = (p: Pastry[]) => {
  if (!p.length) return [];

  const pastryIsValid = (
    pastry: Pastry | undefined,
    toAvoid: string | undefined
  ) => {
    return pastry?.id !== toAvoid;
  };

  const getRandomPastry = (toAvoid: string | undefined): any => {
    const pastry = p[Math.floor(Math.random() * p.length)];
    return pastryIsValid(pastry, toAvoid) ? pastry : getRandomPastry(toAvoid);
  };

  const p1 = getRandomPastry(undefined);
  const p2 = getRandomPastry(p1.id);

  return [p1, p2];
};

const calculateElo = (winnerElo: number, loserElo: number) => {
  const winnerExpected = 1 / (1 + Math.pow(10, (loserElo - winnerElo) / 400));
  const loserExpected = 1 / (1 + Math.pow(10, (winnerElo - loserElo) / 400));

  const winnerNewElo = winnerElo + 32 * (1 - winnerExpected);
  const loserNewElo = loserElo + 32 * (0 - loserExpected);

  return [Math.floor(winnerNewElo), Math.floor(loserNewElo)];
};

export const exampleRouter = createRouter()
  .query("get-all", {
    async resolve({ ctx }) {
      return await ctx.prisma.pastry.findMany({
        orderBy: [
          {
            elo: "desc",
          },
        ],
      });
    },
  })
  .query("get-matchup", {
    input: z.object({}).nullish(),
    async resolve({ input, ctx }) {
      const allPastries: Pastry[] = await ctx.prisma.pastry.findMany();
      const newPastries = getNewPastries(allPastries);
      return newPastries;
    },
  })
  .mutation("vote", {
    input: z
      .object({
        winnerId: z.string().nullish(),
        winnerElo: z.number().nullish(),
        loserId: z.string().nullish(),
        loserElo: z.number().nullish(),
      })
      .nullish(),
    async resolve({ input, ctx }) {
      if (!input) return null;

      const { winnerElo, winnerId, loserElo, loserId } = input;

      if (!winnerId || !loserId) return null;

      const [winElo, loseElo] = calculateElo(winnerElo!, loserElo!);

      const winner = await ctx.prisma.pastry.update({
        where: { id: winnerId },
        data: { elo: winElo, num_wins: { increment: 1 } },
      });
      const loser = await ctx.prisma.pastry.update({
        where: { id: loserId },
        data: { elo: loseElo, num_losses: { increment: 1 } },
      });

      return winner && loser;
    },
  });
