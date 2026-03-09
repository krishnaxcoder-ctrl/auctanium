"use client";

import { useState, useEffect } from "react";
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
    RefreshCw01,
    CreditCard01,
    AlertCircle,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";

interface OrderItem {
    id: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    product_title: string;
    product_image: string | null;
    product_id: string;
}

interface Order {
    id: string;
    order_number: string;
    order_type: "buy-now" | "auction-won";
    subtotal: number;
    shipping_cost: number;
    tax: number;
    buyer_protection_fee: number;
    total_amount: number;
    payment_status: string;
    status: string;
    shipping_address: any;
    tracking_number: string | null;
    created_at: string;
    updated_at: string;
    order_items: OrderItem[];
}

interface OrdersData {
    orders: Order[];
    counts: {
        pendingPayment: number;
        processing: number;
        shipped: number;
        delivered: number;
        cancelled: number;
        total: number;
    };
}

const getStatusIcon = (status: string) => {
    switch (status) {
        case "delivered":
            return <Check className="size-4" />;
        case "shipped":
            return <Truck01 className="size-4" />;
        case "pending_payment":
            return <CreditCard01 className="size-4" />;
        case "cancelled":
        case "refunded":
            return <AlertCircle className="size-4" />;
        default:
            return <Clock className="size-4" />;
    }
};

const getStatusColor = (status: string): "success" | "brand" | "warning" | "error" | "gray" => {
    switch (status) {
        case "delivered":
            return "success";
        case "shipped":
            return "brand";
        case "pending_payment":
            return "warning";
        case "cancelled":
        case "refunded":
            return "error";
        default:
            return "gray";
    }
};

const getStatusLabel = (status: string): string => {
    const labels: Record<string, string> = {
        pending_payment: "Pending Payment",
        confirmed: "Confirmed",
        processing: "Processing",
        shipped: "Shipped",
        delivered: "Delivered",
        cancelled: "Cancelled",
        refunded: "Refunded",
    };
    return labels[status] || status;
};

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount);
};

export default function OrdersPage() {
    const [ordersData, setOrdersData] = useState<OrdersData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>("all");

    const fetchOrders = async () => {
        try {
            setIsLoading(true);
            setError(null);

            let url = "/api/orders";
            if (filter !== "all") {
                url += `?status=${filter}`;
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch orders");
            }

            const data = await response.json();
            setOrdersData(data);
        } catch (err: any) {
            console.error("Orders fetch error:", err);
            setError(err.message || "Failed to load orders");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [filter]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <RefreshCw01 className="size-8 animate-spin text-brand-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <p className="text-tertiary">{error}</p>
                    <Button color="secondary" size="sm" onClick={fetchOrders} className="mt-4">
                        Retry
                    </Button>
                </div>
            </div>
        );
    }

    const orders = ordersData?.orders || [];
    const counts = ordersData?.counts || {
        pendingPayment: 0,
        processing: 0,
        shipped: 0,
        delivered: 0,
        cancelled: 0,
        total: 0,
    };

    const totalSpent = orders
        .filter((o) => o.payment_status === "completed")
        .reduce((sum, o) => sum + Number(o.total_amount), 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-primary flex items-center gap-3">
                        <Package className="size-7 text-brand-600" />
                        My Orders
                    </h1>
                    <p className="mt-1 text-tertiary">Track and manage your orders</p>
                </div>
                <Button color="secondary" size="sm" iconLeading={FilterLines}>
                    Filter
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-primary border border-secondary rounded-xl p-4">
                    <div className="text-2xl font-semibold text-primary">{counts.total}</div>
                    <div className="text-xs text-tertiary">Total Orders</div>
                </div>
                <div className="bg-primary border border-secondary rounded-xl p-4">
                    <div className="text-2xl font-semibold text-warning-600">{counts.pendingPayment}</div>
                    <div className="text-xs text-tertiary">Pending Payment</div>
                </div>
                <div className="bg-primary border border-secondary rounded-xl p-4">
                    <div className="text-2xl font-semibold text-success-600">{counts.delivered}</div>
                    <div className="text-xs text-tertiary">Delivered</div>
                </div>
                <div className="bg-primary border border-secondary rounded-xl p-4">
                    <div className="text-2xl font-semibold text-primary">{formatCurrency(totalSpent)}</div>
                    <div className="text-xs text-tertiary">Total Spent</div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto">
                {[
                    { id: "all", label: "All" },
                    { id: "pending_payment", label: "Pending Payment" },
                    { id: "processing", label: "Processing" },
                    { id: "shipped", label: "Shipped" },
                    { id: "delivered", label: "Delivered" },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setFilter(tab.id)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                            filter === tab.id
                                ? "bg-brand-600 text-white"
                                : "bg-secondary text-tertiary hover:text-primary"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Orders List */}
            <div className="bg-primary border border-secondary rounded-xl">
                <div className="border-b border-secondary px-4 py-3">
                    <h2 className="text-sm font-semibold text-primary">
                        {filter === "all" ? "All Orders" : getStatusLabel(filter)}
                    </h2>
                </div>
                {orders.length === 0 ? (
                    <div className="p-8 text-center">
                        <p className="text-tertiary">No orders found</p>
                        <Link href="/marketplace">
                            <Button color="primary" size="sm" className="mt-4">
                                Start Shopping
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="divide-y divide-secondary">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="flex items-center gap-4 p-4 transition-colors hover:bg-secondary"
                            >
                                {/* First Item Image */}
                                <div className="relative size-20 overflow-hidden rounded-lg bg-secondary">
                                    {order.order_items[0]?.product_image ? (
                                        <Image
                                            src={order.order_items[0].product_image}
                                            alt={order.order_items[0].product_title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-tertiary text-xs">
                                            No image
                                        </div>
                                    )}
                                    {order.order_items.length > 1 && (
                                        <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                                            +{order.order_items.length - 1}
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-medium text-primary truncate">
                                        {order.order_items[0]?.product_title || "Order"}
                                        {order.order_items.length > 1 && ` and ${order.order_items.length - 1} more`}
                                    </h3>
                                    <div className="mt-1 flex items-center gap-4 text-xs text-tertiary">
                                        <span>
                                            Order:{" "}
                                            <span className="font-medium text-primary">{order.order_number}</span>
                                        </span>
                                        <span>{formatCurrency(Number(order.total_amount))}</span>
                                        <span className="capitalize">{order.order_type.replace("-", " ")}</span>
                                    </div>
                                    <div className="mt-2 flex items-center gap-2">
                                        <Badge type="pill-color" size="sm" color={getStatusColor(order.status)}>
                                            <span className="flex items-center gap-1">
                                                {getStatusIcon(order.status)}
                                                {getStatusLabel(order.status)}
                                            </span>
                                        </Badge>
                                        <span className="text-xs text-tertiary">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    {order.status === "pending_payment" && (
                                        <Link href={`/checkout?orderId=${order.id}`}>
                                            <Button color="primary" size="sm">
                                                Pay Now
                                            </Button>
                                        </Link>
                                    )}
                                    {order.tracking_number && (
                                        <Button color="secondary" size="sm">
                                            Track
                                        </Button>
                                    )}
                                    <Link href={`/dashboard/orders/${order.id}`}>
                                        <Button color="secondary" size="sm" iconLeading={ChevronRight}>
                                            Details
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
