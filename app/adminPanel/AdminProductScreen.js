// import React, { useState } from "react";
// import { View, Text, TextInput, Button, TouchableOpacity, ImageBackground } from "react-native";
// import { Card } from "react-native-paper";
// import { Upload, Package, FileText } from "lucide-react-native";
// import * as DocumentPicker from "expo-document-picker";

// const AdminProductScreen = () => {
//     const [productName, setProductName] = useState("");
//     const [description, setDescription] = useState("");
//     const [csvFile, setCsvFile] = useState(null);

//     const pickDocument = async () => {
//         let result = await DocumentPicker.getDocumentAsync({ type: "text/csv" });
//         if (!result.canceled) {
//             setCsvFile(result.uri);
//         }
//     };

//     const handleAddProduct = () => {
//         console.log("Adding Product:", productName, description);
//         // Call API to add product
//     };

//     const handleUploadCSV = () => {
//         if (csvFile) {
//             console.log("Uploading CSV File:", csvFile);
//             // Call API to upload CSV
//         }
//     };

//     return (
//         <ImageBackground
//             source={{ uri: "https://www.example.com/modern-medical-bg.jpg" }}
//             style={{ flex: 1, padding: 20, backgroundColor: "#F4F7F9", minHeight: "100%" }}
//         >
//             <Card style={{ padding: 30, marginBottom: 25, borderRadius: 20, elevation: 8, backgroundColor: "#FFFFFF", shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 12 }}>
//                 <Text style={{ fontSize: 24, fontWeight: "bold", color: "#2E7D32", marginBottom: 20, textAlign: "center" }}>➕ Add New Product</Text>
//                 <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, padding: 18, borderRadius: 25, marginTop: 12, borderColor: "#2E7D32", backgroundColor: "#FAFAFA" }}>
//                     <Package size={24} color="#2E7D32" style={{ marginRight: 10 }} />
//                     <TextInput
//                         style={{ flex: 1, fontSize: 16 }}
//                         placeholder="Enter Product Name"
//                         value={productName}
//                         onChangeText={setProductName}
//                     />
//                 </View>
//                 <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, padding: 18, borderRadius: 25, marginTop: 12, borderColor: "#2E7D32", backgroundColor: "#FAFAFA" }}>
//                     <FileText size={24} color="#2E7D32" style={{ marginRight: 10 }} />
//                     <TextInput
//                         style={{ flex: 1, fontSize: 16 }}
//                         placeholder="Enter Description"
//                         value={description}
//                         onChangeText={setDescription}
//                     />
//                 </View>
//                 <View style={{ marginTop: 20, borderRadius: 25, overflow: 'hidden' }}>
//                     <Button title="Submit" color="#1B5E20" onPress={handleAddProduct} />
//                 </View>
//             </Card>

//             <Card style={{ padding: 30, borderRadius: 20, elevation: 8, backgroundColor: "#FFFFFF", shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 12 }}>
//                 <Text style={{ fontSize: 24, fontWeight: "bold", color: "#2E7D32", marginBottom: 20, textAlign: "center" }}>📂 Upload Products CSV</Text>
//                 <TouchableOpacity
//                     onPress={pickDocument}
//                     style={{ padding: 18, backgroundColor: "#E8F5E9", borderRadius: 25, marginTop: 12, flexDirection: "row", alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 8 }}
//                 >
//                     <Text style={{ color: "#1B5E20", fontSize: 18, marginRight: 10 }}>{csvFile ? "✅ File Selected" : "📎 Choose CSV File"}</Text>
//                     <Upload size={28} color="#1B5E20" />
//                 </TouchableOpacity>
//                 <View style={{ marginTop: 20, borderRadius: 25, overflow: 'hidden' }}>
//                     <Button title="⬆️ Upload" color="#1B5E20" onPress={handleUploadCSV} disabled={!csvFile} />
//                 </View>
//             </Card>
//         </ImageBackground>
//     );
// };

// export default AdminProductScreen;


// import React, { useState } from "react";
// import { View, Text, TextInput, Button, TouchableOpacity, ImageBackground, ScrollView } from "react-native";
// import { Card } from "react-native-paper";
// import { Upload, Package, FileText, PlusCircle, MinusCircle, ChevronDown, ChevronUp } from "lucide-react-native";
// import * as DocumentPicker from "expo-document-picker";
// import * as Papa from "papaparse";

// const AdminProductScreen = () => {
//     const [productDetails, setProductDetails] = useState({
//         name: "",
//         description: "",
//         companyName: "",
//         composition: "",
//         packingName: "",
//         image: "",
//         createdAt: new Date().toISOString(),
//         createdBy: "ADMIN",
//         productInventoryList: [{
//             batchNumber: "",
//             expiryDate: "",
//             basicRate: "",
//             mrp: "",
//             purchaseRate: "",
//             saleRate: "",
//             discount: "",
//             inventoryCount: "",
//             hsncode: ""
//         }]
//     });
//     const [csvFile, setCsvFile] = useState(null);
//     const [showCSVCard, setShowCSVCard] = useState(false);

//     const handleInputChange = (field, value) => {
//         setProductDetails({ ...productDetails, [field]: value });
//     };

//     const handleInventoryChange = (index, field, value) => {
//         const updatedInventory = [...productDetails.productInventoryList];
//         updatedInventory[index][field] = value;
//         setProductDetails({ ...productDetails, productInventoryList: updatedInventory });
//     };

//     const addInventoryBatch = () => {
//         setProductDetails({
//             ...productDetails,
//             productInventoryList: [...productDetails.productInventoryList, {
//                 batchNumber: "",
//                 expiryDate: "",
//                 basicRate: "",
//                 mrp: "",
//                 purchaseRate: "",
//                 saleRate: "",
//                 discount: "",
//                 inventoryCount: "",
//                 hsncode: ""
//             }]
//         });
//     };

//     const removeInventoryBatch = (index) => {
//         const updatedInventory = productDetails.productInventoryList.filter((_, i) => i !== index);
//         setProductDetails({ ...productDetails, productInventoryList: updatedInventory });
//     };

//     const pickDocument = async () => {
//         let result = await DocumentPicker.getDocumentAsync({ type: "text/csv" });
//         if (!result.canceled) {
//             setCsvFile(result.uri);
//             processCSV(result.uri);
//         }
//     };

//     const processCSV = async (uri) => {
//         const response = await fetch(uri);
//         const text = await response.text();
//         const jsonData = Papa.parse(text, { header: true }).data;
//         console.log("CSV Converted to JSON:", jsonData);
//     };

//     return (
//         <ImageBackground source={{ uri: "https://www.example.com/modern-medical-bg.jpg" }} style={{ flex: 1, padding: 20 }}>
//             <ScrollView>
//                 <Card style={{ padding: 30, borderRadius: 20, elevation: 8, backgroundColor: "#FFF" }}>
//                     <Text style={{ fontSize: 24, fontWeight: "bold", color: "#2E7D32", textAlign: "center" }}>➕ Add New Product</Text>
//                     {Object.keys(productDetails).map((key) => (
//                         key !== "productInventoryList" && (
//                             <View key={key} style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, padding: 18, borderRadius: 25, marginTop: 12, borderColor: "#2E7D32", backgroundColor: "#FAFAFA" }}>
//                                 <FileText size={24} color="#2E7D32" style={{ marginRight: 10 }} />
//                                 <TextInput
//                                     style={{ flex: 1, fontSize: 16 }}
//                                     placeholder={`Enter ${key}`}
//                                     value={productDetails[key]}
//                                     onChangeText={(value) => handleInputChange(key, value)}
//                                 />
//                             </View>
//                         )
//                     ))}
//                     <Text style={{ fontSize: 20, fontWeight: "bold", color: "#2E7D32", marginTop: 20 }}>Inventory Details</Text>
//                     {productDetails.productInventoryList.map((batch, index) => (
//                         <View key={index} style={{ marginBottom: 15 }}>
//                             {Object.keys(batch).map((field) => (
//                                 <View key={field} style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, padding: 18, borderRadius: 25, marginTop: 8, borderColor: "#2E7D32", backgroundColor: "#FAFAFA" }}>
//                                     <Package size={24} color="#2E7D32" style={{ marginRight: 10 }} />
//                                     <TextInput
//                                         style={{ flex: 1, fontSize: 16 }}
//                                         placeholder={`Enter ${field}`}
//                                         value={batch[field]}
//                                         onChangeText={(value) => handleInventoryChange(index, field, value)}
//                                     />
//                                 </View>
//                             ))}
//                             {index > 0 && (
//                                 <TouchableOpacity onPress={() => removeInventoryBatch(index)}>
//                                     <MinusCircle size={28} color="red" />
//                                 </TouchableOpacity>
//                             )}
//                         </View>
//                     ))}
//                     <TouchableOpacity onPress={addInventoryBatch} style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
//                         <PlusCircle size={28} color="#1B5E20" />
//                         <Text style={{ color: "#1B5E20", fontSize: 16, marginLeft: 8 }}>Add More Batches</Text>
//                     </TouchableOpacity>
//                 </Card>
//             </ScrollView>
//             <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
//                 <TouchableOpacity onPress={() => setShowCSVCard(!showCSVCard)}>
//                     {showCSVCard ? <ChevronDown size={28} color="#1B5E20" /> : <ChevronUp size={28} color="#1B5E20" />}
//                 </TouchableOpacity>
//                 {showCSVCard && (
//                     <Card style={{ padding: 30, borderRadius: 20, backgroundColor: "#FFF" }}>
//                         <Text style={{ fontSize: 24, fontWeight: "bold", color: "#2E7D32", textAlign: "center" }}>📂 Upload CSV</Text>
//                         <TouchableOpacity onPress={pickDocument}>
//                             <Text style={{ color: "#1B5E20", fontSize: 18 }}>{csvFile ? "✅ File Selected" : "📎 Choose CSV File"}</Text>
//                             <Upload size={28} color="#1B5E20" />
//                         </TouchableOpacity>
//                     </Card>
//                 )}
//             </View>
//         </ImageBackground>
//     );
// };

// export default AdminProductScreen;


import React, { useState } from "react";
import { View, Text, KeyboardAvoidingView, TextInput, Button, Platform, ImageBackground, TouchableOpacity, ScrollView, Divider, SafeAreaView, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { Upload, Package, FileText, Tag, Calendar, DollarSign, Plus, Trash2, } from "lucide-react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from "expo-image-picker";

const AdminProductScreen = () => {
    const [productData, setProductData] = useState({
        companyName: "",
        composition: "",
        createdBy: "ADMIN",
        description: "",
        image: "",
        name: "",
        packingName: "",
        productInventoryList: [{
            basicRate: "",
            discount: "",
            expiryDate: "",
            hsncode: "",
            inventoryCount: "",
            mrp: "",
            purchaseRate: "",
            saleRate: ""
        }]
    });
    const [csvFile, setCsvFile] = useState(null);
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    const handleInputChange = (key, value) => {
        setProductData({ ...productData, [key]: value });
    };
    // Handle Expiry Date Change
    const handleConfirm = (date) => {
        const formattedDate = date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
        setProductData((prev) => ({
            ...prev,
            productInventoryList: prev.productInventoryList.map((item, index) =>
                index === 0 ? { ...item, expiryDate: formattedDate } : item
            ),
        }));
        setDatePickerVisible(false);
    };

    // Open Image Picker
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setProductData({ ...productData, image: result.assets[0].uri });
        }
    };

    const handleInventoryChange = (index, key, value) => {
        const updatedInventory = [...productData.productInventoryList];
        updatedInventory[index][key] = value;
        setProductData({ ...productData, productInventoryList: updatedInventory });
    };

    const addInventory = () => {
        setProductData({
            ...productData,
            productInventoryList: [...productData.productInventoryList, {
                basicRate: "",
                discount: "",
                expiryDate: "",
                hsncode: "",
                inventoryCount: "",
                mrp: "",
                purchaseRate: "",
                saleRate: ""
            }]
        });
    };

    // const removeInventory = (index) => {
    //     const updatedInventory = productData.productInventoryList.filter((_, i) => i !== index);
    //     setProductData({ ...productData, productInventoryList: updatedInventory });
    // };
    const removeInventory = (index) => {
        if (productData.productInventoryList.length > 1) {
            const updatedInventory = productData.productInventoryList.filter((_, i) => i !== index);
            setProductData({ ...productData, productInventoryList: updatedInventory });
        }
    };

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({ type: "text/csv" });
        if (!result.canceled) {
            setCsvFile(result.uri);
            console.log("CSV File Selected: ", result.uri);
        }
    };

    const handleSubmit = () => {
        console.log("Final Product Data:", JSON.stringify(productData, null, 2));
    };

    // return (<>

    //     <ScrollView style={{ flex: 1, padding: 20, backgroundColor: "#F4F7F9" }}>
    //         <Card style={{ padding: 20, borderRadius: 15 }}>
    //             <Text style={{ fontSize: 24, fontWeight: "bold", color: "#2E7D32", textAlign: "center" }}>➕ Add New Product</Text>

    //             <TouchableOpacity onPress={pickDocument} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", padding: 15, backgroundColor: "#E8F5E9", borderRadius: 10, marginTop: 15 }}>
    //                 <Text style={{ fontSize: 16, color: "#2E7D32", marginRight: 10 }}>{csvFile ? "✅ CSV Selected" : "📎 Upload CSV"}</Text>
    //                 <Upload size={24} color="#2E7D32" />
    //             </TouchableOpacity>

    //             <Text style={{ textAlign: "center", marginVertical: 10 }}>--- OR ---</Text>

    //             <View>
    //                 {Object.keys(productData).filter(key => key !== "productInventoryList").map((key, index) => (
    //                     <View key={index} style={{ marginVertical: 10 }}>
    //                         <Text style={{ fontWeight: "bold", marginBottom: 5 }}>{key}</Text>
    //                         <TextInput
    //                             style={{ borderWidth: 1, borderColor: "#2E7D32", borderRadius: 10, padding: 10, backgroundColor: "#FAFAFA" }}
    //                             placeholder={`Enter ${key}`}
    //                             value={productData[key]}
    //                             onChangeText={(text) => handleInputChange(key, text)}
    //                         />
    //                     </View>
    //                 ))}
    //             </View>

    //             <Text style={{ fontSize: 18, fontWeight: "bold", marginVertical: 10, textAlign: "center" }}>Inventory List</Text>
    //             {productData.productInventoryList.map((inventory, index) => (
    //                 <Card key={index} style={{ padding: 15, marginVertical: 10, borderRadius: 10 }}>
    //                     {Object.keys(inventory).map((key, idx) => (
    //                         <View key={idx} style={{ marginBottom: 10 }}>
    //                             <Text style={{ fontWeight: "bold", marginBottom: 5 }}>{key}</Text>
    //                             <TextInput
    //                                 style={{ borderWidth: 1, borderColor: "#2E7D32", borderRadius: 10, padding: 10, backgroundColor: "#FAFAFA" }}
    //                                 placeholder={`Enter ${key}`}
    //                                 value={inventory[key]}
    //                                 onChangeText={(text) => handleInventoryChange(index, key, text)}
    //                             />
    //                         </View>
    //                     ))}
    //                     <TouchableOpacity onPress={() => removeInventory(index)} style={{ alignSelf: "flex-end", marginTop: 10 }}>
    //                         <Trash2 size={20} color="red" />
    //                     </TouchableOpacity>
    //                 </Card>
    //             ))}

    //             <TouchableOpacity onPress={addInventory} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 10 }}>
    //                 <Plus size={24} color="#2E7D32" />
    //                 <Text style={{ fontSize: 16, color: "#2E7D32", marginLeft: 5 }}>Add Inventory</Text>
    //             </TouchableOpacity>

    //             <View style={{ marginTop: 20, borderRadius: 10, overflow: 'hidden' }}>
    //                 <Button title="Submit" color="#1B5E20" onPress={handleSubmit} />
    //             </View>
    //         </Card>
    //     </ScrollView>
    // </>
    // );

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
            {/* Heading with Background */}
            <ImageBackground
                source={require("./../../assets/images/backgroundImg.png")} // Replace with your image path
                style={styles.headingBackground}
            >
                <Text style={styles.heading}>➕ Add New Product</Text>
            </ImageBackground>

            <View style={{ padding: 20, borderRadius: 15, backgroundColor: "white" }}>
                {/* CSV Upload Section */}
                <TouchableOpacity onPress={pickDocument} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", padding: 15, backgroundColor: "#E0F4FF", borderRadius: 10, marginTop: 15 }}>
                    <Text style={{ fontSize: 16, color: "#0B678C", marginRight: 10 }}>{csvFile ? "✅ CSV Selected" : "📎 Upload CSV"}</Text>
                    <Upload size={24} color="#0B678C" />
                </TouchableOpacity>

                <Text style={{ textAlign: "center", marginVertical: 10, color: "#0B678C" }}>--- OR ---</Text>

                {/* Product Input Fields */}
                <View>
                    {/* Product Input Fields */}
                    {Object.keys(productData).filter(key => key !== "productInventoryList").map((key, index) => (
                        <View key={index} style={{ marginVertical: 10 }}>
                            <Text style={{ fontWeight: "bold", marginBottom: 5, color: "#0B678C" }}>{key}</Text>
                            {key === "expiryDate" ? (
                                <TouchableOpacity onPress={() => setDatePickerVisible(true)} style={{ borderWidth: 1, borderColor: "#0B678C", borderRadius: 10, padding: 10, backgroundColor: "#FAFAFA" }}>
                                    <Text>{productData.productInventoryList[0].expiryDate || "Select Expiry Date"}</Text>
                                </TouchableOpacity>
                            ) : key === "image" ? (
                                <TouchableOpacity onPress={pickImage} style={{ borderWidth: 1, borderColor: "#0B678C", borderRadius: 10, padding: 10, backgroundColor: "#FAFAFA", alignItems: "center" }}>
                                    {productData.image ? (
                                        <Image source={{ uri: productData.image }} style={{ width: 100, height: 100, borderRadius: 10 }} />
                                    ) : (
                                        <Text>Select Image</Text>
                                    )}
                                </TouchableOpacity>
                            ) : (
                                <TextInput
                                    style={{ borderWidth: 1, borderColor: "#0B678C", borderRadius: 10, padding: 10, backgroundColor: "#FAFAFA", paddingVertical: 15 }}
                                    placeholder={`Enter ${key}`}
                                    value={productData[key]}
                                    onChangeText={(text) => handleInputChange(key, text)}
                                />
                            )}
                        </View>
                    ))}

                    {/* Date Picker Modal */}
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={() => setDatePickerVisible(false)}
                    />
                </View>

                {/* Inventory List Section */}
                <Text style={{ fontSize: 18, fontWeight: "bold", marginVertical: 10, textAlign: "center", color: "#0B678C" }}>Inventory List</Text>
                {productData.productInventoryList.map((inventory, index) => (
                    <View key={index} style={{ padding: 15, marginVertical: 10, borderRadius: 10, backgroundColor: "white" }}>
                        {Object.keys(inventory).map((key, idx) => (
                            <View key={idx} style={{ marginBottom: 10 }}>
                                <Text style={{ fontWeight: "bold", marginBottom: 5, color: "#0B678C" }}>{key}</Text>
                                <TextInput
                                    style={{ borderWidth: 1, borderColor: "#0B678C", borderRadius: 10, padding: 10, backgroundColor: "#FAFAFA" }}
                                    placeholder={`Enter ${key}`}
                                    value={inventory[key]}
                                    onChangeText={(text) => handleInventoryChange(index, key, text)}
                                />
                            </View>
                        ))}
                        {/* <TouchableOpacity onPress={() => removeInventory(index)} style={{ alignSelf: "flex-end", marginTop: 10 }}>
                            <Trash2 size={20} color="red" />
                        </TouchableOpacity> */}
                        {/* Show trash icon only if there's more than one inventory item */}
                        {productData.productInventoryList.length > 1 && (
                            <TouchableOpacity onPress={() => removeInventory(index)} style={{ alignSelf: "flex-end", marginTop: 10 }}>
                                <Trash2 size={20} color="red" />
                            </TouchableOpacity>
                        )}
                    </View>
                ))}

                {/* Add Inventory Button */}
                <TouchableOpacity onPress={addInventory} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 10 }}>
                    <Plus size={24} color="#0B678C" />
                    <Text style={{ fontSize: 16, color: "#0B678C", marginLeft: 5 }}>Add Inventory</Text>
                </TouchableOpacity>

                {/* Submit Button */}
                <View style={{ marginTop: 20, borderRadius: 10, overflow: 'hidden' }}>
                    <Button title="Submit" color="#0B678C" onPress={handleSubmit} />
                </View>
            </View>
        </ScrollView>
    );

};


const styles = StyleSheet.create({
    headingBackground: {
        width: "100%",
        paddingVertical: 40,
        marginBottom: 10,
    },
    heading: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#0B678C",
        backgroundColor: "transparent",
        paddingHorizontal: 30,
        paddingVertical: 20,
        textAlign: "center",
    },
});
export default AdminProductScreen;