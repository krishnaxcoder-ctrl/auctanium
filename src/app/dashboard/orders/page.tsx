"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Package,
  ChevronRight,
  FilterLines,
  Check,
  Truck01,
  Clock,
  Download01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";

const orders = [
  {
    id: "ORD-2024-001",
    item: {
      title: "Sony PlayStation 5 Console Bundle",
      image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=200&h=200&fit=crop",
    },
    price: 485,
    status: "delivered",
    orderDate: "Dec 15, 2024",
    deliveryDate: "Dec 18, 2024",
    trackingNumber: "1Z999AA10123456784",
  },
  {
    id: "ORD-2024-002",
    item: {
      title: "Canon EOS R5 Camera Body",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&h=200&fit=crop",
    },
    price: 2890,
    status: "shipped",
    orderDate: "Dec 12, 2024",
    deliveryDate: "Dec 20, 2024",
    trackingNumber: "1Z999AA10123456785",
  },
  {
    id: "ORD-2024-003",
    item: {
      title: "Apple AirPods Max",
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=200&h=200&fit=crop",
    },
    price: 420,
    status: "delivered",
    orderDate: "Dec 10, 2024",
    deliveryDate: "Dec 14, 2024",
    trackingNumber: "1Z999AA10123456786",
  },
  {
    id: "ORD-2024-004",
    item: {
      title: "DJI Mini 3 Pro Drone",
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=200&h=200&fit=crop",
    },
    price: 680,
    status: "processing",
    orderDate: "Dec 17, 2024",
    deliveryDate: "Pending",
    trackingNumber: null,
  },
  {
    id: "ORD-2024-005",
    item: {
      title: "Nintendo Switch OLED",
      image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=200&h=200&fit=crop",
    },
    price: 295,
    status: "delivered",
    orderDate: "Dec 8, 2024",
    deliveryDate: "Dec 12, 2024",
    trackingNumber: "1Z999AA10123456787",
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "delivered":
      return <Check className="size-4" />;
    case "shipped":
      return <Truck01 className="size-4" />;
    default:
      return <Clock className="size-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "delivered":
      return "success";
    case "shipped":
      return "brand";
    default:
      return "warning";
  }
};

export default function OrdersPage() {
  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(o => o.status === "delivered").length;
  const totalSpent = orders.reduce((sum, o) => sum + o.price, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-primary flex items-center gap-3">
            <Package className="size-7 text-brand-600" />
            My Orders
          </h1>
          <p className="mt-1 text-tertiary">
            Track and manage your orders
          </p>
        </div>
        <Button color="secondary" size="sm" iconLeading={FilterLines}>
          Filter
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-primary border border-secondary rounded-xl p-4">
          <div className="text-2xl font-semibold text-primary">{totalOrders}</div>
          <div className="text-xs text-tertiary">Total Orders</div>
        </div>
        <div className="bg-primary border border-secondary rounded-xl p-4">
          <div className="text-2xl font-semibold text-success-600">{deliveredOrders}</div>
          <div className="text-xs text-tertiary">Delivered</div>
        </div>
        <div className="bg-primary border border-secondary rounded-xl p-4">
          <div className="text-2xl font-semibold text-primary">${totalSpent.toLocaleString()}</div>
          <div className="text-xs text-tertiary">Total Spent</div>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-primary border border-secondary rounded-xl">
        <div className="border-b border-secondary px-4 py-3">
          <h2 className="text-sm font-semibold text-primary">All Orders</h2>
        </div>
        <div className="divide-y divide-secondary">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center gap-4 p-4 transition-colors hover:bg-secondary"
            >
              <div className="relative size-20 overflow-hidden rounded-lg bg-secondary">
                <Image src={order.item.image} alt={order.item.title} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-primary truncate">{order.item.title}</h3>
                <div className="mt-1 flex items-center gap-4 text-xs text-tertiary">
                  <span>Order: <span className="font-medium text-primary">{order.id}</span></span>
                  <span>${order.price}</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Badge
                    type="pill-color"
                    size="sm"
                    color={getStatusColor(order.status) as "success" | "brand" | "warning"}
                  >
                    <span className="flex items-center gap-1">
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </Badge>
                  <span className="text-xs text-tertiary">
                    {order.status === "delivered" ? `Delivered: ${order.deliveryDate}` : `Expected: ${order.deliveryDate}`}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {order.trackingNumber && (
                  <Button color="secondary" size="sm">
                    Track
                  </Button>
                )}
                <Button color="secondary" size="sm" iconLeading={Download01}>
                  Invoice
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
