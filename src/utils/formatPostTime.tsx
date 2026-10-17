import { formatDistanceToNowStrict } from 'date-fns';
import { enAU } from 'date-fns/locale'; // اختياري لو عايز التاريخ بالعربي
export function formatPostTime(dateString?:string):string {
    if (!dateString) return '';

    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((Number(now) - Number(date)) / 1000);

    // لو الوقت أقل من دقيقة اظهر Just now
    if (diffInSeconds < 60) {
        return 'Just now';
    }

    // بتحسب الفرق تلقائياً (1 min, 1 hour, 1 day, 1 week, 1 month, 1 year)
    return formatDistanceToNowStrict(date, {
        addSuffix: false, // عشان متكتبش ago
        locale: enAU // شيل الكومنت لو عايزه يظهر بالعربي (منذ دقيقة، منذ ساعة)
    });
}