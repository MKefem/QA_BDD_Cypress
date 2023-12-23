Feature: Website Navigation

  Scenario: Verify Home Menu Navigation Item and Components
    Given the user is on the "gerpaas.com" website homepage
    When the user clicks on the "PRODUCTS" link in the navigation menu
    And the user clicks on the "HOME" link in the navigation menu
    And the user should see the "https://gerpaas.com/" on the URL
    And the user should see the social media icons and links are correct on the header
    #And the user should see slider texts are loaded correctly


  Scenario: Check Footer section is loaded correctly
    Given the user is on the "gerpaas.com" website homepage
    Then the contact section should exist
    And the company name should be displayed
    And there should be a "Mail" link with the email address "info@gerpaas.com"
    And there should be a "Phone" link with the phone number "+902164897005"
    And the "Latest News" section should exist