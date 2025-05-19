// src/utils/useTonWallet.ts
import { ref, computed, onMounted } from 'vue'
import type { Wallet } from '@tonconnect/ui'
import { tonConnectUI } from '@/utils/tonconnect'

declare const TonWeb: {
    utils: {
        Address: new (addr: string) => {
            toString: (friendly?: boolean) => string;
        };
    };
};

export function useTonWallet() {
    const isWalletConnected = ref(false)
    const walletAddress = ref('')

    const formattedAddress = computed(() => {
        if (!walletAddress.value) return ''
        const address = new TonWeb.utils.Address(walletAddress.value)
        const friendly = address.toString(true)
            .replace(/\//g, '_')
            .replace(/\+/g, '-')
        return `${friendly.slice(0, 3)}...${friendly.slice(-3)}`
    })

    const onWalletClick = async () => {
        if (isWalletConnected.value) {
            await tonConnectUI.disconnect()
            isWalletConnected.value = false
            walletAddress.value = ''
        } else {
            await tonConnectUI.openModal()
        }
    }

    onMounted(() => {
        if (tonConnectUI.connected && tonConnectUI.wallet) {
            isWalletConnected.value = true
            walletAddress.value = tonConnectUI.wallet.account.address
        }

        tonConnectUI.onStatusChange((wallet: Wallet | null) => {
            if (wallet) {
                isWalletConnected.value = true
                walletAddress.value = wallet.account.address
            } else {
                isWalletConnected.value = false
                walletAddress.value = ''
            }
        })
    })

    return {
        isWalletConnected,
        walletAddress,
        formattedAddress,
        onWalletClick,
    }
}
