"use client";

import { useState } from "react";
import {
  SearchLg,
  Send01,
  Paperclip,
  DotsHorizontal,
  Check,
  CheckDone01,
  Star01,
  Archive,
  Trash01,
  ArrowLeft,
} from "@untitledui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { EmptyState } from "@/components/application/empty-state/empty-state";

interface Message {
  id: string;
  text: string;
  time: string;
  isOwn: boolean;
  status: "sent" | "delivered" | "read";
}

interface Conversation {
  id: string;
  customer: {
    name: string;
    avatar: string;
  };
  lastMessage: string;
  time: string;
  unread: number;
  orderId?: string;
  messages: Message[];
}

const conversations: Conversation[] = [
  {
    id: "1",
    customer: {
      name: "Sarah Mitchell",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    lastMessage: "Thanks for the quick response! I'll place the order now.",
    time: "2 min ago",
    unread: 2,
    orderId: "ORD-7829",
    messages: [
      { id: "1", text: "Hi! I'm interested in the vintage watch. Is it still available?", time: "10:30 AM", isOwn: false, status: "read" },
      { id: "2", text: "Yes, it's still available! Would you like more details?", time: "10:32 AM", isOwn: true, status: "read" },
      { id: "3", text: "That would be great. What's the condition like?", time: "10:35 AM", isOwn: false, status: "read" },
      { id: "4", text: "It's in excellent condition. Minor wear on the band but the mechanism works perfectly. I can send more photos if you'd like.", time: "10:38 AM", isOwn: true, status: "read" },
      { id: "5", text: "Thanks for the quick response! I'll place the order now.", time: "10:40 AM", isOwn: false, status: "read" },
    ],
  },
  {
    id: "2",
    customer: {
      name: "James Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    lastMessage: "When will my order be shipped?",
    time: "1 hour ago",
    unread: 1,
    orderId: "ORD-7815",
    messages: [
      { id: "1", text: "Hello, I placed an order yesterday. Order #ORD-7815", time: "9:00 AM", isOwn: false, status: "read" },
      { id: "2", text: "When will my order be shipped?", time: "9:01 AM", isOwn: false, status: "delivered" },
    ],
  },
  {
    id: "3",
    customer: {
      name: "Emily Davis",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    lastMessage: "Perfect, thank you so much!",
    time: "3 hours ago",
    unread: 0,
    messages: [
      { id: "1", text: "Do you offer international shipping?", time: "6:00 AM", isOwn: false, status: "read" },
      { id: "2", text: "Yes, we ship worldwide! Shipping costs vary by location.", time: "6:15 AM", isOwn: true, status: "read" },
      { id: "3", text: "Perfect, thank you so much!", time: "6:20 AM", isOwn: false, status: "read" },
    ],
  },
  {
    id: "4",
    customer: {
      name: "Michael Brown",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    lastMessage: "I'd like to request a refund for order #ORD-7801",
    time: "Yesterday",
    unread: 0,
    orderId: "ORD-7801",
    messages: [
      { id: "1", text: "I'd like to request a refund for order #ORD-7801", time: "Yesterday", isOwn: false, status: "read" },
      { id: "2", text: "I'm sorry to hear that. Could you tell me what went wrong?", time: "Yesterday", isOwn: true, status: "read" },
    ],
  },
  {
    id: "5",
    customer: {
      name: "Lisa Anderson",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    },
    lastMessage: "Is this item authentic?",
    time: "2 days ago",
    unread: 0,
    messages: [
      { id: "1", text: "Is this item authentic?", time: "2 days ago", isOwn: false, status: "read" },
      { id: "2", text: "Yes, all our items are 100% authentic. We provide certificates of authenticity for luxury items.", time: "2 days ago", isOwn: true, status: "read" },
    ],
  },
];

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [showChat, setShowChat] = useState(false);

  const filteredConversations = conversations.filter((conv) =>
    conv.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setShowChat(true);
  };

  const handleBackToList = () => {
    setShowChat(false);
  };

  return (
    <div className="flex flex-col h-full overflow-x-hidden max-w-full">
      {/* Main Content */}
      <div className="flex flex-1 border border-secondary bg-primary overflow-hidden min-h-0 rounded-xl">
        {/* Conversations List - Hidden on mobile when chat is shown */}
        <div className={`${showChat ? 'hidden' : 'flex'} md:flex w-full md:w-80 border-r border-secondary flex-col min-h-0`}>
          {/* Search */}
          <div className="p-3 sm:p-4 border-b border-secondary">
            <Input
              icon={SearchLg}
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(value) => setSearchQuery(value)}
            />
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => handleSelectConversation(conversation)}
                className={`w-full flex items-start gap-3 p-3 sm:p-4 text-left hover:bg-secondary/50 transition-colors ${
                  selectedConversation?.id === conversation.id ? "bg-secondary/70" : ""
                }`}
              >
                <div className="relative flex-shrink-0">
                  <Avatar src={conversation.customer.avatar} alt={conversation.customer.name} size="md" />
                  {conversation.unread > 0 && (
                    <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-brand-600 text-xs font-medium text-white">
                      {conversation.unread}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-sm font-medium truncate ${conversation.unread > 0 ? "text-primary" : "text-secondary"}`}>
                      {conversation.customer.name}
                    </span>
                    <span className="text-xs text-tertiary flex-shrink-0">{conversation.time}</span>
                  </div>
                  <p className={`text-sm truncate mt-0.5 ${conversation.unread > 0 ? "text-primary font-medium" : "text-tertiary"}`}>
                    {conversation.lastMessage}
                  </p>
                  {conversation.orderId && (
                    <Badge type="pill-color" size="sm" color="gray" className="mt-1">
                      {conversation.orderId}
                    </Badge>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area - Hidden on mobile when list is shown */}
        <div className={`${showChat ? 'flex' : 'hidden'} md:flex flex-1 flex-col min-w-0 min-h-0`}>
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b border-secondary gap-2">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  {/* Back button - only on mobile */}
                  <button
                    onClick={handleBackToList}
                    className="md:hidden flex items-center justify-center size-8 rounded-lg hover:bg-secondary transition-colors flex-shrink-0"
                  >
                    <ArrowLeft className="size-5 text-tertiary" />
                  </button>
                  <Avatar src={selectedConversation.customer.avatar} alt={selectedConversation.customer.name} size="md" className="flex-shrink-0" />
                  <div className="min-w-0">
                    <h3 className="font-medium text-primary text-sm sm:text-base truncate">{selectedConversation.customer.name}</h3>
                    {selectedConversation.orderId && (
                      <p className="text-xs text-tertiary truncate">Re: Order {selectedConversation.orderId}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                  <Button color="tertiary" size="sm" iconLeading={Star01} className="hidden sm:flex" />
                  <Button color="tertiary" size="sm" iconLeading={Archive} className="hidden sm:flex" />
                  <Button color="tertiary" size="sm" iconLeading={Trash01} className="hidden sm:flex" />
                  <Button color="tertiary" size="sm" iconLeading={DotsHorizontal} />
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4">
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[70%] rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 ${
                        message.isOwn
                          ? "bg-brand-600 text-white"
                          : "bg-secondary text-primary"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <div className={`flex items-center justify-end gap-1 mt-1 ${message.isOwn ? "text-white/70" : "text-tertiary"}`}>
                        <span className="text-xs">{message.time}</span>
                        {message.isOwn && (
                          message.status === "read" ? (
                            <CheckDone01 className="size-3.5" />
                          ) : (
                            <Check className="size-3.5" />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="px-3 sm:px-6 py-3 sm:py-4 border-t border-secondary">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Button color="tertiary" size="sm" iconLeading={Paperclip} className="hidden sm:flex" />
                  <div className="flex-1 min-w-0">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(value) => setNewMessage(value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                  </div>
                  <Button
                    color="primary"
                    size="sm"
                    iconLeading={Send01}
                    onClick={handleSendMessage}
                    isDisabled={!newMessage.trim()}
                    className="flex-shrink-0"
                  >
                    <span className="hidden sm:inline">Send</span>
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-4">
              <EmptyState size="sm">
                <EmptyState.Header pattern="none">
                  <EmptyState.FeaturedIcon icon={SearchLg} color="gray" theme="light" />
                </EmptyState.Header>
                <EmptyState.Content>
                  <EmptyState.Title>Select a conversation</EmptyState.Title>
                  <EmptyState.Description>
                    Choose a conversation from the list to start messaging
                  </EmptyState.Description>
                </EmptyState.Content>
              </EmptyState>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
