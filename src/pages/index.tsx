import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Navbar";
import PastryWrapper from "../components/PastryWrapper";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Pastry</title>
        <meta name="description" content="Find the best pastry" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PastryWrapper />
    </>
  );
};

export default Home;
