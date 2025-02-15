// import React, { useState } from "react";
// import { View, Text, TextInput, Button, FlatList, TouchableOpacity, ImageBackground } from "react-native";
// import { Card } from "react-native-paper";
// import { CheckCircle, XCircle, Search } from "lucide-react-native";

// const DrugLicenseApprovalScreen = () => {
//     const [searchText, setSearchText] = useState("");
//     const [pendingRequests, setPendingRequests] = useState([
//         { id: 1, name: "Chemist A", licenseNumber: "DL-12345", status: "Pending" },
//         { id: 2, name: "Chemist B", licenseNumber: "DL-67890", status: "Pending" },
//         { id: 3, name: "Chemist C", licenseNumber: "DL-54321", status: "Pending" }
//     ]);

//     const handleApproval = (id, status) => {
//         setPendingRequests(prevRequests =>
//             prevRequests.map(req => (req.id === id ? { ...req, status } : req))
//         );
//     };

//     const filteredRequests = pendingRequests.filter(request =>
//         request.name.toLowerCase().includes(searchText.toLowerCase())
//     );

//     return (
//         <ImageBackground
//             source={{ uri: "https://www.example.com/medical-approval-bg.jpg" }}
//             style={{ flex: 1, padding: 20, backgroundColor: "#F4F7F9", minHeight: "100%" }}
//         >
//             <Card style={{ padding: 25, marginBottom: 20, borderRadius: 20, elevation: 5, backgroundColor: "#FFFFFF" }}>
//                 <Text style={{ fontSize: 22, fontWeight: "bold", color: "#1565C0", marginBottom: 15, textAlign: "center" }}>🔍 Drug License Approval</Text>
//                 <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, padding: 12, borderRadius: 25, borderColor: "#1565C0", backgroundColor: "#FAFAFA" }}>
//                     <Search size={20} color="#1565C0" style={{ marginRight: 10 }} />
//                     <TextInput
//                         style={{ flex: 1, fontSize: 16 }}
//                         placeholder="Search Chemist..."
//                         value={searchText}
//                         onChangeText={setSearchText}
//                     />
//                 </View>
//             </Card>

//             <FlatList
//                 data={filteredRequests}
//                 keyExtractor={item => item.id.toString()}
//                 renderItem={({ item }) => (
//                     <Card style={{ padding: 20, marginBottom: 15, borderRadius: 15, backgroundColor: "#FFFFFF", elevation: 3 }}>
//                         <Text style={{ fontSize: 18, fontWeight: "bold", color: "#424242" }}>{item.name}</Text>
//                         <Text style={{ fontSize: 16, color: "#757575", marginBottom: 10 }}>License No: {item.licenseNumber}</Text>
//                         {item.status === "Pending" ? (
//                             <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
//                                 <TouchableOpacity
//                                     onPress={() => handleApproval(item.id, "Approved")}
//                                     style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#2E7D32", padding: 12, borderRadius: 10 }}
//                                 >
//                                     <CheckCircle size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
//                                     <Text style={{ color: "#FFFFFF", fontSize: 16 }}>Approve</Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity
//                                     onPress={() => handleApproval(item.id, "Rejected")}
//                                     style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#D32F2F", padding: 12, borderRadius: 10 }}
//                                 >
//                                     <XCircle size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
//                                     <Text style={{ color: "#FFFFFF", fontSize: 16 }}>Reject</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         ) : (
//                             <Text style={{ fontSize: 16, fontWeight: "bold", color: item.status === "Approved" ? "#2E7D32" : "#D32F2F", textAlign: "center" }}>{item.status}</Text>
//                         )}
//                     </Card>
//                 )}
//             />
//         </ImageBackground>
//     );
// };

// export default DrugLicenseApprovalScreen;
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ImageBackground,
    Alert,
    TouchableOpacity,
    Image,
    Modal,
} from "react-native";



const DrugLicenseApprovalScreen = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("https://d90c-2405-201-4025-9105-c8fd-6228-b972-1d8d.ngrok-free.app/api/v1/customer")
            .then((res) => res.json())
            .then((data) => {
                const filteredUsers = data.filter((user) => user.active === false);
                setUsers(filteredUsers);
            })
            .catch((error) => console.error("Error fetching customers:", error));
    }, []);

    function handleApproval(user) {
        fetch("https://d90c-2405-201-4025-9105-c8fd-6228-b972-1d8d.ngrok-free.app/api/v1/customer/approval", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ customerId: user.id, approved: true }),
        })
            .then((res) => res.json())
            .then(() => console.log("Approved"))
            .catch((err) => console.error(err));
    }

    function handleRejection(user) {
        fetch("https://d90c-2405-201-4025-9105-c8fd-6228-b972-1d8d.ngrok-free.app/api/v1/customer/approval", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ customerId: user.id, approved: false }),
        })
            .then((res) => res.json())
            .then(() => console.log("Rejected"))
            .catch((err) => console.error(err));
    }

    return (
        <ImageBackground
            source={{ uri: "https://www.example.com/medical-approval-bg.jpg" }}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.heading}>License Approval</Text>
                <View style={styles.cardsContainer}>
                    {users.map((user) => (
                        <View key={user.id} style={styles.cardWrapper}>
                            <ApprovalCard
                                user={user}
                                imageUri={
                                    user.drugLicenseNumber20BImage ||
                                    "https://images.unsplash.com/photo-1729505622656-6da75375c3a2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                }
                                onAccept={() => handleApproval(user)}
                                onReject={() => handleRejection(user)}
                            />
                        </View>
                    ))}
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

const ApprovalCard = ({ imageUri, onAccept, onReject }) => {
    const [status, setStatus] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleAccept = () => {
        Alert.alert("Confirmation", "Are you sure you want to accept the license?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Confirm",
                onPress: () => {
                    onAccept();
                    setStatus("accepted");
                },
            },
        ]);
    };

    const handleReject = () => {
        Alert.alert("Confirmation", "Are you sure you want to reject the license?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Confirm",
                onPress: () => {
                    onReject();
                    setStatus("rejected");
                },
            },
        ]);
    };

    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image source={{ uri: imageUri }} style={styles.image} />
            </TouchableOpacity>
            <Text style={styles.description}>Click to show full image</Text>
            <Modal
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
                animationType="fade"
            >
                <TouchableOpacity
                    style={styles.modalBackground}
                    onPress={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <Image source={{ uri: imageUri }} style={styles.largeImage} />
                    </View>
                </TouchableOpacity>
            </Modal>
            {status === null ? (
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleAccept}>
                        <Text style={styles.buttonText}>✔</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleReject}>
                        <Text style={styles.buttonText}>✖</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <Text style={styles.statusText}>
                    {status === "accepted" ? "Accepted License" : "Rejected License"}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundImage: { flex: 1 },
    container: { padding: 20, flexGrow: 1, width: "100%" },
    heading: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
    cardsContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", width: "100%" },
    cardWrapper: { width: "48%", marginBottom: 20 },
    cardContainer: { backgroundColor: "white", padding: 20, borderRadius: 10, borderWidth: 1, borderColor: "#ddd", marginBottom: 20 },
    image: { width: 100, height: 100, borderRadius: 10 },
    modalBackground: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.7)" },
    modalContainer: { backgroundColor: "white", padding: 20, borderRadius: 10 },
    largeImage: { width: 300, height: 300, resizeMode: "contain" },
    description: { fontSize: 14, color: "#555", marginVertical: 10, textAlign: "center" },
    buttonsContainer: { flexDirection: "row", justifyContent: "space-around", width: "100%" },
    button: { padding: 10, borderRadius: 30, margin: 5 },
    statusText: { fontSize: 16, fontWeight: "bold", color: "#333", marginTop: 15 },
});

export default DrugLicenseApprovalScreen;
