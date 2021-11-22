CREATE TABLE "customer" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	CONSTRAINT "customer_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "customer_plan" (
	"customer_id" integer UNIQUE NOT NULL,
	"plan_id" integer NOT NULL,
	"address" TEXT NOT NULL,
	"cep" TEXT NOT NULL,
	"state" TEXT NOT NULL,
	"name" TEXT NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "plan" (
	"id" serial NOT NULL,
	"type" CHAR(5) NOT NULL,
	"created_at" DATE NOT NULL,
	"deliveryRateId" integer NOT NULL,
	CONSTRAINT "plan_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "session" (
	"id" serial NOT NULL,
	"customer_id" integer NOT NULL,
	"token" TEXT NOT NULL,
	CONSTRAINT "session_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "delivery" (
	"id" serial NOT NULL,
	"day" DATE NOT NULL,
	"is_finished" BOOLEAN NOT NULL DEFAULT 'FALSE',
	CONSTRAINT "delivery_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "plan_delivery" (
	"plan_id" integer NOT NULL,
	"delivery_id" integer NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "plan_product" (
	"plan_id" integer NOT NULL,
	"product_id" integer NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "product" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL UNIQUE,
	CONSTRAINT "product_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "customer_plan" ADD CONSTRAINT "customer_plan_fk0" FOREIGN KEY ("customer_id") REFERENCES "customer"("id");
ALTER TABLE "customer_plan" ADD CONSTRAINT "customer_plan_fk1" FOREIGN KEY ("plan_id") REFERENCES "plan"("id");


ALTER TABLE "session" ADD CONSTRAINT "session_fk0" FOREIGN KEY ("customer_id") REFERENCES "customer"("id");


ALTER TABLE "plan_delivery" ADD CONSTRAINT "plan_delivery_fk0" FOREIGN KEY ("plan_id") REFERENCES "plan"("id");
ALTER TABLE "plan_delivery" ADD CONSTRAINT "plan_delivery_fk1" FOREIGN KEY ("delivery_id") REFERENCES "delivery"("id");

ALTER TABLE "plan_product" ADD CONSTRAINT "plan_product_fk0" FOREIGN KEY ("plan_id") REFERENCES "plan"("id");
ALTER TABLE "plan_product" ADD CONSTRAINT "plan_product_fk1" FOREIGN KEY ("product_id") REFERENCES "product"("id");

INSERT INTO product (id, name) VALUES (0,'Chás');
INSERT INTO product (id, name) VALUES (1,'Incensos');
INSERT INTO product (id, name) VALUES (2,'Produtos Orgânicos');




