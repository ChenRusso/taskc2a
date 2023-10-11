describe('DemoBlaze Login and Add to Cart', () => {
  let cheapestProductHref;

  const checkAndAddCheapestPhone = () => {
    // Use a selector that matches all prices on the current page
    const priceSelector = '.card > .card-block > h5';

    cy.get(priceSelector).then(($prices) => {
      let lowestPriceOfAllProducts = Number.MAX_VALUE;
      let lowestPriceLocation = -1;

      $prices.each((index, element) => {
        const price = parseFloat(element.innerText.replace('$', '').trim());

        if (!isNaN(price) && price < lowestPriceOfAllProducts) {
          lowestPriceOfAllProducts = price;
          lowestPriceLocation = index + 1;
        }
      });

      if (lowestPriceLocation !== -1) {
        // Get the href of the cheapest product on the current page
        cy.get(`:nth-child(${lowestPriceLocation}) > .card > .card-block .card-title .hrefch`)
          .then(($link) => {
            cheapestProductHref = $link.attr('href');
            cy.log('Cheapest phone href on this page:', cheapestProductHref);

            // Check if the "Next" button is visible
            cy.get('#next2').then(($nextButton) => {
              if ($nextButton.is(':visible')) {
                // Navigate to the next page
                cy.get('#next2').click(); // Click the "Next" button
                cy.wait(1000); // Adjust the wait time as needed

                // Recursively check the next page
                checkAndAddCheapestPhone();
              } else {
                // If no "Next" button, we are on the last page, add the cheapest product to the cart
                addCheapestProductToCart();
              }
            });
          });
      } else {
        cy.log('No prices found on this page.');

        // Stop recursion if no prices found (reached the end of products)
      }
    });
  };

  const addCheapestProductToCart = () => {
    // Navigate to the cheapest phone page
    cy.visit(`https://www.demoblaze.com/${cheapestProductHref}`);
    cy.wait(100);

    // Add to cart
    cy.get('.col-sm-12 > .btn').click();
  };

  it('should log in and add the cheapest phone to cart', () => {
    cy.visit("https://www.demoblaze.com/");

    // Click on the login button
    cy.get('#login2').click();
    cy.wait(1000);

    // Type in the username and password
    cy.get('#loginusername').type('automatedUser26@example.com');
    cy.wait(1000);
    cy.get('#loginpassword').type('4r4nd0mp4ssw0rd');
    cy.wait(1000);
    // Click on the button to finish the login
    cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click();

    // Start the recursive process to find and add the cheapest product
    checkAndAddCheapestPhone();
  });
});
