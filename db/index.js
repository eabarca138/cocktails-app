import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('dbfavs.db');

export const init = () => {
    const promise = new Promise( (resolve, reject) => {
        db.transaction( (tx) => {
            tx.executeSql("CREATE TABLE IF NOT EXISTS dbfavs (id INTEGER PRIMARY KEY NOT NULL, strDrink TEXT NOT NULL, strDrinkThumb TEXT NOT NULL, idDrink INTEGER NOT NULL);",
            [],
            () => resolve(),
            (_, err) => reject(err)
            )
        })
    })

    return promise;
}

export const insertFav = (strDrink, strDrinkThumb, idDrink) => {
    const promise = new Promise( (resolve, reject) => {
        db.transaction( tx => {
            tx.executeSql(
                "INSERT INTO dbfavs (strDrink, strDrinkThumb, idDrink) values (?, ?, ?);",
                [strDrink, strDrinkThumb, idDrink],
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
                "SELECT * FROM dbfavs;",
                [],
                (_, result) => resolve(result),
                (_,err) => reject(err)
            )
        })
    })
    return promise;
}

export const deleteFav = (idDrink) => {
    const promise = new Promise( (resolve, reject) => {
        db.transaction( tx => {
            tx.executeSql(
                "DELETE FROM dbfavs WHERE idDrink = ?",
                [idDrink],
                (_, result) => resolve(result),
                (_,err) => reject(err)
            )
        })
    })
    return promise;
}