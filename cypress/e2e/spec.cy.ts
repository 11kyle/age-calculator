describe('external navigation links', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })
  
  context("Age display section", () => {
    it('displays the correct default values', () => {
      cy.get("dt").eq(0).contains("- - years")
      cy.get("dt").eq(1).contains("- - months")
      cy.get("dt").eq(2).contains("- - days")
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

      cy.get("dt").eq(0).contains("33 years")
      cy.get("dt").eq(1).contains("10 months")
      cy.get("dt").eq(2).contains("5 days")
    })

    it('displays empty response on future date', () => {
      cy.get('[data-cy="month-select-btn"]').click()
      cy.get('li').eq(11).click()
      cy.get('[data-cy="get-age-btn"').click()
      
      cy.get("dt").eq(0).contains("- - years")
      cy.get("dt").eq(1).contains("- - months")
      cy.get("dt").eq(2).contains("- - days")
    })
  })
})