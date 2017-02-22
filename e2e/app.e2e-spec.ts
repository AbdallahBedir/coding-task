import { CodingTaskPage } from './app.po';

describe('coding-task App', function() {
  let page: CodingTaskPage;

  beforeEach(() => {
    page = new CodingTaskPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
