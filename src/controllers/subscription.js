/* eslint-disable object-curly-newline */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import dayjs from 'dayjs';
import connection from '../database/connection.js';
import subscriptionSchema from '../schemas/subscription.js';

export async function postSubscription(req, res) {
  const now = dayjs().format();

  const { userID } = req.body;
  const { name, address, cep, city, state } = req.body?.delivery;
  const { type, deliveryRateId, products } = req.body?.plan;

  const validation = subscriptionSchema.validate({
    userID,
    cep,
    city,
    address,
    type,
    products,
    state,
    name,
    deliveryRateId,
  });

  if (validation.error) {
    console.log(validation.error);
    return res.sendStatus(400);
  }
  const { plan, delivery } = req.body;

  try {
    const userAlreadyHasPlanCheck = await connection.query(
      'SELECT * FROM customer_plan WHERE customer_id = $1;',
      [userID],
    );

    if (userAlreadyHasPlanCheck.rows.length !== 0) {
      return res.sendStatus(409);
    }

    const createdPlan = await connection.query(
      `INSERT INTO plan (type,"deliveryRateId", created_at) 
            VALUES ($1,$2,$3) RETURNING *;`,
      [plan.type, plan.deliveryRateId, now],
    );

    const planID = createdPlan.rows[0].id;

    await connection.query(
      `INSERT INTO customer_plan (customer_id,plan_id,name,address,cep,state) 
              VALUES ($1,$2,$3,$4,$5,$6);`,
      [
        userID,
        planID,
        delivery.name,
        delivery.address,
        delivery.cep,
        delivery.state,
      ],
    );

    let productsInsertQuery = '';
    plan.products.forEach((p) => {
      productsInsertQuery += `INSERT INTO plan_product (plan_id,product_id) VALUES (${planID}, ${Number(
        p,
      )});`;
    });

    await connection.query(productsInsertQuery);

    const testReturn = await connection.query('SELECT * FROM plan;');

    return res.status(201).send({ testReturn, planID });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function getSubscription(req, res) {
  const { authorization } = req.headers;
  const token = authorization.replace('Bearer ', '');

  try {
    const result = await connection.query(
      `SELECT plan.type,
              plan.id,
              plan.created_at,
              plan."deliveryRateId"
       FROM   customer_plan AS cp
       JOIN   plan ON cp.plan_id = plan.id
       JOIN   session ON session.customer_id = cp.customer_id
       WHERE session.token = $1;
              `,
      [token],
    );

    if (result.rows.length === 0) return res.sendStatus(404);
    const plan = result.rows[0];

    const productsQuery = await connection.query(
      `SELECT product.name 
      FROM product
      JOIN plan_product ON plan_product.product_id = product.id
      WHERE plan_product.plan_id = $1;`,
      [plan.id],
    );

    plan.products = [];
    console.log(plan.id);
    console.log(productsQuery.rows);

    productsQuery.rows.forEach((product) => {
      plan.products.push(product.name);
    });

    return res.send(plan).status(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
