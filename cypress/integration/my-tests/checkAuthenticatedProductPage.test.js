describe("check the authenticated products page works fine", function(){
    beforeEach(()=>{
        cy.login()
        cy.visit('localhost:3000/products')
    })
    it('should navigate to the product page'. function(){
        
    })
})