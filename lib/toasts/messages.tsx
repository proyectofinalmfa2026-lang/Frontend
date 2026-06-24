import { toast } from "sonner";

export const showNewMessageToast = (
  senderName: string,
  preview: string,
  conversationId: string,
) =>
  toast.custom(
    (t) => (
      <a
        href={`/community/messages/${conversationId}`}
        onClick={() => toast.dismiss(t)}
        className="flex items-center gap-2 bg-[#0E0A2B] border border-[#3B82F6] rounded-lg px-3 py-2 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:border-[#60A5FA] transition-colors no-underline cursor-pointer max-w-72"
      >
        <span className="text-lg shrink-0">💬</span>
        <div className="min-w-0 flex-1">
          <p className="text-[#D6D0DC] font-medium text-xs truncate">
            {senderName}
          </p>
          <p className="text-[#7B7497] text-[11px] truncate leading-tight">
            {preview}
          </p>
        </div>
      </a>
    ),
    { position: "bottom-right", duration: 4000 },
  );
