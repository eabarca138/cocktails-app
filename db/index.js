import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('favs.db');

export const init = () => {
    const promise = new Promise( (resolve, reject) => {
        db.transaction( (tx) => {
            tx.executeSql("CREATE TABLE IF NOT EXISTS favs (dbID INTEGER PRIMARY KEY NOT NULL strDrink TEXT NOT NULL, strDrinkThumb TEXT NOT NULL);",
            [],
            () => resolve(),
            (_, err) => reject(err)
            )
        })
    })

    return promise;
}

export const insertFav = (strDrink, strDrinkThumb) => {
    const promise = new Promise( (resolve, reject) => {
        db.transaction( tx => {
            tx.executeSql(
                "INSERT INTO favs (strDrink, strDrinkThumb) values (?, ?);",
                [strDrink, strDrinkThumb],
                (_, result) => resolve(result),
                (_, err) => reject(err)
            )
        })
    })

    return promise;
} 

export const fetchFavs = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction( tx => {
            tx.executeSql(
                "SELECT * FROM favs;",
                [],
                (_, result) => resolve(result),
                (_,err) => reject(err)
            )
        })
    })
    return promise;
}

export const deleteFav = (dbID) => {
    const promise = new Promise( (resolve, reject) => {
        db.transaction( tx => {
            tx.executeSql(
                "DELETE FROM favs WHERE id = ?",
                [dbID],
                (_, result) => resolve(result),
                (_,err) => reject(err)
            )
        })
    })
    return promise;
}