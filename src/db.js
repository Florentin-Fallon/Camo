import Dexie from "dexie";

const db = new Dexie('members')

db.version(1).stores({
    users: '_id, name, email, number, replica'
})

export default db;