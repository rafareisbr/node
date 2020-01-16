DROP TABLE IF EXISTS "products" CASCADE;
DROP TABLE IF EXISTS "users" CASCADE;

CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL, 
    "name" VARCHAR(255), 
    "email" VARCHAR(255), 
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "products" (
    "id" SERIAL,
    "title" VARCHAR(255),
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "imageUrl" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL,
    "userId" INTEGER REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY ("id")
)

INSERT INTO "products" ("id","title","price","imageUrl","description","createdAt","updatedAt","userId") 
    VALUES (DEFAULT,$1,$2,$3,$4,$5,$6,$7) RETURNING *;

SELECT "id", "title", "price", "imageUrl", "description", "createdAt", "updatedAt", "userId"
    FROM "products" 
    AS "product" 
    WHERE "product"."userId" = 1;

UPDATE "products" SET "title"=$1,"price"=$2,"updatedAt"=$3 WHERE "id" = $4

DELETE FROM "products" WHERE "id" = 1