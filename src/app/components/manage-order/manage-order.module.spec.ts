import { ManageOrderModule } from './manage-order.module';

describe('ManageOrderModule', () => {
  let manageOrderModule: ManageOrderModule;

  beforeEach(() => {
    manageOrderModule = new ManageOrderModule();
  });

  it('should create an instance', () => {
    expect(manageOrderModule).toBeTruthy();
  });
});
