import { FirebaseBusinessListingPage } from './app.po';

describe('firebase-business-listing App', function() {
  let page: FirebaseBusinessListingPage;

  beforeEach(() => {
    page = new FirebaseBusinessListingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
