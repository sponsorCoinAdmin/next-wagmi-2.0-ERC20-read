'use client'

import { BLOCKCHAIN_PROVIDER } from '@/lib/wagmi/config'
import { useEffect, useState } from 'react'
import { Address } from 'viem'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { TokenContract,
  getERC20WagmiBalanceOfRec,
  getERC20WagmiTotalSupplyRec,
  getERC20WagmiNameRec,
  getERC20WagmiSymbolRec,
  getERC20WagmiDecimalRec,
  getERC20WagmiRecords,
  getERC20WagmiBalanceOf, 
  getERC20WagmiDecimals,
  getERC20WagmiName, 
  getERC20WagmiSymbol,
  getERC20WagmiTotalSupply,
  formatDecimals,
  getFormattedTotalSupply,
  getFormattedBalanceOf
} from '../lib/wagmi/wagmiERC20Read'

function App() {
  const account = useAccount()
  const [ ACTIVE_WALLET_ACCOUNT, setActiveWalletAccount ] = useState<Address>(`0x0000000000000000000000000000000000000000`)
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()
  const [ contract, setContract ] = useState<TokenContract>()

  let balanceOfRec;
 
  // let ACTIVE_WALLET_ACCOUNT:Address|undefined;
  const USDT_POLYGON_CONTRACT:Address = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F'
  const CHKN_ETHEREUM_CONTRACT:Address = '0xD55210Bb6898C021a19de1F58d27b71f095921Ee'

  useEffect(() => {
    if (account?.chainId !== undefined )
        setNetworkTestContract(account.chainId)
  }, [account.chainId]);
  
  useEffect(() => {
    // alert(`SETTING ACTIVE_WALLET_ACCOUNT = ${account.address}`)
    if (account.address != undefined && ACTIVE_WALLET_ACCOUNT !== account.address)
      setActiveWalletAccount(account.address)
  }, [account.address]);

  const setNetworkTestContract = (chainId:number | undefined) => {
    console.debug(`account.chainId Changed to ${account.chainId}`);
    if (account?.chainId !== undefined) {
      switch(chainId) {
        case 1:
          setContract({chainId: chainId, 
              name:"Chikencoin", 
              symbol: "CHKN", 
              address: CHKN_ETHEREUM_CONTRACT,
              totalSupply: "0",
              decimals: 18,
              img: undefined})
            break;
        case 137:
          setContract({chainId: chainId, 
            name:"Tether", 
            symbol:"USDT", 
            address: USDT_POLYGON_CONTRACT, 
            decimals: 18,
            totalSupply: "0",
            img: undefined})
          break;
        default:
          // code block
      }
    }
  }

  balanceOfRec = getERC20WagmiBalanceOfRec(ACTIVE_WALLET_ACCOUNT, USDT_POLYGON_CONTRACT)
  // balanceOfRec = getERC20WagmiBalanceOfRec('0x858BDEe77B06F29A3113755F14Be4B23EE6D6e59', USDT_POLYGON_CONTRACT)

  return (
    <>
      <div>
        <h2>Account</h2>
        <div>
          Blockchain Provider = {BLOCKCHAIN_PROVIDER} <br />
          TokenContract Data: {JSON.stringify(contract, (_, v) => typeof v === 'bigint' ? v.toString() : v, 2)} <br />
          Wallet Account Addresses: {JSON.stringify(account.addresses, null, 2)} <br />
          chainId: {account.chainId}
        </div>

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>
          Connection Status: {account.status} <br />
          Error Status            : {error?.message} <br/>
          Account Status          : {status} <br/>
          Active Wallet Account   : {JSON.stringify(account.address, null, 2)} <br/>
          Token Name              : {getERC20WagmiName(USDT_POLYGON_CONTRACT)} <br/>
          Symbol                  : {getERC20WagmiSymbol(USDT_POLYGON_CONTRACT)} <br/>
          Decimals                : {getERC20WagmiDecimals(USDT_POLYGON_CONTRACT)} <br/>
          Total Supply            : {getERC20WagmiTotalSupply(USDT_POLYGON_CONTRACT)?.toString()} <br/>
          Formatted Total Supply  : {getFormattedTotalSupply(USDT_POLYGON_CONTRACT)} <br/>
          BalanceOf               : {getERC20WagmiBalanceOf(ACTIVE_WALLET_ACCOUNT, USDT_POLYGON_CONTRACT)} <br/>
          Formatted BalanceOf     : {getFormattedBalanceOf(ACTIVE_WALLET_ACCOUNT, USDT_POLYGON_CONTRACT)}
        </div>
        {/* <div>{`nameRec.status = ${nameRec.status}`}</div>
        <div>{`totalSupplyRec.status = ${totalSupplyRec.status}`}</div>
        <div>{nameRec.status === 'success' ? "Name : " + nameRec.data : null}</div>
        <div>{symbolRec.status === 'success' ? "Symbol : " + symbolRec.data : null}</div>
        <div>{totalSupplyRec.status === 'success' ? "Total Supply : " + totalSupplyRec.data : null}</div>
        <div>{balanceOfRec.status === 'success' ? "BalanceOf : " + balanceOfRec.data : null}</div>
        <div>{decimalRec.status === 'success' ? "Decimals : " + decimalRec.data : null}</div>
        <div>{balanceOfRec.status === 'error' ? "BalanceOf ERROR : " + JSON.stringify(balanceOfRec.error, null, 2) : null}</div>
        <div>{`Formatted Balance: `+formatDecimals(balanceOfRec.data, decimalRec.data)}</div>
        <div>{totalSupplyRec.status === 'error' ? "Total Supply ERROR : " + JSON.stringify(totalSupplyRec.error, null, 2) : null}</div> */}
      </div>
    </>
  )
}

export default App
