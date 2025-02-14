import type { Cart } from "../@types/cart";
import shopify from "../config/shopify";
import { CREATE_CART_QUERY } from "../queries";

interface CreateCartResponse {
  cartCreate: {
    cart?: Cart;
    userErrors?: { code: string; message: string }[];
  };
}

export async function createCart(productVariantId: string) {
  const { data, errors } = await shopify.request<CreateCartResponse>(
    CREATE_CART_QUERY,
    {
      variables: {
        input: { lines: [{ merchandiseId: productVariantId, quantity: 1 }] },
      },
    }
  );

  if (data?.cartCreate?.userErrors?.length) {
    throw new Error(data?.cartCreate?.userErrors?.[0].message);
  }

  if (errors?.graphQLErrors?.length) {
    throw new Error(errors.graphQLErrors[0]);
  }

  return data?.cartCreate?.cart?.checkoutUrl;
}
