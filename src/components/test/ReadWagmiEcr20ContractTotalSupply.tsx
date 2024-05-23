import React from 'react'
import { Address } from 'viem'
import { getERC20WagmiTotalSupply  } from '@/lib/wagmi/wagmiERC20Read'

type Props = {
  TOKEN_CONTRACT:Address
}

const contractTotalSupply = ({ TOKEN_CONTRACT}: Props) => {
  let totalSupply    = getERC20WagmiTotalSupply(TOKEN_CONTRACT)
  return (
    <>
      <hr className="border-top: 3px dashed #bbb"/>
      <h2>Reading Wagmi Token Contract TotalSupply for {TOKEN_CONTRACT}</h2>
      Token TotalSupply   : {totalSupply?.toString()} <br/>
    </>
  )
}

export default contractTotalSupply
