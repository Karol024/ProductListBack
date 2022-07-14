import {createPool} from "mysql2/promise";

export const pool = createPool({
host: 'localhost',
user:'root',
database: 'list_products',
namedPlaceholders: true,
decimalNumbers: true,
});
