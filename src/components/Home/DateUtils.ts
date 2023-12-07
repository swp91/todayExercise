// 주어진 분을 시간과 분으로 변환하는 함수.
export function formatDuration(minutes: number): null | string {
  if (minutes === 0) {
    return null; // 0분인 경우 표시하지 않음
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours > 0 ? `${hours}h` : ""}${
    remainingMinutes > 0 ? `${remainingMinutes}m` : ""
  } `;
}

// Date 객체를 ISO 형식의 날짜 문자열(YYYY-MM-DD)로 변환하는 함수
export function formatDateISO(date: Date): string {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
}

// 시작하는 주를 구하는 함수
export function getStartOfWeek(date: Date) {
  const start = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  start.setUTCDate(start.getUTCDate() - start.getUTCDay());
  return start;
}

// 날짜를 포맷하는 함수
export function formatDay(date: Date) {
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  return [dayNames[date.getDay()], date.getDate().toString()];
}

// 오늘이면 true를 반환하는 함수
export function isToday(day: Date, today: Date): boolean {
  return (
    day.getDate() === today.getDate() &&
    day.getMonth() === today.getMonth() &&
    day.getFullYear() === today.getFullYear()
  );
}

//오늘의 운동
export function formatTodayDuration(minutes: number): string {
  if (minutes === 0) {
    return "0분";
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours > 0 ? `${hours}h` : ""}${
    remainingMinutes > 0 ? `${remainingMinutes}m` : ""
  } `;
}
