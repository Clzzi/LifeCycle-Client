import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(LocalizedFormat);

class DateUtil {
  constructor() {}

  formatDate(date: string): string {
    return dayjs(date).locale('ko').format('LL');
  }

  getDate(): string {
    return dayjs().locale('ko').format('LL');
  }
}

export default DateUtil;


