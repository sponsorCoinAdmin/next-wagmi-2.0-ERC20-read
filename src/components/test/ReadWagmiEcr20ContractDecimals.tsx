import React from 'react'
import { Address } from 'viem'
import { getERC20WagmiDecimals  } from '@/lib/wagmi/wagmiERC20Read'

type Props = {
  TOKEN_CONTRACT:Address
}

const contractDecimals = ({ TOKEN_CONTRACT}: Props) => {
  let decimals    = getERC20WagmiDecimals(TOKEN_CONTRACT)
  return (
    <>
      <hr className="border-top: 3px dashed #bbb"/>
      <h2>Reading Wagmi Token Contract Decimals for {TOKEN_CONTRACT}</h2>
      Token Decimals : {decimals} <br/>
    </>
  )
}

export default contractDecimals
