import React, { useState } from "react";
import { Modal, TouchableWithoutFeedback, View, Text, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity, Dimensions } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Carousel, { Pagination } from 'react-native-snap-carousel-v4';
import MyStatusBar from "../../component/myStatusBar";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Bold } from "lucide-react-native";

const { width } = Dimensions.get('screen');





const ProductDescriptionScreen = () => {
    const navigation = useNavigation();

    // Assuming `openedProduct` is passed via navigation params
    var { openedProduct } = useLocalSearchParams();
    openedProduct = JSON.parse(openedProduct);



    const [state, setState] = useState({
        productImages: [
            { image: openedProduct.image }, // Use the product image for the carousel
            { image: openedProduct.image }, // Add more images if available
            { image: openedProduct.image },
        ],
        activeSlide: 0,
        selectedInventory: null, // Track the selected inventory item
    });


    const [isInventorySelected, setIsInventorySelected] = useState(null);
    const [quantity, setQuantity] = useState(0);

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const {
        productImages,
        activeSlide,

    } = state;

    const [selectedInventory, setSelectedInventory] = useState(null); // Store the entire selected inventory object

    return (
        <View style={{ flex: 1, backgroundColor: Colors.companyLight }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>

                    {carousel()}
                    {productDetails()}

                    {/* {inventoryList2()} */}
                    {InventoryList3()}


                </ScrollView>
            </View>

            {/* Sticky Bottom Bar */}
            <BottomBar quantity={quantity} setQuantity={setQuantity} isInventorySelected={isInventorySelected} />
        </View>
    );

    // Function to render the carousel for product images
    // function carousel() {
    //     const _renderItem = ({ item }) => (
    //         <View style={styles.imageWrapStyle}>
    //             <Image
    //                 resizeMode="contain"
    //                 source={item.image ? { uri: item.image } : require("../../assets/images/defaultProduct.png")}
    //                 style={{ width: '100%', height: 200 }}
    //             />
    //         </View>
    //     );

    //     return (
    //         <View style={{ backgroundColor: Colors.whiteColor }}>
    //             <Carousel
    //                 data={productImages}
    //                 sliderWidth={width}
    //                 itemWidth={width}
    //                 renderItem={_renderItem}
    //                 onSnapToItem={(index) => updateState({ activeSlide: index })}
    //             />
    //             {pagination()}
    //         </View>
    //     );
    // }


    function carousel() {
        const _renderItem = ({ item }) => (
            <View style={styles.imageWrapStyle}>
                <Image
                    resizeMode="contain"
                    source={item.image ? { uri: item.image } : require("../../assets/images/defaultProduct.png")}
                    style={{ width: '100%', height: 200 }}
                />
            </View>
        );

        return (
            <View style={{ backgroundColor: Colors.companyLight }}>
                <Carousel
                    data={productImages}
                    sliderWidth={width} // Set sliderWidth to the screen width
                    itemWidth={200 + Sizes.fixPadding * 2} // Adjust itemWidth to include margin
                    renderItem={_renderItem}
                    onSnapToItem={(index) => updateState({ activeSlide: index })}
                    inactiveSlideOpacity={0.7} // Optional: Add opacity effect for inactive slides
                    inactiveSlideScale={0.9} // Optional: Add scaling effect for inactive slides
                    contentContainerCustomStyle={{ alignItems: 'center' }} // Center the carousel items
                />
                {pagination()}
            </View>
        );
    }


    // function productDetails() {

    //     const fieldIcons = {
    //         companyName: { icon: "building", lib: FontAwesome, label: "Company" },
    //         composition: { icon: "flask", lib: FontAwesome, label: "Composition" },
    //         packingName: { icon: "archive", lib: FontAwesome, label: "Packing" },

    //     };
    //     if (!openedProduct) {
    //         return null; // or show a loader/message
    //     }

    //     return (
    //         <View style={{
    //             backgroundColor: Colors.whiteColor,
    //             borderTopLeftRadius: 30,
    //             borderTopRightRadius: 30,
    //             marginTop: -30,
    //             padding: Sizes.fixPadding * 2.0,
    //             shadowColor: "#000",
    //             shadowOffset: { width: 0, height: 2 },
    //             shadowOpacity: 0.2,
    //             shadowRadius: 4,
    //             elevation: 5,
    //         }}>
    //             <Text style={{
    //                 ...Fonts.primaryColor20Medium,
    //                 marginBottom: Sizes.fixPadding,
    //                 color: Colors.companyPrimaryDark,
    //             }}>
    //                 {openedProduct.name}
    //             </Text>

    //             {/* Dynamic Fields */}
    //             <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: Sizes.fixPadding * 2 }}>
    //                 {Object.entries(fieldIcons).map(([key, field]) => {
    //                     const value = openedProduct[key];
    //                     if (!value) return null;

    //                     const IconComponent = field.lib;
    //                     return (
    //                         <View key={key} style={{ alignItems: "center", marginHorizontal: 10, marginBottom: 10 }}>
    //                             <IconComponent name={field.icon} size={28} color={Colors.companyPrimaryDark} />
    //                             <Text style={{ ...Fonts.primaryColor14Light }}>{field.label}</Text>
    //                             <Text style={{ ...Fonts.blackColor14Medium, fontWeight: "bold" }}>{value}</Text>
    //                         </View>
    //                     );
    //                 })}
    //             </View>

    //             <Text style={{
    //                 ...Fonts.primaryColor16Medium,
    //                 lineHeight: 20,
    //                 textAlign: "justify",
    //                 color: Colors.grayColor,
    //                 marginBottom: Sizes.fixPadding * 2.0,
    //             }}>
    //                 {openedProduct.description}
    //             </Text>
    //         </View>
    //     );

    // }

    function productDetails() {
        if (!openedProduct) {
            return null; // or show a loader/message
        }

        const fieldIcons = {
            companyName: { icon: "building", lib: FontAwesome, label: "Company" },
            composition: { icon: "flask", lib: FontAwesome, label: "Composition" },
            packingName: { icon: "archive", lib: FontAwesome, label: "Packing" },
        };

        return (
            <View style={{
                backgroundColor: Colors.whiteColor,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                marginTop: -30,
                padding: Sizes.fixPadding * 2.0,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 5,
            }}>

                {/* Product Title */}
                <Text style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: Colors.companyPrimaryDark,
                    textAlign: "center",
                    textTransform: "uppercase",
                    marginBottom: Sizes.fixPadding * 2,
                }}>
                    {openedProduct.name}
                </Text>

                {/* Dynamic Fields with Icon Background */}
                <View style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    marginBottom: Sizes.fixPadding * 2
                }}>
                    {Object.entries(fieldIcons).map(([key, field]) => {
                        const value = openedProduct[key];
                        if (!value) return null;

                        return (
                            <View key={key} style={{ alignItems: "center", marginHorizontal: 10, marginBottom: 15 }}>
                                <View style={{
                                    width: 50, height: 50,
                                    borderRadius: 25,
                                    backgroundColor: Colors.companyLight,
                                    alignItems: "center", justifyContent: "center",
                                    marginBottom: 5
                                }}>
                                    <FontAwesome name={field.icon} size={24} color={Colors.companyPrimaryDark} />
                                </View>
                                <Text style={{ fontSize: 14, color: Colors.grayColor }}>{field.label}</Text>
                                <Text style={{ fontSize: 16, fontWeight: "bold", color: Colors.black }}>{value}</Text>
                            </View>
                        );
                    })}
                </View>

                {/* Description */}
                <Text style={{
                    fontSize: 16,
                    lineHeight: 22,
                    textAlign: "justify",
                    color: Colors.grayColor,
                    marginBottom: Sizes.fixPadding * 2.0,
                }}>
                    {openedProduct.description}
                </Text>
            </View>
        );
    }

    // function BottomBar({ quantity, setQuantity, isInventorySelected }) {
    //     return (
    //         <View style={{
    //             position: "absolute",
    //             bottom: 0,
    //             left: 0,
    //             right: 0,
    //             backgroundColor: Colors.whiteColor,
    //             paddingVertical: 12,
    //             paddingHorizontal: 16,
    //             flexDirection: "row",
    //             justifyContent: "space-between",
    //             alignItems: "center",
    //             borderTopLeftRadius: 20,
    //             borderTopRightRadius: 20,
    //             shadowColor: "#000",
    //             shadowOffset: { width: 0, height: -2 },
    //             shadowOpacity: 0.1,
    //             shadowRadius: 4,
    //             elevation: 10,
    //         }}>
    //             {/* Quantity Selector */}
    //             <View style={{ flexDirection: "row", alignItems: "center" }}>
    //                 <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
    //                     <FontAwesome name="minus-circle" size={30} color={Colors.companyPrimaryDark} />
    //                 </TouchableOpacity>
    //                 <Text style={{ fontSize: 20, fontWeight: "bold", marginHorizontal: 12 }}>{quantity}</Text>
    //                 <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
    //                     <FontAwesome name="plus-circle" size={30} color={Colors.companyPrimaryDark} />
    //                 </TouchableOpacity>
    //             </View>

    //             {/* Buy Button (Only if inventory is selected) */}
    //             {isInventorySelected && (
    //                 <TouchableOpacity
    //                     style={{
    //                         backgroundColor: Colors.companyPrimaryDark,
    //                         borderRadius: 10,
    //                         paddingVertical: 12,
    //                         paddingHorizontal: 20,
    //                     }}
    //                     onPress={() => console.log("Buy Now", quantity)}
    //                 >
    //                     <Text style={{ color: Colors.whiteColor, fontSize: 18, fontWeight: "bold" }}>Buy Now</Text>
    //                 </TouchableOpacity>
    //             )}
    //         </View>
    //     );
    // }

    // Function to render pagination for the carousel

    function BottomBar({ quantity, setQuantity, isInventorySelected }) {
        return (
            <View
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: Colors.whiteColor,
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 10,
                }}
            >
                {/* Buy Now & Add to Cart Buttons */}
                {isInventorySelected && (
                    <View style={{ flexDirection: "row", gap: 12 }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: Colors.companyPrimaryDark,
                                borderRadius: 10,
                                paddingVertical: 12,
                                paddingHorizontal: 20,
                                flex: 1,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onPress={() => console.log("Buy Now", selectedInventory)}
                        ><FontAwesome name="shopping-bag" size={20} color={Colors.whiteColor} style={{ marginRight: 8 }} />
                            <Text style={{ color: Colors.whiteColor, fontSize: 18, fontWeight: "bold" }}>Buy Now</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                backgroundColor: Colors.lightGray, // Subtle color for 'Add to Cart'
                                borderRadius: 10,
                                paddingVertical: 12,
                                paddingHorizontal: 20,
                                flex: 1,
                                alignItems: "center",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                borderWidth: 1, // Added border
                                borderColor: Colors.companyPrimaryDark, // Border color
                            }}
                            onPress={() => console.log("Added to Cart", selectedInventory)}
                        >
                            <FontAwesome name="shopping-cart" size={20} color={Colors.companyPrimaryDark} style={{ marginRight: 8 }} />
                            <Text style={{ color: Colors.companyPrimaryDark, fontSize: 18, fontWeight: "bold" }}>
                                Add to Cart
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    }

    function InventoryList3() {
        const totalInventory = openedProduct?.productInventoryList?.length || 0;

        const renderItem = ({ item }) => {
            const isSelected = selectedInventory === item.id;


            const handleInventorySelection = (item) => {
                setSelectedInventory(item); // Update the selected inventory state
                console.log("Selected Inventory:", item); // Log the selected inventory
                setIsInventorySelected(true);
            };

            return (
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => handleInventorySelection(item)}
                    style={{
                        width: "48%",
                        borderWidth: isSelected ? 2 : 1,
                        borderColor: isSelected ? Colors.companyPrimaryDark : Colors.lightGrayColor,
                        borderRadius: 12,
                        padding: 16,
                        marginVertical: 8,
                        backgroundColor: isSelected ? Colors.companyLight : Colors.whiteColor,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: isSelected ? 0.2 : 0.1,
                        shadowRadius: isSelected ? 6 : 4,
                        elevation: isSelected ? 8 : 3,
                        marginHorizontal: "1%",
                    }}
                >
                    {/* Batch Number */}
                    <Text style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: isSelected ? Colors.companyPrimaryDark : Colors.blackColor,
                        marginBottom: 10
                    }}>
                        Batch: {item.batchNumber}
                    </Text>
                    {/* Discount - Pill-Shaped Badge */}
                    {item.discount && item.discount > 1 && (
                        <View style={{
                            backgroundColor: isSelected ? Colors.companyPrimaryDark : "#FF5733",
                            paddingHorizontal: 12,
                            paddingVertical: 6,
                            borderRadius: 20,
                            alignSelf: "flex-start",
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 10,
                        }}>
                            <FontAwesome5 name="tags" size={14} color={Colors.whiteColor} />
                            <Text style={{
                                marginLeft: 8,
                                fontSize: 14,
                                fontWeight: "bold",
                                color: Colors.whiteColor,
                            }}>
                                {item.discount}% OFF
                            </Text>
                        </View>

                    )}
                    {/* Expiry Date */}
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                        <View style={{
                            width: 30,
                            height: 30,
                            borderRadius: 15,
                            backgroundColor: Colors.companyLight,
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: 10,
                        }}>
                            <FontAwesome5 name="calendar-alt" size={16} color={Colors.companyPrimaryDark} />
                        </View>
                        <Text style={{
                            fontSize: 14,
                            color: Colors.grayColor,
                        }}>
                            Expiry: {new Date(item.expiryDate).toLocaleDateString()}
                        </Text>
                    </View>

                    {/* MRP */}
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                        <View style={{
                            width: 30,
                            height: 30,
                            borderRadius: 15,
                            backgroundColor: Colors.companyLight,
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: 10,
                        }}>
                            <FontAwesome5 name="dollar-sign" size={16} color={Colors.companyPrimaryDark} />
                        </View>
                        <Text style={{
                            fontSize: 14,
                            color: Colors.grayColor,
                        }}>
                            MRP: ${item.mrp}
                        </Text>
                    </View>


                    {/* Stock */}
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{
                            width: 30,
                            height: 30,
                            borderRadius: 15,
                            backgroundColor: Colors.companyLight,
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: 10,
                        }}>
                            <FontAwesome5 name="box" size={16} color={Colors.companyPrimaryDark} />
                        </View>
                        <Text style={{
                            fontSize: 14,
                            color: Colors.grayColor,
                        }}>
                            Stock: {item.inventoryCount}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        };

        return (
            <View style={{
                marginTop: Sizes.fixPadding,
                paddingTop: Sizes.fixPadding * 2.0,
                backgroundColor: Colors.whiteColor,
                paddingHorizontal: Sizes.fixPadding * 2.0,
                paddingVertical: 80,
            }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: Colors.companyPrimaryDark,
                    marginBottom: 6,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                }}>
                    Available Inventory
                </Text>
                <Text style={{
                    fontSize: 14, // Smaller than the heading
                    color: Colors.gray, // Subtle gray for hierarchy
                    fontWeight: "400", // Medium weight for readability
                    marginBottom: 12, // Adds spacing before the list
                }}>Select a batch to process with purchase</Text>

                <FlatList
                    data={openedProduct?.productInventoryList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: Sizes.fixPadding * 2.0,
                    }}
                />
            </View>
        );
    }

    function pagination() {
        return (
            <Pagination
                dotsLength={productImages.length}
                activeDotIndex={activeSlide}
                containerStyle={styles.sliderPaginationWrapStyle}
                dotStyle={styles.sliderActiveDotStyle}
                inactiveDotStyle={styles.sliderInactiveDotStyle}
            />
        );
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons
                        name="arrow-back"
                        size={24}
                        color={Colors.whiteColor}
                        onPress={() => navigation.pop()}
                    />
                    <Text style={{
                        width: width / 1.7,
                        marginLeft: Sizes.fixPadding + 5.0,
                        ...Fonts.whiteColor19Medium
                    }}>
                        Product Description
                    </Text>
                </View>
                {/* <View style={{ flexDirection: 'row' }}>
                    <MaterialIcons
                        name="search"
                        size={26}
                        color={Colors.whiteColor}
                        onPress={() => navigation.push('search/searchScreen')}
                    />
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => navigation.push('cart/cartScreen')}
                    >
                        <MaterialIcons
                            name="shopping-cart"
                            size={26}
                            color={Colors.whiteColor}
                            style={{ marginLeft: Sizes.fixPadding + 10.0 }}
                        />
                        <View style={styles.cartItemCountWrapStyle}>
                            <Text style={{ ...Fonts.whiteColor15Regular, lineHeight: 21 }}>
                                sample
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View> */}
            </View>
        )
    }



};

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.companyPrimary,
        height: 56.0,
        paddingLeft: Sizes.fixPadding * 2.0,
        paddingRight: Sizes.fixPadding,
    },
    cartItemCountWrapStyle: {
        position: 'absolute',
        right: -8.0,
        height: 17.0,
        width: 17.0,
        borderRadius: 8.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.redColor,
        elevation: 10.0,
    },
    deliverToInfoWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding + 5.0
    },
    // imageWrapStyle: {
    //     backgroundColor: Colors.whiteColor,
    //     borderColor: Colors.companyPrimaryDark,
    //     borderWidth: 1.0,
    //     borderRadius: Sizes.fixPadding,
    //     marginRight: Sizes.fixPadding * 2.0,
    //     width: 200.0,
    //     height: 190.0,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    imageWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.companyPrimaryDark,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        marginRight: Sizes.fixPadding * 2.0, // Add margin to the right
        width: 200.0, // Fixed width for the image container
        height: 190.0, // Fixed height for the image container
        alignItems: 'center', // Center the image horizontally
        justifyContent: 'center', // Center the image vertically
        marginTop: 20
    },
    sliderActiveDotStyle: {
        width: 20,
        height: 7,
        borderRadius: 10.0,
        backgroundColor: Colors.primaryColor,
        marginHorizontal: Sizes.fixPadding - 17.0
    },
    sliderInactiveDotStyle: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        backgroundColor: '#E0E0E0',
    },
    sliderPaginationWrapStyle: {
        marginTop: Sizes.fixPadding - 25.0,
    },
    offerWrapStyle: {
        backgroundColor: Colors.redColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding - 6.0,
        paddingHorizontal: Sizes.fixPadding - 4.0,
    },
    addButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: "center",
        paddingHorizontal: Sizes.fixPadding * 4.0,
        paddingVertical: Sizes.fixPadding - 3.0,
    },
    itemCountAndViewCartButtonWrapStyle: {
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        borderTopColor: Colors.bodyBackColor,
        borderTopWidth: 1.0,
    },
    viewCartButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    bulletStyle: {
        backgroundColor: Colors.blackColor,
        height: 8.0,
        width: 8.0,
        borderRadius: 4.0,
        marginTop: Sizes.fixPadding - 2.0,
        marginRight: Sizes.fixPadding,
    },
    dividerStyle: {
        backgroundColor: Colors.grayColor,
        height: 1.0,
        marginTop: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding + 5.0,
    },
    selectQuantityModelStyle: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.50)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedQuantityWrapStyle: {
        paddingVertical: Sizes.fixPadding - 5.0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding + 2.0,
    },
    doneIconWrapStyle: {
        width: 25.0,
        height: 25.0,
        borderRadius: 12.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.redColor
    },
    selectQuantityTitleStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: Sizes.fixPadding * 2.0,
    },
    selectQuantityButtonStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding * 3.0,
    },
    bottomSheetItemWrapStyle: {
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Sizes.fixPadding * 2.0,
    },
    flavourAndPackageSizeInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding + 3.0,
    }
});

export default ProductDescriptionScreen;