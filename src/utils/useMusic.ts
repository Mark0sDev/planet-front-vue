import { ref } from 'vue'

const isMuted = ref(true)
let audio: HTMLAudioElement | null = null

function initMusic() {
    if (audio) return

    audio = new Audio('/music.mp3')
    audio.loop = true
    audio.volume = 0.1

    audio.play().then(() => {
        isMuted.value = false
    }).catch(() => {
        const unlock = () => {
            audio?.play().then(() => {
                isMuted.value = false
            }).catch(err => console.warn('Autoplay error:', err))
            document.removeEventListener('click', unlock)
        }
        document.addEventListener('click', unlock)
    })
}

function toggleMusic() {
    if (!audio) return
    if (isMuted.value) {
        audio.play().catch(err => console.warn('Play failed:', err))
    } else {
        audio.pause()
    }
    isMuted.value = !isMuted.value
}

export function useMusic() {
    return {
        isMuted,
        toggleMusic,
        initMusic,
    }
}
