import "dotenv/config";
import { Context, Markup } from "telegraf";

import bot from "./config/telegraf";
import { createCart } from "./shopify/create-cart";
import { getProducts } from "./shopify/get-products";

const handleProductsRequest = async (ctx: Context) => {
  const products = await getProducts();
  if (products.length === 0) {
    ctx.reply("Products not found.");
    return;
  }

  const productButtons = products.map((product: any) => {
    return [
      Markup.button.callback(product.title, `view_product_${product.id}`),
    ];
  });

  await ctx.reply(
    "Choose a product...",
    Markup.inlineKeyboard(productButtons as any)
  );
};

const handleProductVariantRequest = async (ctx: any) => {
  const productId = ctx.match[1];
  const products = await getProducts();
  const product = products.find((p: any) => p.id === productId);

  if (product) {
    const imageUrl =
      product.images.edges[0]?.node?.url ??
      "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png";
    const price = product.variants.edges[0]?.node.price;
    const productVariantId = product.variants.edges[0]?.node?.id;
    await ctx.replyWithPhoto(imageUrl, {
      caption: `${product.title}\nPrice: ${price.amount} ${price.currencyCode}`,
      ...Markup.inlineKeyboard([
        [
          {
            text: "🛒 Buy",
            callback_data: `buy_product_${productVariantId}`,
          },
        ],
        [{ text: "🔙 Back to list", callback_data: "products" }],
      ]),
    });
  }
};

const handleCheckoutRequest = async (ctx: any) => {
  try {
    const productId = ctx.match[1];
    const checkoutUrl = await createCart(productId);

    await ctx.reply(
      "Follow the link to complete your purchase:",
      Markup.inlineKeyboard([
        Markup.button.url("Place an order", checkoutUrl ?? ""),
      ])
    );
  } catch (error) {
    console.error("Error creating cart:", error);
    await ctx.reply("Failed to create order. Try again later.");
  }
};

bot.start((ctx) => {
  ctx.reply(`Hi ${ctx.from.first_name}!`);
  handleProductsRequest(ctx);
});

bot.command("products", handleProductsRequest);
bot.action("products", handleProductsRequest);
bot.action(
  /view_product_(gid:\/\/shopify\/Product\/\d+)/,
  handleProductVariantRequest
);
bot.action(
  /buy_product_(gid:\/\/shopify\/ProductVariant\/\d+)/,
  handleCheckoutRequest
);

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
