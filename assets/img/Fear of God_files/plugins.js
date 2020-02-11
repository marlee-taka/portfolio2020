/**
 * Currency Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help with currency formatting
 *
 * Current contents
 * - formatMoney - Takes an amount in cents and returns it as a formatted dollar value.
 *
 */

const moneyFormat = '${{amount}}';

/**
 * Format money values based on your shop currency settings
 * @param  {Number|string} cents - value in cents or dollar amount e.g. 300 cents
 * or 3.00 dollars
 * @param  {String} format - shop money_format setting
 * @return {String} value - formatted value
 */
function formatMoney(cents, format) {
  if (typeof cents === 'string') {
    cents = cents.replace('.', '');
  }
  let value = '';
  const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  const formatString = format || moneyFormat;

  function formatWithDelimiters(
    number,
    precision = 2,
    thousands = ',',
    decimal = '.'
  ) {
    if (isNaN(number) || number == null) {
      return 0;
    }

    number = (number / 100.0).toFixed(precision);

    const parts = number.split('.');
    const dollarsAmount = parts[0].replace(
      /(\d)(?=(\d\d\d)+(?!\d))/g,
      `$1${thousands}`
    );
    const centsAmount = parts[1] ? decimal + parts[1] : '';

    return dollarsAmount + centsAmount;
  }

  switch (formatString.match(placeholderRegex)[1]) {
    case 'amount':
      value = formatWithDelimiters(cents, 2);
      break;
    case 'amount_no_decimals':
      value = formatWithDelimiters(cents, 0);
      break;
    case 'amount_with_comma_separator':
      value = formatWithDelimiters(cents, 2, '.', ',');
      break;
    case 'amount_no_decimals_with_comma_separator':
      value = formatWithDelimiters(cents, 0, '.', ',');
      break;
  }

  return formatString.replace(placeholderRegex, value);
}
  
  // Find the container that will hold the recommendations
  var list = document.querySelector(".product-recommendations__list");
  // Get the product id to request the product recommendations
  var productId = list.dataset.productid;
  // Create an AJAX request
  var request = new XMLHttpRequest();

  request.open(
    "GET",
    "/recommendations/products.json?product_id=" + productId + "&limit=4"
  );

  request.onload = function() {
    if (request.status === 404 || request.status === 422) {
      return hideRecommendationsSection();
    }

    var products = JSON.parse(request.response).products;

    if (products.length === 0) {
      return hideRecommendationsSection();
    }

    // Append product recommendations to the DOM.
    list.innerHTML = products.map(function(product) { return renderProduct(product) }).join("");
  };

  request.onerror = function() {
    hideRecommendationsSection();
  };

  // Send AJAX request
  request.send();

  function hideRecommendationsSection() {
    list.style.display = "none";
  }

  function renderProduct(product) {
    return [
      '<div class="product-item col-md-3 col-6">',
        '<a href="' + product.url + '" class="product__anchor relatedProducts-item">',
      	  '<div class="product-item-img">',
            '<img class="product__img img-responsive" src="' + product.featured_image + '" alt="'+ product.title +'"/>',
            '<h3 class="product-item-title">' + product.title + '</h3>',
            '<p class="price">' + formatMoney(product.price, window.moneyFormat) + '</p>',
      	  '</div>',      
        '</a>',
      '</div>'
    ].join("");
  }  


