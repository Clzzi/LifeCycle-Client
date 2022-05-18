describe('메인 페이지 로그인 X', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      url: 'http://34.125.196.189:8080/resume',
    }).as('getResumes');
    cy.waitFor('@getResumes');
    cy.visit('/');
  });

  it('헤더가 있고, 헤더에 로고와 프로필이 있다.', () => {
    cy.get('nav').should('be.visible');
    cy.get('div[data-cy=logo]').should('be.visible');
    cy.get('div[data-cy=default-profile]').should('be.visible');
  });

  it('로그인하지 않았을시(토큰X) 프로필을 클릭하면 로그인 페이지로 이동된다.', () => {
    cy.get('div[data-cy=default-profile]').click();
    cy.location().should((loc) => {
      expect(loc.href).to.eq('http://localhost:3000/login');
    });
  });

  it('배너가 있고, 유저는 배너를 확인할 수 있다.', () => {
    cy.get('aside[data-cy=banner]').should('be.visible');
    cy.get('aside[data-cy=banner] > div')
      .contains('핫한 대소고인')
      .should('be.visible');
    cy.get('aside[data-cy=banner] > div')
      .contains('개발자의 기본인')
      .should('be.visible');
  });

  it('로그인하지 않고(토큰X) 카드를 클릭하면 로그인 페이지로 이동된다.', () => {
    cy.clearLocalStorage;
    cy.get('div[data-cy=card]').first().click();
    cy.location().should((loc) => {
      expect(loc.href).to.eq('http://localhost:3000/login');
    });
  });

  it('유저는 메인화면에서 이력서들을 확인할 수 있다.', () => {
    cy.get('div[data-cy=card]').should('be.visible');
  });

  it('유저는 이력서의 분야 및 기수를 설정할 수 있다.', () => {
    cy.get('select[name=stackFilter]').select('서버').should('have.value', 4);
    cy.get('select[name=generationFilter')
      .select('5기')
      .should('have.value', 5);
  });
});

describe('메인 페이지 로그인 O', () => {
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
    cy.waitFor('@Login');
  });

  it('로그인했을시(토큰O) 프로필을 클릭하면 프로필 정보를 확인할 수 있다.', () => {
    cy.get('div[data-cy=profile]').should('be.visible');
    cy.get('div[data-cy=profile]').click();

    cy.get('div[data-cy=info-profile]').should('be.visible');
    cy.get('div').contains('4기').should('be.visible');
    cy.get('div').contains('테스트').should('be.visible');

    cy.get('div').contains('설정').should('be.visible');
    cy.get('div').contains('로그아웃').should('be.visible');
  });

  it('로그인하고(토큰O) 이력서를 등록하지 않았을경우 이력서 등록하기 버튼을 확인할 수 있다.', () => {
    cy.get('button[name=resume-button]', { timeout: 10000 })
      .contains('이력서 등록하기', { timeout: 10000 })
      .click();

    cy.location().should((loc) => {
      expect(loc.href).to.eq('http://localhost:3000/resume/write');
    });
  });

  it('로그인하고(토큰O) 이력서를 등록했을경우 내 이력서 보기 버튼을 확인할 수 있다.', () => {
    cy.get('div[data-cy=profile]').click();
    cy.get('div').contains('로그아웃').click();

    cy.visit('/login');

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

  it('로그인한(토큰O) 유저가 카드를 클릭하면 해당 이력서 페이지로 이동한다.', () => {
    cy.get('div[data-cy=card]').first().click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.include('/resume');
    });
  });

  it('로그인한(토큰O) 유저는 로그아웃할 수 있다.', () => {
    cy.get('div[data-cy=profile]').click();
    cy.get('div').contains('로그아웃').click();
    cy.get('div[data-cy=default-profile]').should('be.visible');
  });
});
