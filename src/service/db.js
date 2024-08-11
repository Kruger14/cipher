import { ToastAndroid } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
    { name: 'cipher.db' }
);

export const createTable = () => {
    try {
        db.transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS PASSWORDS (
                    ID INTEGER PRIMARY KEY AUTOINCREMENT, 
                    username TEXT, 
                    password TEXT, 
                    netimageurL TEXT
                    )`,
                [],
            );
        });
    }
    catch (error) {
        ToastAndroid.show(error, ToastAndroid.SHORT);
    }
};

export const insertData = (username, password, netimage) => {
    try {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO PASSWORDS (username, password, netimageurL) VALUES (?, ?, ?)`,
                [username, password, netimage],
                () => {
                    ToastAndroid.show("Data inserted successfully", ToastAndroid.SHORT);
                },
            );
        });
    } catch (error) {
        ToastAndroid.show(error, ToastAndroid.SHORT);
    }
};

export const updateData = (username, password, netimageurl, id) => {
    try {
        db.transaction(tx => {
            tx.executeSql(`UPDATE PASSWORDS SET username = ?, password = ?, netimageurL = ? WHERE ID = ?`, [username, password, netimageurl, id]),
                (error) => {
                    ToastAndroid.show(error, ToastAndroid.SHORT)
                }
        })
    }
    catch (error) {
        ToastAndroid.show(error, ToastAndroid.SHORT);
    }
}

export const deleteData = (id, callback) => {
    db.transaction(tx => {
        tx.executeSql(
            `DELETE FROM PASSWORDS WHERE ID = ?`,
            [id],
            (tx, results) => {
                if (results.rowsAffected > 0) {
                    ToastAndroid.show("Row Deleted", ToastAndroid.SHORT)
                    if (callback) callback();
                } else {
                    ToastAndroid.show("Record not found", ToastAndroid.SHORT)
                }
            },
            (tx, error) => {
                ToastAndroid.show(error, ToastAndroid.SHORT)
            }
        );
    });
};

export default db;
