import CardGame from "@/components/CardGame";

export default async function Home() {
  return (
    <div className="flex justify-center items-center gap-10 min-h-screen p-2 font-[family-name:var(--font-geist-sans)] bg-gray-100">
      <CardGame />
    </div>
  );
}
