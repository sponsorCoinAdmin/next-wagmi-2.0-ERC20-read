import React from 'react'
import { Address } from 'viem'
import {
    getERC20WagmiDecimals,
    getERC20WagmiName,
    getERC20WagmiSymbol,
    getERC20WagmiTotalSupply,
    getFormattedTotalSupply } from '@/lib/wagmi/wagmiERC20Read'

type Props = {
  TOKEN_CONTRACT:Address
}

const ReadWagmiEcr20Fields = ({ TOKEN_CONTRACT}: Props) => {
  let name                 = getERC20WagmiName(TOKEN_CONTRACT)
  let symbol               = getERC20WagmiSymbol(TOKEN_CONTRACT)
  let decimals             = getERC20WagmiDecimals(TOKEN_CONTRACT)
  let totalSupply          = getERC20WagmiTotalSupply(TOKEN_CONTRACT)?.toString()
  let formattedTotalSupply = getFormattedTotalSupply(TOKEN_CONTRACT)
  return (
    <>
      <hr className="border-top: 3px dashed #bbb"/>
      <h2>Read Wagmi Ecr20 Fields for Token Contract {TOKEN_CONTRACT}</h2>
      Token Name              : {name} <br/>
      Symbol                  : {symbol} <br/>
      Decimals                : {decimals} <br/>
      Total Supply            : {totalSupply} <br/>
      Formatted Total Supply  : {formattedTotalSupply} <br/>
    </>
  )
}

export default ReadWagmiEcr20Fields
