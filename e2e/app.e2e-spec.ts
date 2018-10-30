import { MonthlyPassPage } from './app.po';

describe('monthly-pass App', () => {
  let page: MonthlyPassPage;

  beforeEach(() => {
    page = new MonthlyPassPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
