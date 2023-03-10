import { Polybase } from '@polybase/client';
import { ethPersonalSign } from '@polybase/eth';
import Wallet from 'ethereumjs-wallet';

const PRIVATE_KEY = import.meta.env.PRIVATE_KEY ?? ''

// PK, need to establish a PK so we can control updates
const schema = `
collection users {
  id: string; 
  name?: string;
  desc?: string;
  icon?: string;
  pvkey: string;
  $pk: string;

  constructor (id: string, pvkey: string) {
    this.id = id;
    this.$pk = ctx.publicKey;
    this.pvkey = pvkey;
  }

  setProfile(name?: string, desc?: string) {
    if (this.$pk != ctx.publicKey) {
      throw error ('invalid owner');
    }
    if (this.name) {
      this.name = name;
    }
    if (this.desc) {
      this.desc = desc;
    }
  }
}

collection collections {
  id: string;
  account: string;
  name: string;
  desc?: string;
  icon?: string;
  timestamp: string;
  $pk: string;

  @index(account, [timestamp, desc]);

  constructor (id: string, account: string, name: string, desc: string, icon: string, timestamp: string) {
    this.id = id;
    this.$pk = ctx.publicKey;
    this.account = account;
    this.name = name;
    this.desc = desc;
    this.icon = icon;
    this.timestamp = timestamp;
  }
}

collection followers {
  id: string;
  follower: string;
  followee: string;
  email?: string;
  $pk: string;

  constructor (follower: string, followee: string) {
    this.id = follower + '/' + followee;
    this.follower = follower;
    this.followee = followee;
    this.$pk = ctx.publicKey;
  }
}

collection messages {
  id: string;
  message: string;
  timestamp: string;
  account: string;
  $pk: string;

  @index(account, [timestamp, desc]);

  constructor (id: string, account: string, message: string, timestamp: string) {
    this.id = id;
    this.$pk = ctx.publicKey;
    this.account = account;
    this.message = message;
    this.timestamp = timestamp;
  }
}
`

async function load () {
  const db = new Polybase({
    baseURL: "https://testnet.polybase.xyz/v0",
    signer: async (data) => {
      const wallet = Wallet.fromPrivateKey(Buffer.from(PRIVATE_KEY, 'hex'))
      return { h: 'eth-personal-sign', sig: ethPersonalSign(wallet.getPrivateKey(), data) }
    },
  })

  if (!PRIVATE_KEY) {
    throw new Error('No private key provided')
  }

  await db.applySchema(schema, 'datahaus')
  return 'Schema loaded'
}

load()
  .then(console.log)
  .catch(console.error)