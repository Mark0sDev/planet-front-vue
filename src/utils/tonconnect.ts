import { TonConnectUI } from '@tonconnect/ui'

export const tonConnectUI = new TonConnectUI({
    manifestUrl: 'https://www.planetton.app/tonconnect-manifest.json',
    language: 'en',

    actionsConfiguration: {
        skipRedirectToWallet: 'ios'
    },
})
