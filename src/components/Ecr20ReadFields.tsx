import {
    getERC20WagmiBalanceOf,
    getERC20WagmiDecimals,
    getERC20WagmiName,
    getERC20WagmiSymbol,
    getERC20WagmiTotalSupply,
    getFormattedBalanceOf,
    getFormattedTotalSupply } from '@/lib/wagmi/wagmiERC20Read'
import error from 'next/error'
import React from 'react'
import { Address } from 'viem'

type Props = {
  ACTIVE_WALLET_ACCOUNT:Address, 
  DEFAULT_TOKEN_CONTRACT:Address
}

const Ecr20ReadFields = ({ ACTIVE_WALLET_ACCOUNT, DEFAULT_TOKEN_CONTRACT}: Props) => {

  let name                 = getERC20WagmiName(DEFAULT_TOKEN_CONTRACT)
  let symbol               = getERC20WagmiSymbol(DEFAULT_TOKEN_CONTRACT)
  let decimals             = getERC20WagmiDecimals(DEFAULT_TOKEN_CONTRACT)
  let totalSupply          = getERC20WagmiTotalSupply(DEFAULT_TOKEN_CONTRACT)?.toString()
  let formattedTotalSupply = getFormattedTotalSupply(DEFAULT_TOKEN_CONTRACT)
  let balanceOf            = getERC20WagmiBalanceOf(ACTIVE_WALLET_ACCOUNT, DEFAULT_TOKEN_CONTRACT || "")
  let formattedBalanceOf   = getFormattedBalanceOf(ACTIVE_WALLET_ACCOUNT, DEFAULT_TOKEN_CONTRACT || "")
  return (
    <>
        <h2>Ecr20ReadFields</h2>
        Token Name              : {name} <br/>
        Symbol                  : {symbol} <br/>
        Decimals                : {decimals} <br/>
        Total Supply            : {totalSupply} <br/>
        Formatted Total Supply  : {formattedTotalSupply} <br/>
        BalanceOf               : {balanceOf} <br/>
        Formatted BalanceOf     : {formattedBalanceOf}
    </>
  )
}

export default Ecr20ReadFields
