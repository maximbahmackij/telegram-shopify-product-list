import type { ProductVariant } from "./product-variant";

export interface Product {
  id: string;
  title: string;
  description: string;
  images: { edges?: { node?: { url?: string } }[] };
  variants: { edges?: { node?: ProductVariant }[] };
}
