import { getQueryVariable } from '@/app/lib/spCoin/utils'
import { getWagmiBalanceOfRec } from '@/app/lib/wagmi/getWagmiBalanceOfRec'
import { getURLParams } from "@/app/api/lib/getURLParams";

export async function GET(req: Request) {
  const params = getURLParams(req.url);
  const tokenAddress    = getQueryVariable(params, "tokenAddress")

  const wagmiBalance = await getWagmiBalanceOfRec(tokenAddress)
  return new Response(JSON.stringify(wagmiBalance))
}
