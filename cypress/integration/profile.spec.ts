describe('프로필 설정', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'POST',
      url: 'http://34.125.196.189:8080/user/login',
    }).as('Login');

    cy.intercept('PUT', 'http://34.125.196.189:8080/user/update/password', {
      fixture: 'password.json',
    }).as('EditPassword');

    cy.intercept('PUT', 'http://34.125.196.189:8080/user/update/generation', {
      fixture: 'generation.json',
    }).as('EditGeneration');

    cy.visit('/login');
    cy.clearLocalStorage();
    cy.get('input[name=id]').type('test');
    cy.get('input[name=pw]').type('test1234');

    cy.get('button').contains('로그인').click();
    cy.waitFor('@Login');

    cy.waitUntil(() =>
      cy.location().should((loc) => {
        expect(loc.href).to.eq('http://localhost:3000/');
      }),
    );

    cy.visit('/profile');
    cy.waitUntil(
      () =>
        cy.get('span[data-cy=profile-data]').contains('0기').should('exist'),
      { timeout: 30000, interval: 500 },
    );
  });

  it('유저는 프로필페이지에서 프로필 정보를 확인할 수 있다.', () => {
    cy.get('span[data-cy=profile-title]').contains('기수').should('be.visible');
    cy.get('span[data-cy=profile-title]')
      .contains('비밀번호')
      .should('be.visible');
  });

  it('기수 수정시 전체 기수를 선택하면 경고 문구를 확인할 수 있다.', () => {
    cy.get('div[data-cy=profile-link]')
      .contains('기수변경')
      .should('be.visible');
    cy.get('div[data-cy=profile-link]').contains('기수변경').click();
    cy.location().should((loc) => {
      expect(loc.href).to.include(
        'http://localhost:3000/profile/generation?generation=',
      );
    });
    cy.get('select[name=generation]')
      .select('전체기수')
      .should('have.value', 0);

    cy.get('span[data-cy=error-msg]').should(
      'contain',
      '바꿀 기수를 선택해주세요',
    );
  });

  it('유저는 프로필페이지에서 기수 수정을 할 수있다.', () => {
    cy.get('div[data-cy=profile-link]')
      .contains('기수변경')
      .should('be.visible');
    cy.get('div[data-cy=profile-link]').contains('기수변경').click();
    cy.location().should((loc) => {
      expect(loc.href).to.include(
        'http://localhost:3000/profile/generation?generation=',
      );
    });
    cy.get('select[name=generation]').select('5기').should('have.value', 5);
    cy.get('button[name=profile-save]').contains('저장').click();

    cy.waitFor('@EditGeneration');
    cy.get('[data-cy=toast]', { timeout: 10000 }).should(
      'contain',
      '기수변경 성공',
    );
    cy.location().should((loc) => {
      expect(loc.href).to.eq('http://localhost:3000/profile');
    });
  });

  it('비밀번호 수정시 인풋에 값을 넣었다가 빼면 경고 문구를 확인할 수 있다.', () => {
    cy.get('div[data-cy=profile-link]')
      .contains('비밀번호 변경')
      .should('be.visible');
    cy.get('div[data-cy=profile-link]').contains('비밀번호 변경').click();
    cy.location().should((loc) => {
      expect(loc.href).to.eq('http://localhost:3000/profile/password');
    });
    cy.get('input[name=newPassword]').type('1');
    cy.get('span[data-cy=error-msg]').should('contain', '비밀번호가 다릅니다');
    cy.get('input[name=newPassword]').type('{backspace}');
    cy.get('span[data-cy=error-msg]')
      .should('contain', '새 비밀번호를 입력해주세요')
      .and('contain', '비밀번호가 다릅니다');
  });

  it('유저는 프로필페이지에서 비밀번호 변경을 할 수있다.', () => {
    cy.get('div[data-cy=profile-link]')
      .contains('비밀번호 변경')
      .should('be.visible');
    cy.get('div[data-cy=profile-link]').contains('비밀번호 변경').click();
    cy.location().should((loc) => {
      expect(loc.href).to.eq('http://localhost:3000/profile/password');
    });
    cy.get('input[name=newPassword]').type('test1234');
    cy.get('input[name=re_newPassword]').type('test1234');
    cy.get('button[name=profile-save]').contains('저장').click();

    cy.waitFor('@EditPassword');
    cy.get('[data-cy=toast]', { timeout: 10000 }).should(
      'contain',
      '비밀번호 변경 성공',
    );
    cy.location().should((loc) => {
      expect(loc.href).to.eq('http://localhost:3000/profile');
    });
  });
});
