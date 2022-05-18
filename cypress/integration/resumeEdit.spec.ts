describe('이력서 수정 페이지', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'POST',
      url: 'http://34.125.196.189:8080/user/login',
    }).as('Login');

    cy.intercept('PUT', 'http://34.125.196.189:8080/resume', {
      fixture: 'editResume.json',
    }).as('EditResume');

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

    cy.waitUntil(() =>
      cy.location().should((loc) => {
        expect(loc.href).to.include('http://localhost:3000/resume');
      }),
    );

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

  it('인풋에 값을 넣지 않으면 경고문구를 확인할 수 있다.', () => {
    cy.get('input[name=title]').type('{selectall}{backspace}');
    cy.get('input[name=company]').type('{selectall}{backspace}');
    cy.get('select[name=stack]').select('웹').select('모든분야');

    cy.get('span[data-cy=error-msg]')
      .should('contain', '제목을 입력해주세요')
      .and('contain', '회사이름을 입력해주세요')
      .and('contain', '기술분야를 선택해주세요');
  });

  it('썸네일을 변경할 수 있다.', () => {
    cy.get('div[data-cy=image-preview]').should('have.css', 'background-image');
    cy.get('div[data-cy=image-preview]').click();

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
  });

  it('PDF파일을 변경할 수 있다.', () => {
    cy.get('label[data-cy=pdf-input-label]').click();

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
  });

  it('이력서를 수정할 수 있다.', () => {
    cy.get('input[name=title]').type('테스트 제목');
    cy.get('input[name=company]').type('테스트 회사');
    cy.get('select[name=stack]').select('웹');

    cy.get('div[data-cy=image-preview]').should('have.css', 'background-image');
    cy.get('div[data-cy=image-preview]').click();

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

    cy.get('label[data-cy=pdf-input-label]').click();

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

    cy.wait('@PdfUpload').then(() => {
      cy.get('button[name=resume-edit-save]')
        .contains('수정')
        .should('be.visible');
      cy.get('button[name=resume-edit-save]').contains('수정').click();
    });

    cy.wait('@EditResume').then(() => {
      cy.get('[data-cy=toast]').should('contain', '이력서 수정 성공');
    });
  });

  it('이력서를 등록하지 않은 유저가 접근시 메인페이지로 이동된다', () => {
    cy.clearLocalStorage();
    cy.visit('/login');

    cy.get('input[name=id]').type('test');
    cy.get('input[name=pw]').type('test1234');

    cy.get('button').contains('로그인').click();
    cy.waitFor('@Login');

    cy.waitUntil(() =>
      cy.location().should((loc) => {
        expect(loc.href).to.eq('http://localhost:3000/');
      }),
    );

    cy.visit('/resume/edit');

    cy.waitUntil(() =>
      cy.location().should((loc) => {
        expect(loc.href).to.eq('http://localhost:3000/');
      }),
    );
  });
});
