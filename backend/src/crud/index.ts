import { Elysia, error, t } from "elysia";
import db from "../db";
import { broadcast } from "../ws";

const validator = t.Object({
  customer: t.String(),
  details: t.String(),
  amountDue: t.Numeric(),
});

export const CRUDHandler = new Elysia()
  .onAfterHandle(({ request }) => {
    if (request.method != "GET") broadcast();
  })
  .post("/", ({ body }) => {
    const target = db.query(`INSERT INTO orders (customer, details, amountDue, createdAt, updatedAt) VALUES (?1, ?2, ?3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`).run(body.customer, body.details, body.amountDue);
    return { id: target.lastInsertRowid };
  }, {
    body: validator,
  })
  .patch(
    "/:id",
    ({ body, params: { id }, set }) => {
      const target = db.query(`SELECT * FROM orders WHERE id = ?1`).get(id);
      if (target == null) return error(404);

      let stmt = "UPDATE orders";
      let fieldCount = 0;
      let setClause = "SET ";
      const args: any[] = [];

      if (body.customer !== undefined) {
        setClause += "customer = ?";
        fieldCount++;
        args.push(body.customer);
      }
      if (body.details !== undefined) {
        if (fieldCount > 0) setClause += ", ";
        setClause += "details = ?";
        fieldCount++;
        args.push(body.details);
      }
      if (body.amountDue !== undefined) {
        if (fieldCount > 0) setClause += ", ";
        setClause += "amountDue = ?";
        fieldCount++;
        args.push(body.amountDue);
      }

      if (fieldCount === 0) {
        return error(400, "No fields to update");
      }

      stmt += " " + setClause + " WHERE id = ?";
      args.push(id);

      db.query(stmt).run(...args);
      set.status = 204;
      return null;
    },
    {
      body: t.Object({
        customer: t.Optional(t.String()),
        details: t.Optional(t.String()),
        amountDue: t.Optional(t.Numeric()),
      }),
    }
  )
  .delete("/:id", ({ params: { id }, set }) => {
    db.query(
      `UPDATE orders SET deletedAt = CURRENT_TIMESTAMP WHERE id = ?1`
    ).run(id);
    set.status = 204;
    return null;
  })
  .get("/", () => {
    return db
      .query(
        `SELECT * FROM orders WHERE deletedAt IS NULL ORDER BY updatedAt DESC`
      )
      .all();
  });
