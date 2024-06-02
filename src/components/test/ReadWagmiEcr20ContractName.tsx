import React from 'react'
import { Address } from 'viem'
import { getERC20WagmiClientName  } from '@/lib/wagmi/erc20WagmiClientRead'

type Props = {
  TOKEN_CONTRACT:Address
}

const ReadWagmiEcr20ContractName = ({ TOKEN_CONTRACT}: Props) => {
  let name    = getERC20WagmiClientName(TOKEN_CONTRACT)
  return (
    <>
      <hr className="border-top: 3px dashed #bbb"/>
      <h2>Reading Wagmi Token Contract Name for {TOKEN_CONTRACT}</h2>
      Token Name : {name} <br/>
    </>
  )
}

export default ReadWagmiEcr20ContractName
