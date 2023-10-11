describe('DemoBlaze Login and Add to Cart', () => {
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


    // Use a selector that matches all prices
    const priceSelector = '.card > .card-block > h5';

    cy.get(priceSelector).then(($prices) => {
      let lowestPrice = Number.MAX_VALUE;
      let lowestPriceLocation = -1;

      $prices.each((index, element) => {
        const price = parseFloat(element.innerText.replace('$', '').trim());

        if (!isNaN(price) && price < lowestPrice) {
          lowestPrice = price;
          lowestPriceLocation = index + 1; // Adjust for nth-child index starting at 1
        }
      });

      if (lowestPriceLocation !== -1) {
        cy.get(`:nth-child(${lowestPriceLocation}) > .card > .card-block .card-title .hrefch`).click();
        cy.wait(100);
        cy.get('.col-sm-12 > .btn').click();
      } else {
        cy.log('No prices found.');
      }
    });
  });
});





// cy.get(':nth-child(1) > .card > .card-block > .card-title > .hrefch').click();
//לעבור לעמוד הבא
//cy.get('#next2');