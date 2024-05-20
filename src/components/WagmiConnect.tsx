import React from 'react';

type Props = {
    account:any,
    connect:any,
    connectors:any,
    disconnect:any,
    error:any
  }

const WagmiConnect = ({ account, connect, connectors, disconnect, error } : Props) => {
  return (
    <div>
        <h2>Connect Accounts</h2>
        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
        {account.status !== 'connected' && connectors.map((connector: { uid: React.Key | null | undefined; name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        {error === null ? null : "Error Status: " + error?.message } <br />
        {status=== null ? null : "Status: " + status } <br/>
        {account.status === null ? null : "Connection Status : " + account.status } <br />
        {account.chainId === null ? null : "chainId: " + account.chainId } <br />
        {account.addresses === null ? null : "Connected Accounts:" + JSON.stringify(account.addresses, null, 2)} <br />
        {account.address === null ? null : "Active Wallet Account:" + JSON.stringify(account.address, null, 2)} <br />

    </div>
  );
}

export default WagmiConnect;
