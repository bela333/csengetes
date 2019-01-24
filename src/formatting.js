export function formatMinute(minute){
    var num = Number(minute);
    return (num + "").padStart(2, '0')
}