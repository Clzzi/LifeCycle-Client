describe('회원가입 페이지', () => {
  beforeEach(() => {
    cy.intercept('POST', 'http://34.125.196.189:8080/user/register', {
      fixture: 'register.json',
    });
    cy.visit('/register');
  });

  it('사용자는 회원가입을 할 수 있다.', () => {
    cy.get('input[name=id]').type('test');
    cy.get('input[name=pw]').type('test1234@');
    cy.get('input[name=name]').type('테스트');
    cy.get('input[name=generation]').type('4');
    cy.get('div[data-cy=checkbox]').click();

    cy.get('button').contains('회원가입').click().as('Register');
    cy.waitFor('@Register');

    cy.get('[data-cy=toast]').should('contain', '회원가입 성공');
    cy.location().should((loc) => {
      expect(loc.href).to.eq('http://localhost:3000/login');
    });
  });

  it('사용자는 약관동의 팝업을 확인할 수 있다.', () => {
    cy.get('a').contains('약관동의').click().as('ClickTerm');
    cy.waitFor('@ClickTerm');
    cy.get('span[data-cy=term-title]').each(($el, index) => {
      expect($el).to.contain(`제 ${index + 1}장`);
    });
  });

  it('사용자는 회원가입페이지에서 로그인 페이지로 이동할 수 있다.', () => {
    cy.get('button').contains('이미 계정이 있나요?').click().as('GoToSignIn');
    cy.waitFor('@GoToSignIn');
    cy.location().should((loc) => {
      expect(loc.href).to.eq('http://localhost:3000/login');
    });
  });

  it('사용자가 인풋에 값을 넣고 지웠을경우 입력해달라는 경고문구를 확인할 수 있다.', () => {
    cy.get('input[name=id]').type('1');
    cy.get('input[name=id]').type('{backspace}');
    cy.get('input[name=pw]').type('1');
    cy.get('input[name=pw]').type('{backspace}');
    cy.get('input[name=name]').type('1');
    cy.get('input[name=name]').type('{backspace}');
    cy.get('input[name=generation]').type('1');
    cy.get('input[name=generation]').type('{backspace}');
    cy.get('div[data-cy=checkbox]').click().click();

    cy.get('span[data-cy=error-msg]')
      .should('contain', 'ID를 입력해주세요')
      .and('contain', 'PW를 입력해주세요')
      .and('contain', '이름을 입력해주세요')
      .and('contain', '기수를 입력해주세요')
      .and('contain', '약관동의에 체크해주세요');
  });

  it('사용자가 인풋에 아무값도 넣지 않고 회원가입 버튼을 눌렀을경우 값이 비었다는 경고 문구를 확인할 수 있다.', () => {
    cy.get('button').contains('회원가입').click().as('Register');
    cy.waitFor('@Register');

    cy.get('span[data-cy=error-msg]').each(($el) => {
      expect($el).to.contain(`값이 비었어요!`);
    });
  });
});
