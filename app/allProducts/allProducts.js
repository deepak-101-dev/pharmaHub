import React, { useContext } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { AppContext } from "../context/AppProvider";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { useNavigation } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get('screen');

const AllProducts = () => {
    const { products } = useContext(AppContext);
    const navigation = useNavigation();

    const onProductClick = (item) => {
        console.log("Clicked on:", item);
        navigation.push("productDescription/productDescriptionScreen", {
            item: JSON.stringify(item),
        });
    };
    // Ensure products exist
    if (!products || products.length === 0) {
        return <Text style={{ textAlign: "center", marginTop: 20 }}>No Products Available</Text>;
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
                        // width: width / 1.7,
                        marginLeft: Sizes.fixPadding + 5.0,
                        ...Fonts.whiteColor19Medium
                    }}>
                        All Products
                    </Text>
                </View>
            </View>
        );
    }


    const renderItem = ({ item }) => {
        const inventory = item.productInventoryList?.[0] || {};
        const { saleRate, mrp, discount } = inventory;

        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => onProductClick(item)}
                style={{
                    backgroundColor: "white",
                    borderRadius: 10,
                    width: "48%",
                    flex: 1, // Makes sure two items fit in a row
                    margin: 8, // Spacing between items
                    padding: 10,
                    alignSelf: "flex-start",
                }}
            >
                {/* Product Image and Discount */}
                <View style={{
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: Colors.companyPrimaryDark,
                    overflow: "hidden",
                    padding: 20,
                    alignItems: "center",
                    position: "relative"
                }}>
                    {/* Product Image */}
                    <Image
                        source={item.image ? { uri: item.image } : require("../../assets/images/defaultProduct.png")}
                        style={{ width: 140, height: 140 }}
                        resizeMode="contain"
                    />

                    {/* Discount Badge */}
                    {discount && (
                        <View
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                backgroundColor: "#FF5733",
                                paddingVertical: 5,
                                paddingHorizontal: 8,
                                borderBottomRightRadius: 8,
                            }}
                        >
                            <Text style={{ color: "#fff", fontSize: 14, fontWeight: "bold" }}>
                                {discount}% OFF
                            </Text>
                        </View>
                    )}
                </View>

                {/* Product Name */}
                <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{
                        fontSize: 18,
                        textAlign: "left",
                        marginTop: 5,
                        color: Colors.companyPrimaryDark,
                        width: "100%"
                    }}
                >
                    {item.name}
                </Text>

                {/* Price & Discount */}
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "#FF5733" }}>
                        ₹{saleRate || "N/A"}
                    </Text>
                    {mrp && (
                        <Text
                            style={{
                                fontSize: 14,
                                textDecorationLine: "line-through",
                                color: "#A9A9A9",
                                marginLeft: 5
                            }}
                        >
                            ₹{mrp}
                        </Text>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            {header()}
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2} // Ensures two products per row
                contentContainerStyle={{ padding: 10 }}
                columnWrapperStyle={{ justifyContent: "space-between" }}
            />
        </View>
    );
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
    imageWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        marginRight: Sizes.fixPadding * 2.0,
        width: 200.0,
        height: 190.0,
        alignItems: 'center',
        justifyContent: 'center',
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

export default AllProducts;
