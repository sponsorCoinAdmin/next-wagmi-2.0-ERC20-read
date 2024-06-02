import { getTestName } from "@/lib/wagmi/erc20WagmiServerRead"
import { Address } from "viem"
const TOKEN_CONTRACT:Address = '0xD55210Bb6898C021a19de1F58d27b71f095921Ee'

export async function GET(req: Request) {
  let name    = await getTestName();

  // alert("Name = "+name)
  return new Response(name)
}
