CREATE TABLE "user" (
	"id" serial NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "user_plan" (
	"user_id" integer NOT NULL,
	"plan_id" integer NOT NULL,
	"name" TEXT NOT NULL,
	"address" TEXT NOT NULL,
	"cep" TEXT NOT NULL,
	"state" TEXT NOT NULL
) WITH (
  OIDS=FALSE
);


CREATE TABLE "plan" (
	"id" serial NOT NULL,
	"type" TEXT(5) NOT NULL,
	"created_at" DATE NOT NULL,
	"next_delivery" DATE NOT NULL,
	CONSTRAINT "plan_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "session" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"token" serial NOT NULL,
	CONSTRAINT "session_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.delivery" (
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




ALTER TABLE "user_plan" ADD CONSTRAINT "user_plan_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "user_plan" ADD CONSTRAINT "user_plan_fk1" FOREIGN KEY ("plan_id") REFERENCES "plan"("id");


ALTER TABLE "session" ADD CONSTRAINT "session_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");


ALTER TABLE "plan_delivery" ADD CONSTRAINT "plan_delivery_fk0" FOREIGN KEY ("plan_id") REFERENCES "plan"("id");
ALTER TABLE "plan_delivery" ADD CONSTRAINT "plan_delivery_fk1" FOREIGN KEY ("delivery_id") REFERENCES "delivery"("id");

ALTER TABLE "plan_product" ADD CONSTRAINT "plan_product_fk0" FOREIGN KEY ("plan_id") REFERENCES "plan"("id");
ALTER TABLE "plan_product" ADD CONSTRAINT "plan_product_fk1" FOREIGN KEY ("product_id") REFERENCES "product"("id");









