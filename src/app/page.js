"use client"

import KanbanBoard from "@/components/KanbanBoard";

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <h1 className="text-blue-500 text-4xl font-semibold text-center pt-10">Welcome to the my Kanban Board</h1>
      <KanbanBoard/>
    </main>
  );
}
