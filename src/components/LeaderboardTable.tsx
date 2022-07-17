import { Pastry } from "@prisma/client";
import { trpc } from "../utils/trpc";

const tableEntry = "px-4 text-center";

const getTitle = (elo: number) => {
  const eloTitles = {
    2600: "Grandmaster",
    2200: "Master",
    1800: "Expert",
    1400: "Advanced",
    1000: "Intermediate",
    600: "Beginner",
    0: "Newbie",
  };

  for (const [low, title] of Object.entries(eloTitles).sort(
    (a, b) => Number(b[0]) - Number(a[0])
  )) {
    if (elo >= Number(low)) {
      return title;
    }
  }
};

type LeaderboardTableProps = {
  searchTerm: string;
};

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ searchTerm }) => {
  const { data, isError, isLoading } = trpc.useQuery(["pastries.get-all"]);

  if (isLoading) {
    return <h1>Fetching Pastries...</h1>;
  }

  if (isError) {
    return <h1>No Pastries</h1>;
  }

  const getRelevantRecords = () => {
    const searchString = searchTerm.toLowerCase();
    const relevantRecords = data!.filter((pastry) => {
      return pastry.name.toLowerCase().includes(searchString);
    });

    return relevantRecords.length ? relevantRecords : undefined;
  };

  if (!getRelevantRecords()) {
    return <h1>No Pastries Found</h1>;
  }

  return (
    <table className="table-auto text-lg">
      <thead className="">
        <tr className="px-10">
          <th className={tableEntry}>Pastry</th>
          <th className={tableEntry}>Rating</th>
          <th className={tableEntry}>Record</th>
          <th className={tableEntry}>Title</th>
        </tr>
      </thead>
      <tbody>
        {getRelevantRecords()!.map((pastry) => (
          <LeaderboardEntry key={pastry.id} {...pastry} />
        ))}
      </tbody>
    </table>
  );
};

const LeaderboardEntry: React.FC<Pastry> = ({
  name,
  elo,
  num_wins,
  num_losses,
}) => {
  return (
    <tr className="py-2">
      <td className={tableEntry}>{name}</td>
      <td className={tableEntry}>{elo}</td>
      <td className={tableEntry}>
        {num_wins} - {num_losses}
      </td>
      <td>{getTitle(elo)}</td>
    </tr>
  );
};

export default LeaderboardTable;
