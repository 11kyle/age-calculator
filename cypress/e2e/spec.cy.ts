describe('external navigation links', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })
  
  context("Age display section", () => {
    it('displays the correct default values', () => {
      cy.get('[data-cy="years"]').contains("- -")
      cy.get('[data-cy="months"]').contains("- -")
      cy.get('[data-cy="days"]').contains("- -")
    })
  })

  context("Date Picker section", () => {
    it('displays the correct years, months and days', () => {
      cy.get('[data-cy="day-select-btn"]').click()
      cy.get('li').eq(16).click()
      cy.get('[data-cy="month-select-btn"]').click()
      cy.get('li').eq(5).click()
      cy.get('[data-cy="year-select-btn"]').click()
      cy.get('li').eq(34).click()
      cy.get('[data-cy="get-age-btn"').click()

      cy.get('[data-cy="years"]').contains("33")
      cy.get('[data-cy="months"]').contains("10")
      cy.get('[data-cy="days"]').contains("7")
    })

    it('displays empty response on future date', () => {
      cy.get('[data-cy="month-select-btn"]').click()
      cy.get('li').eq(11).click()
      cy.get('[data-cy="get-age-btn"').click()
      
      cy.get('[data-cy="years"]').contains("- -")
      cy.get('[data-cy="months"]').contains("- -")
      cy.get('[data-cy="days"]').contains("- -")

      // check for error styles around <select> tags
    })
  })
})