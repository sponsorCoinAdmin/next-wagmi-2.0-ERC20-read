import { formatDecimals, getERC20WagmiBalanceOfRec, getERC20WagmiDecimalRec, getERC20WagmiNameRec, getERC20WagmiSymbolRec, getERC20WagmiTotalSupplyRec, getFormattedTotalSupply } from '@/lib/wagmi/wagmiERC20Read'
import error from 'next/error'
import React from 'react'
import { Address } from 'viem'

type Props = {
  ACTIVE_WALLET_ACCOUNT:Address, 
  DEFAULT_TOKEN_CONTRACT:Address
}

const Ecr20ReadWagmiRecords = ({ ACTIVE_WALLET_ACCOUNT, DEFAULT_TOKEN_CONTRACT}: Props) => {
  const nameRec = getERC20WagmiNameRec(DEFAULT_TOKEN_CONTRACT)
  const symbolRec = getERC20WagmiSymbolRec(DEFAULT_TOKEN_CONTRACT)
  const decimalRec = getERC20WagmiDecimalRec(DEFAULT_TOKEN_CONTRACT)
  const totalSupplyRec = getERC20WagmiTotalSupplyRec(DEFAULT_TOKEN_CONTRACT)
  const balanceOfRec = getERC20WagmiBalanceOfRec(ACTIVE_WALLET_ACCOUNT, DEFAULT_TOKEN_CONTRACT)

  let name = nameRec.status === 'success' ? "Token Name : " + nameRec.data : null
  let symbol = symbolRec.status === 'success' ? "Symbol : " + symbolRec.data : null
  let decimals = decimalRec?.status === 'success' ? "Decimals : " + decimalRec?.data : null
  let totalSupply = totalSupplyRec.status === 'success' ? "Total Supply : " + totalSupplyRec.data : null
  let balanceOf = balanceOfRec?.status === 'success' ? "BalanceOf : " + balanceOfRec.data : null

  return (
    <>
        <h2>Ecr20ReadWagmiRecords</h2>
        <div>{name === null ? null : "Token Name : " + name }</div>
        <div>{symbol === null ? null : "Symbol : " + symbol }</div>
        <div>{decimals === null ? null : "Decimals : " + decimals }</div>
        <div>{totalSupply === null ? null : "Total Supply : " + totalSupply }</div>
        <div>{(totalSupply === null || decimals === null) ? null : "Formatted Total Supply : " + formatDecimals(totalSupplyRec?.data, decimalRec?.data) }</div>
        <div>{balanceOf === null ? null : "BalanceOf : " + balanceOf }</div>
        <div>{`Formatted Balance: ` + formatDecimals(balanceOfRec?.data, decimalRec?.data)}</div>
    </>
  )
}

export default Ecr20ReadWagmiRecords
