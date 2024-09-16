import { v4 } from "uuid";
import db from "../db";

const runScript = async () => {
  // db.query(
  //   `
  //       CREATE TABLE orders (
  //           id TEXT PRIMARY KEY,
  //           customer TEXT NOT NULL,
  //           details TEXT,
  //           amountDue REAL,
  //           createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  //           updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  //           deletedAt DATETIME
  //           );
  //           `
  // ).run();

  const stmt = `INSERT INTO orders (id, customer, details, amountDue, createdAt, updatedAt, deletedAt)
            VALUES
            ('${v4()}', 'John Doe', 'Order for electronics', 299.99, '2024-09-16 10:00:00', '2024-09-16 10:00:00', NULL),
            ('${v4()}', 'Jane Smith', 'Order for books and accessories', 120.50, '2024-09-16 11:30:00', '2024-09-16 11:30:00', NULL),
    ('${v4()}', 'Alice Johnson', 'Order for clothing', 89.99, '2024-09-16 13:45:00', '2024-09-16 13:45:00', NULL);
    `;
  db.query(stmt).run();
};

runScript();
