'use client'

type Contract = {
  chainId:number,
  name:string,
  symbol:string,
  address: Address
}

type ContractRecs = {
  nameRec:any,
  symbolRec:any,
  decimalRec:any,
  totalSupplyRec:any
}

import { config } from '@/wagmi'
import { Address, formatUnits, getAddress } from 'viem'
import { useReadContract } from 'wagmi'
import { erc20Abi } from 'viem' 

const getWagmiBalanceOfRec = (walletAddress: Address | string, contractAddress: Address | string) => {
  let wagmiBalanceOfRec;
    console.debug(`walletAddress = ${walletAddress}`)
    wagmiBalanceOfRec = useReadContract({
    abi: erc20Abi,
    address: getAddress(contractAddress),
    functionName: 'balanceOf',
    args: [getAddress(walletAddress)],
    config, 
  })
  return wagmiBalanceOfRec;
}

const getWagmiDecimalRec = (contractAddress:Address) => {
  let wagmiDecimalsRec = useReadContract({
    abi: erc20Abi,
    address: contractAddress,
    functionName: 'decimals',
    config, 
  })
  return wagmiDecimalsRec;
}

const getWagmiNameRec = (contractAddress:Address) => {
  let wagmiNameRec = useReadContract({
    abi: erc20Abi,
    address: contractAddress,
    functionName: 'name',
    config, 
  })
  return wagmiNameRec;
}

const getWagmiSymbolRec = (contractAddress:Address) => {
  let wagmiSymbolRec = useReadContract({
    abi: erc20Abi,
    address: contractAddress,
    functionName: 'symbol',
    config, 
  })
  return wagmiSymbolRec;
}

const getWagmiTotalSupplyRec = (contractAddress:Address) => {
  let wagmiTotalSupplyRec = useReadContract({
    abi: erc20Abi,
    address: contractAddress,
    functionName: 'totalSupply',
    config, 
  })
  return wagmiTotalSupplyRec;
}

const getContractErc20Records = (contractAddress:Address) => {
  let contractRecs:ContractRecs = {
    nameRec:getWagmiNameRec(contractAddress),
    symbolRec:getWagmiSymbolRec(contractAddress),
    decimalRec:getWagmiDecimalRec(contractAddress),
    totalSupplyRec:getWagmiTotalSupplyRec(contractAddress)
  }
  return contractRecs
}

////////////////////////////////////////////////////////////////////////////
const getWagmiDecimals = (contractAddress:Address) => {
  return getWagmiDecimalRec(contractAddress).data;
}

const getWagmiName = (contractAddress:Address) => {
  return getWagmiNameRec(contractAddress).data;
}

const getWagmiSymbol = (contractAddress:Address) => {
  return getWagmiSymbolRec(contractAddress).data;
}

const getWagmiTotalSupply = (contractAddress:Address) => {
  return getWagmiTotalSupplyRec(contractAddress).data;
}

const getWagmiBalanceOf = (walletAddress: Address | string, contractAddress: Address | string) => {
  return getWagmiBalanceOfRec(walletAddress , contractAddress ).data?.toString();
}

const formatDecimals = (val: bigint | number | string | undefined, decimals:number|undefined) => {
  let bigInt = (val === undefined) ? BigInt(0) : BigInt(val)
  return (decimals !== undefined) ? formatUnits(bigInt, decimals) : bigInt.toString()
}

const getFormattedTotalSupply = (contractAddress:Address) => {
  let totalSupply = getWagmiTotalSupply(contractAddress)
  let decimals  = getWagmiDecimals(contractAddress)
 return formatDecimals(totalSupply, decimals);
}

const getFormattedBalanceOf = (walletAddress: Address | string , contractAddress: Address) => {
  let balanceOf = getWagmiBalanceOf(walletAddress, contractAddress)
  let decimals  = getWagmiDecimals(contractAddress)
 return formatDecimals(balanceOf, decimals);
}

export {
  type Contract,
  type ContractRecs,
  getWagmiBalanceOfRec, 
  getWagmiDecimalRec,
  getWagmiNameRec, 
  getWagmiSymbolRec, 
  getWagmiTotalSupplyRec,
  getWagmiBalanceOf, 
  getWagmiDecimals,
  getWagmiName, 
  getWagmiSymbol, 
  getWagmiTotalSupply,
  getContractErc20Records,
  formatDecimals,
  getFormattedTotalSupply,
  getFormattedBalanceOf
}
