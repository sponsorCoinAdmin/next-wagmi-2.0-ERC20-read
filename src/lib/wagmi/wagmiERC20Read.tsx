'use client'

import { useChainId } from 'wagmi'

import { config } from '@/lib/wagmi/config'
import { Address, formatUnits, getAddress } from 'viem'
import { useReadContract } from 'wagmi'
import { erc20Abi } from 'viem' 
import { TokenContract, ContractRecs } from '../structure/types'

const getERC20WagmiBalanceOfRec = (walletAddress: Address | string, contractAddress: Address | string) => {
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

const getERC20WagmiDecimalRec = (contractAddress:Address) => {
  let wagmiDecimalsRec = useReadContract({
    abi: erc20Abi,
    address: contractAddress,
    functionName: 'decimals',
    config, 
  })
  return wagmiDecimalsRec;
}

const getERC20WagmiNameRec = (contractAddress:Address) => {
  let wagmiNameRec = useReadContract({
    abi: erc20Abi,
    address: contractAddress,
    functionName: 'name',
    config, 
  })
  return wagmiNameRec;
}

const getERC20WagmiSymbolRec = (contractAddress:Address) => {
  let wagmiSymbolRec = useReadContract({
    abi: erc20Abi,
    address: contractAddress,
    functionName: 'symbol',
    config, 
  })
  return wagmiSymbolRec;
}

const getERC20WagmiTotalSupplyRec = (contractAddress:Address) => {
  let wagmiTotalSupplyRec = useReadContract({
    abi: erc20Abi,
    address: contractAddress,
    functionName: 'totalSupply',
    config, 
  })
  return wagmiTotalSupplyRec;
}

const getERC20WagmiRecords = (contractAddress:Address) => {
  let contractRecs:ContractRecs = {
    nameRec:getERC20WagmiNameRec(contractAddress),
    symbolRec:getERC20WagmiSymbolRec(contractAddress),
    decimalRec:getERC20WagmiDecimalRec(contractAddress),
    totalSupplyRec:getERC20WagmiTotalSupplyRec(contractAddress)
  }
  return contractRecs
}

////////////////////////////////////////////////////////////////////////////
const getERC20WagmiDecimals = (contractAddress:Address) => {
  return getERC20WagmiDecimalRec(contractAddress).data;
}

const getERC20WagmiName = (contractAddress:Address) => {
  return getERC20WagmiNameRec(contractAddress).data;
}

const getERC20WagmiSymbol = (contractAddress:Address) => {
  return getERC20WagmiSymbolRec(contractAddress).data;
}

const getERC20WagmiTotalSupply = (contractAddress:Address) => {
  return getERC20WagmiTotalSupplyRec(contractAddress).data;
}

const getERC20WagmiBalanceOf = (walletAddress: Address | string, contractAddress: Address | string) => {
  return getERC20WagmiBalanceOfRec(walletAddress , contractAddress ).data?.toString();
}

// const getChainId = () => {
//   let chainId = useChainId();
// }


const getErc20Contract = (contractAddress:Address) => {
  let contractResponse:TokenContract =
  {
    address:contractAddress,
    chainId: 1,
    name:getERC20WagmiName(contractAddress),
    symbol:getERC20WagmiSymbol(contractAddress),
    totalSupply:getERC20WagmiTotalSupply(contractAddress),
    decimals:getERC20WagmiDecimals(contractAddress),
    img:undefined
  }
  return contractResponse
}


const formatDecimals = (val: bigint | number | string | undefined, decimals:number|undefined) => {
  let bigInt = (val === undefined) ? BigInt(0) : BigInt(val)
  return (decimals !== undefined) ? formatUnits(bigInt, decimals) : bigInt.toString()
}

const getFormattedTotalSupply = (contractAddress:Address) => {
  let totalSupply = getERC20WagmiTotalSupply(contractAddress)
  let decimals  = getERC20WagmiDecimals(contractAddress)
 return formatDecimals(totalSupply, decimals);
}

const getFormattedBalanceOf = (walletAddress: Address | string , contractAddress: Address) => {
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
