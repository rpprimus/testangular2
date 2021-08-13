import { PhoneNumberPipe } from "./phone-number.pipe";

describe('PhoneNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new PhoneNumberPipe();
    expect(pipe).toBeTruthy();
  });
  it('should call transform() method',()=>{
    const pipe = new PhoneNumberPipe();
    let value="1234567890"
    pipe.transform(value);
    expect(pipe.transform).toBeTruthy();
  });
});