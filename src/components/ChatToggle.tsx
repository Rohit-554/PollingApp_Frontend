import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatPanel from "./ChatPanel";

export default function ChatToggle({ socket, senderName }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg z-50"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Floating Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-[450px] bg-white border border-gray-300 rounded-xl shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-3 border-b">
            <h2 className="text-sm font-semibold text-gray-700">Chat</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          </div>
          {/* Chat Content */}
          <div className="flex-1">
            <ChatPanel socket={socket} senderName={senderName} />
          </div>
        </div>
      )}
    </>
  );
}
