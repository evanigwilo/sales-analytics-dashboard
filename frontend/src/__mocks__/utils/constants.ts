import { Sale } from "@/utils/types";

// Mock sales data for testing
export const mockSales: Sale[] = [
  {
    id: "b155b592-f48b-43e5-9d62-44d7abb4a51d", // Unique identifier for the sale
    amount: 198, // Sale amount in currency
    date: "2024-05-01", // Date of the sale
    product: {
      name: "Intelligent Frozen Towels", // Product name
      category: "Toys", // Product category
    },
    region: "Egypt", // Region where the sale occurred
  },
  {
    id: "27477a36-5870-4af0-8fcc-41acca6e0123",
    amount: 133,
    date: "2024-05-01",
    product: {
      name: "Unbranded Granite Table",
      category: "Toys",
    },
    region: "Mexico",
  },
  {
    id: "b117443e-1c80-4344-bd3c-1e765ecb1e34",
    amount: 336,
    date: "2024-05-02",
    product: {
      name: "Oriental Cotton Shoes",
      category: "Home Appliances",
    },
    region: "United States of America",
  },
  {
    id: "8c942655-5ac6-451c-91d4-6305ff76bdd8",
    amount: 373,
    date: "2024-05-02",
    product: {
      name: "Unbranded Cotton Chair",
      category: "Home Appliances",
    },
    region: "Egypt",
  },
  {
    id: "5d359ffa-a334-4534-aea2-61b9c01733d2",
    amount: 570,
    date: "2024-05-02",
    product: {
      name: "Licensed Plastic Sausages",
      category: "Home Appliances",
    },
    region: "Cocos (Keeling) Islands",
  },
];
