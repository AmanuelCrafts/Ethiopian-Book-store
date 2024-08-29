import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ChatPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  // Initialize the Google Generative AI client with the API key
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  // Chat model configuration
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Initialize chat history with predefined conversation
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello" }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
  });

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    // Add the user message to the chat history
    const userMessage = { role: "user", content: inputValue };
    setMessages([...messages, userMessage]);

    try {
      // Send the user message to the model and await the response
      let result = await chat.sendMessage(inputValue);
      let botResponse = await result.response.text();

      // Remove asterisks from the bot response using a regular expression
      botResponse = botResponse.replace(/\*\**/g, "");

      // Add the bot's response to the chat history
      const botMessage = { role: "bot", content: botResponse };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      const errorMessage = {
        role: "bot",
        content: "Something went wrong, please try again!",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setInputValue(""); // Clear the input after sending
  };

  return (
    <div className="chat-container max-w-5xl mx-auto  h-[screen] py-4">
      <div className="messages-container bg-gray-100 rounded-lg h-[27rem] overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat ${
              msg.role === "user" ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-bubble">{msg.content}</div>
          </div>
        ))}
      </div>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type your message..."
        className="input input-bordered w-full mb-2 mt-1"
      />
      <button onClick={handleSendMessage} className="btn btn-primary w-full">
        Send
      </button>
    </div>
  );
};

export default ChatPage;
