import { DeviceTypeMeasurementValidationError } from './device-type-measurement-validation-error';

describe('DeviceTypeMeasurementValidationError', () => {
  it('should create an instance', () => {
    expect(new DeviceTypeMeasurementValidationError()).toBeTruthy();
  });
});
