import { IPFS, create } from 'ipfs'
import CID from 'cids'
import bs58 from 'bs58'

export class ipfsClient {

  /*
  cid: CID
codec: "dag-pb"
multibaseName: "base58btc"
string: "QmVRcAUSsNLmpy5katwLmDk6dnvFeDLfqu6LqiqYE5RgZE"
mode: 420
mtime: undefined
path: "mizuki.txt"
size: 41
*/

  public async add() {
    const node = await create()
    const version = await node.version()
  
    console.log('Version:', version.version)  
    const file = await node.add({
      path: 'mizuki.txt',
      content: new TextEncoder().encode('to Advance Knowledge for Humanity.')
    })
    console.log(file);
    console.log('Added file:', file.path, file.cid.toString())
    const content = await this.readFile(node, file.cid)
    console.log('Added file contents:', content)
  }

  public async readFile(ipfs: IPFS, cid: CID): Promise<string> {
    const decoder = new TextDecoder()
    let content = ''
    for await (const chunk of ipfs.cat(cid)) {
      content += decoder.decode(chunk)
    }
    return content
  }

  public conv (){
    const cid = 'QmVRcAUSsNLmpy5katwLmDk6dnvFeDLfqu6LqiqYE5RgZE'
    const hex = this.getBytes32FromIpfsHash(cid)
    console.log(cid)
    console.log(hex)
    const origin = this.getIpfsHashFromBytes32(hex)
    console.log(origin)    
    // 516d565263415553734e4c6d7079356b6174774c6d446b36646e764665444c667175364c71697159453552675a45
    // "0x0101010101010101010101010101010101010101010101010101010101010101"
  }

  // https://ethereum.stackexchange.com/questions/17094/how-to-store-ipfs-hash-using-bytes32

  public getBytes32FromIpfsHash(ipfsListing: string) {
    return "0x"+bs58.decode(ipfsListing).slice(2).toString('hex')
  }

  public getIpfsHashFromBytes32(bytes32Hex: string) {
    // Add our default ipfs values for first 2 bytes:
    // function:0x12=sha2, size:0x20=256 bits
    // and cut off leading "0x"
    const hashHex = "1220" + bytes32Hex.slice(2)
    const hashBytes = Buffer.from(hashHex, 'hex');
    const hashStr = bs58.encode(hashBytes)
    return hashStr
  }
}