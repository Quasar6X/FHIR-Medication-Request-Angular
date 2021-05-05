import { AsMedicationRequestPipe } from './as-medication-request.pipe';

describe('AsMedicationRequestPipe', () => {
  it('create an instance', () => {
    const pipe = new AsMedicationRequestPipe();
    expect(pipe).toBeTruthy();
  });
});
