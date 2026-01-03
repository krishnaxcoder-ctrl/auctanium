"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MessageSquare01,
  SearchSm,
  Send01,
  Check,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";

const conversations = [
  {
    id: "1",
    name: "TechStore Premium",
    avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
    lastMessage: "Your order has been shipped! Tracking number: 1Z999AA10123456784",
    time: "2h ago",
    unread: true,
    online: true,
  },
  {
    id: "2",
    name: "Vintage Collectibles",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    lastMessage: "Thank you for your purchase! Let me know if you have any questions.",
    time: "5h ago",
    unread: true,
    online: false,
  },
  {
    id: "3",
    name: "Support Team",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    lastMessage: "Your verification is complete! You can now bid on premium auctions.",
    time: "1d ago",
    unread: false,
    online: true,
  },
  {
    id: "4",
    name: "Camera World",
    avatar: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=100&h=100&fit=crop",
    lastMessage: "The Canon EOS R5 includes all original accessories and warranty.",
    time: "2d ago",
    unread: false,
    online: false,
  },
  {
    id: "5",
    name: "Gaming Hub",
    avatar: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=100&h=100&fit=crop",
    lastMessage: "Great doing business with you! Enjoy your PS5!",
    time: "3d ago",
    unread: false,
    online: false,
  },
];

const messages = [
  {
    id: "1",
    sender: "TechStore Premium",
    content: "Hi! Your order has been confirmed and is being prepared for shipping.",
    time: "Yesterday, 2:30 PM",
    isOwn: false,
  },
  {
    id: "2",
    sender: "You",
    content: "Great! When can I expect it to be shipped?",
    time: "Yesterday, 2:35 PM",
    isOwn: true,
  },
  {
    id: "3",
    sender: "TechStore Premium",
    content: "It will be shipped today. You should receive the tracking number within a few hours.",
    time: "Yesterday, 2:40 PM",
    isOwn: false,
  },
  {
    id: "4",
    sender: "TechStore Premium",
    content: "Your order has been shipped! Tracking number: 1Z999AA10123456784",
    time: "Today, 10:15 AM",
    isOwn: false,
  },
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState("");

  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-primary flex items-center gap-3">
        <MessageSquare01 className="size-7 text-brand-600" />
        Messages
      </h1>

      {/* Messages Container */}
      <div className="bg-primary border border-secondary rounded-xl overflow-hidden">
        <div className="grid lg:grid-cols-3 h-[600px]">
          {/* Conversations List */}
          <div className="border-r border-secondary overflow-y-auto">
            {/* Search */}
            <div className="p-4 border-b border-secondary">
              <div className="relative">
                <SearchSm className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-tertiary" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="w-full pl-10 pr-4 py-2 text-sm border border-secondary rounded-lg bg-secondary focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            {/* Conversation List */}
            <div className="divide-y divide-secondary">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`w-full flex items-center gap-3 p-4 text-left transition-colors hover:bg-secondary ${
                    selectedConversation.id === conv.id ? "bg-brand-50" : ""
                  }`}
                >
                  <div className="relative">
                    <div className="size-12 rounded-full overflow-hidden bg-secondary">
                      <Image src={conv.avatar} alt={conv.name} fill className="object-cover" />
                    </div>
                    {conv.online && (
                      <div className="absolute bottom-0 right-0 size-3 bg-success-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-sm truncate ${conv.unread ? "font-semibold text-primary" : "font-medium text-secondary"}`}>
                        {conv.name}
                      </h3>
                      <span className="text-xs text-tertiary">{conv.time}</span>
                    </div>
                    <p className={`text-xs truncate mt-0.5 ${conv.unread ? "text-primary" : "text-tertiary"}`}>
                      {conv.lastMessage}
                    </p>
                  </div>
                  {conv.unread && (
                    <div className="size-2 rounded-full bg-brand-600" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center gap-3 p-4 border-b border-secondary">
              <div className="relative">
                <div className="size-10 rounded-full overflow-hidden bg-secondary">
                  <Image src={selectedConversation.avatar} alt={selectedConversation.name} fill className="object-cover" />
                </div>
                {selectedConversation.online && (
                  <div className="absolute bottom-0 right-0 size-2.5 bg-success-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-primary">{selectedConversation.name}</h3>
                <p className="text-xs text-tertiary">
                  {selectedConversation.online ? "Online" : "Offline"}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[70%] ${msg.isOwn ? "order-2" : ""}`}>
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        msg.isOwn
                          ? "bg-brand-600 text-white rounded-br-sm"
                          : "bg-secondary text-primary rounded-bl-sm"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                    <div className={`flex items-center gap-1 mt-1 ${msg.isOwn ? "justify-end" : ""}`}>
                      <span className="text-xs text-tertiary">{msg.time}</span>
                      {msg.isOwn && <Check className="size-3 text-brand-500" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-secondary">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2.5 text-sm border border-secondary rounded-lg bg-primary focus:outline-none focus:border-brand-500"
                />
                <Button color="primary" size="md" iconLeading={Send01}>
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
