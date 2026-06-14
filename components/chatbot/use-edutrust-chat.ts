"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ChatMode,
  EduTrustMessage,
  createMessage,
  generateEduTrustResponse,
  getWelcomeMessage
} from "@/lib/edutrust-ai";

const STORAGE_KEY = "edutrust-ai-chat-history";

export function useEduTrustChat() {
  const [messages, setMessages] = useState<EduTrustMessage[]>([]);
  const [mode, setMode] = useState<ChatMode>("assistant");
  const [isTyping, setIsTyping] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      setMessages(stored ? JSON.parse(stored) : [getWelcomeMessage()]);
    } catch {
      setMessages([getWelcomeMessage()]);
    } finally {
      setHasLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [hasLoaded, messages]);

  const latestSuggestions = useMemo(() => {
    return messages
      .slice()
      .reverse()
      .find((message) => message.role === "ai" && message.suggestions?.length)
      ?.suggestions;
  }, [messages]);

  function sendMessage(content: string) {
    const cleanContent = content.trim();
    if (!cleanContent || isTyping) return;

    const userMessage = createMessage("user", cleanContent);
    setMessages((current) => [...current, userMessage]);
    setIsTyping(true);

    window.setTimeout(() => {
      const response = generateEduTrustResponse(cleanContent, mode);
      setMessages((current) => [
        ...current,
        createMessage("ai", response.content, response.suggestions)
      ]);
      setIsTyping(false);
    }, 850);
  }

  function clearChat() {
    setMessages([getWelcomeMessage()]);
  }

  return {
    clearChat,
    hasLoaded,
    isTyping,
    latestSuggestions,
    messages,
    mode,
    sendMessage,
    setMode
  };
}
