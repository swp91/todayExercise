// 주어진 초를 시간, 분, 초로 변환하는 함수
export function formatDuration(seconds: number): string {
  if (seconds === 0) {
    return "0";
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours > 0 ? `${hours}h` : ""}${minutes > 0 ? `${minutes}m` : ""}${
    remainingSeconds > 0 ? `${remainingSeconds}s` : ""
  }`;
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
export function formatTodayDuration(seconds: number): string {
  if (seconds === 0) {
    return "0";
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours > 0 ? `${hours}h ` : ""}${minutes > 0 ? `${minutes}m ` : ""}${
    remainingSeconds > 0 ? `${remainingSeconds}s` : ""
  }`;
}

export interface RecordType {
  created_At: string;
  cardioExTime: string | null;
  strengthExTime: string | null;
}

// 기록을 날짜별로 그룹화하는 함수
export const groupByDate = (records: RecordType[]) => {
  return records.reduce(
    (acc: { [key: string]: { cardio: number; strength: number } }, record) => {
      const date = record.created_At.split("T")[0]; // 날짜 추출
      if (!acc[date]) {
        acc[date] = { cardio: 0, strength: 0 };
      }
      if (record.cardioExTime) {
        acc[date].cardio += parseInt(record.cardioExTime);
      }
      if (record.strengthExTime) {
        acc[date].strength += parseInt(record.strengthExTime);
      }
      return acc;
    },
    {}
  );
};
