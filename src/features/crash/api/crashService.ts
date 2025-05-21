export interface CrashRound {
  current: number
  crashedAt: number
}

type UpdateListener = (round: CrashRound) => void
type CrashListener = () => void

export class CrashService extends EventTarget {
  private intervalId: number | null = null
  private round: CrashRound = { current: 1, crashedAt: 1 }

  static readonly EVENT_UPDATE = 'update'
  static readonly EVENT_CRASH = 'crash'

  constructor(
    private tickMs = 100,
    private crashMax = 10,
  ) {
    super()
  }

  /** Запускает раунд: сразу сбрасывает current и crashedAt, через delayMs (по умолчанию 1 сек) начинает рост */
  public startRound(delayMs = 3000): void {
    // отменяем предыдущий, если был
    if (this.intervalId !== null) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }

    // сброс
    this.round.current = 1
    this.round.crashedAt = parseFloat((1 + Math.random() * (this.crashMax - 1)).toFixed(2))
    this.emitUpdate()

    // через задержку — старт роста
    setTimeout(() => {
      this.intervalId = window.setInterval(() => this.tick(), this.tickMs)
    }, delayMs)
  }

  /** Останавливает текущий раунд */
  public stop(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  public onUpdate(fn: UpdateListener): void {
    this.addEventListener(CrashService.EVENT_UPDATE, (e: Event) =>
      fn((e as CustomEvent<CrashRound>).detail),
    )
  }

  public onCrash(fn: CrashListener): void {
    this.addEventListener(CrashService.EVENT_CRASH, () => fn())
  }

  private tick(): void {
    if (this.round.current >= this.round.crashedAt) {
      this.emitCrash()
      this.stop()
    } else {
      this.round.current = parseFloat((this.round.current * 1.01).toFixed(2))
      this.emitUpdate()
    }
  }

  private emitUpdate(): void {
    this.dispatchEvent(new CustomEvent(CrashService.EVENT_UPDATE, { detail: { ...this.round } }))
  }

  private emitCrash(): void {
    this.dispatchEvent(new Event(CrashService.EVENT_CRASH))
  }
}
