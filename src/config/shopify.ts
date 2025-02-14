import { createStorefrontApiClient } from "@shopify/storefront-api-client";

const client = createStorefrontApiClient({
  storeDomain: process.env.SHOPIFY_STORE_URL!,
  apiVersion: process.env.SHOPIFY_API_VERSION ?? "2025-01",
  publicAccessToken: process.env.SHOPIFY_STOREFRONT_TOKEN!,
});

export default client;
