import Dexie from "dexie"

const db = new Dexie("UsersDB")
db.version(1).stores({
  users: "++id, name, &email, password, real, btc, brita",
  transfers:
    "++id, userId, type, date, currencyBuy, valueBuy, currencySell, valueSell"
})

db.open()

export default db
