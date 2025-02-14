# Shopify product list for Telegram

Example of displaying the list of products from shopify store in telegram bot

### Setup

Required .env-File variables:
- `BOT_TOKEN`: Token of your telegram bot
- `SHOPIFY_STORE_URL`: Your shopify store's domain, e.x. `your-domain.myshopify.com`
- `SHOPIFY_STOREFRONT_TOKEN`: Your storefront api token
- `SHOPIFY_API_VERSION`: shopify api version, default `2025-01`

```shell
git clone git@github.com:maximbahmackij/telegram-shopify-product-list.git
cd telegram-shopify-product-list
npm install
npm run dev
```
## Example

<img src="https://github.com/user-attachments/assets/c9e21a6e-a8e1-419c-8573-bd08e3b7e3c1" alt="Example 1" height="350">
<img src="https://github.com/user-attachments/assets/3e6b4cbb-d0d9-4f6f-bb7b-6c549fe57db1" alt="Example 12" height="350">



## Resources

- [Storefront](https://shopify.dev/docs/api/storefront) - Storefront GraphQL Api
- [telegraf.js](https://telegraf.js.org/) - Modern Telegram Bot API framework for Node.js
- [NodeJs](https://nodejs.org/) - dock nodejs
- [TypeScript](https://www.typescriptlang.org/) - dock typescript
