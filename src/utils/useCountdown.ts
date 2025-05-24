export function createCountdown(
  start: string,
  end: string,
  onTick: (formatted: string, rawSeconds: number) => void,
  onComplete?: () => void
) {
  const parse = (str: string) => new Date(str.replace(/-/g, '/')).getTime()
  let interval: ReturnType<typeof setInterval> | null = null

  const now = parse(start)
  const endTime = parse(end)
  let remaining = Math.floor((endTime - now) / 1000)

  const formatTime = (seconds: number): string => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0')
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
    const s = String(seconds % 60).padStart(2, '0')
    return `${h}:${m}:${s}`
  }

  onTick(formatTime(remaining), remaining)

  interval = setInterval(() => {
    remaining -= 1
    if (remaining <= 0) {
      clearInterval(interval!)
      onTick('00:00:00', 0)
      onComplete?.()
    } else {
      onTick(formatTime(remaining), remaining)
    }
  }, 1000)

  return () => {
    if (interval) clearInterval(interval)
  }
}
