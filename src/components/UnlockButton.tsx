import React from 'react'
import { Button, useWalletModal } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'

const UnlockButton = (props) => {
  const TranslateString = useI18n()
  const { connect, reset } = useWallet()
  const { onPresentConnectModal } = useWalletModal(connect, reset)

  return (
    <Button style={{ backgroundColor: '#D6EBFC', color: '#53A8F0' }} onClick={onPresentConnectModal} {...props}>
      {TranslateString(292, 'Unlock Wallet')}
    </Button>
  )
}

export default UnlockButton
