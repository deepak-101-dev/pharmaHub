import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, ImageBackground, Alert } from "react-native";
import { Card, TextInput, Button } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome } from "@expo/vector-icons";

const OrderStatusChangeScreen = () => {


    const [searchQuery, setSearchQuery] = useState("");
    // const [orders, setOrders] = useState([
    //     { id: "1", orderNumber: "ORD12345", status: "Invoiced" },
    //     { id: "2", orderNumber: "ORD12346", status: "Dispatched/Picked-up" },
    //     { id: "3", orderNumber: "ORD12347", status: "Delivered" },
    // ]);


    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/v1/orders');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setOrders(data); // Update the state with the fetched orders
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []); // Runs only once 


    const handleStatusChange = (orderId, newStatus) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    const handleSubmit = (orderId) => {
        const updatedOrder = orders.find((order) => order.id === orderId);
        Alert.alert("Status Updated", `Order ${updatedOrder.orderNumber} is now ${updatedOrder.status}`);
        // Here, you can send an API request to update the order status in the backend
    };

    return (
        <ImageBackground
            source={{ uri: "https://www.example.com/order-bg.jpg" }} // Replace with actual image URL
            style={{ flex: 1, padding: 20, backgroundColor: "#F4F7F9", minHeight: "100%" }}
        >
            <Card style={{ padding: 25, borderRadius: 20, elevation: 5, backgroundColor: "#FFFFFF" }}>
                <Text style={{ fontSize: 22, fontWeight: "bold", color: "#4CAF50", marginBottom: 15, textAlign: "center" }}>
                    📦 Order Status Change
                </Text>

                {/* Search Bar */}
                <TextInput
                    label="Search by Order Number"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    style={{ borderRadius: 10, marginBottom: 15 }}
                    left={<TextInput.Icon icon="magnify" />}
                />

                {/* Order List */}
                <FlatList
                    data={orders.filter((item) => item.orderNumber.includes(searchQuery))}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: "#ddd", backgroundColor: "#f9f9f9", borderRadius: 10, marginBottom: 10 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <FontAwesome name="list-alt" size={24} color="#4CAF50" style={{ marginRight: 10 }} />
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}>Order: {item.orderNumber}</Text>
                                    <Text style={{ fontSize: 16, color: "#666" }}>Current Status: {item.status}</Text>
                                </View>
                            </View>

                            {/* Status Dropdown */}
                            <Picker
                                selectedValue={item.status}
                                style={{ height: 40, width: "100%", backgroundColor: "#E8F5E9", borderRadius: 10, marginVertical: 10 }}
                                onValueChange={(value) => handleStatusChange(item.id, value)}
                            >
                                <Picker.Item label="Invoiced" value="Invoiced" />
                                <Picker.Item label="Dispatched/Picked-up" value="Dispatched/Picked-up" />
                                <Picker.Item label="Delivered" value="Delivered" />
                            </Picker>

                            {/* Submit Button */}
                            <Button
                                mode="contained"
                                onPress={() => handleSubmit(item.id)}
                                style={{ marginTop: 10, borderRadius: 10, backgroundColor: "#4CAF50" }}
                            >
                                Confirm Status Change
                            </Button>
                        </View>
                    )}
                />
            </Card>
        </ImageBackground>
    );
};

export default OrderStatusChangeScreen;