interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="bg-[#0E0A2B] border border-[#22194A] rounded-xl p-10 flex flex-col items-center gap-3 text-center">
      <span className="text-3xl">🎬</span>
      <p className="text-sm text-[#7B7497]">{message}</p>
    </div>
  );
}
