let interval: number | null = null;
let timer = 0;

const startTimer = (
  updateTimer: (timer: number) => void,
  setIsTimerOn: (isOn: boolean) => void
): void => {
  if (interval !== null) return;

  setIsTimerOn(true);
  interval = setInterval(() => {
    timer++;
    updateTimer(timer);
  }, 1000);
};

const stopTimer = (setIsTimerOn: (isOn: boolean) => void): void => {
  if (interval !== null) {
    clearInterval(interval);
    interval = null;
  }

  setIsTimerOn(false);
};

const resetTimer = (): void => {
  timer = 0;
};

export { startTimer, stopTimer, resetTimer, timer };
