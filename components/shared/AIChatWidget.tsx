"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { Send, Sparkles, X } from "lucide-react";
import { useAIChat } from "@/hooks/useAIChat";

export type AIChatWidgetHandle = {
  focusInput: () => void;
};

type AIChatWidgetProps = {
  agentId?: string;
  variant?: "embedded" | "floating";
  title?: string;
  subtitle?: string;
  welcomeMessage?: string;
  disclaimer?: string;
  brandInitials?: string;
  accentColor?: string;
  inputPlaceholder?: string;
  error?: string | null;
};

const AIChatWidget = forwardRef<AIChatWidgetHandle, AIChatWidgetProps>(
  function AIChatWidget(
    {
      agentId,
      variant = "floating",
      title = "AI Advisor",
      subtitle = "Available 24/7",
      welcomeMessage = "Hi! I'm your AI advisor. Ask me anything about our services.",
      disclaimer = "AI may make errors. Verify with our counsellors.",
      brandInitials = "AI",
      accentColor,
      inputPlaceholder = "Type your question here...",
      error = null,
    },
    ref,
  ) {
    const inputRef = useRef<HTMLInputElement>(null);
    const { messages, isOpen, setOpen, sendMessage } = useAIChat({ agentId });

    useImperativeHandle(ref, () => ({
      focusInput: () => {
        inputRef.current?.focus();
        inputRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      },
    }));

    if (variant === "floating" && !isOpen) {
      return (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-20 right-4 cursor-pointer rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-lg"
        >
          AI Chat
        </button>
      );
    }

    const shellClass =
      variant === "embedded"
        ? "h-[min(620px,78vh)] w-full max-w-[360px]"
        : "fixed bottom-4 right-4 z-50 h-[min(620px,78vh)] w-[min(calc(100vw-2rem),360px)]";

    const chatMessages = messages.filter((message) => message.role === "user" || message.content);

    return (
      <div
        id={variant === "embedded" ? "hero-chat" : undefined}
        className={`chat-widget flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-black/20 ${shellClass}`}
        style={
          accentColor
            ? ({ "--color-primary": accentColor } as React.CSSProperties)
            : undefined
        }
      >
        <div className="chat-widget__header flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-sm font-bold text-white">
            {brandInitials}
          </div>

          <div className="min-w-0 flex-1">
            <div className="chat-widget__title truncate">{title}</div>
            <div className="chat-widget__subtitle truncate">{subtitle}</div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <div className="chat-widget__live-badge flex items-center gap-1.5 rounded-full px-2.5 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" aria-hidden />
              <span className="chat-widget__live-text">Live</span>
            </div>
            {variant === "floating" && (
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="chat-widget__close rounded-md p-1.5"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="chat-widget__intro flex items-start gap-2.5 border-b border-slate-200 px-4 py-3.5">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
          <div className="chat-widget__intro-text">{welcomeMessage}</div>
        </div>

        <div className="chat-widget__body flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-5">
          {error ? (
            <div className="chat-widget__empty m-auto text-center">{error}</div>
          ) : chatMessages.length === 0 ? (
            <div className="flex flex-1 items-center justify-center px-2">
              <div className="chat-widget__empty text-center">
                Ask a question to start the conversation.
              </div>
            </div>
          ) : (
            <div className="space-y-2.5">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={
                    message.role === "user"
                      ? "chat-widget__bubble chat-widget__bubble--user ml-auto"
                      : "chat-widget__bubble chat-widget__bubble--assistant mr-auto"
                  }
                >
                  {message.content}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="chat-widget__footer border-t border-slate-200 bg-white px-4 py-3.5">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const input = inputRef.current;
              if (input?.value.trim()) {
                sendMessage(input.value.trim());
                input.value = "";
              }
            }}
          >
            <div className="relative">
              <input
                ref={inputRef}
                name="message"
                placeholder={inputPlaceholder}
                disabled={Boolean(error)}
                className="chat-widget__input w-full rounded-full border border-slate-300 bg-white py-2.5 pl-4 pr-11 shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Chat message"
              />
              <button
                type="submit"
                disabled={Boolean(error)}
                className="chat-widget__send absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-white disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Send message"
              >
                <Send className="h-3.5 w-3.5" strokeWidth={2.5} />
              </button>
            </div>
          </form>
          <div className="chat-widget__disclaimer mt-3 text-center">{disclaimer}</div>
        </div>
      </div>
    );
  },
);

export default AIChatWidget;
