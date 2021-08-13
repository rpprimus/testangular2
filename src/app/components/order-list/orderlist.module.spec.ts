import { OrderListModule } from "./orderlist.module";


describe('OrderModule', () => {
  let orderModule: OrderListModule;

  beforeEach(() => {
    orderModule = new OrderListModule();
  });

  it('should create an instance', () => {
    expect(orderModule).toBeTruthy();
  });
});
