import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState("light");
    const [products, setProducts] = useState([]); // Store products
    const [loggedInUser, setLoggedInUser] = useState({});
    const [wishlistItems, setWishlistItems] = useState([]);

    // Function to add/remove items from the wishlist
    const toggleWishlistItem = (item) => {
        setWishlistItems((prevItems) => {
            const isItemInWishlist = prevItems.some((wishlistItem) => wishlistItem.id === item.id);
            if (isItemInWishlist) {
                // Remove item from wishlist
                return prevItems.filter((wishlistItem) => wishlistItem.id !== item.id);
            } else {
                // Add item to wishlist
                return [...prevItems, item];
            }
        });
    };

    useEffect(() => {
        console.log("use effect App context screen");

        const fetchProducts = async () => {
            try {
                const response = await fetch('http://13.233.121.204:8080/FarmHub/api/v1/products'); // Use the correct API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                console.log("after fetch call");

                const data = await response.json();
                console.log("data from app contetx products api call", data);



                setProducts(data);

            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                // console.log("in finally");

                // const sampleResponseData = [
                //     {
                //         "id": 1,
                //         "name": "Cetirizine Tablets",
                //         "description": "Antihistamine used to relieve allergy symptoms.",
                //         "composition": "UIYP 10mg",
                //         "packingName": "Strip of 10 tablets",
                //         "companyName": "ICTRAP abc",
                //         "status": "ACTIVE",
                //         "image": "https://plus.unsplash.com/premium_photo-1671721439617-491242a0507f?q=80&w=1894&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                //         "createdBy": "ADMIN",
                //         "updatedBy": "ADMIN",
                //         "createdAt": "2025-02-09T15:20:30.654321",
                //         "modifiedAt": "2025-02-12T23:21:28.639744",
                //         "productInventoryList": [
                //             {
                //                 "id": 1,
                //                 "batchNumber": "UOUY",
                //                 "expiryDate": "2026-12-30T00:00:00.000+00:00",
                //                 "basicRate": "25",
                //                 "mrp": "400",
                //                 "purchaseRate": "22",
                //                 "saleRate": "35",
                //                 "discount": "4",
                //                 "inventoryCount": "600",
                //                 "inventoryUpdateId": "NA",
                //                 "createdBy": "ADMIN",
                //                 "updatedBy": "ADMIN",
                //                 "createdAt": "2025-02-12T23:21:28.64523",
                //                 "modifiedAt": "2025-02-09T15:20:30.654321",
                //                 "active": true,
                //                 "hsncode": "30049099"
                //             },
                //             {
                //                 "id": 2,
                //                 "batchNumber": "UIUYTT",
                //                 "expiryDate": "2026-12-30T00:00:00.000+00:00",
                //                 "basicRate": "25",
                //                 "mrp": "4800",
                //                 "purchaseRate": "22",
                //                 "saleRate": "35",
                //                 "discount": "4",
                //                 "inventoryCount": "600",
                //                 "inventoryUpdateId": "NA",
                //                 "createdBy": "ADMIN",
                //                 "updatedBy": "ADMIN",
                //                 "createdAt": "2025-02-12T23:21:28.646229",
                //                 "modifiedAt": "2025-02-09T15:20:30.654321",
                //                 "active": true,
                //                 "hsncode": "30049099"
                //             }
                //         ],
                //         "active": true
                //     },
                //     {
                //         "id": 2,
                //         "name": "Cetirizine Tablets",
                //         "description": "Antihistamine used to relieve allergy symptoms.",
                //         "composition": "UIYP 10mg",
                //         "packingName": "Strip of 10 tablets",
                //         "companyName": "ICTRAP abc",
                //         "status": "ACTIVE",
                //         "image": "https://plus.unsplash.com/premium_photo-1671721439617-491242a0507f?q=80&w=1894&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                //         "createdBy": "ADMIN",
                //         "updatedBy": "ADMIN",
                //         "createdAt": "2025-02-09T15:20:30.654321",
                //         "modifiedAt": "2025-02-12T23:21:29.867992",
                //         "productInventoryList": [
                //             {
                //                 "id": 3,
                //                 "batchNumber": "UOUY",
                //                 "expiryDate": "2026-12-30T00:00:00.000+00:00",
                //                 "basicRate": "25",
                //                 "mrp": "400",
                //                 "purchaseRate": "22",
                //                 "saleRate": "35",
                //                 "discount": "4",
                //                 "inventoryCount": "600",
                //                 "inventoryUpdateId": "NA",
                //                 "createdBy": "ADMIN",
                //                 "updatedBy": "ADMIN",
                //                 "createdAt": "2025-02-12T23:21:29.868524",
                //                 "modifiedAt": "2025-02-09T15:20:30.654321",
                //                 "active": true,
                //                 "hsncode": "30049099"
                //             },
                //             {
                //                 "id": 4,
                //                 "batchNumber": "UIUYTT",
                //                 "expiryDate": "2026-12-30T00:00:00.000+00:00",
                //                 "basicRate": "25",
                //                 "mrp": "4800",
                //                 "purchaseRate": "22",
                //                 "saleRate": "35",
                //                 "discount": "4",
                //                 "inventoryCount": "600",
                //                 "inventoryUpdateId": "NA",
                //                 "createdBy": "ADMIN",
                //                 "updatedBy": "ADMIN",
                //                 "createdAt": "2025-02-12T23:21:29.868524",
                //                 "modifiedAt": "2025-02-09T15:20:30.654321",
                //                 "active": true,
                //                 "hsncode": "30049099"
                //             }
                //         ],
                //         "active": true
                //     },
                //     {
                //         "id": 3,
                //         "name": "Cetirizine Tablets",
                //         "description": "Antihistamine used to relieve allergy symptoms.",
                //         "composition": "UIYP 10mg",
                //         "packingName": "Strip of 10 tablets",
                //         "companyName": "ICTRAP abc",
                //         "status": "ACTIVE",
                //         "image": "https://plus.unsplash.com/premium_photo-1671721439617-491242a0507f?q=80&w=1894&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                //         "createdBy": "ADMIN",
                //         "updatedBy": "ADMIN",
                //         "createdAt": "2025-02-09T15:20:30.654321",
                //         "modifiedAt": "2025-02-12T23:21:31.377078",
                //         "productInventoryList": [
                //             {
                //                 "id": 5,
                //                 "batchNumber": "UOUY",
                //                 "expiryDate": "2026-12-30T00:00:00.000+00:00",
                //                 "basicRate": "25",
                //                 "mrp": "400",
                //                 "purchaseRate": "22",
                //                 "saleRate": "35",
                //                 "discount": "4",
                //                 "inventoryCount": "600",
                //                 "inventoryUpdateId": "NA",
                //                 "createdBy": "ADMIN",
                //                 "updatedBy": "ADMIN",
                //                 "createdAt": "2025-02-12T23:21:31.378112",
                //                 "modifiedAt": "2025-02-09T15:20:30.654321",
                //                 "active": true,
                //                 "hsncode": "30049099"
                //             },
                //             {
                //                 "id": 6,
                //                 "batchNumber": "UIUYTT",
                //                 "expiryDate": "2026-12-30T00:00:00.000+00:00",
                //                 "basicRate": "25",
                //                 "mrp": "4800",
                //                 "purchaseRate": "22",
                //                 "saleRate": "35",
                //                 "discount": "4",
                //                 "inventoryCount": "600",
                //                 "inventoryUpdateId": "NA",
                //                 "createdBy": "ADMIN",
                //                 "updatedBy": "ADMIN",
                //                 "createdAt": "2025-02-12T23:21:31.378112",
                //                 "modifiedAt": "2025-02-09T15:20:30.654321",
                //                 "active": true,
                //                 "hsncode": "30049099"
                //             }
                //         ],
                //         "active": true
                //     },
                //     {
                //         "id": 4,
                //         "name": "Cetirizine Tablets",
                //         "description": "Antihistamine used to relieve allergy symptoms.",
                //         "composition": "UIYP 10mg",
                //         "packingName": "Strip of 10 tablets",
                //         "companyName": "ICTRAP abc",
                //         "status": "ACTIVE",
                //         "image": "https://plus.unsplash.com/premium_photo-1671721439617-491242a0507f?q=80&w=1894&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                //         "createdBy": "ADMIN",
                //         "updatedBy": "ADMIN",
                //         "createdAt": "2025-02-09T15:20:30.654321",
                //         "modifiedAt": "2025-02-12T23:21:33.354587",
                //         "productInventoryList": [
                //             {
                //                 "id": 7,
                //                 "batchNumber": "UOUY",
                //                 "expiryDate": "2026-12-30T00:00:00.000+00:00",
                //                 "basicRate": "25",
                //                 "mrp": "400",
                //                 "purchaseRate": "22",
                //                 "saleRate": "35",
                //                 "discount": "4",
                //                 "inventoryCount": "600",
                //                 "inventoryUpdateId": "NA",
                //                 "createdBy": "ADMIN",
                //                 "updatedBy": "ADMIN",
                //                 "createdAt": "2025-02-12T23:21:33.354743",
                //                 "modifiedAt": "2025-02-09T15:20:30.654321",
                //                 "active": true,
                //                 "hsncode": "30049099"
                //             },
                //             {
                //                 "id": 8,
                //                 "batchNumber": "UIUYTT",
                //                 "expiryDate": "2026-12-30T00:00:00.000+00:00",
                //                 "basicRate": "25",
                //                 "mrp": "4800",
                //                 "purchaseRate": "22",
                //                 "saleRate": "35",
                //                 "discount": "4",
                //                 "inventoryCount": "600",
                //                 "inventoryUpdateId": "NA",
                //                 "createdBy": "ADMIN",
                //                 "updatedBy": "ADMIN",
                //                 "createdAt": "2025-02-12T23:21:33.354743",
                //                 "modifiedAt": "2025-02-09T15:20:30.654321",
                //                 "active": true,
                //                 "hsncode": "30049099"
                //             }
                //         ],
                //         "active": true
                //     }
                // ]

                // setProducts(sampleResponseData);
                // console.log("context product data", products);

                setLoading(false);
            }
        };

        fetchProducts(); // Call the function inside useEffect, not outside

    }, []);

    return (
        <AppContext.Provider value={{
            user, setUser, theme, setTheme, products, setProducts, loggedInUser, setLoggedInUser, wishlistItems,
            toggleWishlistItem,
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
