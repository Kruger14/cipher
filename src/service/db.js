import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
    { name: 'cipher.db' },
    () => { console.log('Database opened successfully'); },
    (error) => { console.log('Error opening database: ', error); }
);

export const createTable = () => {
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS PASSWORDS (
                ID INTEGER PRIMARY KEY AUTOINCREMENT, 
                username TEXT, 
                password TEXT, 
                netimageurL TEXT
            )`,
            [],
            () => {
                console.log('Table created successfully');
            },
            (tx, error) => {
                console.log('Error creating table: ', error);
            }
        );
    });
};

export const insertData = (username, password, netimage) => {
    db.transaction(tx => {
        tx.executeSql(
            `INSERT INTO PASSWORDS (username, password, netimageurL) VALUES (?, ?, ?)`,
            [username, password, netimage],
            () => {
                ToastAndroid.show("Data inserted successfully", ToastAndroid.SHORT);
            },
            (tx, error) => {
                console.log("Error inserting row: ", error);
            }
        );
    });
};

export const updateData = () => {
    db.transaction(tx => {
        tx.executeSql(`UPDATE PASSWORDS SET username = ?, password = ?, netimageurL = ? WHERE ID = ?`), [username, password, netimageurl, id],
            () => {
                console.log('updated');
            },
            (error) => {
                console.log("message : ", error);
            }
    })

}

export const deleteData = (id, callback) => {
    db.transaction(tx => {
        tx.executeSql(
            `DELETE FROM PASSWORDS WHERE ID = ?`,
            [id],
            (tx, results) => {
                if (results.rowsAffected > 0) {
                    console.log('Deleted row ID:', id);
                    if (callback) callback();
                } else {
                    console.log('No row found with ID:', id);
                }
            },
            (tx, error) => {
                console.log('Error deleting row:', error);
            }
        );
    });
};

export default db;
