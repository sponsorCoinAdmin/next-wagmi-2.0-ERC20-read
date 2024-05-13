'use client'

type Contract = {
  chainId:number,
  name:string,
  symbol:string,
  address: Address|undefined
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

const getWagmiBalanceOfRec = (walletAddress: Address | string | undefined, contractAddress: Address | string | undefined) => {
  let wagmiBalanceOfRec;
  console.debug(`BEFORE walletAddress = ${walletAddress}`)
  if (walletAddress !== undefined && contractAddress !== undefined) {
    console.debug(`walletAddress = ${walletAddress}`)
      wagmiBalanceOfRec = useReadContract({
      abi: erc20Abi,
      address: getAddress(contractAddress),
      functionName: 'balanceOf',
      args: [getAddress(walletAddress)],
      config, 
    })
  }
  return wagmiBalanceOfRec;
}

const getWagmiDecimalRec = (contractAddress:Address) => {
  let wagmiDecimalsRec;
  if (contractAddress !== undefined)
    wagmiDecimalsRec = useReadContract({
    abi: erc20Abi,
    address: contractAddress,
    functionName: 'decimals',
    config, 
  })
  return wagmiDecimalsRec;
}

const getWagmiNameRec = (contractAddress:Address) => {
  let wagmiNameRec;
  if (contractAddress !== undefined)
    wagmiNameRec = useReadContract({
    abi: erc20Abi,
    address: contractAddress,
    functionName: 'name',
    config, 
  })
  return wagmiNameRec;
}

const getWagmiSymbolRec = (contractAddress:Address) => {
  let wagmiSymbolRec;
  if (contractAddress !== undefined)
    wagmiSymbolRec = useReadContract({
    abi: erc20Abi,
    address: contractAddress,
    functionName: 'symbol',
    config, 
  })
  return wagmiSymbolRec;
}

const getWagmiTotalSupplyRec = (contractAddress:Address) => {
  let wagmiTotalSupplyRec;
  if (contractAddress !== undefined)
    wagmiTotalSupplyRec = useReadContract({
    abi: erc20Abi,
    address: contractAddress,
    functionName: 'totalSupply',
    config, 
  })
  return wagmiTotalSupplyRec;
}

//////////////////////////////
const getWagmiDecimals = (contractAddress:Address) => {
  let wagmiDecimals;
  if (contractAddress !== undefined) {
    const wagmiDecimalsRec = getWagmiDecimalRec(contractAddress);
    wagmiDecimals = wagmiDecimalsRec?.data;
  }
  return wagmiDecimals;
}

const getWagmiName = (contractAddress:Address) => {
  let wagmiName;
  if (contractAddress !== undefined) {
    const wagmiNameRec = getWagmiNameRec(contractAddress);
    wagmiName = wagmiNameRec?.data;
  }
  return wagmiName;
}

const getWagmiSymbol = (contractAddress:Address) => {
  let wagmiSymbol;
  if (contractAddress !== undefined) {
    const wagmiSymbolRec = getWagmiSymbolRec(contractAddress);
    wagmiSymbol = wagmiSymbolRec?.data;
  }
  return wagmiSymbol;
}

const getWagmiTotalSupply = (contractAddress:Address) => {
  let wagmiTotalSupply;
  if (contractAddress !== undefined) {
    const wagmiTotalSupplyRec = getWagmiTotalSupplyRec(contractAddress);
    console.debug(`ZZZ wagmiTotalSupplyRec = ${JSON.stringify(wagmiTotalSupplyRec, (_, v) => typeof v === 'bigint' ? v.toString() : v, 2)}`)
    wagmiTotalSupply = wagmiTotalSupplyRec?.data;
  }
  console.debug(`ZZZ wagmiTotalSupply = ${wagmiTotalSupply}`)
  return wagmiTotalSupply;
}

const getWagmiBalanceOf = (walletAddress: Address | string | undefined, contractAddress: Address | string) => {
  let wagmiBalanceOf;
  if (contractAddress !== undefined) {
    const wagmiBalanceOfRec = getWagmiBalanceOfRec(walletAddress , contractAddress )
    wagmiBalanceOf = wagmiBalanceOfRec?.data;
  }
  // alert(`walletAddress = ${walletAddress}\ncontractAddress = ${contractAddress}\nwagmiBalanceOf = ${wagmiBalanceOf}`)
  return wagmiBalanceOf;
}

const formatDecimals = (val: bigint | number | string | undefined, decimals:number|undefined) => {

  let bigInt = (val === undefined) ? BigInt(0) : BigInt(val)
  return (decimals !== undefined) ? formatUnits(bigInt, decimals) : bigInt.toString()
}

const formattedTotalSupply = (contractAddress:Address) => {
  let totalSupply = getWagmiTotalSupply(contractAddress)
  let decimals  = getWagmiDecimals(contractAddress)
 return formatDecimals(totalSupply, decimals);
}

const formattedBalanceOf = (walletAddress: Address | string | undefined, contractAddress: Address) => {
  let balanceOf = getWagmiBalanceOf(walletAddress, contractAddress)
  let decimals  = getWagmiDecimals(contractAddress)
 return formatDecimals(balanceOf, decimals);
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
  formattedTotalSupply,
  formattedBalanceOf
}
