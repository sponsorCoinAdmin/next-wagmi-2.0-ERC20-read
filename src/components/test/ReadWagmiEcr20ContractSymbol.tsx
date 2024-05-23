import React from 'react'
import { Address } from 'viem'
import { getERC20WagmiSymbol  } from '@/lib/wagmi/wagmiERC20Read'

type Props = {
  TOKEN_CONTRACT:Address
}

const contractSymbol = ({ TOKEN_CONTRACT}: Props) => {
  let symbol    = getERC20WagmiSymbol(TOKEN_CONTRACT)
  return (
    <>
      <hr className="border-top: 3px dashed #bbb"/>
      <h2>Reading Wagmi Token Contract Symbol for {TOKEN_CONTRACT}</h2>
      Token Symbol : {symbol} <br/>
    </>
  )
}

export default contractSymbol
