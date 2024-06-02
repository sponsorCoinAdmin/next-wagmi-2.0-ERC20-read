import { getURLParams } from "@/app/api/lib/getURLParams";
import { getQueryVariable } from "@/app/api/lib/spCoin/utils";
import { getWagmiBalanceOfRec } from "@/app/api/lib/wagmi/getWagmiBalanceOfRec";

export async function GET(req: Request) {
  const params = getURLParams(req.url);
  const tokenAddress    = getQueryVariable(params, "tokenAddress")

  const wagmiBalance = await getWagmiBalanceOfRec(tokenAddress)
  console.log("BalanceOf = "+wagmiBalance)
  return new Response(JSON.stringify(wagmiBalance))
}
