import Dexie, { Table } from "dexie";

export class MySubClassedDexie extends Dexie {
  channelList!: Table<IChannel>;

  constructor() {
    super("myDatabase");
    this.version(1).stores({
      channelList: "&id,_v,name,createdAt,updatedAt", // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();
