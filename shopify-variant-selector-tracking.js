// Send User Product and Variant selections to Google Tag Manager
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
          id: selectedVariant.sku,
          price: (parseInt(selectedVariant.price) / 100).toString(), // Shopify price presented in cents
          brand: ShopifyAnalytics.meta.product.vendor,
          category: ShopifyAnalytics.meta.product.type,
          variant: selectedVariant.public_title,
        }],
      },
    },
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventPayload);
};


// Compare current Variant selection to previous variant selection
//

var compareToCurrentSelection = function () {
  window.currentSelection = findVariantById(
    ShopifyAnalytics.meta.product.variants,
    ShopifyAnalytics.meta.selectedVariantId
  );

  if (window.cachedSelection.id !== window.currentSelection.id) {
    // console.log('UPDATED!', window.currentSelection);
    trackSelectedProduct();
    window.cachedSelection = findVariantById(
      ShopifyAnalytics.meta.product.variants,
      ShopifyAnalytics.meta.selectedVariantId
    );
  }
};


// Start checking selection
//

var init = function () {
  // Check for change every 300ms
  window.cachedSelection = findVariantById(
    ShopifyAnalytics.meta.product.variants,
    ShopifyAnalytics.meta.selectedVariantId
  );
  window.currentSelection = findVariantById(
    ShopifyAnalytics.meta.product.variants,
    ShopifyAnalytics.meta.selectedVariantId
  );

  window.trackingCheckInterval = window.setInterval(compareToCurrentSelection, 200);
};


// If tracking is ready
//

var readyCheck = function () {
  if (
    'ShopifyAnalytics' in window &&
    'meta' in ShopifyAnalytics &&
    'selectedVariantId' in ShopifyAnalytics.meta &&
    'product' in ShopifyAnalytics.meta &&
    'variants' in ShopifyAnalytics.meta.product
  ) {
    init();
  } else {
    window.trackingReadyTimeout = window.setTimeout(readyCheck, 200);
  }
};

window.trackingReadyTimeout = window.setTimeout(readyCheck, 200);