export const formatDateForInput = (date: any) => {
    if (!date) return "";
    const d = typeof date.toDate === 'function' ? date.toDate() : new Date(date);
    if (isNaN(d.getTime())) return "";
    return d.toISOString().split('T')[0]; // Поверне "YYYY-MM-DD"
};

export const getTime = (date) => {
    if (!date)
        return 0;
    if (typeof date.toDate === 'function') // for firebase Timestamp
        return date.toDate().getTime();
    if (date instanceof Date) // for Date objects
        return date.getTime();
    // return new Date(date).getTime(); // for js Date or ISO row
    const parseDate = new Date(date);
    return isNaN(parseDate.getTime()) ? 0 : parseDate.getTime();
};