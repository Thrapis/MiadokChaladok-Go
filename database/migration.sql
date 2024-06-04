CREATE EXTENSION citext;
CREATE DOMAIN email AS citext
    CHECK ( value ~
            '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$' );

/* ----------------- */

CREATE TABLE "Categories"
(
    "ID"        BIGSERIAL PRIMARY KEY,    -- GORM default
    "Name"      VARCHAR(64) NOT NULL,
    "CreatedAt" TIMESTAMP WITH TIME ZONE, -- GORM default
    "UpdatedAt" TIMESTAMP WITH TIME ZONE, -- GORM default
    "DeletedAt" TIMESTAMP WITH TIME ZONE  -- GORM default
);

INSERT INTO "Categories" ("Name", "CreatedAt", "UpdatedAt")
VALUES (N'Класічны мёд', localtimestamp, localtimestamp),
       (N'Мёд у сотах', localtimestamp, localtimestamp),
       (N'Наборы', localtimestamp, localtimestamp),
       (N'Іншыя прадукты', localtimestamp, localtimestamp);

/* ----------------- */

CREATE TABLE "Tastes"
(
    "ID"          BIGSERIAL PRIMARY KEY,    -- GORM default
    "Name"        VARCHAR(64)  NOT NULL,
    "Description" VARCHAR(256) NOT NULL,
    "CreatedAt"   TIMESTAMP WITH TIME ZONE, -- GORM default
    "UpdatedAt"   TIMESTAMP WITH TIME ZONE, -- GORM default
    "DeletedAt"   TIMESTAMP WITH TIME ZONE  -- GORM default
);

INSERT INTO "Tastes" ("Name", "Description", "CreatedAt", "UpdatedAt")
VALUES (N'Не вызначана', N'Не вызначана або нельга з''есці', localtimestamp, localtimestamp),
       (N'Грэчкавы', N'Нейтральны, з лёгкай вастрынкай', localtimestamp, localtimestamp),
       (N'Ліпавы', N'Востра-салодкі', localtimestamp, localtimestamp),
       (N'Лугавы', N'Лёгкі салодкі', localtimestamp, localtimestamp),
       (N'Лясны', N'Салодкі, трошачку з кісласцю', localtimestamp, localtimestamp),
       (N'Рапсавы', N'Салодкі, з лёгкай гарчынкай у канцы', localtimestamp, localtimestamp);

/* ----------------- */

CREATE TABLE "Products"
(
    "ID"         BIGSERIAL PRIMARY KEY,    -- GORM default
    "CategoryID" BIGINT       NOT NULL,
    "TasteID"    BIGINT       NOT NULL,
    "Name"       VARCHAR(64)  NOT NULL,
    "ImagePath"  TEXT         NOT NULL,
    "Expiration" VARCHAR(256) NOT NULL,
    "CreatedAt"  TIMESTAMP WITH TIME ZONE, -- GORM default
    "UpdatedAt"  TIMESTAMP WITH TIME ZONE, -- GORM default
    "DeletedAt"  TIMESTAMP WITH TIME ZONE, -- GORM default
    FOREIGN KEY ("CategoryID") REFERENCES "Categories" ("ID"),
    FOREIGN KEY ("TasteID") REFERENCES "Tastes" ("ID")
);

INSERT INTO "Products" ("Name", "ImagePath", "CategoryID", "TasteID", "Expiration", "CreatedAt", "UpdatedAt")
VALUES (N'Рапсавы мёд К1', N'/static/images/products/product-1.jpg', 1, 6, N'2 гады пасля ўскрыцця', localtimestamp,
        localtimestamp),                                           -- ID: 1
       (N'Рапсавы мёд К2', N'/static/images/products/product-2.jpg', 1, 6, N'2 гады пасля ўскрыцця', localtimestamp,
        localtimestamp),                                           -- ID: 2
       (N'Набор “Трыплет”', N'/static/images/products/product-set-1.jpg', 3, 1, N'2 гады пасля ўскрыцця',
        localtimestamp, localtimestamp),
       (N'Пярга', N'/static/images/products/bee-pollen.jpg', 2, 4, N'1 год пасля ўскрыцця', localtimestamp,
        localtimestamp),
       (N'Ажынавы мёд', N'/static/images/products/blackberry-12oz.jpg', 1, 5, N'2 гады пасля ўскрыцця',
        localtimestamp, localtimestamp),
       (N'Лугавы мёд', N'/static/images/products/buckwheat-honey-16oz.jpg', 1, 4, N'2 гады пасля ўскрыцця',
        localtimestamp, localtimestamp),
       (N'Мёд з іван-чая', N'/static/images/products/fireweed-honey-12oz.jpg', 1, 4, N'2 гады пасля ўскрыцця',
        localtimestamp, localtimestamp),
       (N'Пальметто мёд', N'/static/images/products/palmetto-honey-12oz.jpg', 1, 3, N'2 гады пасля ўскрыцця',
        localtimestamp, localtimestamp),
       (N'Канюшынавы мёд', N'/static/images/products/pure-clover-honey-12oz.jpg', 1, 4, N'2 гады пасля ўскрыцця',
        localtimestamp, localtimestamp),
       (N'Журавінавы мёд', N'/static/images/products/pure-cranberry-honey-16oz.jpg', 1, 5, N'2 гады пасля ўскрыцця',
        localtimestamp, localtimestamp),
       (N'Малінавы мёд', N'/static/images/products/raspberry-honey-16oz.jpg', 1, 5, N'2 гады пасля ўскрыцця',
        localtimestamp, localtimestamp),
       (N'Грэчкавы мёд', N'/static/images/products/sage-honey-16oz.jpg', 1, 2, N'2 гады пасля ўскрыцця',
        localtimestamp, localtimestamp),
       (N'Мёд кіслы', N'/static/images/products/sourwood-honey-12oz.jpg', 1, 5, N'2 гады пасля ўскрыцця',
        localtimestamp, localtimestamp),
       (N'Праполіс "Навагодні"', N'/static/images/products/tasmanian-christmas-bush-honey.jpg', 2, 2,
        N'1 год пасля ўскрыцця', localtimestamp, localtimestamp),
       (N'Праполіс "Тасманскі"', N'/static/images/products/tasmanian-leatherwood-honey-w.jpg', 2, 3,
        N'1 год пасля ўскрыцця', localtimestamp, localtimestamp),
       (N'Тупело мёд', N'/static/images/products/tupelo-honey-12oz.jpg', 1, 3, N'2 гады пасля ўскрыцця',
        localtimestamp, localtimestamp),
       (N'Рапсавы мёд у сотах', N'/static/images/products/wildflower-honey-w-comb-1.jpg', 2, 6,
        N'2 гады пасля ўскрыцця', localtimestamp, localtimestamp), -- ID: 17
       (N'Шэсць пакетаў мёду', N'/static/images/products/honey-sampler-six-pack-1.jpg', 3, 1,
        N'2 гады пасля ўскрыцця', localtimestamp, localtimestamp),
       (N'Трыо аматараў гарачага мёду', N'/static/images/products/hot-honey-gift-set.jpg', 3, 1,
        N'2 гады пасля ўскрыцця', localtimestamp, localtimestamp),
       (N'Цёплы і ўтульны мядовы набор', N'/static/images/products/warm-cozy-honey-gift-set.jpg', 3, 1,
        N'2 гады пасля ўскрыцця', localtimestamp, localtimestamp);

/* ----------------- */

CREATE TABLE "Options"
(
    "ID"        BIGSERIAL PRIMARY KEY,    -- GORM default
    "ProductID" BIGINT      NOT NULL,
    "Name"      VARCHAR(64) NOT NULL,
    "Volume"    FLOAT       NOT NULL,
    "Price"     FLOAT       NOT NULL,
    "CreatedAt" TIMESTAMP WITH TIME ZONE, -- GORM default
    "UpdatedAt" TIMESTAMP WITH TIME ZONE, -- GORM default
    "DeletedAt" TIMESTAMP WITH TIME ZONE, -- GORM default
    FOREIGN KEY ("ProductID") REFERENCES "Products" ("ID")
);

INSERT INTO "Options" ("ProductID", "Name", "Volume", "Price", "CreatedAt", "UpdatedAt")
VALUES (1, N'100 мл', 100, 12.00, localtimestamp, localtimestamp),
       (1, N'350 мл', 350, 15.00, localtimestamp, localtimestamp),
       (1, N'500 мл', 500, 20.00, localtimestamp, localtimestamp),
       (2, N'450 мл', 450, 19.00, localtimestamp, localtimestamp),
       (2, N'650 мл', 650, 24.00, localtimestamp, localtimestamp),
       (3, N'3 банкі мёду + паштоўка', 800, 30.00, localtimestamp, localtimestamp),
       (4, N'100 мл', 100, 12.00, localtimestamp, localtimestamp),
       (4, N'350 мл', 350, 15.00, localtimestamp, localtimestamp),
       (4, N'500 мл', 500, 20.00, localtimestamp, localtimestamp),
       (5, N'450 мл', 450, 19.00, localtimestamp, localtimestamp),
       (5, N'650 мл', 650, 24.00, localtimestamp, localtimestamp),
       (6, N'100 мл', 100, 12.00, localtimestamp, localtimestamp),
       (6, N'350 мл', 350, 15.00, localtimestamp, localtimestamp),
       (6, N'500 мл', 500, 20.00, localtimestamp, localtimestamp),
       (7, N'450 мл', 450, 19.00, localtimestamp, localtimestamp),
       (7, N'650 мл', 650, 24.00, localtimestamp, localtimestamp),
       (8, N'100 мл', 100, 12.00, localtimestamp, localtimestamp),
       (8, N'350 мл', 350, 15.00, localtimestamp, localtimestamp),
       (8, N'500 мл', 500, 20.00, localtimestamp, localtimestamp),
       (9, N'100 мл', 100, 12.00, localtimestamp, localtimestamp),
       (9, N'350 мл', 350, 15.00, localtimestamp, localtimestamp),
       (9, N'500 мл', 500, 20.00, localtimestamp, localtimestamp),
       (10, N'450 мл', 450, 19.00, localtimestamp, localtimestamp),
       (10, N'650 мл', 650, 24.00, localtimestamp, localtimestamp),
       (11, N'450 мл', 450, 19.00, localtimestamp, localtimestamp),
       (11, N'650 мл', 650, 24.00, localtimestamp, localtimestamp),
       (12, N'450 мл', 450, 19.00, localtimestamp, localtimestamp),
       (12, N'650 мл', 650, 24.00, localtimestamp, localtimestamp),
       (13, N'100 мл', 100, 12.00, localtimestamp, localtimestamp),
       (13, N'350 мл', 350, 15.00, localtimestamp, localtimestamp),
       (13, N'500 мл', 500, 20.00, localtimestamp, localtimestamp),
       (14, N'450 мл', 450, 19.00, localtimestamp, localtimestamp),
       (14, N'650 мл', 650, 24.00, localtimestamp, localtimestamp),
       (15, N'450 мл', 450, 19.00, localtimestamp, localtimestamp),
       (15, N'650 мл', 650, 24.00, localtimestamp, localtimestamp),
       (16, N'450 мл', 450, 19.00, localtimestamp, localtimestamp),
       (16, N'650 мл', 650, 24.00, localtimestamp, localtimestamp),
       (17, N'450 мл', 450, 19.00, localtimestamp, localtimestamp), -- ID: 37
       (17, N'650 мл', 650, 24.00, localtimestamp, localtimestamp), -- ID: 38
       (18, N'6 слоік рознага мёду', 1800, 70.00, localtimestamp, localtimestamp),
       (19, N'3 слоікі вострага мёду', 850, 38.00, localtimestamp, localtimestamp),
       (20, N'3 слоікі рознага мёду', 850, 35.00, localtimestamp, localtimestamp);

/* ----------------- */

CREATE TABLE "Media"
(
    "ID"        BIGSERIAL PRIMARY KEY,    -- GORM default
    "ProductID" BIGINT NOT NULL,
    "Path"      TEXT   NOT NULL,
    "CreatedAt" TIMESTAMP WITH TIME ZONE, -- GORM default
    "UpdatedAt" TIMESTAMP WITH TIME ZONE, -- GORM default
    "DeletedAt" TIMESTAMP WITH TIME ZONE, -- GORM default
    FOREIGN KEY ("ProductID") REFERENCES "Products" ("ID")
);

INSERT INTO "Media" ("ProductID", "Path", "CreatedAt", "UpdatedAt")
VALUES (17, N'/static/images/media/comb-media-1.jpg', localtimestamp, localtimestamp),
       (17, N'/static/images/media/comb-media-2.jpg', localtimestamp, localtimestamp),
       (17, N'/static/images/media/comb-media-3.jpg', localtimestamp, localtimestamp),
       (17, N'/static/images/media/comb-media-4.jpg', localtimestamp, localtimestamp);

/* ----------------- */

CREATE TABLE "ShipmentMethods"
(
    "ID"        BIGSERIAL PRIMARY KEY,    -- GORM default
    "Name"      VARCHAR(64) NOT NULL,
    "CreatedAt" TIMESTAMP WITH TIME ZONE, -- GORM default
    "UpdatedAt" TIMESTAMP WITH TIME ZONE, -- GORM default
    "DeletedAt" TIMESTAMP WITH TIME ZONE  -- GORM default
);

INSERT INTO "ShipmentMethods" ("Name", "CreatedAt", "UpdatedAt")
VALUES (N'Поштай па Беларусі', localtimestamp, localtimestamp),
       (N'Кур’ерам па Мінску', localtimestamp, localtimestamp),
       (N'Хуткая дастаўка (1-2 дні)', localtimestamp, localtimestamp);

/* ----------------- */

CREATE TABLE "Products_ShipmentMethods"
(
    "ID"               BIGSERIAL PRIMARY KEY,    -- GORM default
    "ProductID"        BIGINT NOT NULL,
    "ShipmentMethodID" BIGINT NOT NULL,
    "CreatedAt"        TIMESTAMP WITH TIME ZONE, -- GORM default
    "UpdatedAt"        TIMESTAMP WITH TIME ZONE, -- GORM default
    "DeletedAt"        TIMESTAMP WITH TIME ZONE, -- GORM default
    FOREIGN KEY ("ProductID") REFERENCES "Products" ("ID"),
    FOREIGN KEY ("ShipmentMethodID") REFERENCES "ShipmentMethods" ("ID")
);

INSERT INTO "Products_ShipmentMethods" ("ProductID", "ShipmentMethodID", "CreatedAt", "UpdatedAt")
VALUES (1, 1, localtimestamp, localtimestamp),
       (1, 2, localtimestamp, localtimestamp),
       (1, 3, localtimestamp, localtimestamp),
       (2, 1, localtimestamp, localtimestamp),
       (2, 2, localtimestamp, localtimestamp),
       (2, 3, localtimestamp, localtimestamp),
       (3, 1, localtimestamp, localtimestamp),
       (3, 2, localtimestamp, localtimestamp),
       (4, 1, localtimestamp, localtimestamp),
       (4, 2, localtimestamp, localtimestamp),
       (4, 3, localtimestamp, localtimestamp),
       (5, 1, localtimestamp, localtimestamp),
       (5, 2, localtimestamp, localtimestamp),
       (5, 3, localtimestamp, localtimestamp),
       (6, 1, localtimestamp, localtimestamp),
       (6, 2, localtimestamp, localtimestamp),
       (6, 3, localtimestamp, localtimestamp),
       (7, 1, localtimestamp, localtimestamp),
       (8, 1, localtimestamp, localtimestamp),
       (8, 2, localtimestamp, localtimestamp),
       (9, 1, localtimestamp, localtimestamp),
       (9, 2, localtimestamp, localtimestamp),
       (9, 3, localtimestamp, localtimestamp),
       (10, 1, localtimestamp, localtimestamp),
       (11, 1, localtimestamp, localtimestamp),
       (11, 2, localtimestamp, localtimestamp),
       (11, 3, localtimestamp, localtimestamp),
       (12, 1, localtimestamp, localtimestamp),
       (12, 2, localtimestamp, localtimestamp),
       (12, 3, localtimestamp, localtimestamp),
       (13, 1, localtimestamp, localtimestamp),
       (13, 2, localtimestamp, localtimestamp),
       (13, 3, localtimestamp, localtimestamp),
       (14, 1, localtimestamp, localtimestamp),
       (14, 2, localtimestamp, localtimestamp),
       (15, 1, localtimestamp, localtimestamp),
       (15, 2, localtimestamp, localtimestamp),
       (15, 3, localtimestamp, localtimestamp),
       (16, 1, localtimestamp, localtimestamp),
       (16, 2, localtimestamp, localtimestamp),
       (17, 1, localtimestamp, localtimestamp),
       (17, 2, localtimestamp, localtimestamp),
       (18, 1, localtimestamp, localtimestamp),
       (18, 2, localtimestamp, localtimestamp),
       (19, 1, localtimestamp, localtimestamp),
       (19, 2, localtimestamp, localtimestamp),
       (20, 1, localtimestamp, localtimestamp),
       (20, 2, localtimestamp, localtimestamp);

/* ----------------- */

CREATE TABLE "Shops"
(
    "ID"             BIGSERIAL PRIMARY KEY,    -- GORM default
    "Name"           VARCHAR(64)  NOT NULL,
    "Address"        VARCHAR(256) NOT NULL,
    "OpeningHours"   VARCHAR(32)  NOT NULL,
    "Phone"          VARCHAR(20)  NOT NULL,
    "StorageAddress" VARCHAR(256) NOT NULL,
    "CreatedAt"      TIMESTAMP WITH TIME ZONE, -- GORM default
    "UpdatedAt"      TIMESTAMP WITH TIME ZONE, -- GORM default
    "DeletedAt"      TIMESTAMP WITH TIME ZONE  -- GORM default
);

INSERT INTO "Shops" ("Name", "Address", "OpeningHours", "Phone", "StorageAddress", "CreatedAt", "UpdatedAt")
VALUES (N'Крама на Савецкай 23',
        N'г. Мінск, вул. Савецкая, 23',
        N'10:00 - 21:00', N'+375 (29) 118-06-35',
        N'г. Мінск, вул. Жукоўскага, 2', localtimestamp, localtimestamp);

/* ----------------- */

CREATE TABLE "Shops_Options"
(
    "ID"        BIGSERIAL PRIMARY KEY,    -- GORM default
    "ShopID"    BIGINT NOT NULL,
    "OptionID"  BIGINT NOT NULL,
    "InStock"   INT    NOT NULL,
    "InStorage" INT    NOT NULL,
    "CreatedAt" TIMESTAMP WITH TIME ZONE, -- GORM default
    "UpdatedAt" TIMESTAMP WITH TIME ZONE, -- GORM default
    "DeletedAt" TIMESTAMP WITH TIME ZONE, -- GORM default
    FOREIGN KEY ("ShopID") REFERENCES "Shops" ("ID"),
    FOREIGN KEY ("OptionID") REFERENCES "Options" ("ID")
);

INSERT INTO "Shops_Options" ("ShopID", "OptionID", "InStock", "InStorage", "CreatedAt", "UpdatedAt")
VALUES (1, 1, 30, 12, localtimestamp, localtimestamp),
       (1, 2, 24, 0, localtimestamp, localtimestamp),
       (1, 3, 32, 4, localtimestamp, localtimestamp),
       (1, 4, 18, 2, localtimestamp, localtimestamp),
       (1, 5, 27, 33, localtimestamp, localtimestamp),
       (1, 6, 2, 13, localtimestamp, localtimestamp),
       (1, 7, 42, 40, localtimestamp, localtimestamp),
       (1, 8, 0, 0, localtimestamp, localtimestamp),
       (1, 9, 5, 25, localtimestamp, localtimestamp),
       (1, 10, 23, 52, localtimestamp, localtimestamp),
       (1, 11, 14, 0, localtimestamp, localtimestamp),
       (1, 12, 22, 31, localtimestamp, localtimestamp),
       (1, 13, 42, 55, localtimestamp, localtimestamp),
       (1, 14, 0, 14, localtimestamp, localtimestamp),
       (1, 15, 18, 17, localtimestamp, localtimestamp),
       (1, 16, 15, 46, localtimestamp, localtimestamp),
       (1, 17, 32, 0, localtimestamp, localtimestamp),
       (1, 18, 37, 57, localtimestamp, localtimestamp),
       (1, 19, 23, 51, localtimestamp, localtimestamp),
       (1, 20, 21, 10, localtimestamp, localtimestamp),
       (1, 21, 0, 47, localtimestamp, localtimestamp),
       (1, 22, 40, 20, localtimestamp, localtimestamp),
       (1, 23, 0, 0, localtimestamp, localtimestamp),
       (1, 24, 21, 5, localtimestamp, localtimestamp),
       (1, 25, 18, 3, localtimestamp, localtimestamp),
       (1, 26, 13, 8, localtimestamp, localtimestamp),
       (1, 27, 7, 0, localtimestamp, localtimestamp),
       (1, 28, 0, 30, localtimestamp, localtimestamp),
       (1, 29, 37, 27, localtimestamp, localtimestamp),
       (1, 30, 8, 16, localtimestamp, localtimestamp),
       (1, 31, 0, 0, localtimestamp, localtimestamp),
       (1, 32, 7, 0, localtimestamp, localtimestamp),
       (1, 33, 39, 23, localtimestamp, localtimestamp),
       (1, 34, 27, 33, localtimestamp, localtimestamp),
       (1, 35, 14, 6, localtimestamp, localtimestamp),
       (1, 36, 6, 28, localtimestamp, localtimestamp),
       (1, 37, 4, 18, localtimestamp, localtimestamp),
       (1, 38, 39, 0, localtimestamp, localtimestamp),
       (1, 39, 0, 17, localtimestamp, localtimestamp),
       (1, 40, 5, 0, localtimestamp, localtimestamp),
       (1, 41, 5, 32, localtimestamp, localtimestamp),
       (1, 42, 18, 38, localtimestamp, localtimestamp);

/* ----------------- */

CREATE TABLE "PromoCodes"
(
    "ID"        BIGSERIAL PRIMARY KEY,    -- GORM default
    "Name"      VARCHAR(16) UNIQUE NOT NULL,
    "CreatedAt" TIMESTAMP WITH TIME ZONE, -- GORM default
    "UpdatedAt" TIMESTAMP WITH TIME ZONE, -- GORM default
    "DeletedAt" TIMESTAMP WITH TIME ZONE  -- GORM default
);

INSERT INTO "PromoCodes" ("Name", "CreatedAt", "UpdatedAt")
VALUES (N'CRAZYBEE', localtimestamp, localtimestamp);

/* ----------------- */

CREATE TABLE "Orders"
(
    "ID"               BIGSERIAL PRIMARY KEY,    -- GORM default
    "CustomerName"     VARCHAR(64)  NOT NULL,
    "Email"            email        NOT NULL,
    "Phone"            VARCHAR(20)  NOT NULL,
    "PaymentNumber"    UUID UNIQUE DEFAULT gen_random_uuid(),
    "PaymentDate"      TIMESTAMP WITH TIME ZONE,
    "Address"          VARCHAR(256) NOT NULL,
    "Comment"          VARCHAR(500) NOT NULL,
    "PromoCode"        VARCHAR(16) DEFAULT NULL,
    "ShipmentMethodID" BIGINT       NOT NULL,
    "DeliveryDate"     TIMESTAMP WITH TIME ZONE,
    "CreatedAt"        TIMESTAMP WITH TIME ZONE, -- GORM default
    "UpdatedAt"        TIMESTAMP WITH TIME ZONE, -- GORM default
    "DeletedAt"        TIMESTAMP WITH TIME ZONE, -- GORM default
    FOREIGN KEY ("ShipmentMethodID") REFERENCES "ShipmentMethods" ("ID")
);

INSERT INTO "Orders" ("CustomerName", "Email", "Phone", "PaymentNumber",
                      "PaymentDate", "Address", "Comment",
                      "ShipmentMethodID", "DeliveryDate", "CreatedAt", "UpdatedAt")
VALUES (N'Gziegoz Bzezdzeszczukevicz', N'gzbze@gmail.com', N'+375(11)72-72-372', gen_random_uuid(),
        localtimestamp, N'g. Maladzieczna, vul. Vilienskaja, d. 19g', N'Liepszy mied va usim sviecie!',
        1, localtimestamp, localtimestamp, localtimestamp);

/* ----------------- */

CREATE TABLE "Order_Options"
(
    "ID"        BIGSERIAL PRIMARY KEY,    -- GORM default
    "OrderID"   BIGINT NOT NULL,
    "OptionID"  BIGINT NOT NULL,
    "Quantity"  INT    NOT NULL,
    "CreatedAt" TIMESTAMP WITH TIME ZONE, -- GORM default
    "UpdatedAt" TIMESTAMP WITH TIME ZONE, -- GORM default
    "DeletedAt" TIMESTAMP WITH TIME ZONE, -- GORM default
    FOREIGN KEY ("OrderID") REFERENCES "Orders" ("ID"),
    FOREIGN KEY ("OptionID") REFERENCES "Options" ("ID")
);

INSERT INTO "Order_Options" ("OrderID", "OptionID", "Quantity", "CreatedAt", "UpdatedAt")
VALUES (1, 38, 5, localtimestamp, localtimestamp),
       (1, 39, 3, localtimestamp, localtimestamp),
       (1, 2, 13, localtimestamp, localtimestamp),
       (1, 4, 11, localtimestamp, localtimestamp);

/* ----------------- */

CREATE TABLE "Reviews"
(
    "ID"         BIGSERIAL PRIMARY KEY,    -- GORM default
    "ProductID"  BIGINT       NOT NULL,
    "OrderID"    BIGINT       NOT NULL,
    "AuthorName" VARCHAR(64)  NOT NULL,
    "BuyDate"    DATE         NOT NULL,
    "Rating"     SMALLINT     NOT NULL,
    "Comment"    VARCHAR(500) NOT NULL,
    "CreatedAt"  TIMESTAMP WITH TIME ZONE, -- GORM default
    "UpdatedAt"  TIMESTAMP WITH TIME ZONE, -- GORM default
    "DeletedAt"  TIMESTAMP WITH TIME ZONE, -- GORM default
    FOREIGN KEY ("ProductID") REFERENCES "Products" ("ID"),
    FOREIGN KEY ("OrderID") REFERENCES "Orders" ("ID")
);

INSERT INTO "Reviews" ("ProductID", "OrderID", "AuthorName", "BuyDate", "Rating", "Comment")
VALUES (1, 1, N'Валянцін', to_date('24.05.2023', 'DD.MM.YYYY'), 5,
        N'Раней я аддаваў перавагу Tupelo Honey, а не Sourwood, пакуль не атрымаў бутэльку вашага Sourwood Honey на Каляды. Мёд з кіслага дрэва заўсёды добры, але ваш быў абсалютна лепшым мёдам, які я калі-небудзь спрабаваў. Калі я не ем лыжкай, я больш за ўсё люблю на чарнічных аладках.'),
       (2, 1, N'Валянцін', to_date('24.05.2023', 'DD.MM.YYYY'), 5,
        N'Раней я аддаваў перавагу Tupelo Honey, а не Sourwood, пакуль не атрымаў бутэльку вашага Sourwood Honey на Каляды. Мёд з кіслага дрэва заўсёды добры, але ваш быў абсалютна лепшым мёдам, які я калі-небудзь спрабаваў. Калі я не ем лыжкай, я больш за ўсё люблю на чарнічных аладках.'),
       (17, 1, N'Валянцін', to_date('24.05.2023', 'DD.MM.YYYY'), 5,
        N'Раней я аддаваў перавагу Tupelo Honey, а не Sourwood, пакуль не атрымаў бутэльку вашага Sourwood Honey на Каляды. Мёд з кіслага дрэва заўсёды добры, але ваш быў абсалютна лепшым мёдам, які я калі-небудзь спрабаваў. Калі я не ем лыжкай, я больш за ўсё люблю на чарнічных аладках.');

/* ----------------- */

CREATE TABLE "Suggestions"
(
    "ID"        BIGSERIAL PRIMARY KEY,    -- GORM default
    "ProductID" BIGINT NOT NULL,
    "Notes"     TEXT   NOT NULL,
    "CreatedAt" TIMESTAMP WITH TIME ZONE, -- GORM default
    "UpdatedAt" TIMESTAMP WITH TIME ZONE, -- GORM default
    "DeletedAt" TIMESTAMP WITH TIME ZONE, -- GORM default
    FOREIGN KEY ("ProductID") REFERENCES "Products" ("ID")
);

INSERT INTO "Suggestions" ("ProductID", "Notes", "CreatedAt", "UpdatedAt")
VALUES (1, N'Найлепшая прапанова', localtimestamp, localtimestamp),
       (2, N'Найлепшая прапанова', localtimestamp, localtimestamp),
       (3, N'Найлепшая прапанова', localtimestamp, localtimestamp);