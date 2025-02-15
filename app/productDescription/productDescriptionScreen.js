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



// const ProductDescriptionScreen = () => {

//     const navigation = useNavigation();

//     var { item } = useLocalSearchParams();
//     item = JSON.parse(item);

//     const { from } = useLocalSearchParams();

//     const [state, setState] = useState({
//         productImages: from == 'home' ?
//             [
//                 {
//                     image: item.image,
//                 },
//                 {
//                     image: item.image,
//                 },
//                 {
//                     image: item.image,
//                 },
//             ] :
//             item.allImages
//         ,
//         activeSlide: 0,
//         itemCount: 1,
//         quantityDialog: false,
//         currentQuantity: null,
//         packageSizeSheet: false,
//         flavourSheet: false,
//         packageSize: from != 'home' ? item.packageSizes.length != 0 ? item.packageSizes[0].size : null : null,
//         flavour: from != 'home'
//             ?
//             item.flavours
//                 ?
//                 item.flavours[0].flavour
//                 :
//                 null
//             : null
//     })

//     const updateState = (data) => setState((state) => ({ ...state, ...data }))

//     const {
//         productImages,
//         activeSlide,
//         itemCount,
//         quantityDialog,
//         currentQuantity,
//         packageSizeSheet,
//         flavourSheet,
//         packageSize,
//         flavour
//     } = state;

//     return (
//         <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
//             <MyStatusBar />
//             <View style={{ flex: 1 }}>
//                 {header()}
//                 <ScrollView showsVerticalScrollIndicator={false}>
//                     {delivertoInfo()}
//                     {productInfo()}
//                     {detail()}
//                 </ScrollView>
//                 {itemCountAndViewCartButton()}
//                 {selectQuantityDialog()}
//                 {packageSizeBottomSheet()}
//                 {flavourBottomSheet()}
//             </View>
//         </View>
//     )

//     function flavourBottomSheet() {
//         const renderItem = ({ item }) => (
//             <TouchableOpacity
//                 activeOpacity={0.6}
//                 onPress={() => updateState({ flavour: item.flavour, flavourSheet: false })}
//                 style={{
//                     borderColor: flavour == item.flavour ? Colors.primaryColor : Colors.grayColor,
//                     ...styles.bottomSheetItemWrapStyle
//                 }}
//             >
//                 <Text style={{ ...Fonts.primaryColor18Medium }}>
//                     {item.flavour}
//                 </Text>
//             </TouchableOpacity>
//         )
//         return (
//             <Modal
//                 animationType="slide"
//                 transparent={true}
//                 visible={flavourSheet}
//                 onRequestClose={() => {
//                     updateState({ flavourSheet: false })
//                 }}
//             >
//                 <TouchableOpacity
//                     activeOpacity={1}
//                     onPress={() => {
//                         updateState({ flavourSheet: false })
//                     }}
//                     style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
//                 >
//                     <View style={{ justifyContent: "flex-end", flex: 1 }}>
//                         <TouchableOpacity
//                             activeOpacity={1}
//                             onPress={() => { }}
//                             style={{ backgroundColor: Colors.whiteColor }}
//                         >
//                             <View style={{ backgroundColor: Colors.whiteColor, paddingTop: Sizes.fixPadding - 5.0 }}>
//                                 <Text style={{ paddingVertical: Sizes.fixPadding, textAlign: 'center', ...Fonts.primaryColor19Medium }}>
//                                     Select Flavour
//                                 </Text>
//                                 <FlatList
//                                     data={item.flavours}
//                                     keyExtractor={(item) => `${item.id}`}
//                                     renderItem={renderItem}
//                                     horizontal
//                                     showsHorizontalScrollIndicator={false}
//                                     contentContainerStyle={{
//                                         paddingBottom: Sizes.fixPadding * 2.0,
//                                         paddingLeft: Sizes.fixPadding * 4.0,
//                                     }}
//                                 />
//                             </View>
//                         </TouchableOpacity>
//                     </View>
//                 </TouchableOpacity>
//             </Modal>
//         )
//     }

//     function packageSizeBottomSheet() {
//         const renderItem = ({ item }) => (
//             <TouchableOpacity
//                 activeOpacity={0.6}
//                 onPress={() => updateState({ packageSize: item.size, packageSizeSheet: false })}
//                 style={{
//                     borderColor: packageSize == item.size ? Colors.primaryColor : Colors.grayColor,
//                     ...styles.bottomSheetItemWrapStyle
//                 }}
//             >
//                 <Text style={{ ...Fonts.primaryColor18Medium }}>
//                     {item.size}
//                 </Text>
//             </TouchableOpacity>
//         )
//         return (
//             <Modal
//                 animationType="slide"
//                 transparent={true}
//                 visible={packageSizeSheet}
//                 onRequestClose={() => {
//                     updateState({ packageSizeSheet: false })
//                 }}
//             >
//                 <TouchableOpacity
//                     activeOpacity={1}
//                     onPress={() => {
//                         updateState({ packageSizeSheet: false })
//                     }}
//                     style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
//                 >
//                     <View style={{ justifyContent: "flex-end", flex: 1 }}>
//                         <TouchableOpacity
//                             activeOpacity={1}
//                             onPress={() => { }}
//                             style={{ backgroundColor: Colors.whiteColor }}
//                         >
//                             <View style={{ backgroundColor: Colors.whiteColor, paddingTop: Sizes.fixPadding - 5.0 }}>
//                                 <Text style={{ paddingVertical: Sizes.fixPadding, textAlign: 'center', ...Fonts.primaryColor19Medium }}>
//                                     Select Pack Size
//                                 </Text>
//                                 <FlatList
//                                     data={item.packageSizes}
//                                     keyExtractor={(item) => `${item.id}`}
//                                     renderItem={renderItem}
//                                     horizontal
//                                     showsHorizontalScrollIndicator={false}
//                                     contentContainerStyle={{
//                                         paddingBottom: Sizes.fixPadding * 2.0,
//                                         paddingLeft: Sizes.fixPadding * 4.0,
//                                     }}
//                                 />
//                             </View>
//                         </TouchableOpacity>
//                     </View>
//                 </TouchableOpacity>
//             </Modal>
//         )
//     }

//     function flavourInfo() {
//         return (
//             <TouchableOpacity
//                 activeOpacity={0.6}
//                 onPress={() => updateState({ flavourSheet: true })}
//                 style={{ ...styles.flavourAndPackageSizeInfoWrapStyle, marginBottom: Sizes.fixPadding }}>
//                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                     <Text style={{ ...Fonts.primaryColor16Light }}>
//                         Flavour:
//                     </Text>
//                     <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.primaryColor18Medium }}>
//                         {flavour}
//                     </Text>
//                 </View>
//                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                     <Text style={{ ...Fonts.primaryColor18Medium, marginRight: Sizes.fixPadding }}>
//                         {item.flavours.length - 1} more
//                     </Text>
//                     <MaterialIcons name="arrow-forward-ios" size={22} color={Colors.primaryColor} />
//                 </View>
//             </TouchableOpacity >
//         )
//     }

//     function packageSizesInfo() {
//         return (
//             <TouchableOpacity
//                 activeOpacity={0.6}
//                 onPress={() => updateState({ packageSizeSheet: true })}
//                 style={styles.flavourAndPackageSizeInfoWrapStyle}>
//                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                     <Text style={{ ...Fonts.primaryColor16Light }}>
//                         Pack Size:
//                     </Text>
//                     <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.primaryColor18Medium }}>
//                         {packageSize}
//                     </Text>
//                 </View>
//                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                     <Text style={{ ...Fonts.primaryColor18Medium, marginRight: Sizes.fixPadding }}>
//                         {item.packageSizes.length - 1} more
//                     </Text>
//                     <MaterialIcons name="arrow-forward-ios" size={22} color={Colors.primaryColor} />
//                 </View>
//             </TouchableOpacity>
//         )
//     }

//     function itemCountAndViewCartButton() {
//         return (
//             <View style={styles.itemCountAndViewCartButtonWrapStyle}>
//                 <Text style={{
//                     lineHeight: 24.0,
//                     ...Fonts.primaryColor19Medium,
//                     paddingRight: Sizes.fixPadding * 2.0,
//                 }}>
//                     {itemCount} {`Item in\nCart`}
//                 </Text>
//                 <TouchableOpacity
//                     activeOpacity={0.6}
//                     onPress={() => navigation.push('cart/cartScreen')}
//                     style={styles.viewCartButtonStyle}
//                 >
//                     <Text style={{ ...Fonts.whiteColor19Medium }}>
//                         View Cart
//                     </Text>
//                 </TouchableOpacity>
//             </View>
//         )
//     }

//     function selectQuantityDialog() {
//         return (
//             <Modal
//                 animationType="none"
//                 transparent={true}
//                 visible={quantityDialog}
//             >
//                 <TouchableWithoutFeedback>
//                     <View style={styles.selectQuantityModelStyle}>
//                         <View style={{
//                             width: width * 0.8,
//                             backgroundColor: Colors.whiteColor,
//                             borderRadius: Sizes.fixPadding,
//                         }}>
//                             <View style={styles.selectQuantityTitleStyle}>
//                                 <Text style={{ ...Fonts.primaryColor20Medium }}>
//                                     Select Quantity
//                                 </Text>
//                                 <MaterialIcons
//                                     name="close"
//                                     size={24}
//                                     onPress={() => updateState({ quantityDialog: false })}
//                                     color={Colors.primaryColor}
//                                 />
//                             </View>
//                             <View style={{ backgroundColor: Colors.primaryColor, height: 1.0 }} />
//                             {itemCount == 1 ?
//                                 null
//                                 :
//                                 <TouchableOpacity
//                                     activeOpacity={0.6}
//                                     onPress={() => {
//                                         updateState({ itemCount: 1, quantityDialog: false, currentQuantity: 1 })
//                                     }}
//                                 >
//                                     <Text style={{ margin: Sizes.fixPadding, ...Fonts.primaryColor19Medium }}>
//                                         Remove item
//                                     </Text>
//                                 </TouchableOpacity>
//                             }
//                             {quantity({ number: 1, })}
//                             {quantity({ number: 2, })}
//                             {quantity({ number: 3, })}
//                             {quantity({ number: 4, })}
//                             {quantity({ number: 5, })}
//                         </View>
//                     </View>
//                 </TouchableWithoutFeedback>
//             </Modal>
//         )
//     }

//     function quantity({ number }) {
//         return (
//             <TouchableOpacity
//                 activeOpacity={0.6}
//                 onPress={() => {
//                     updateState({ itemCount: number, currentQuantity: number, quantityDialog: false })
//                 }}
//                 style={{
//                     backgroundColor: currentQuantity == number ? '#E2E2E2' : Colors.whiteColor,
//                     borderBottomLeftRadius: number == 5 ? Sizes.fixPadding : 0.0,
//                     borderBottomRightRadius: number == 5 ? Sizes.fixPadding : 0.0,
//                     ...styles.selectedQuantityWrapStyle,
//                 }}>
//                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                     <Text style={{ ...Fonts.primaryColor19Medium }}>
//                         {number}
//                     </Text>
//                     {number == 5
//                         ?
//                         <Text style={{ ...Fonts.primaryColor15Light, marginLeft: Sizes.fixPadding }}>
//                             Max Qty
//                         </Text>
//                         :
//                         null
//                     }
//                 </View>
//                 {currentQuantity == number ?
//                     <View style={styles.doneIconWrapStyle}>
//                         <MaterialIcons name="check" size={20} color={Colors.whiteColor} />
//                     </View>
//                     :
//                     null
//                 }
//             </TouchableOpacity>
//         )
//     }

//     function detail() {
//         return (
//             <View style={{
//                 marginTop: Sizes.fixPadding * 2.0,
//                 paddingTop: Sizes.fixPadding * 2.0,
//                 backgroundColor: Colors.whiteColor,
//                 paddingHorizontal: Sizes.fixPadding * 2.0,
//             }}>
//                 {
//                     item.flavours ?
//                         flavourInfo()
//                         :
//                         null
//                 }
//                 {
//                     from == 'home' ?
//                         null :
//                         item.packageSizes.length != 0 ?
//                             packageSizesInfo() : null
//                 }
//                 {productDescriptionInfo()}
//                 {keyFeaturesInfo()}
//                 {divider()}
//                 {featuresAndDetailInfo()}
//                 {divider()}
//                 {disclaimerInfo()}
//             </View>
//         )
//     }

//     function divider() {
//         return (
//             <View
//                 style={styles.dividerStyle}
//             />
//         )
//     }

//     function productDescriptionInfo() {
//         return (
//             <>
//                 <Text style={{ ...Fonts.primaryColor17Medium, paddingTop: Sizes.fixPadding * 4.0, }}>
//                     Description
//                 </Text>
//                 <Text style={{ paddingTop: Sizes.fixPadding - 5.0, ...Fonts.blackColor16Medium, lineHeight: 20.0, }}>
//                     Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
//                 </Text>
//             </>
//         )
//     }

//     function keyFeaturesInfo() {
//         return (
//             <>
//                 <Text style={{ ...Fonts.primaryColor17Medium, marginVertical: Sizes.fixPadding, }}>
//                     Key Features
//                 </Text>
//                 {
//                     keyFeaturesList.map((item) => (
//                         <View key={`${item.id}`}>
//                             <View style={{ flexDirection: 'row', marginBottom: Sizes.fixPadding - 5.0, }}>
//                                 <View style={styles.bulletStyle} />
//                                 <Text style={{ paddingTop: Sizes.fixPadding - 5.0, ...Fonts.blackColor16Medium, lineHeight: 20.0, }}>
//                                     {item.feature}
//                                 </Text>
//                             </View>
//                         </View>
//                     ))
//                 }
//             </>
//         )
//     }

//     function disclaimerInfo() {
//         return (
//             <>
//                 <Text style={{ ...Fonts.primaryColor17Medium }}>
//                     Disclaimer
//                 </Text>
//                 <Text style={{ paddingVertical: Sizes.fixPadding, ...Fonts.primaryColor16Regular, lineHeight: 20.0, }}>
//                     If the seal of the product is broken it will be non- returnable.
//                 </Text>
//             </>
//         )
//     }

//     function featuresAndDetailInfo() {
//         return (
//             <>
//                 <Text style={{ ...Fonts.primaryColor17Medium }}>
//                     Features & Details
//                 </Text>
//                 {featuresAndDetails({ title: 'Brand:', value: item.brand })}
//                 {featuresAndDetails({ title: 'Manufacturer:', value: item.manufacturer })}
//                 {featuresAndDetails({ title: 'Country of Origin:', value: 'India' })}
//             </>
//         )
//     }

//     function featuresAndDetails({ title, value }) {
//         return (
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 <Text style={{ ...Fonts.primaryColor16Medium }}>
//                     {title}
//                 </Text>
//                 <Text style={{ paddingLeft: Sizes.fixPadding - 5.0, ...Fonts.primaryColor16Light }}>
//                     {value}
//                 </Text>
//             </View>
//         )
//     }

//     function productInfo() {
//         const _renderItem = ({ item, index }) => (
//             <View style={styles.imageWrapStyle}>
//                 <Image
//                     resizeMode="contain"
//                     source={item.image}
//                     style={{ width: 140.0, height: 140.0, }}
//                 />
//             </View>
//         )
//         return (
//             <View style={{
//                 backgroundColor: Colors.whiteColor,
//                 paddingVertical: Sizes.fixPadding * 2.0,
//             }}>
//                 <Carousel
//                     data={productImages}
//                     sliderWidth={width}
//                     itemWidth={200}
//                     renderItem={_renderItem}
//                     onSnapToItem={(index) => updateState({ activeSlide: index })}
//                 />
//                 {pagination()}
//                 <View style={{
//                     marginTop: productImages.length == 1 ? Sizes.fixPadding + 10.0 : Sizes.fixPadding - 25.0,
//                     paddingHorizontal: Sizes.fixPadding * 2.0
//                 }}>
//                     <Text style={{ lineHeight: 24.0, ...Fonts.primaryColor20Medium }}>
//                         {item.name}
//                     </Text>
//                     <Text style={{ ...Fonts.primaryColor18Medium }}>
//                         By {item.brand}
//                     </Text>
//                     <Text style={{ ...Fonts.primaryColor22Medium }}>
//                         ${item.discountPrice}
//                     </Text>
//                     <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
//                         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                             <Text style={{ marginRight: Sizes.fixPadding, textDecorationLine: "line-through", ...Fonts.primaryColor18Light }}>
//                                 ${item.price}
//                             </Text>
//                             <View style={styles.offerWrapStyle}>
//                                 <Text style={{ ...Fonts.whiteColor16Medium }}>
//                                     {item.percentageOff}% OFF
//                                 </Text>
//                             </View>
//                         </View>
//                         {itemCount == 1
//                             ?
//                             <TouchableOpacity
//                                 activeOpacity={0.6}
//                                 onPress={() => updateState({ quantityDialog: true })}
//                                 style={styles.addButtonStyle}>
//                                 <Text style={{ ...Fonts.whiteColor18Medium }}>
//                                     Add
//                                 </Text>
//                             </TouchableOpacity>
//                             :
//                             <TouchableOpacity
//                                 activeOpacity={0.6}
//                                 onPress={() => updateState({ quantityDialog: true })}
//                                 style={styles.selectQuantityButtonStyle}
//                             >
//                                 <Text style={{ ...Fonts.primaryColor19Medium }}>
//                                     Select Qty
//                                 </Text>
//                             </TouchableOpacity>
//                         }
//                     </View>
//                 </View>
//             </View >
//         )
//     }

//     function pagination() {
//         return (
//             <Pagination
//                 dotsLength={productImages.length}
//                 activeDotIndex={activeSlide}
//                 containerStyle={styles.sliderPaginationWrapStyle}
//                 dotStyle={styles.sliderActiveDotStyle}
//                 inactiveDotStyle={styles.sliderInactiveDotStyle}
//             />
//         );
//     }

//     function delivertoInfo() {
//         return (
//             <View style={styles.deliverToInfoWrapStyle}>
//                 <View style={{ flexDirection: 'row' }}>
//                     <MaterialCommunityIcons
//                         name="map-marker"
//                         style={{ paddingTop: Sizes.fixPadding - 3.0 }}
//                         size={20}
//                         color={Colors.primaryColor}
//                     />
//                     <View style={{ marginLeft: Sizes.fixPadding }}>
//                         <Text style={{ ...Fonts.primaryColor15Light }}>
//                             Deliver To
//                         </Text>
//                         <Text style={{ ...Fonts.primaryColor18Medium }}>
//                             99501 Anchorage
//                         </Text>
//                     </View>
//                 </View>
//                 <TouchableOpacity
//                     activeOpacity={0.6}
//                     onPress={() => navigation.push('chooseLocation/chooseLocationScreen')}
//                 >
//                     <Text style={{ ...Fonts.primaryColor18Medium, alignSelf: 'flex-end' }}>
//                         Change
//                     </Text>
//                 </TouchableOpacity>
//             </View>
//         )
//     }

//     function header() {
//         return (
//             <View style={styles.headerWrapStyle}>
//                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                     <MaterialIcons
//                         name="arrow-back"
//                         size={24}
//                         color={Colors.whiteColor}
//                         onPress={() => navigation.pop()}
//                     />
//                     <Text style={{
//                         width: width / 1.7,
//                         marginLeft: Sizes.fixPadding + 5.0,
//                         ...Fonts.whiteColor19Medium
//                     }}>
//                         Product Description
//                     </Text>
//                 </View>
//                 <View style={{ flexDirection: 'row' }}>
//                     <MaterialIcons
//                         name="search"
//                         size={26}
//                         color={Colors.whiteColor}
//                         onPress={() => navigation.push('search/searchScreen')}
//                     />
//                     <TouchableOpacity
//                         activeOpacity={0.6}
//                         onPress={() => navigation.push('cart/cartScreen')}
//                     >
//                         <MaterialIcons
//                             name="shopping-cart"
//                             size={26}
//                             color={Colors.whiteColor}
//                             style={{ marginLeft: Sizes.fixPadding + 10.0 }}
//                         />
//                         <View style={styles.cartItemCountWrapStyle}>
//                             <Text style={{ ...Fonts.whiteColor15Regular,lineHeight:21 }}>
//                                 {itemCount}
//                             </Text>
//                         </View>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         )
//     }
// }

const ProductDescriptionScreen = () => {
    const navigation = useNavigation();

    // Assuming `openedProduct` is passed via navigation params
    var { openedProduct } = useLocalSearchParams();
    openedProduct = JSON.parse(openedProduct);

    const { from } = useLocalSearchParams();

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

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const {
        productImages,
        activeSlide,
        selectedInventory,
    } = state;

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* {delivertoInfo()} */}
                    {carousel()} {/* Render carousel for images */}
                    {/* {productDetails()}
                    {inventoryList()}
                    {inventoryList2()}
                    {inventoryList3()} */}

                </ScrollView>
            </View>

        </View>
    );

    // Function to render the carousel for product images
    function carousel() {
        const _renderItem = ({ item }) => (
            <View style={styles.imageWrapStyle}>
                <Image
                    resizeMode="contain"
                    source={{ uri: item.image }}
                    style={{ width: '100%', height: 200 }}
                />
            </View>
        );

        return (
            <View style={{ backgroundColor: Colors.whiteColor }}>
                <Carousel
                    data={productImages}
                    sliderWidth={width}
                    itemWidth={width}
                    renderItem={_renderItem}
                    onSnapToItem={(index) => updateState({ activeSlide: index })}
                />
                {pagination()}
            </View>
        );
    }



    function productDetails() {
        const [quantity, setQuantity] = useState(1);
        const fieldIcons = {
            companyName: { icon: "building", lib: FontAwesome, label: "Company" },
            composition: { icon: "flask", lib: FontAwesome, label: "Composition" },
            packingName: { icon: "archive", lib: FontAwesome, label: "Packing" },

        };
        if (!openedProduct) {
            return null; // or show a loader/message
        }

        return (
            <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                {/* Product Details */}
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
                    <Text style={{
                        ...Fonts.primaryColor20Medium,
                        marginBottom: Sizes.fixPadding,
                        color: Colors.companyPrimaryDark,
                    }}>
                        {openedProduct.name}
                    </Text>

                    {/* Dynamic Fields */}
                    <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: Sizes.fixPadding * 2 }}>
                        {Object.entries(fieldIcons).map(([key, field]) => {
                            const value = openedProduct[key];
                            if (!value) return null;

                            const IconComponent = field.lib;
                            return (
                                <View key={key} style={{ alignItems: "center", marginHorizontal: 10, marginBottom: 10 }}>
                                    <IconComponent name={field.icon} size={28} color={Colors.companyPrimaryDark} />
                                    <Text style={{ ...Fonts.primaryColor14Light }}>{field.label}</Text>
                                    <Text style={{ ...Fonts.blackColor14Medium, fontWeight: "bold" }}>{value}</Text>
                                </View>
                            );
                        })}
                    </View>

                    <Text style={{
                        ...Fonts.primaryColor16Medium,
                        lineHeight: 20,
                        textAlign: "justify",
                        color: Colors.grayColor,
                        marginBottom: Sizes.fixPadding * 2.0,
                    }}>
                        {openedProduct.description}
                    </Text>
                </View>

                {/* Bottom Bar */}
                <View style={{
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
                }}>
                    {/* Quantity Selector */}
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
                            <FontAwesome name="minus-circle" size={30} color={Colors.companyPrimaryDark} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, fontWeight: "bold", marginHorizontal: 12 }}>{quantity}</Text>
                        <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                            <FontAwesome name="plus-circle" size={30} color={Colors.companyPrimaryDark} />
                        </TouchableOpacity>
                    </View>

                    {/* Buy Button (Only if inventory is selected) */}
                    {isInventorySelected && (
                        <TouchableOpacity
                            style={{
                                backgroundColor: Colors.companyPrimaryDark,
                                borderRadius: 10,
                                paddingVertical: 12,
                                paddingHorizontal: 20,
                            }}
                            onPress={() => console.log("Buy Now", quantity)}
                        >
                            <Text style={{ color: Colors.whiteColor, fontSize: 18, fontWeight: "bold" }}>Buy Now</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );

    }


    // Function to render pagination for the carousel

    function inventoryList() {
        const totalInventory = openedProduct?.productInventoryList?.length || 0;
        const numColumns = Math.max(1, Math.ceil(totalInventory / 2)); // Ensures at least 1 column

        const renderItem = ({ item }) => {
            const isSelected = selectedInventory === item.id;
            setIsInventorySelected(isSelected)

            return (
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => updateState({ selectedInventory: item.id })}
                    style={{
                        width: "45%",
                        borderWidth: isSelected ? 2 : 1,
                        borderColor: isSelected ? Colors.companyPrimaryDark : Colors.lightGrayColor,
                        borderRadius: 12,
                        padding: 20,
                        marginVertical: 10,
                        // marginHorizontal: 5,
                        backgroundColor: isSelected ? Colors.companyLight : Colors.whiteColor,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: isSelected ? 8 : 3, // Highlight effect
                        marginHorizontal: "2%",
                    }}
                >
                    {/* Batch Number */}
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                        <FontAwesome5 name="barcode" size={18} color={isSelected ? Colors.companyPrimaryDark : Colors.lightGrayColor} />
                        <Text style={{
                            ...Fonts.primaryColor18Medium,
                            marginLeft: 10,
                            color: isSelected ? Colors.companyPrimaryDark : Colors.lightGrayColor,
                            fontWeight: isSelected ? "bold" : "normal",
                        }}>
                            {item.batchNumber}
                        </Text>
                    </View>

                    {/* Expiry Date */}
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                        <FontAwesome5 name="calendar-alt" size={18} color={isSelected ? Colors.companyPrimaryDark : Colors.lightGrayColor} />
                        <Text style={{
                            ...Fonts.primaryColor16Regular,
                            marginLeft: 10,
                            color: isSelected ? Colors.companyPrimaryDark : Colors.lightGrayColor,
                            fontWeight: isSelected ? "bold" : "normal",
                        }}>
                            Expiry: {new Date(item.expiryDate).toLocaleDateString()}
                        </Text>
                    </View>

                    {/* MRP */}
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                        <FontAwesome5 name="dollar-sign" size={18} color={isSelected ? Colors.companyPrimaryDark : Colors.lightGrayColor} />
                        <Text style={{
                            ...Fonts.primaryColor16Regular,
                            marginLeft: 10,
                            color: isSelected ? Colors.companyPrimaryDark : Colors.lightGrayColor,
                            fontWeight: isSelected ? "bold" : "normal",
                            fontSize: 14
                        }}>
                            MRP: ${item.mrp}
                        </Text>
                    </View>

                    {/* Discount - Highlighted Badge */}
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 10,
                        backgroundColor: "red",
                        paddingHorizontal: 12,
                        paddingVertical: 4,
                        borderRadius: 6,
                        alignSelf: "flex-start", // Ensures it doesn't stretch
                    }}>
                        <FontAwesome5 name="tags" size={16} color={Colors.whiteColor} />
                        <Text style={{
                            marginLeft: 8,
                            fontSize: 16,
                            fontWeight: "bold",
                            color: Colors.whiteColor,
                        }}>
                            {item.discount}% OFF
                        </Text>
                    </View>

                    {/* Stock */}
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <FontAwesome5 name="box" size={18} color={isSelected ? Colors.companyPrimaryDark : Colors.lightGrayColor} />
                        <Text style={{
                            ...Fonts.primaryColor16Regular,
                            marginLeft: 10,
                            color: isSelected ? Colors.companyPrimaryDark : Colors.lightGrayColor,
                            fontWeight: isSelected ? "bold" : "normal",
                        }}>
                            Stock: {item.inventoryCount}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        };

        return (
            <View style={{
                marginTop: Sizes.fixPadding * 2.0,
                paddingTop: Sizes.fixPadding * 2.0,
                backgroundColor: Colors.whiteColor,
                paddingHorizontal: Sizes.fixPadding * 2.0,

            }}>
                <Text style={{ ...Fonts.primaryColor17Medium, paddingBottom: Sizes.fixPadding, color: Colors.companyPrimaryDark, fontSize: 16 }}>
                    Available Inventory
                </Text>
                <Text style={{ ...Fonts.primaryColor14Regular, color: Colors.grayColor, fontSize: 14 }}>
                    Choose a batch to see proceed with your purchase.
                </Text>
                <FlatList
                    key={numColumns} // Forces re-render when numColumns changes
                    data={openedProduct.productInventoryList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    numColumns={2}// Dynamic columns
                    showsVerticalScrollIndicator={false}

                    contentContainerStyle={{
                        paddingBottom: Sizes.fixPadding * 2.0,
                        // Ensures proper spacing

                    }}
                />
            </View>
        );
    }
    function inventoryList2() {
        const totalInventory = openedProduct?.productInventoryList?.length || 0;
        const numColumns = Math.max(1, Math.ceil(totalInventory / 2)); // Ensures at least 1 column

        const renderItem = ({ item }) => {
            const isSelected = selectedInventory === item.id;

            return (
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => updateState({ selectedInventory: item.id })}
                    style={{
                        width: "48%", // Slightly less than 50% to account for margins
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
                        elevation: isSelected ? 8 : 3, // Highlight effect
                        marginHorizontal: "1%", // Adds spacing between cards
                    }}
                >
                    {/* Batch Number */}
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                        <FontAwesome5 name="barcode" size={18} color={isSelected ? Colors.companyPrimaryDark : Colors.lightGrayColor} />
                        <Text style={{
                            ...Fonts.primaryColor18Medium,
                            marginLeft: 10,
                            color: isSelected ? Colors.companyPrimaryDark : Colors.lightGrayColor,
                            fontWeight: isSelected ? "bold" : "normal",
                        }}>
                            {item.batchNumber}
                        </Text>
                    </View>

                    {/* Expiry Date */}
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                        <FontAwesome5 name="calendar-alt" size={18} color={isSelected ? Colors.companyPrimaryDark : Colors.lightGrayColor} />
                        <Text style={{
                            ...Fonts.primaryColor16Regular,
                            marginLeft: 10,
                            color: isSelected ? Colors.companyPrimaryDark : Colors.lightGrayColor,
                            fontWeight: isSelected ? "bold" : "normal",
                        }}>
                            Expiry: {new Date(item.expiryDate).toLocaleDateString()}
                        </Text>
                    </View>

                    {/* MRP */}
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                        <FontAwesome5 name="dollar-sign" size={18} color={isSelected ? Colors.companyPrimaryDark : Colors.lightGrayColor} />
                        <Text style={{
                            ...Fonts.primaryColor16Regular,
                            marginLeft: 10,
                            color: isSelected ? Colors.companyPrimaryDark : Colors.lightGrayColor,
                            fontWeight: isSelected ? "bold" : "normal",
                            fontSize: 14
                        }}>
                            MRP: ${item.mrp}
                        </Text>
                    </View>

                    {/* Discount - Highlighted Badge */}
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 12,
                        backgroundColor: isSelected ? Colors.companyPrimaryDark : "#FF5733",
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 6,
                        alignSelf: "flex-start", // Ensures it doesn't stretch
                    }}>
                        <FontAwesome5 name="tags" size={16} color={Colors.whiteColor} />
                        <Text style={{
                            marginLeft: 8,
                            fontSize: 14,
                            fontWeight: "bold",
                            color: Colors.whiteColor,
                        }}>
                            {item.discount}% OFF
                        </Text>
                    </View>

                    {/* Stock */}
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <FontAwesome5 name="box" size={18} color={isSelected ? Colors.companyPrimaryDark : Colors.lightGrayColor} />
                        <Text style={{
                            ...Fonts.primaryColor16Regular,
                            marginLeft: 10,
                            color: isSelected ? Colors.companyPrimaryDark : Colors.lightGrayColor,
                            fontWeight: isSelected ? "bold" : "normal",
                        }}>
                            Stock: {item.inventoryCount}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        };

        return (
            <View style={{
                marginTop: Sizes.fixPadding * 2.0,
                paddingTop: Sizes.fixPadding * 2.0,
                backgroundColor: Colors.whiteColor,
                paddingHorizontal: Sizes.fixPadding * 2.0,
            }}>
                <Text style={{ ...Fonts.primaryColor17Medium, paddingBottom: Sizes.fixPadding, color: Colors.companyPrimaryDark, fontSize: 18, fontWeight: "bold" }}>
                    Available Inventory
                </Text>
                <FlatList
                    key={numColumns} // Forces re-render when numColumns changes
                    data={openedProduct.productInventoryList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    numColumns={2} // Two columns for better spacing
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: Sizes.fixPadding * 2.0,
                    }}
                />
            </View>
        );
    }
    function inventoryList3() {
        const totalInventory = openedProduct?.productInventoryList?.length || 0;
        const numColumns = Math.max(1, Math.ceil(totalInventory / 2)); // Ensures at least 1 column

        const renderItem = ({ item }) => {
            const isSelected = selectedInventory === item.id;

            return (
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => updateState({ selectedInventory: item.id })}
                    style={{
                        width: "48%", // Slightly less than 50% to account for margins
                        borderRadius: 16,
                        padding: 16,
                        marginVertical: 8,
                        backgroundColor: isSelected ? "rgba(255, 255, 255, 0.7)" : "rgba(255, 255, 255, 0.5)", // Glassmorphism background
                        borderWidth: isSelected ? 2 : 1,
                        borderColor: isSelected ? Colors.companyPrimaryDark : "rgba(255, 255, 255, 0.3)", // Subtle border
                        backdropFilter: "blur(10px)", // Blur effect (for web, use `backdropFilter` in React Native)
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: isSelected ? 0.3 : 0.2,
                        shadowRadius: isSelected ? 10 : 8,
                        elevation: isSelected ? 10 : 5, // Highlight effect
                        marginHorizontal: "1%", // Adds spacing between cards
                    }}
                >
                    {/* Batch Number */}
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                        <FontAwesome5 name="barcode" size={18} color={isSelected ? Colors.companyPrimaryDark : Colors.lightGrayColor} />
                        <Text style={{
                            ...Fonts.primaryColor18Medium,
                            marginLeft: 10,
                            color: isSelected ? Colors.companyPrimaryDark : Colors.lightGrayColor,
                            fontWeight: isSelected ? "bold" : "normal",
                        }}>
                            {item.batchNumber}
                        </Text>
                    </View>

                    {/* Expiry Date */}
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                        <FontAwesome5 name="calendar-alt" size={18} color={isSelected ? Colors.companyPrimaryDark : Colors.lightGrayColor} />
                        <Text style={{
                            ...Fonts.primaryColor16Regular,
                            marginLeft: 10,
                            color: isSelected ? Colors.companyPrimaryDark : Colors.lightGrayColor,
                            fontWeight: isSelected ? "bold" : "normal",
                        }}>
                            Expiry: {new Date(item.expiryDate).toLocaleDateString()}
                        </Text>
                    </View>

                    {/* MRP */}
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                        <FontAwesome5 name="dollar-sign" size={18} color={isSelected ? Colors.companyPrimaryDark : Colors.lightGrayColor} />
                        <Text style={{
                            ...Fonts.primaryColor16Regular,
                            marginLeft: 10,
                            color: isSelected ? Colors.companyPrimaryDark : Colors.lightGrayColor,
                            fontWeight: isSelected ? "bold" : "normal",
                            fontSize: 14
                        }}>
                            MRP: ${item.mrp}
                        </Text>
                    </View>

                    {/* Discount - Highlighted Badge */}
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 12,
                        backgroundColor: isSelected ? Colors.companyPrimaryDark : "#FF5733",
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 6,
                        alignSelf: "flex-start", // Ensures it doesn't stretch
                    }}>
                        <FontAwesome5 name="tags" size={16} color={Colors.whiteColor} />
                        <Text style={{
                            marginLeft: 8,
                            fontSize: 14,
                            fontWeight: "bold",
                            color: Colors.whiteColor,
                        }}>
                            {item.discount}% OFF
                        </Text>
                    </View>

                    {/* Stock */}
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <FontAwesome5 name="box" size={18} color={isSelected ? Colors.companyPrimaryDark : Colors.lightGrayColor} />
                        <Text style={{
                            ...Fonts.primaryColor16Regular,
                            marginLeft: 10,
                            color: isSelected ? Colors.companyPrimaryDark : Colors.lightGrayColor,
                            fontWeight: isSelected ? "bold" : "normal",
                        }}>
                            Stock: {item.inventoryCount}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        };

        return (
            <View style={{
                marginTop: Sizes.fixPadding * 2.0,
                paddingTop: Sizes.fixPadding * 2.0,
                backgroundColor: Colors.companyPrimaryLight, // Background color for the container
                paddingHorizontal: Sizes.fixPadding * 2.0,
            }}>
                <Text style={{ ...Fonts.primaryColor17Medium, paddingBottom: Sizes.fixPadding, color: Colors.companyPrimaryDark, fontSize: 18, fontWeight: "bold" }}>
                    Available Inventory
                </Text>
                <FlatList
                    key={numColumns} // Forces re-render when numColumns changes
                    data={openedProduct.productInventoryList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    numColumns={2} // Two columns for better spacing
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


    //... (rest of the functions like header, delivertoInfo, etc., remain the same)
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

export default ProductDescriptionScreen;