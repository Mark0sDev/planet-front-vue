import { TonConnectUI } from '@tonconnect/ui'

export const tonConnectUI = new TonConnectUI({
    manifestUrl: 'https://planetton.app/img/tonconnect-manifest.json',
    language: 'en',

    actionsConfiguration: {
        skipRedirectToWallet: 'ios'
    },
})
