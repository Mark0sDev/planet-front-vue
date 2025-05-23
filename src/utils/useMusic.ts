import { ref } from 'vue'

const isMuted = ref(true)
let audio: HTMLAudioElement | null = null

const STORAGE_KEY = 'app-music-muted'

let canUseStorage = true

try {
    localStorage.setItem('__test__', '1')
    localStorage.removeItem('__test__')
} catch {
    canUseStorage = false
}

function loadStoredMuteState() {
    if (!canUseStorage) return
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored !== null) {
        isMuted.value = stored === 'true'
    }
}

function saveMuteState() {
    if (!canUseStorage) return
    localStorage.setItem(STORAGE_KEY, isMuted.value.toString())
}

function initMusic() {
    if (audio) return

    loadStoredMuteState()

    audio = new Audio('/music.mp3')
    audio.loop = true
    audio.volume = 0.1

    if (!isMuted.value) {
        audio.play().catch(() => {
            const unlock = () => {
                audio?.play().then(() => {
                    isMuted.value = false
                }).catch(err => console.warn('Autoplay error:', err))
                document.removeEventListener('click', unlock)
            }
            document.addEventListener('click', unlock)
        })
    }
}

function toggleMusic() {
    if (!audio) return
    if (isMuted.value) {
        audio.play().catch(err => console.warn('Play failed:', err))
    } else {
        audio.pause()
    }
    isMuted.value = !isMuted.value
    saveMuteState()
}

export function useMusic() {
    return {
        isMuted,
        toggleMusic,
        initMusic,
    }
}
