import { ClientStoreUserModule } from './client-store-user.module';

describe('StoreModule', () => {
  let storeModule: ClientStoreUserModule;

  beforeEach(() => {
    storeModule = new ClientStoreUserModule();
  });

  it('should create an instance', () => {
    expect(storeModule).toBeTruthy();
  });
});
