import Navbar from "./Navbar";

export default function Layout({ children }: any) {
  return (
    <main className="w-full min-h-screen bg-gray-300">
      <Navbar />
      {children}
    </main>
  );
}
