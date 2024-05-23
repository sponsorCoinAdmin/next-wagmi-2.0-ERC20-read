'use client'

import { useChainId } from 'wagmi'
import { config } from '@/lib/wagmi/config'
import { Address, formatUnits, getAddress } from 'viem'
import { useReadContract } from 'wagmi'
import { erc20Abi } from 'viem' 
import { TokenContract, ContractRecs } from '../structure/types'

const getERC20WagmiBalanceOfRec = (walletAddress: Address | string | undefined, contractAddress: Address | string | undefined) => {
  // console.debug(`getERC20WagmiBalanceOfRec:walletAddress = ${walletAddress}, contractAddress = ${contractAddress}`)
  let wagmiBalanceOfRec;
  if (contractAddress !== undefined && walletAddress !== undefined) {
    wagmiBalanceOfRec = useReadContract({
      abi: erc20Abi,
      address: getAddress(contractAddress),
      functionName: 'balanceOf',
      args: [getAddress(walletAddress)],
      config, 
    })
  }
  console.debug(`balanceOfRec = ${JSON.stringify(wagmiBalanceOfRec, (_, v) => typeof v === 'bigint' ? v.toString() : v,2)}`)
  return wagmiBalanceOfRec;
}

const getERC20WagmiDecimalRec = (contractAddress:Address | string | undefined) => {
  let wagmiDecimalsRec
  if (contractAddress !== undefined) {
    wagmiDecimalsRec = useReadContract({
      abi: erc20Abi,
      address: getAddress(contractAddress),
      functionName: 'decimals',
      config, 
    })
  }
  return wagmiDecimalsRec;
}

const getERC20WagmiNameRec = (contractAddress:Address | undefined) => {
  let wagmiNameRec = useReadContract({
    abi: erc20Abi,
    address: contractAddress,
    functionName: 'name',
    config, 
  })
  return wagmiNameRec;
}

const getERC20WagmiSymbolRec = (contractAddress:Address | undefined) => {
  let wagmiSymbolRec = useReadContract({
    abi: erc20Abi,
    address: contractAddress,
    functionName: 'symbol',
    config, 
  })
  return wagmiSymbolRec;
}

const getERC20WagmiTotalSupplyRec = (contractAddress:Address | undefined) => {
  let wagmiTotalSupplyRec = useReadContract({
    abi: erc20Abi,
    address: contractAddress,
    functionName: 'totalSupply',
    config, 
  })
  console.debug("QQQQQ :\n"+JSON.stringify(wagmiTotalSupplyRec, (_, v) => typeof v === 'bigint' ? v.toString() : v, 2))
  return wagmiTotalSupplyRec;
}

const getERC20WagmiRecords = (contractAddress:Address | undefined) => {
  let contractRecs:ContractRecs = {
    nameRec:getERC20WagmiNameRec(contractAddress),
    symbolRec:getERC20WagmiSymbolRec(contractAddress),
    decimalRec:getERC20WagmiDecimalRec(contractAddress),
    totalSupplyRec:getERC20WagmiTotalSupplyRec(contractAddress)
  }
  return contractRecs
}

////////////////////////////////////////////////////////////////////////////
const getERC20WagmiDecimals = (contractAddress:Address | string | undefined) => {
  return getERC20WagmiDecimalRec(contractAddress)?.data;
}

const getERC20WagmiName = (contractAddress:Address | undefined) => {
  return getERC20WagmiNameRec(contractAddress).data;
}

const getERC20WagmiSymbol = (contractAddress:Address | undefined) => {
  return getERC20WagmiSymbolRec(contractAddress).data;
}

const getERC20WagmiTotalSupply = (contractAddress:Address | undefined) => {
  return getERC20WagmiTotalSupplyRec(contractAddress).data;
}

const getERC20WagmiBalanceOf = (walletAddress: Address | string, contractAddress: Address | string ) => {
  return getERC20WagmiBalanceOfRec(walletAddress , contractAddress )?.data?.toString();
}

const getErc20Contract = (contractAddress:Address | undefined) => {
  let contractResponse:TokenContract =
  {
    address:contractAddress,
    chainId: useChainId(),
    name:getERC20WagmiName(contractAddress),
    symbol:getERC20WagmiSymbol(contractAddress),
    decimals:getERC20WagmiDecimals(contractAddress),
    totalSupply:getERC20WagmiTotalSupply(contractAddress),
    img:undefined
  }
  return contractResponse
}

const formatDecimals = (val: bigint | number | string | undefined, decimals:number|undefined) => {
  let bigInt = (val === undefined) ? BigInt(0) : BigInt(val)
  return (decimals !== undefined) ? formatUnits(bigInt, decimals) : bigInt.toString()
}

const getFormattedTotalSupply = (contractAddress:Address | undefined) => {
  let totalSupply = getERC20WagmiTotalSupply(contractAddress)
  let decimals  = getERC20WagmiDecimals(contractAddress)
  return formatDecimals(totalSupply, decimals);
}

const getFormattedBalanceOf = (walletAddress: Address | string , contractAddress: Address | string ) => {
  let balanceOf = getERC20WagmiBalanceOf(walletAddress, contractAddress)
  let decimals  = getERC20WagmiDecimals(contractAddress)
 return formatDecimals(balanceOf, decimals);
}

export {
  type TokenContract,
  type ContractRecs,
  getERC20WagmiBalanceOfRec, 
  getERC20WagmiDecimalRec,
  getERC20WagmiNameRec, 
  getERC20WagmiSymbolRec, 
  getERC20WagmiTotalSupplyRec,
  getERC20WagmiRecords,
  getERC20WagmiBalanceOf, 
  getERC20WagmiDecimals,
  getERC20WagmiName, 
  getERC20WagmiSymbol, 
  getERC20WagmiTotalSupply,
  getErc20Contract,
  formatDecimals,
  getFormattedTotalSupply,
  getFormattedBalanceOf
}
