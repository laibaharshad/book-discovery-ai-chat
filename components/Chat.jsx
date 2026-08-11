"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./Chat.module.css";

export default function Chat() {
    const { messages, sendMessage, status, stop } = useChat({
        transport: new DefaultChatTransport({
        api: "/api/chat",
        }),
    });
    const messagesContainerRef = useRef(null);
    const [isAtBottom, setIsAtBottom] = useState(true);
    const [input, setInput] = useState("");

    useEffect(() => {
        const container = messagesContainerRef.current;

        if (!container) return;

        function handleScroll() {
            const distanceFromBottom =
                container.scrollHeight -
                container.scrollTop -
                container.clientHeight;

            setIsAtBottom(distanceFromBottom < 50);
        }

        container.addEventListener("scroll", handleScroll);

        return () => {
            container.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const isLoading = status === "submitted" || status === "streaming";

    async function handleSubmit(e) {
        e.preventDefault();

        const text = input.trim();

        if (!text || isLoading) return;

        await sendMessage({ text });

        setInput("");
    }

    useLayoutEffect(() => {
        const container = messagesContainerRef.current;

        if (!container || !isAtBottom) return;

        container.scrollTop = container.scrollHeight;
    }, [messages, isAtBottom]);

    function scrollToLatest() {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTo({
                top: messagesContainerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }

        setIsAtBottom(true);
    }

    return (
        <div className={styles.chat}>
            <div
                ref={messagesContainerRef}
                className={styles.messages}
            >
            {messages.map((message) => (
            <div
                key={message.id}
                className={`${styles.message} ${
                    message.role === "user"
                        ? styles.userMessage
                        : styles.assistantMessage
                }`}
            >
            <strong className={styles.role}>
                {message.role === "user" ? "You" : "Assistant"}:
            </strong>{" "}

                {message.parts?.map((part, index) => {
                if (part.type === "text") {
                    return <span key={index}>{part.text}</span>;
                }

                return null;
                })}
            </div>
            ))}
        </div>

        {!isAtBottom && (
            <button
                type="button"
                onClick={scrollToLatest}
                className={styles.jumpButton}
            >
                ↓ Jump to latest
            </button>
        )}

        {status === "submitted" && (
            <p className={styles.thinking}>
                <span>Thinking</span>
                <span className={styles.dots}>...</span>
            </p>
        )}

        <form
            onSubmit={handleSubmit}
            className={styles.form}
        >
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                disabled={isLoading}
                autoComplete="off"
                className={styles.input}
            />

            {isLoading ? (
                <button
                    type="button"
                    onClick={stop}
                    className={`${styles.button} ${styles.stopButton}`}
                >
                    Stop
                </button>
            ) : (
                <button
                    type="submit"
                    className={`${styles.button} ${styles.sendButton}`}
                >
                    Send
                </button>
            )}
        </form>
        </div>
    );
}