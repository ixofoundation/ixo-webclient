import Dexie from 'dexie'

interface Avatar {
  url: string
  base64: string
}

class AvatarDatabase extends Dexie {
  avatars!: Dexie.Table<Avatar, string> // 'string' is the type of the primary key

  constructor() {
    super('AvatarDatabase')
    this.version(1).stores({
      avatars: 'url, base64',
    })
  }
}

export const db = new AvatarDatabase()
