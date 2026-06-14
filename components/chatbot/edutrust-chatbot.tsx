"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  BookOpenCheck,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  GraduationCap,
  Maximize2,
  MessageCircle,
  Minimize2,
  Moon,
  RotateCcw,
  Send,
  Sparkles,
  Sun,
  X
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChatMode, quickActions, getTimeGreeting } from "@/lib/edutrust-ai";
import { useEduTrustChat } from "./use-edutrust-chat";

const modeOptions: Array<{
  id: ChatMode;
  label: string;
  icon: typeof Bot;
}> = [
  { id: "assistant", label: "Assistant", icon: Bot },
  { id: "tutor", label: "Tutor", icon: BrainCircuit },
  { id: "career", label: "Counselor", icon: BriefcaseBusiness }
];

const actionIcons = [BriefcaseBusiness, GraduationCap, BookOpenCheck, Sparkles, Bot];

export function EduTrustChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);
  const {
    clearChat,
    hasLoaded,
    isTyping,
    latestSuggestions,
    messages,
    mode,
    sendMessage,
    setMode
  } = useEduTrustChat();

  useEffect(() => {
    if (!isOpen) return;
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isOpen, isTyping, messages]);

  function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(draft);
    setDraft("");
  }

  const isDark = theme === "dark";

  return (
    <div className="fixed bottom-5 right-5 z-50 font-['Manrope',ui-sans-serif,system-ui] sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {isOpen && (
          <motion.section
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={cn(
              "edutrust-gradient-border mb-4 overflow-hidden rounded-2xl p-px shadow-[0_24px_90px_rgba(15,23,42,0.32)]",
              isMaximized
                ? "h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] sm:h-[760px] sm:w-[760px]"
                : "h-[min(690px,calc(100vh-7rem))] w-[calc(100vw-2.5rem)] sm:w-[430px]"
            )}
            aria-label="Forgebot AI Assistant"
          >
            <div
              className={cn(
                "flex h-full flex-col rounded-2xl border backdrop-blur-2xl",
                isDark
                  ? "border-white/10 bg-slate-950/88 text-white"
                  : "border-slate-200/80 bg-white/88 text-slate-950"
              )}
            >
              <header
                className={cn(
                  "border-b p-4",
                  isDark ? "border-white/10" : "border-slate-200"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 text-white shadow-[0_0_32px_rgba(34,211,238,0.32)]">
                      <Bot className="h-6 w-6" />
                      <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-4 ring-slate-950/80" />
                    </div>
                    <div className="min-w-0">
                      <p
                        className={cn(
                          "text-xs font-semibold uppercase tracking-[0.18em]",
                          isDark ? "text-cyan-200" : "text-blue-700"
                        )}
                      >
                        {getTimeGreeting()}
                      </p>
                      <h2 className="truncate text-lg font-extrabold tracking-tight">
                        Forgebot AI Assistant
                      </h2>
                      <p className={cn("text-xs", isDark ? "text-slate-400" : "text-slate-500")}>
                        Courses, careers, exams, colleges
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    <IconButton
                      label="Toggle theme"
                      isDark={isDark}
                      onClick={() => setTheme(isDark ? "light" : "dark")}
                    >
                      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </IconButton>
                    <IconButton
                      label={isMaximized ? "Minimize window" : "Maximize window"}
                      isDark={isDark}
                      onClick={() => setIsMaximized((value) => !value)}
                    >
                      {isMaximized ? (
                        <Minimize2 className="h-4 w-4" />
                      ) : (
                        <Maximize2 className="h-4 w-4" />
                      )}
                    </IconButton>
                    <IconButton label="Close chat" isDark={isDark} onClick={() => setIsOpen(false)}>
                      <X className="h-4 w-4" />
                    </IconButton>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {modeOptions.map((option) => {
                    const Icon = option.icon;
                    const isActive = mode === option.id;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setMode(option.id)}
                        className={cn(
                          "flex min-h-10 items-center justify-center gap-2 rounded-lg border px-2 text-xs font-bold transition",
                          isActive
                            ? isDark
                              ? "border-cyan-300/70 bg-cyan-300/15 text-cyan-100 shadow-[0_0_22px_rgba(34,211,238,0.18)]"
                              : "border-blue-300 bg-blue-50 text-blue-700 shadow-[0_0_22px_rgba(37,99,235,0.12)]"
                            : isDark
                              ? "border-white/10 bg-white/[0.05] text-slate-300 hover:bg-white/[0.09]"
                              : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-white"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="hidden sm:inline">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </header>

              <div className="dashboard-scrollbar flex-1 overflow-y-auto p-4">
                {!hasLoaded ? (
                  <LoadingSkeleton isDark={isDark} />
                ) : (
                  <div className="space-y-4">
                    {messages.length <= 1 && (
                      <div
                        className={cn(
                          "rounded-xl border p-4 text-center",
                          isDark
                            ? "border-white/10 bg-white/[0.04]"
                            : "border-slate-200 bg-slate-50"
                        )}
                      >
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 text-white">
                          <GraduationCap className="h-7 w-7" />
                        </div>
                        <p
                          className={cn(
                            "mt-3 text-sm font-semibold",
                            isDark ? "text-slate-200" : "text-slate-700"
                          )}
                        >
                          Ask anything about your education, career, or learning journey.
                        </p>
                      </div>
                    )}

                    {messages.map((message) => (
                      <MessageBubble key={message.id} message={message} isDark={isDark} />
                    ))}

                    {isTyping && <TypingBubble isDark={isDark} />}
                    <div ref={endRef} />
                  </div>
                )}
              </div>

              <div
                className={cn(
                  "border-t p-4",
                  isDark ? "border-white/10 bg-slate-950/80" : "border-slate-200 bg-white/70"
                )}
              >
                <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
                  {(latestSuggestions ?? quickActions).slice(0, 5).map((action, index) => {
                    const Icon = actionIcons[index % actionIcons.length];

                    return (
                      <button
                        key={action}
                        type="button"
                        onClick={() => sendMessage(action)}
                        className={cn(
                          "flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold transition hover:-translate-y-0.5",
                          isDark
                            ? "border-white/10 bg-white/[0.06] text-slate-200 hover:border-cyan-300/50 hover:text-cyan-100"
                            : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700"
                        )}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {action}
                      </button>
                    );
                  })}
                </div>

                <form onSubmit={submitMessage} className="flex items-end gap-2">
                  <textarea
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        sendMessage(draft);
                        setDraft("");
                      }
                    }}
                    rows={1}
                    placeholder="Ask about courses, careers, exams..."
                    className={cn(
                      "max-h-28 min-h-12 flex-1 resize-none rounded-xl border px-4 py-3 text-sm font-medium outline-none transition focus:ring-2 focus:ring-cyan-300/50",
                      isDark
                        ? "border-white/10 bg-white/[0.06] text-white placeholder:text-slate-500"
                        : "border-slate-200 bg-slate-50 text-slate-950 placeholder:text-slate-400"
                    )}
                  />
                  <button
                    type="submit"
                    disabled={!draft.trim() || isTyping}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 text-white shadow-[0_14px_28px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45"
                    aria-label="Send message"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                  <IconButton label="Clear chat" isDark={isDark} onClick={clearChat}>
                    <RotateCcw className="h-4 w-4" />
                  </IconButton>
                </form>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        whileHover={{ y: -3, scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        className="group relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 text-white shadow-[0_18px_55px_rgba(37,99,235,0.38)]"
        aria-label={isOpen ? "Close Forgebot AI Assistant" : "Open Forgebot AI Assistant"}
      >
        <span className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 blur-xl transition group-hover:opacity-100" />
        {isOpen ? <X className="relative h-7 w-7" /> : <MessageCircle className="relative h-7 w-7" />}
        {!isOpen && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-70" />
            <span className="relative inline-flex h-5 w-5 rounded-full bg-cyan-300 ring-4 ring-slate-950" />
          </span>
        )}
      </motion.button>
    </div>
  );
}

function IconButton({
  children,
  isDark,
  label,
  onClick
}: {
  children: ReactNode;
  isDark: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition",
        isDark
          ? "border-white/10 bg-white/[0.05] text-slate-300 hover:bg-white/[0.1] hover:text-white"
          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-950"
      )}
    >
      {children}
    </button>
  );
}

function MessageBubble({
  isDark,
  message
}: {
  isDark: boolean;
  message: { role: "ai" | "user"; content: string; timestamp: string };
}) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm",
          isUser
            ? "rounded-br-md bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 text-white"
            : isDark
              ? "rounded-bl-md border border-white/10 bg-white/[0.06] text-slate-100"
              : "rounded-bl-md border border-slate-200 bg-white text-slate-700"
        )}
      >
        <p>{message.content}</p>
        <p className={cn("mt-2 text-[11px]", isUser ? "text-white/70" : "text-slate-400")}>
          {message.timestamp}
        </p>
      </div>
    </div>
  );
}

function TypingBubble({ isDark }: { isDark: boolean }) {
  return (
    <div className="flex justify-start">
      <div
        className={cn(
          "flex items-center gap-2 rounded-2xl rounded-bl-md border px-4 py-3",
          isDark ? "border-white/10 bg-white/[0.06]" : "border-slate-200 bg-white"
        )}
      >
        {[0, 1, 2].map((dot) => (
          <span
            key={dot}
            className="h-2 w-2 animate-bounce rounded-full bg-cyan-300"
            style={{ animationDelay: `${dot * 120}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

function LoadingSkeleton({ isDark }: { isDark: boolean }) {
  return (
    <div className="space-y-4">
      {[0, 1, 2].map((item) => (
        <div
          key={item}
          className={cn(
            "h-20 overflow-hidden rounded-2xl",
            isDark ? "bg-white/[0.06]" : "bg-slate-100"
          )}
        >
          <div className="h-full w-1/2 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      ))}
    </div>
  );
}
