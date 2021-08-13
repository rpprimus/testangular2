import { LookupvaluesPipe } from './lookupvalues.pipe';

describe('LookupvaluesPipe', () => {
  it('create an instance', () => {
    const pipe = new LookupvaluesPipe();
    expect(pipe).toBeTruthy();
  });
  it('should call transform() method',()=>{
    const pipe = new LookupvaluesPipe();
    let value="A~B"
    pipe.transform(value);
    expect(pipe.transform).toBeTruthy();
  });
});
