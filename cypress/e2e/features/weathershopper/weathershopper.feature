Feature: Weather Shopper Website

  Scenario: Shopping for Moisturizers in Cold Weather
    Given I am on the Weather Shopper website
    When I see the weather is below 19 degrees
    And I click on the "Buy moisturizers" button
    And I select the least expensive product containing "aloe" and add to card
    And I select the least expensive product containing "almond" and add to card
    And I click on the "Cart" button
    Then the cart list should contain "aloe" and "almond" products
    And I click on the "Pay with Card" button
    And I fill out valid payment details and submit the form
    Then I should see a success message on the confirmation page

  Scenario: Shopping for Sunscreens in Hot Weather
    Given I am on the Weather Shopper website
    When I see the weather is above 34 degrees
    And I click on the "Buy sunscreens" button
    And I select the least expensive product containing "spf-50" and add to card
    And I select the least expensive product containing "spf-30" and add to card
    And I click on the "Cart" button
    Then the cart list should contain "spf-50" and "spf-30" products
    And I click on the "Pay with Card" button
    And I fill out valid payment details and submit the form
    Then I should see a success message on the confirmation page

  Scenario: No Shopping Action Required in Moderate Weather
    Given I am on the Weather Shopper website
    When the weather is between 19 and 34 degrees
    Then I should see the message "The weather Condition is too good for shopping."