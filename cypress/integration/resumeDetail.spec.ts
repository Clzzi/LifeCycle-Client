describe('이력서 상세보기 페이지(이력서 X)', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'POST',
      url: 'http://34.125.196.189:8080/user/login',
    }).as('Login');

    cy.visit('/login');
    cy.clearLocalStorage();
    cy.get('input[name=id]').type('test');
    cy.get('input[name=pw]').type('test1234');

    cy.get('button').contains('로그인').click();
    cy.wait('@Login').then(() => {
      cy.get('div[data-cy=card]').first().click();
    });

    cy.waitUntil(() =>
      cy.location().should((loc) => {
        expect(loc.href).to.include('http://localhost:3000/resume');
      }),
    );
  });

  it('유저는 이력서 상세보기 페이지에서 이력서를 쓴 사람의 정보를 확인할 수 있다.', () => {
    cy.get('div[data-cy=resume-detail-profile]').should('be.visible');
    cy.get('div[data-cy=resume-detail-userInfo]').should('be.visible');
  });

  it('유저는 이력서 상세보기 페이지에서 이력서 제목을 확인할 수 있다.', () => {
    cy.get('span[data-cy=resume-detail-title]').should('be.visible');
  });

  it('유저는 이력서 상세보기 페이지에서 회사, 기수, 분야를 확인할 수 있다.', () => {
    cy.get('div[data-cy=resume-detail-generation]').should('be.visible');
    cy.get('div[data-cy=resume-detail-stack]').should('be.visible');
    cy.get('div[data-cy=resume-detail-company]').should('be.visible');
  });
});

describe('이력서 상세보기 페이지 (이력서 O)', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'POST',
      url: 'http://34.125.196.189:8080/user/login',
    }).as('Login');

    cy.intercept('DELETE', 'http://34.125.196.189:8080/resume', {
      fixture: 'deleteResume.json',
    }).as('DeleteResume');

    cy.intercept('PUT', 'http://34.125.196.189:8080/resume', {
      fixture: 'updateResume.json',
    }).as('UpdateResume');

    cy.visit('/login');
    cy.clearLocalStorage();
    cy.get('input[name=id]').type('godbs129');
    cy.get('input[name=pw]').type('jhy040129');

    cy.get('button').contains('로그인').click();
    cy.waitFor('@Login');

    cy.waitUntil(
      () => cy.get('button[name=resume-button]').contains('내 이력서 보기'),
      {
        timeout: 20000,
        interval: 500,
      },
    );

    cy.get('button[name=resume-button]', { timeout: 10000 })
      .contains('내 이력서 보기', { timeout: 10000 })
      .click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.include('/resume');
    });
  });

  it('자신이 쓴 이력서를 본다면 수정 버튼을 확인할 수 있다.', () => {
    cy.get('button[name=resume-detail-edit]')
      .contains('수정')
      .should('be.visible');

    cy.get('button[name=resume-detail-edit]').contains('수정').click();

    cy.waitUntil(() =>
      cy.location().should((loc) => {
        expect(loc.href).to.eq('http://localhost:3000/resume/edit');
      }),
    );
  });

  it('자신이 쓴 이력서를 본다면 삭제 버튼을 확인할 수 있다.', () => {
    cy.get('button[name=resume-detail-delete]')
      .contains('삭제')
      .should('be.visible');
  });

  it('자신이 쓴 이력서를 삭제할 수 있다,', () => {
    cy.visit('/');
    cy.waitUntil(
      () => cy.get('button[name=resume-button]').contains('내 이력서 보기'),
      {
        timeout: 20000,
        interval: 500,
      },
    );

    cy.get('button[name=resume-button]', { timeout: 10000 })
      .contains('내 이력서 보기', { timeout: 10000 })
      .click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.include('/resume');
    });

    cy.get('button[name=resume-detail-delete]').contains('삭제').click();
    cy.get('div').contains('이력서 삭제').should('be.visible');
    cy.get('div').contains('정말 삭제하시겠습니까?').should('be.visible');
    cy.get('button[name=resume-detail-modal-delete]')
      .contains('삭제')
      .should('be.visible');
    cy.get('button[name=resume-detail-modal-delete]').contains('삭제').click();
    cy.waitFor('@DeleteResume');
    cy.get('[data-cy=toast]', { timeout: 10000 }).should(
      'contain',
      '이력서 삭제 성공',
    );
  });
});
