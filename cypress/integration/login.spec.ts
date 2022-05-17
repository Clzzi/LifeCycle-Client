describe('로그인페이지', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('사용자는 로그인할 수 있다.', () => {
    cy.get('input[name=id]').type('clzzi1109');
    cy.get('input[name=pw]').type('alswodakswod12@');

    cy.get('button').contains('로그인').click().as('Login');
    cy.waitFor('@Login');

    cy.get('[data-cy=toast]').should('contain', '안녕하세요');
    cy.location().should((loc) => {
      expect(loc.href).to.eq('http://localhost:3000/');
    });
  });

  it('사용자는 로그인페이지에서 회원가입 페이지로 이동할 수 있다.', () => {
    cy.get('button')
      .contains('혹시 계정이 없으신가요?')
      .click()
      .as('GoToRegister');
    cy.waitFor('@GoToRegister');
    cy.location().should((loc) => {
      expect(loc.href).to.eq('http://localhost:3000/register');
    });
  });
});
