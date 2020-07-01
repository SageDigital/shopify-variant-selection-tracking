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