import { DamageProductModule } from './damage-product.module';

describe('DamageProductModule', () => {
  let damageProductModule: DamageProductModule;

  beforeEach(() => {
    damageProductModule = new DamageProductModule();
  });

  it('should create an instance', () => {
    expect(damageProductModule).toBeTruthy();
  });
});
