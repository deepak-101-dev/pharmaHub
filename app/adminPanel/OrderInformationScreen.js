import React, { useState, useEffect } from "react";
import { View, Text, Button, ImageBackground, TouchableOpacity, ScrollView } from "react-native";
import { Card } from "react-native-paper";

import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome } from '@expo/vector-icons';

const OrderInformationScreen = () => {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [isFromDatePickerVisible, setFromDatePickerVisibility] = useState(false);
    const [isToDatePickerVisible, setToDatePickerVisibility] = useState(false);

    const showFromDatePicker = () => setFromDatePickerVisibility(true);
    const hideFromDatePicker = () => setFromDatePickerVisibility(false);

    const showToDatePicker = () => setToDatePickerVisibility(true);
    const hideToDatePicker = () => setToDatePickerVisibility(false);

    const [orderApiData, setOrderApiData] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);

    const handleConfirmFromDate = (date) => {
        setFromDate(date.toISOString().split('T')[0]);
        hideFromDatePicker();
    };

    const handleConfirmToDate = (date) => {
        setToDate(date.toISOString().split('T')[0]);
        hideToDatePicker();
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('https://d90c-2405-201-4025-9105-c8fd-6228-b972-1d8d.ngrok-free.app/api/v1/orders'); // Use the correct API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                console.log("setOrderApiData", data);

                setOrderApiData(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {

            }
        };

        fetchOrders(); // Call the function inside useEffect, not outside

    }, []);

    const filterOrders = () => {
        if (!fromDate || !toDate) return;
        const filtered = orderApiData.filter(order => {
            const orderDate = order.createdAt.split("T")[0];
            return orderDate >= fromDate && orderDate <= toDate;
        });
        setFilteredOrders(filtered);
        console.log("filteredOrders", filteredOrders);

    };

    return (
        <ImageBackground
            source={{ uri: "https://www.example.com/medical-settings-bg.jpg" }}
            style={{ flex: 1, padding: 20, backgroundColor: "#F4F7F9", minHeight: "100%" }}
        >
            <Card style={{ padding: 25, borderRadius: 20, elevation: 5, backgroundColor: "#FFFFFF" }}>
                <Text style={{ fontSize: 22, fontWeight: "bold", color: "#4CAF50", marginBottom: 15, textAlign: "center" }}>📅 Order Information</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                    <TouchableOpacity onPress={showFromDatePicker} style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#4CAF50', borderRadius: 10, padding: 10 }}>
                        <FontAwesome name="calendar" size={20} color="#4CAF50" style={{ marginRight: 10 }} />
                        <Text>{fromDate ? fromDate : "From Date"}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={showToDatePicker} style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#4CAF50', borderRadius: 10, padding: 10 }}>
                        <FontAwesome name="calendar" size={20} color="#4CAF50" style={{ marginRight: 10 }} />
                        <Text>{toDate ? toDate : "To Date"}</Text>
                    </TouchableOpacity>
                </View>

                <DateTimePickerModal
                    isVisible={isFromDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirmFromDate}
                    onCancel={hideFromDatePicker}
                />

                <DateTimePickerModal
                    isVisible={isToDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirmToDate}
                    onCancel={hideToDatePicker}
                />

                <Button title="Search Orders" color="#4CAF50" onPress={filterOrders} />
            </Card>
            <ScrollView style={{ marginTop: 20 }}>
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                        <Card key={order.id} style={{ padding: 15, marginBottom: 10, borderRadius: 10, backgroundColor: "#FFF", elevation: 3 }}>
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}>🧾 Invoice: {order.invoiceNumber}</Text>
                            <Text style={{ marginBottom: 5 }}>📌 Status: {order.status}</Text>
                            <Text style={{ marginBottom: 5 }}>💰 Total Bill: ₹{order.totalBill}</Text>
                            <Text style={{ marginBottom: 5 }}>✅ Paid Amount: ₹{order.paidAmount}</Text>
                            <Text style={{ marginBottom: 5 }}>⚠️ Pending Amount: ₹{order.pendingAmount}</Text>
                            <Text style={{ marginBottom: 5 }}>📅 Created At: {order.createdAt.split("T")[0]}</Text>
                        </Card>
                    ))
                ) : (
                    <Text style={{ textAlign: "center", fontSize: 16, color: "#999", marginTop: 20 }}>No data found</Text>
                )}
            </ScrollView>
        </ImageBackground>
    );
};

export default OrderInformationScreen