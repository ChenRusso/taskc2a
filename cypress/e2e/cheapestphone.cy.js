describe('DemoBlaze Login and Add to Cart', () => {
  let cheapestPhoneHref;

  const findAndAddCheapestPhoneToCart = () => {
    // Use a selector that matches all prices on the current page
    const priceSelector = '.card > .card-block > h5';

    cy.get(priceSelector).then(($prices) => {
      let lowestPhonePrice = Number.MAX_VALUE;
      let lowestPriceLocation = -1;

      $prices.each((index, element) => {
        const price = parseFloat(element.innerText.replace('$', '').trim());

        if (!isNaN(price) && price < lowestPhonePrice) {
          lowestPhonePrice = price;
          lowestPriceLocation = index + 1; // Adjust for nth-child index starting at 1
        }
      });

      if (lowestPriceLocation !== -1) {
        // Get the href of the cheapest phone on the current page
        cy.get(`:nth-child(${lowestPriceLocation}) > .card > .card-block .card-title .hrefch`)
          .then(($link) => {
            cheapestPhoneHref = $link.attr('href');
            cy.log('Cheapest phone href on this page:', cheapestPhoneHref);

            // Add the cheapest phone to the cart
            addCheapestPhoneToCart();
          });
      } else {
        cy.log('No phone prices found on this page.');

        // Stop if no phone prices found (reached the end of phones)
      }
    });
  };

  const addCheapestPhoneToCart = () => {
    // Navigate to the cheapest phone page
    cy.visit(`https://www.demoblaze.com/${cheapestPhoneHref}`);
    cy.wait(100);

    // Add to cart
    cy.get('.col-sm-12 > .btn').click();
  };

  it('should log in and add the cheapest phone to cart', () => {
    cy.visit("https://www.demoblaze.com/");

    // Click on the "Phones"
    cy.get('[onclick="byCat(\'phone\')"]').click();
    cy.wait(1000); // Adjust the wait time as needed

    // Find and add the cheapest phone to the cart
    findAndAddCheapestPhoneToCart();
  });
});
