import { CreditCardPipe } from "./credit-card-mask.pipe";

describe('CreditCardPipe', () => {
  it('create an instance', () => {
    const pipe = new CreditCardPipe();
    expect(pipe).toBeTruthy();
  });
  it('should call transform() method',()=>{
    const pipe = new CreditCardPipe();
    let value="1234567890"
    pipe.transform(value);
    expect(pipe.transform).toBeTruthy();
  });
});