const express = require('express')
const app = express()

const sqlite3 = require('sqlite3')
const {open} = require('sqlite')

const path = require('path')
const dbPath = path.join('../', './myapp', './googreads.db')
// let db = null;
const initilizeDBAndServer = async () => {
  try {
    let db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () =>
      console.log('Server is Running at http:localhost:3000/'),
    )
  } catch (error) {
    console.log(`DB Error ${error.message}`)
    process.exit(1)
  }
}

initilizeDBAndServer()
