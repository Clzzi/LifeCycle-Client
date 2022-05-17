// TODO : 등록 및 수정 페이지 테스팅
// TODO: 리팩토링 3차
// TODO: 위 2가지 다하면 릴리즈

describe('이력서 등록 페이지', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'POST',
      url: 'http://34.125.196.189:8080/user/login',
    }).as('Login');

    cy.intercept('POST', 'http://34.125.196.189:8080/resume', {
      fixture: 'writeResume.json',
    }).as('WriteResume');

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

    cy.visit('/resume/write');
  });

  it('바로 등록을 누를 시 경고 문구를 확인할 수 있다.', () => {
    cy.get('button[name=resume-write-save]')
      .contains('등록')
      .should('be.visible');

    cy.get('button[name=resume-write-save]').contains('등록').click();

    cy.get('span[data-cy=error-msg]').each(($el) => {
      expect($el).to.contain(`값이 비었어요!`);
    });
  });

  it('인풋에 값을 넣었다가 빈 값으로 만들면 경고 문구를 확인할 수 있다.', () => {
    cy.get('input[name=title]').type('1{backspace}');
    cy.get('input[name=company]').type('1{backspace}');
    cy.get('select[name=stack]').select('웹').select('모든분야');

    cy.get('span[data-cy=error-msg]')
      .should('contain', '제목을 입력해주세요')
      .and('contain', '회사이름을 입력해주세요')
      .and('contain', '기술분야를 선택해주세요');
  });

  it('이력서를 등록할 수 있다.', () => {
    cy.intercept('POST', 'http://34.125.196.189:8080/image', {
      fixture: 'imageUpload.json',
    }).as('ImageUpload');

    cy.fixture('picture.png').then((fileContent) => {
      cy.get('input[name=image]').attachFile({
        fileContent: fileContent.toString(),
        fileName: 'picture.png',
        mimeType: 'image/png',
      });
    });

    cy.waitFor('@ImageUpload');

    cy.get('div[data-cy=image-preview]')
      .should('have.css', 'background-image')
      .and(
        'include',
        'https://lifecycle-s3.s3.ap-northeast-2.amazonaws.com/035d7a29-2adc-4711-9a0e-0d6ed8f7b73f',
      );

    cy.intercept('POST', 'http://34.125.196.189:8080/image', {
      fixture: 'pdfUpload.json',
    }).as('PdfUpload');

    cy.fixture('testPdf.pdf').then((fileContent) => {
      cy.get('input[name=content]').attachFile({
        fileContent: fileContent,
        fileName: 'testPdf.pdf',
        mimeType: 'application/pdf',
      });
    });

    cy.waitFor('@PdfUpload');

    cy.get('label[data-cy=pdf-input-label]').contains('testPdf.pdf');

    cy.get('input[name=title]').type('테스트 제목');
    cy.get('input[name=company]').type('테스트 회사');
    cy.get('select[name=stack]').select('웹').should('have.value', 1);
    cy.get('button[name=resume-write-save]').contains('등록').click();

    cy.wait('@WriteResume').then((v) => {
      expect(v.response.body.status).eq(200);
    });
  });

  it('이력서가 이미 등록된 상태에서 이력서를 만들려고 접근하면 메인 페이지로 이동된다.', () => {
    cy.clearLocalStorage();
    cy.visit('/login');

    cy.get('input[name=id]').type('godbs129');
    cy.get('input[name=pw]').type('jhy040129');

    cy.get('button').contains('로그인').click();
    cy.waitFor('@Login');

    cy.waitUntil(() =>
      cy.location().should((loc) => {
        expect(loc.href).to.eq('http://localhost:3000/');
      }),
    );

    cy.visit('/resume/write');

    cy.waitUntil(() =>
      cy.location().should((loc) => {
        expect(loc.href).to.eq('http://localhost:3000/');
      }),
    );
  });
});
