import { format } from 'date-fns';


export function setFooterYear(year: number): string {
    if (format(new Date(), 'yyyy') === String(year)) {
        return String(year);
    } else {
        return year + ' - ' + format(new Date(), 'yyyy');
    }
}