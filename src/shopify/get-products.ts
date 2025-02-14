import type { Product } from "../@types/product";
import shopify from "../config/shopify";
import { GET_PRODUCTS_QUERY } from "queries";

interface GetProductsResponse {
  products: {
    edges: {
      node: Product;
      cursor: string;
    }[];
  };
}

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await shopify.request<GetProductsResponse>(
      GET_PRODUCTS_QUERY
    );
    return response?.data?.products?.edges.map((edge) => edge.node) ?? [];
  } catch (error) {
    console.error("Error receiving products:", error);
    return [];
  }
}
