\connect miadok_db;

/* -------------- */
BEGIN;

CREATE EXTENSION citext;
CREATE DOMAIN email AS citext
    CHECK ( value ~
            '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$' );

/* ----------------- */

CREATE TABLE Categories
(
    ID        BIGSERIAL PRIMARY KEY,    -- GORM default
    Name      VARCHAR(64) NOT NULL,
    Created_At TIMESTAMP WITH TIME ZONE, -- GORM default
    Updated_At TIMESTAMP WITH TIME ZONE, -- GORM default
    Deleted_At TIMESTAMP WITH TIME ZONE  -- GORM default
);

INSERT INTO Categories (Name, Created_At, Updated_At)
VALUES (N'Класічны мёд', localtimestamp, localtimestamp),
       (N'Мёд у сотах', localtimestamp, localtimestamp),
       (N'Наборы', localtimestamp, localtimestamp),
       (N'Іншыя прадукты', localtimestamp, localtimestamp);

/* ----------------- */

CREATE TABLE Tastes
(
    ID          BIGSERIAL PRIMARY KEY,    -- GORM default
    Name        VARCHAR(64)  NOT NULL,
    Description VARCHAR(256) NOT NULL,
    Created_At   TIMESTAMP WITH TIME ZONE, -- GORM default
    Updated_At   TIMESTAMP WITH TIME ZONE, -- GORM default
    Deleted_At   TIMESTAMP WITH TIME ZONE  -- GORM default
);

INSERT INTO Tastes (Name, Description, Created_At, Updated_At)
VALUES (N'Не вызначана', N'Не вызначана або нельга з''есці', localtimestamp, localtimestamp),
       (N'Грэчкавы', N'Нейтральны, з лёгкай вастрынкай', localtimestamp, localtimestamp),
       (N'Ліпавы', N'Востра-салодкі', localtimestamp, localtimestamp),
       (N'Лугавы', N'Лёгкі салодкі', localtimestamp, localtimestamp),
       (N'Лясны', N'Салодкі, трошачку з кісласцю', localtimestamp, localtimestamp),
       (N'Рапсавы', N'Салодкі, з лёгкай гарчынкай у канцы', localtimestamp, localtimestamp);

/* ----------------- */

CREATE TABLE Products
(
    ID         BIGSERIAL PRIMARY KEY,    -- GORM default
    Category_ID BIGINT       NOT NULL,
    Taste_ID    BIGINT       NOT NULL,
    Name       VARCHAR(64)  NOT NULL,
    Image_Path  TEXT         NOT NULL,
    Expiration VARCHAR(256) NOT NULL,
    Created_At  TIMESTAMP WITH TIME ZONE, -- GORM default
    Updated_At  TIMESTAMP WITH TIME ZONE, -- GORM default
    Deleted_At  TIMESTAMP WITH TIME ZONE, -- GORM default
    FOREIGN KEY (Category_ID) REFERENCES Categories (ID),
    FOREIGN KEY (Taste_ID) REFERENCES Tastes (ID)
);

INSERT INTO Products (Name, Image_Path, Category_ID, Taste_ID, Expiration, Created_At, Updated_At)
VALUES (N'Рапсавы мёд К1', N'/static/images/products/product-1.jpg', 1, 6, N'2 гады пасля ўскрыцця',
        localtimestamp + (1 * interval '1 minute'), localtimestamp + (1 * interval '1 minute')),         -- ID: 1
       (N'Рапсавы мёд К2', N'/static/images/products/product-2.jpg', 1, 6, N'2 гады пасля ўскрыцця',
        localtimestamp + (2 * interval '1 minute'), localtimestamp + (2 * interval '1 minute')),         -- ID: 2
       (N'Набор “Трыплет”', N'/static/images/products/product-set-1.jpg', 3, 1, N'2 гады пасля ўскрыцця',
        localtimestamp + (3 * interval '1 minute'), localtimestamp + (3 * interval '1 minute')),
       (N'Пярга', N'/static/images/products/bee-pollen.jpg', 2, 4, N'1 год пасля ўскрыцця',
        localtimestamp + (4 * interval '1 minute'), localtimestamp + (4 * interval '1 minute')),
       (N'Ажынавы мёд', N'/static/images/products/blackberry-12oz.jpg', 1, 5, N'2 гады пасля ўскрыцця',
        localtimestamp + (5 * interval '1 minute'), localtimestamp + (5 * interval '1 minute')),
       (N'Лугавы мёд', N'/static/images/products/buckwheat-honey-16oz.jpg', 1, 4, N'2 гады пасля ўскрыцця',
        localtimestamp + (6 * interval '1 minute'), localtimestamp + (6 * interval '1 minute')),
       (N'Мёд з іван-чая', N'/static/images/products/fireweed-honey-12oz.jpg', 1, 4, N'2 гады пасля ўскрыцця',
        localtimestamp + (7 * interval '1 minute'), localtimestamp + (7 * interval '1 minute')),
       (N'Пальметто мёд', N'/static/images/products/palmetto-honey-12oz.jpg', 1, 3, N'2 гады пасля ўскрыцця',
        localtimestamp + (8 * interval '1 minute'), localtimestamp + (8 * interval '1 minute')),
       (N'Канюшынавы мёд', N'/static/images/products/pure-clover-honey-12oz.jpg', 1, 4, N'2 гады пасля ўскрыцця',
        localtimestamp + (9 * interval '1 minute'), localtimestamp + (9 * interval '1 minute')),
       (N'Журавінавы мёд', N'/static/images/products/pure-cranberry-honey-16oz.jpg', 1, 5, N'2 гады пасля ўскрыцця',
        localtimestamp + (10 * interval '1 minute'), localtimestamp + (10 * interval '1 minute')),
       (N'Малінавы мёд', N'/static/images/products/raspberry-honey-16oz.jpg', 1, 5, N'2 гады пасля ўскрыцця',
        localtimestamp + (11 * interval '1 minute'), localtimestamp + (11 * interval '1 minute')),
       (N'Грэчкавы мёд', N'/static/images/products/sage-honey-16oz.jpg', 1, 2, N'2 гады пасля ўскрыцця',
        localtimestamp + (12 * interval '1 minute'), localtimestamp + (12 * interval '1 minute')),
       (N'Мёд кіслы', N'/static/images/products/sourwood-honey-12oz.jpg', 1, 5, N'2 гады пасля ўскрыцця',
        localtimestamp + (13 * interval '1 minute'), localtimestamp + (13 * interval '1 minute')),
       (N'Праполіс Навагодні', N'/static/images/products/tasmanian-christmas-bush-honey.jpg', 2, 2, N'1 год пасля ўскрыцця',
        localtimestamp + (14 * interval '1 minute'), localtimestamp + (14 * interval '1 minute')),
       (N'Праполіс Тасманскі', N'/static/images/products/tasmanian-leatherwood-honey-w.jpg', 2, 3, N'1 год пасля ўскрыцця',
        localtimestamp + (15 * interval '1 minute'), localtimestamp + (15 * interval '1 minute')),
       (N'Тупело мёд', N'/static/images/products/tupelo-honey-12oz.jpg', 1, 3, N'2 гады пасля ўскрыцця',
        localtimestamp + (16 * interval '1 minute'), localtimestamp + (16 * interval '1 minute')),
       (N'Рапсавы мёд у сотах', N'/static/images/products/wildflower-honey-w-comb-1.jpg', 2, 6, N'2 гады пасля ўскрыцця',
        localtimestamp + (17 * interval '1 minute'), localtimestamp + (17 * interval '1 minute')), -- ID: 17
       (N'Шэсць пакетаў мёду', N'/static/images/products/honey-sampler-six-pack-1.jpg', 3, 1, N'2 гады пасля ўскрыцця',
        localtimestamp + (18 * interval '1 minute'), localtimestamp + (18 * interval '1 minute')),
       (N'Трыо аматараў гарачага мёду', N'/static/images/products/hot-honey-gift-set.jpg', 3, 1, N'2 гады пасля ўскрыцця',
        localtimestamp + (19 * interval '1 minute'), localtimestamp + (19 * interval '1 minute')),
       (N'Цёплы і ўтульны мядовы набор', N'/static/images/products/warm-cozy-honey-gift-set.jpg', 3, 1, N'2 гады пасля ўскрыцця',
        localtimestamp + (20 * interval '1 minute'), localtimestamp + (20 * interval '1 minute'));

/* ----------------- */

CREATE TABLE Options
(
    ID        BIGSERIAL PRIMARY KEY,    -- GORM default
    Product_ID BIGINT      NOT NULL,
    Name      VARCHAR(64) NOT NULL,
    Volume    FLOAT       NOT NULL,
    Price     FLOAT       NOT NULL,
    Created_At TIMESTAMP WITH TIME ZONE, -- GORM default
    Updated_At TIMESTAMP WITH TIME ZONE, -- GORM default
    Deleted_At TIMESTAMP WITH TIME ZONE, -- GORM default
    FOREIGN KEY (Product_ID) REFERENCES Products (ID)
);

INSERT INTO Options (Product_ID, Name, Volume, Price, Created_At, Updated_At)
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

CREATE TABLE Media
(
    ID        BIGSERIAL PRIMARY KEY,    -- GORM default
    Product_ID BIGINT NOT NULL,
    Path      TEXT   NOT NULL,
    Created_At TIMESTAMP WITH TIME ZONE, -- GORM default
    Updated_At TIMESTAMP WITH TIME ZONE, -- GORM default
    Deleted_At TIMESTAMP WITH TIME ZONE, -- GORM default
    FOREIGN KEY (Product_ID) REFERENCES Products (ID)
);

INSERT INTO Media (Product_ID, Path, Created_At, Updated_At)
VALUES (17, N'/static/images/media/comb-media-1.jpg', localtimestamp, localtimestamp),
       (17, N'/static/images/media/comb-media-2.jpg', localtimestamp, localtimestamp),
       (17, N'/static/images/media/comb-media-3.jpg', localtimestamp, localtimestamp),
       (17, N'/static/images/media/comb-media-4.jpg', localtimestamp, localtimestamp);

/* ----------------- */

CREATE TABLE Shipment_Methods
(
    ID        BIGSERIAL PRIMARY KEY,    -- GORM default
    Name      VARCHAR(64) NOT NULL,
    Created_At TIMESTAMP WITH TIME ZONE, -- GORM default
    Updated_At TIMESTAMP WITH TIME ZONE, -- GORM default
    Deleted_At TIMESTAMP WITH TIME ZONE  -- GORM default
);

INSERT INTO Shipment_Methods (Name, Created_At, Updated_At)
VALUES (N'Поштай па Беларусі', localtimestamp, localtimestamp),
       (N'Кур’ерам па Мінску', localtimestamp, localtimestamp),
       (N'Хуткая дастаўка (1-2 дні)', localtimestamp, localtimestamp);

/* ----------------- */

CREATE TABLE Products_Shipment_Methods
(
    ID               BIGSERIAL PRIMARY KEY,    -- GORM default
    Product_ID        BIGINT NOT NULL,
    Shipment_Method_ID BIGINT NOT NULL,
    Created_At        TIMESTAMP WITH TIME ZONE, -- GORM default
    Updated_At        TIMESTAMP WITH TIME ZONE, -- GORM default
    Deleted_At        TIMESTAMP WITH TIME ZONE, -- GORM default
    FOREIGN KEY (Product_ID) REFERENCES Products (ID),
    FOREIGN KEY (Shipment_Method_ID) REFERENCES Shipment_Methods (ID)
);

INSERT INTO Products_Shipment_Methods (Product_ID, Shipment_Method_ID, Created_At, Updated_At)
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

CREATE TABLE Shops
(
    ID             BIGSERIAL PRIMARY KEY,    -- GORM default
    Name           VARCHAR(64)  NOT NULL,
    Address        VARCHAR(256) NOT NULL,
    Opening_Hours   VARCHAR(32)  NOT NULL,
    Phone          VARCHAR(20)  NOT NULL,
    Storage_Address VARCHAR(256) NOT NULL,
    Created_At      TIMESTAMP WITH TIME ZONE, -- GORM default
    Updated_At      TIMESTAMP WITH TIME ZONE, -- GORM default
    Deleted_At      TIMESTAMP WITH TIME ZONE  -- GORM default
);

INSERT INTO Shops (Name, Address, Opening_Hours, Phone, Storage_Address, Created_At, Updated_At)
VALUES (N'Крама на Савецкай 23',
        N'г. Мінск, вул. Савецкая, 23',
        N'10:00 - 21:00', N'+375 (29) 118-06-35',
        N'г. Мінск, вул. Жукоўскага, 2', localtimestamp, localtimestamp);

/* ----------------- */

CREATE TABLE Shops_Options
(
    ID        BIGSERIAL PRIMARY KEY,    -- GORM default
    Shop_ID    BIGINT NOT NULL,
    Option_ID  BIGINT NOT NULL,
    In_Stock   INT    NOT NULL,
    In_Storage INT    NOT NULL,
    Created_At TIMESTAMP WITH TIME ZONE, -- GORM default
    Updated_At TIMESTAMP WITH TIME ZONE, -- GORM default
    Deleted_At TIMESTAMP WITH TIME ZONE, -- GORM default
    FOREIGN KEY (Shop_ID) REFERENCES Shops (ID),
    FOREIGN KEY (Option_ID) REFERENCES Options (ID)
);

INSERT INTO Shops_Options (Shop_ID, Option_ID, In_Stock, In_Storage, Created_At, Updated_At)
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

CREATE TABLE Promo_Codes
(
    ID        BIGSERIAL PRIMARY KEY,    -- GORM default
    Name      VARCHAR(16) UNIQUE NOT NULL,
    Created_At TIMESTAMP WITH TIME ZONE, -- GORM default
    Updated_At TIMESTAMP WITH TIME ZONE, -- GORM default
    Deleted_At TIMESTAMP WITH TIME ZONE  -- GORM default
);

INSERT INTO Promo_Codes (Name, Created_At, Updated_At)
VALUES (N'CRAZYBEE', localtimestamp, localtimestamp);

/* ----------------- */

CREATE TABLE Orders
(
    ID               BIGSERIAL PRIMARY KEY,    -- GORM default
    Customer_Name     VARCHAR(64)  NOT NULL,
    Email            email        NOT NULL,
    Phone            VARCHAR(20)  NOT NULL,
    Payment_Number    UUID UNIQUE DEFAULT gen_random_uuid(),
    Payment_Date      TIMESTAMP WITH TIME ZONE,
    Address          VARCHAR(256) NOT NULL,
    Comment          VARCHAR(500) NOT NULL,
    Promo_Code        VARCHAR(16) DEFAULT NULL,
    Shipment_Method_ID BIGINT       NOT NULL,
    Delivery_Date     TIMESTAMP WITH TIME ZONE,
    Created_At        TIMESTAMP WITH TIME ZONE, -- GORM default
    Updated_At        TIMESTAMP WITH TIME ZONE, -- GORM default
    Deleted_At        TIMESTAMP WITH TIME ZONE, -- GORM default
    FOREIGN KEY (Shipment_Method_ID) REFERENCES Shipment_Methods (ID)
);

INSERT INTO Orders (Customer_Name, Email, Phone, Payment_Number,
                      Payment_Date, Address, Comment,
                      Shipment_Method_ID, Delivery_Date, Created_At, Updated_At)
VALUES (N'Gziegoz Bzezdzeszczukevicz', N'gzbze@gmail.com', N'+375(11)72-72-372', gen_random_uuid(),
        localtimestamp, N'g. Maladzieczna, vul. Vilienskaja, d. 19g', N'Liepszy mied va usim sviecie!',
        1, localtimestamp, localtimestamp, localtimestamp);

/* ----------------- */

CREATE TABLE Orders_Options
(
    ID        BIGSERIAL PRIMARY KEY,    -- GORM default
    Order_ID   BIGINT NOT NULL,
    Option_ID  BIGINT NOT NULL,
    Quantity  INT    NOT NULL,
    Created_At TIMESTAMP WITH TIME ZONE, -- GORM default
    Updated_At TIMESTAMP WITH TIME ZONE, -- GORM default
    Deleted_At TIMESTAMP WITH TIME ZONE, -- GORM default
    FOREIGN KEY (Order_ID) REFERENCES Orders (ID),
    FOREIGN KEY (Option_ID) REFERENCES Options (ID)
);

INSERT INTO Orders_Options (Order_ID, Option_ID, Quantity, Created_At, Updated_At)
VALUES (1, 38, 5, localtimestamp, localtimestamp),
       (1, 39, 3, localtimestamp, localtimestamp),
       (1, 2, 13, localtimestamp, localtimestamp),
       (1, 4, 11, localtimestamp, localtimestamp);

/* ----------------- */

CREATE TABLE Reviews
(
    ID         BIGSERIAL PRIMARY KEY,    -- GORM default
    Product_ID  BIGINT       NOT NULL,
    Order_ID    BIGINT       NOT NULL,
    Author_Name VARCHAR(64)  NOT NULL,
    Buy_Date    DATE         NOT NULL,
    Rating     SMALLINT     NOT NULL,
    Comment    VARCHAR(500) NOT NULL,
    Created_At  TIMESTAMP WITH TIME ZONE, -- GORM default
    Updated_At  TIMESTAMP WITH TIME ZONE, -- GORM default
    Deleted_At  TIMESTAMP WITH TIME ZONE, -- GORM default
    FOREIGN KEY (Product_ID) REFERENCES Products (ID),
    FOREIGN KEY (Order_ID) REFERENCES Orders (ID)
);

INSERT INTO Reviews (Product_ID, Order_ID, Author_Name, Buy_Date, Rating, Comment)
VALUES (1, 1, N'Валянцін', to_date('24.05.2023', 'DD.MM.YYYY'), 5,
        N'Раней я аддаваў перавагу Tupelo Honey, а не Sourwood, пакуль не атрымаў бутэльку вашага Sourwood Honey на Каляды. Мёд з кіслага дрэва заўсёды добры, але ваш быў абсалютна лепшым мёдам, які я калі-небудзь спрабаваў. Калі я не ем лыжкай, я больш за ўсё люблю на чарнічных аладках.'),
       (2, 1, N'Валянцін', to_date('24.05.2023', 'DD.MM.YYYY'), 5,
        N'Раней я аддаваў перавагу Tupelo Honey, а не Sourwood, пакуль не атрымаў бутэльку вашага Sourwood Honey на Каляды. Мёд з кіслага дрэва заўсёды добры, але ваш быў абсалютна лепшым мёдам, які я калі-небудзь спрабаваў. Калі я не ем лыжкай, я больш за ўсё люблю на чарнічных аладках.'),
       (17, 1, N'Валянцін', to_date('24.05.2023', 'DD.MM.YYYY'), 5,
        N'Раней я аддаваў перавагу Tupelo Honey, а не Sourwood, пакуль не атрымаў бутэльку вашага Sourwood Honey на Каляды. Мёд з кіслага дрэва заўсёды добры, але ваш быў абсалютна лепшым мёдам, які я калі-небудзь спрабаваў. Калі я не ем лыжкай, я больш за ўсё люблю на чарнічных аладках.');

/* ----------------- */

CREATE TABLE Suggestions
(
    ID        BIGSERIAL PRIMARY KEY,    -- GORM default
    Product_ID BIGINT NOT NULL,
    Notes     TEXT   NOT NULL,
    Created_At TIMESTAMP WITH TIME ZONE, -- GORM default
    Updated_At TIMESTAMP WITH TIME ZONE, -- GORM default
    Deleted_At TIMESTAMP WITH TIME ZONE, -- GORM default
    FOREIGN KEY (Product_ID) REFERENCES Products (ID)
);

INSERT INTO Suggestions (Product_ID, Notes, Created_At, Updated_At)
VALUES (1, N'Найлепшая прапанова', localtimestamp, localtimestamp),
       (2, N'Найлепшая прапанова', localtimestamp, localtimestamp),
       (3, N'Найлепшая прапанова', localtimestamp, localtimestamp);

COMMIT;