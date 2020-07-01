<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" style="color: #00CCFF">
  <symbol id="sage-digital-logo" viewBox="0 0 198 19"">
    <path
      d="M2.507 14.218c.505.26 1.054.488 1.65.68 1.073.346 2.146.52 3.22.52 1.193 0 2.076-.178 2.647-.532s.856-.826.856-1.415a1.35 1.35 0 0 0-.506-1.077c-.337-.285-.77-.515-1.297-.688s-1.242-.363-2.142-.57l-3.4-.986a5.53 5.53 0 0 1-2.271-1.583C.63 7.838.315 6.87.315 5.658c0-1.055.285-2.01.856-2.868S2.603 1.254 3.754.753 6.3 0 7.972 0c1.16 0 2.292.138 3.4.415 1.103.276 2.07.673 2.898 1.19L11.705 4.17c-1.253-.53-2.506-.796-3.76-.796-1.177 0-2.047.2-2.61.57s-.843.882-.843 1.505.324 1.086.973 1.39 1.64.6 2.972.895l3.4.987a5.62 5.62 0 0 1 2.271 1.557c.63.71.947 1.67.947 2.88 0 1.038-.3 1.985-.87 2.842s-1.45 1.535-2.61 2.037-2.57.753-4.23.753c-1.437 0-2.825-.195-4.166-.584C1.868 17.825.807 17.33 0 16.725l2.507-2.507zm47.178-9.77c-.966-.578-2.046-.867-3.24-.867-1.16 0-2.19.242-3.09.726a5.22 5.22 0 0 0-2.102 2.051c-.502.882-.753 1.894-.753 3.036 0 1.125.25 2.13.753 3.01a5.33 5.33 0 0 0 2.089 2.064c.89.493 1.908.74 3.05.74 1.21 0 2.3-.26 3.27-.778V9.1h3.84v7.37c-.986.744-2.128 1.315-3.426 1.713s-2.604.597-3.92.597c-1.886 0-3.58-.402-5.087-1.207s-2.686-1.92-3.542-3.348-1.285-3.04-1.285-4.84.428-3.413 1.285-4.84S39.577 2.01 41.1 1.207 44.335 0 46.238 0c1.592 0 3.037.268 4.335.805a8.93 8.93 0 0 1 1.779.978L49.685 4.45zM128.6 9.187h3.2v7.28c-.94.748-2.035 1.322-3.288 1.723s-2.54.6-3.863.6c-1.86 0-3.54-.405-5.037-1.214s-2.67-1.927-3.523-3.353-1.28-3.036-1.28-4.83.426-3.4 1.28-4.828a8.99 8.99 0 0 1 3.536-3.353C121.14.405 122.833 0 124.712 0c1.532 0 2.923.252 4.176.757s2.306 1.244 3.158 2.218l-2.14 2.088a6.86 6.86 0 0 0-5.037-2.088c-1.288 0-2.432.27-3.432.81s-1.783 1.297-2.35 2.27-.848 2.088-.848 3.34c0 1.218.283 2.315.848 3.29s1.35 1.74 2.35 2.297 2.136.835 3.406.835c1.427 0 2.68-.313 3.758-.94v-5.69zM106.235.26h3.392v18.27h-3.392V.26zm31.605 0h3.393v18.27h-3.393V.26zm46.847 0h3.393V15.66h9.552v2.87h-12.945V.26zm-33.25 2.87h-6.055V.26h15.503v2.87h-6.055V18.53h-3.393V3.132zM83.11.26h7.987c1.948 0 3.68.378 5.193 1.135s2.688 1.827 3.523 3.2 1.253 2.98 1.253 4.79-.417 3.406-1.253 4.8-2.01 2.453-3.523 3.2-3.245 1.135-5.193 1.135H83.11V.26zm92.31 14.04h-9.135l-1.8 4.228h-3.497L169.2.26h3.34l8.247 18.27h-3.55l-1.827-4.228zM35.165 15.424l-3.05 3.05-1.606-3.887h-8.435l-1.61 3.893h-4.31L24.255.31h4.153l6.757 15.113zM70.556.31l-3.374 3.375h-6.148V7.63h8.435v3.27h-8.435v4.204h9.89v3.374H56.856V.31h13.7zM90.94 15.66c1.34 0 2.518-.257 3.536-.77s1.8-1.244 2.35-2.192.822-2.05.822-3.302-.274-2.353-.822-3.3-1.33-1.68-2.35-2.192-2.196-.77-3.536-.77h-4.437V15.66h4.437zm83.36-4.02l-3.445-7.986-3.42 7.986h6.864zm-145.114-.246l-2.88-6.956-2.88 6.956h5.762z"
      fill-rule="nonzero"
    />
  </symbol>
</svg>

# Shopify Variant Selector Tracking

This simple script lives on the Shopify Product Detail view. It compares the last-selected variant to the currently selected variant and sends differences to `dataLayer`.

## Implementation

Add a `<script defer>` tag to the end of your theme's product.liquid view. Add the contents of [/shopify-variant-selector-tracking.js](shopify-variant-selector-tracking.js) within the tag, like so:

```liquid
<script defer>
  // /shopify-variant-selector-tracking.js contents here
</script>
```

## What does it do?

Every 300ms, this script looks at Shopify's own `ShopifyAnalytics.meta.selectedVariantId` for changes.

When there is a change, this script looks up details from Shopify's own `ShopifyAnalytics.meta.product.variants` array and sends variant details to the `dataLayer` for Google Tag Manager and other trackers. The JSON payload is sent in Google Analytics Enhanced Ecommerce format.

## FAQ

* **Q:** Does this script require Google Tag Manager

  **A:** Nope. It ensures `window.dataLayer` exists before pushing, so even if you're not using GTM, it doesn't fail.

* **Q:** Does this script post to Google Analytics

  **A:** Nope. GA tracking is handled by Shopify, itself. We use GA's Enhanced Ecommerce format, because we think the format is pretty good.