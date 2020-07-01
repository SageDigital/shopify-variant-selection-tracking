// Send User Product and Variant selections to dataLayer
//

// Cache Variant IDs on Script Init
//
var findVariantById = function (variants, id) {
  return variants.filter(function (o) {
    return o.id.toString() == id;
  })[0];
};


// Send currently selected product to dataLayer
//
var trackSelectedProduct = function () {
  var selectedVariant = findVariantById(
    ShopifyAnalytics.meta.product.variants,
    ShopifyAnalytics.meta.selectedVariantId
  );

  if (selectedVariant) {
    var eventPayload = {
      event: 'productVariantSelect',
      eventAttributes: {
        action: 'select',
        category: "productVariant",
      },
      ecommerce: {
        detail: {
          actionField: {
            list: 'Product Detail Page',
          },
          products: [{
            name: selectedVariant.name,
            id: selectedVariant.id.toString(),
            sku: selectedVariant.sku,
            price: (parseInt(selectedVariant.price) / 100).toString(),
            brand: ShopifyAnalytics.meta.product.vendor,
            category: ShopifyAnalytics.meta.product.type,
            variant: selectedVariant.public_title,
          }],
        },
      },
    };

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(eventPayload);
  }
};


// Compare current Variant selection to previous variant selection
//
var compareToCurrentSelection = function () {
  window.currentSelection = ShopifyAnalytics.meta.selectedVariantId;

  if (window.cachedSelection !== window.currentSelection) {
    trackSelectedProduct();
  }

  window.cachedSelection = ShopifyAnalytics.meta.selectedVariantId;
};


// Start checking selection
//
var initVariantSelectorTracking = function () {
  // Check for change every 300ms
  window.cachedSelection = ShopifyAnalytics.meta.selectedVariantId;
  window.currentSelection = ShopifyAnalytics.meta.selectedVariantId;

  window.trackingCheckInterval = window.setInterval(compareToCurrentSelection, 200);
};


// Init when tracking is ready
//
var variantSelectorReadyCheck = function () {
  if (
    'ShopifyAnalytics' in window &&
    'meta' in ShopifyAnalytics &&
    'selectedVariantId' in ShopifyAnalytics.meta &&
    'product' in ShopifyAnalytics.meta &&
    'variants' in ShopifyAnalytics.meta.product
  ) {
    initVariantSelectorTracking();
  } else {
    window.trackingReadyTimeout = window.setTimeout(variantSelectorReadyCheck, 200);
  }
};
window.trackingReadyTimeout = window.setTimeout(variantSelectorReadyCheck, 200);
