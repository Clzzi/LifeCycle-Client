describe('로그인페이지', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'POST',
      url: 'http://34.125.196.189:8080/user/login',
    }).as('Login');

    cy.visit('/login');
  });

  it('사용자는 로그인할 수 있다.', () => {
    cy.get('input[name=id]').type('clzzi1109');
    cy.get('input[name=pw]').type('alswodakswod12@');

    cy.get('button').contains('로그인').click().as('Login');

    cy.wait('@Login').then(() => {
      cy.get('[data-cy=toast]').should('contain', '안녕하세요');
    });

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

  it('사용자가 알맞지 않은 아이디 또는 비밀번호를 입력하면 로그인이 안된다.', () => {
    cy.get('input[name=id]').type('sadlifsavlksanfoij2134');
    cy.get('input[name=pw]').type('sadoifn2o3insioanv');

    cy.get('button').contains('로그인').click().as('Login');
    cy.waitFor('@Login');

    cy.get('[data-cy=toast]').should(
      'contain',
      'ID 또는 PW가 일치하지 않습니다',
    );
  });

  it('사용자가 인풋에 값을 넣고 지웠을경우 입력해달라는 경고문구를 확인할 수 있다.', () => {
    cy.get('input[name=id]').type('1');
    cy.get('input[name=id]').type('{backspace}');
    cy.get('input[name=pw]').type('1');
    cy.get('input[name=pw]').type('{backspace}');

    cy.get('span[data-cy=error-msg]')
      .should('contain', 'ID를 입력해주세요')
      .and('contain', 'PW를 입력해주세요');
  });

  it('사용자가 인풋에 아무값도 넣지 않고 로그인버튼을 눌렀을경우 값이 비었다는 경고 문구를 확인할 수 있다.', () => {
    cy.get('button').contains('로그인').click().as('Login');
    cy.waitFor('@Login');

    cy.get('span[data-cy=error-msg]').each(($el) => {
      expect($el).to.contain(`값이 비었어요!`);
    });
  });
});
