'use client'

import { useChainId } from 'wagmi'
import { config } from '@/lib/wagmi/config'
import { Address, formatUnits, getAddress } from 'viem'
import { useReadContract } from 'wagmi'
import { erc20Abi } from 'viem' 
import { TokenContract, ContractRecs } from '../structure/types'

const getERC20WagmiClientBalanceOfRec = (walletAddress: Address | string | undefined, contractAddress: Address | string | undefined) => {
  // console.debug(`getERC20WagmiClientBalanceOfRec:walletAddress = ${walletAddress}, contractAddress = ${contractAddress}`)
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

const getERC20WagmiClientDecimalRec = (contractAddress:Address | string | undefined) => {
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

const getERC20WagmiClientNameRec = (contractAddress:Address | undefined) => {
  let wagmiNameRec = useReadContract({
    abi: erc20Abi,
    address: contractAddress,
    functionName: 'name',
    config, 
  })
  return wagmiNameRec;
}

const getERC20WagmiClientSymbolRec = (contractAddress:Address | undefined) => {
  let wagmiSymbolRec = useReadContract({
    abi: erc20Abi,
    address: contractAddress,
    functionName: 'symbol',
    config, 
  })
  return wagmiSymbolRec;
}

const getERC20WagmiClientTotalSupplyRec = (contractAddress:Address | undefined) => {
  let wagmiTotalSupplyRec = useReadContract({
    abi: erc20Abi,
    address: contractAddress,
    functionName: 'totalSupply',
    config, 
  })
  // console.debug("QQQQQ :\n"+JSON.stringify(wagmiTotalSupplyRec, (_, v) => typeof v === 'bigint' ? v.toString() : v, 2))
  return wagmiTotalSupplyRec;
}

const getERC20WagmiClientRecords = (contractAddress:Address | undefined) => {
  let contractRecs:ContractRecs = {
    nameRec:getERC20WagmiClientNameRec(contractAddress),
    symbolRec:getERC20WagmiClientSymbolRec(contractAddress),
    decimalRec:getERC20WagmiClientDecimalRec(contractAddress),
    totalSupplyRec:getERC20WagmiClientTotalSupplyRec(contractAddress)
  }
  return contractRecs
}

////////////////////////////////////////////////////////////////////////////
const getERC20WagmiClientDecimals = (contractAddress:Address | string | undefined) => {
  return getERC20WagmiClientDecimalRec(contractAddress)?.data;
}

const getERC20WagmiClientName = (contractAddress:Address | undefined) => {
  return getERC20WagmiClientNameRec(contractAddress).data;
}

const getERC20WagmiClientSymbol = (contractAddress:Address | undefined) => {
  return getERC20WagmiClientSymbolRec(contractAddress).data;
}

const getERC20WagmiClientTotalSupply = (contractAddress:Address | undefined) => {
  return getERC20WagmiClientTotalSupplyRec(contractAddress).data;
}

const getERC20WagmiClientBalanceOf = (walletAddress: Address | string, contractAddress: Address | string ) => {
  return getERC20WagmiClientBalanceOfRec(walletAddress , contractAddress )?.data?.toString();
}

const getErc20ClientContract = (contractAddress:Address | undefined) => {
  let contractResponse:TokenContract =
  {
    address:contractAddress,
    chainId: useChainId(),
    name:getERC20WagmiClientName(contractAddress),
    symbol:getERC20WagmiClientSymbol(contractAddress),
    decimals:getERC20WagmiClientDecimals(contractAddress),
    totalSupply:getERC20WagmiClientTotalSupply(contractAddress),
    img:undefined
  }
  return contractResponse
}

const formatDecimals = (val: bigint | number | string | undefined, decimals:number|undefined) => {
  let bigInt = (val === undefined) ? BigInt(0) : BigInt(val)
  return (decimals !== undefined) ? formatUnits(bigInt, decimals) : bigInt.toString()
}

const getFormattedClientTotalSupply = (contractAddress:Address | undefined) => {
  let totalSupply = getERC20WagmiClientTotalSupply(contractAddress)
  let decimals  = getERC20WagmiClientDecimals(contractAddress)
  return formatDecimals(totalSupply, decimals);
}

const getFormattedClientBalanceOf = (walletAddress: Address | string , contractAddress: Address | string ) => {
  let balanceOf = getERC20WagmiClientBalanceOf(walletAddress, contractAddress)
  let decimals  = getERC20WagmiClientDecimals(contractAddress)
 return formatDecimals(balanceOf, decimals);
}

export {
  type TokenContract,
  type ContractRecs,
  getERC20WagmiClientBalanceOfRec, 
  getERC20WagmiClientDecimalRec,
  getERC20WagmiClientNameRec, 
  getERC20WagmiClientSymbolRec, 
  getERC20WagmiClientTotalSupplyRec,
  getERC20WagmiClientRecords,
  getERC20WagmiClientBalanceOf, 
  getERC20WagmiClientDecimals,
  getERC20WagmiClientName, 
  getERC20WagmiClientSymbol, 
  getERC20WagmiClientTotalSupply,
  getErc20ClientContract,
  formatDecimals,
  getFormattedClientTotalSupply,
  getFormattedClientBalanceOf
}
