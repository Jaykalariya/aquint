import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'localdate'
})
export class LocaldatePipe implements PipeTransform {

  /**
   * pipe to transform data in to MM/DD/YYYY or time format
   */
  transform(value: any, args?: any): any {
    return (value && typeof value !== 'number' && isNaN(value))
      ? args ? this.checkTimeData(value) : this.checkDateData(value) : value;
  }

  // TODO: Make it more generic take format as an argument
  /**
   * converts date in to MM/DD/YYYY format
   * @param value value to be transformed
   */
  checkDateData(value: any) {
    const date = moment(value, ['MM/DD/YYYY', 'YYYY-MM-DDTHH:mm:ss.SSSS', 'YYYY-MM-DDTHH:mm:ss.SSSSZ',
      'yyyy-mm-ddThh:mm:ss.s+zzzzzz', 'YYYY-MM-DDTHH:mm:ssZ', 'YYYY-MM-DDTHH:mm:ss'], true);
    return date.isValid() ? date.format('MM/DD/YYYY') : value;
  }
  // if its a valid date time string then convert it into time format
  checkTimeData(value: any) {
    const time = moment(value, ['YYYY-MM-DDTHH:mm:ss.SSSS', 'YYYY-MM-DDTHH:mm:ss.SSSSZ',
      'yyyy-mm-ddThh:mm:ss.s+zzzzzz', 'YYYY-MM-DDTHH:mm:ss'], true);
    return time.isValid() ? time.format('MM/DD/YYYY hh:mm A') : value;
  }

}
