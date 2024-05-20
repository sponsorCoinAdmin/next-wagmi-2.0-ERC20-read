'use client'

import { BLOCKCHAIN_PROVIDER } from '@/lib/wagmi/config'
import { useEffect, useState } from 'react'
import { Address } from 'viem'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { TokenContract,
  getERC20WagmiBalanceOfRec,
  getERC20WagmiDecimals,
  getERC20WagmiName, 
  getERC20WagmiSymbol,
  getERC20WagmiTotalSupply,
  getErc20Contract
} from '../lib/wagmi/wagmiERC20Read'
import Ecr20ReadFields from '@/components/Ecr20ReadFields'
import Ecr20ReadWagmiRecords from '@/components/Ecr20ReadWagmiRecords'
import WagmiConnect from '@/components/WagmiConnect'


// let ACTIVE_WALLET_ACCOUNT:Address|undefined;
const USDT_POLYGON_CONTRACT:Address  = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F'
const CHKN_ETHEREUM_CONTRACT:Address = '0xD55210Bb6898C021a19de1F58d27b71f095921Ee'
const NULL_CONTRACT                  = '0x0000000000000000000000000000000000000000';

function App() {
  const account = useAccount()
  const [ ACTIVE_WALLET_ACCOUNT, setActiveWalletAccount ] = useState<Address>(NULL_CONTRACT)
  const [ DEFAULT_TOKEN_CONTRACT, setDefaultTokenContract ] = useState<Address>(NULL_CONTRACT)
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()
  const [ contract, setContract ] = useState<TokenContract>()

  useEffect(() => {
    if (account?.chainId !== undefined ) {
      setNetworkTestContract(account.chainId)
      switch(account.chainId) {
        case 1: setDefaultTokenContract(CHKN_ETHEREUM_CONTRACT); break;
        case 137: setDefaultTokenContract(USDT_POLYGON_CONTRACT); break;
        default: setDefaultTokenContract(NULL_CONTRACT); break;
      }
    }
  }, [account.chainId]);
  
  useEffect(() => {
    // alert(`SETTING ACTIVE_WALLET_ACCOUNT = ${account.address}`)
    if (account.address != undefined && ACTIVE_WALLET_ACCOUNT !== account.address)
      setActiveWalletAccount(account.address)
  }, [account.address]);

  const setNetworkTestContract = (chainId:number | undefined) => {
    console.debug(`account.chainId Changed to ${account.chainId}`);
    if (account?.chainId !== undefined) {
      setContract({ chainId: account.chainId, 
                    name:"Chikencoin", 
                    symbol: "CHKN", 
                    address: DEFAULT_TOKEN_CONTRACT,
                    totalSupply: "0",
                    decimals: 18,
                    img: undefined})
    }
  }

  let balanceOfRec = getERC20WagmiBalanceOfRec(ACTIVE_WALLET_ACCOUNT, DEFAULT_TOKEN_CONTRACT)
  let ercContract = getErc20Contract(DEFAULT_TOKEN_CONTRACT)

  let contractResponse:TokenContract =
  {
    address:DEFAULT_TOKEN_CONTRACT,
    chainId: account.chainId,
    name:getERC20WagmiName(undefined),
    symbol:getERC20WagmiSymbol(DEFAULT_TOKEN_CONTRACT),
    totalSupply:getERC20WagmiTotalSupply(DEFAULT_TOKEN_CONTRACT),
    decimals:getERC20WagmiDecimals(DEFAULT_TOKEN_CONTRACT),
    img:undefined
  }

  console.debug(`XXXX ercContract = ${JSON.stringify(ercContract, (_, v) => typeof v === 'bigint' ? v.toString() : v,2)}`)
  console.debug(`YYYY contractResponse = ${JSON.stringify(contractResponse, (_, v) => typeof v === 'bigint' ? v.toString() : v,2)}`)
  console.debug(`ZZZZ balanceOfRec = ${JSON.stringify(balanceOfRec, (_, v) => typeof v === 'bigint' ? v.toString() : v,2)}`)

  return (
    <>
      <div>
        <h2>Provider Configuration Status</h2>
        <div>
          Blockchain Provider = {BLOCKCHAIN_PROVIDER} <br />
          TokenContract Data: {JSON.stringify(contract, (_, v) => typeof v === 'bigint' ? v.toString() : v, 2)} <br />
        </div>
      </div>

      <WagmiConnect 
        account={account}
        connect={connect}
        connectors={connectors}
        disconnect={disconnect}
        error={error} />

      <Ecr20ReadFields ACTIVE_WALLET_ACCOUNT={ACTIVE_WALLET_ACCOUNT} DEFAULT_TOKEN_CONTRACT={DEFAULT_TOKEN_CONTRACT} />
      <Ecr20ReadWagmiRecords ACTIVE_WALLET_ACCOUNT={ACTIVE_WALLET_ACCOUNT} DEFAULT_TOKEN_CONTRACT={DEFAULT_TOKEN_CONTRACT} />
    </>
  )
}

export default App
