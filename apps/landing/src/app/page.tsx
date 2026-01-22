export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Welcome to Maintenance Management System</h1>
        <p className="text-lg">Marketing landing page - Running on port 3003 🚀</p>
        <p className="text-sm text-gray-500">Built with Next.js App Router + Tailwind CSS</p>
      </main>
    </div>
  )
}
