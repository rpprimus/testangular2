import { KitModule } from './kit.module';

describe('KitModule', () => {
  let kitModule: KitModule;

  beforeEach(() => {
    kitModule = new KitModule();
  });

  it('should create an instance', () => {
    expect(kitModule).toBeTruthy();
  });
});
