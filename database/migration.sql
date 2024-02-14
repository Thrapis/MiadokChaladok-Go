CREATE TABLE Products (
  Id BIGINT AUTO_INCREMENT,
  Name VARCHAR(64) NOT NULL,
  ImagePath TEXT NOT NULL,
  PRIMARY KEY (Id)
);

INSERT INTO
  Products (Name, ImagePath)
VALUES
  (
    N'Рапсавы мёд 1',
    N'/static/images/products/product-1.jpg'
  ),
  (
    N'Рапсавы мёд 2',
    N'/static/images/products/product-2.jpg'
  ),
  (
    N'Набор “Трыплет”',
    N'/static/images/products/product-set-1.jpg'
  ),
  (
    N'Пярга',
    N'/static/images/products/bee-pollen.jpg'
  ),
  (
    N'Ажынавы мёд',
    N'/static/images/products/blackberry-12oz.jpg'
  ),
  (
    N'Лугавы мёд',
    N'/static/images/products/buckwheat-honey-16oz.jpg'
  ),
  (
    N'Мёд з іван-чая',
    N'/static/images/products/fireweed-honey-12oz.jpg'
  ),
  (
    N'Пальметто мёд',
    N'/static/images/products/palmetto-honey-12oz.jpg'
  ),
  (
    N'Канюшынавы мёд',
    N'/static/images/products/pure-clover-honey-12oz.jpg'
  ),
  (
    N'Журавінавы мёд',
    N'/static/images/products/pure-cranberry-honey-16oz.jpg'
  ),
  (
    N'Малінавы мёд',
    N'/static/images/products/raspberry-honey-16oz.jpg'
  ),
  (
    N'Грэчкавы мёд',
    N'/static/images/products/sage-honey-16oz.jpg'
  ),
  (
    N'Мёд кіслы',
    N'/static/images/products/sourwood-honey-12oz.jpg'
  ),
  (
    N'Праполіс "Навагодні"',
    N'/static/images/products/tasmanian-christmas-bush-honey.jpg'
  ),
  (
    N'Праполіс "Тасманскі"',
    N'/static/images/products/tasmanian-leatherwood-honey-w.jpg'
  ),
  (
    N'Тупело мёд',
    N'/static/images/products/tupelo-honey-12oz.jpg'
  ),
  (
    N'Рапсавы мёд',
    N'/static/images/products/wildflower-honey-w-comb-1.jpg'
  ),
  (
    N'Шэсць пакетаў мёду',
    N'/static/images/products/honey-sampler-six-pack-1.jpg'
  ),
  (
    N'Трыо аматараў гарачага мёду',
    N'/static/images/products/hot-honey-gift-set.jpg'
  ),
  (
    N'Цёплы і ўтульны мядовы набор',
    N'/static/images/products/warm-cozy-honey-gift-set.jpg'
  );
  
CREATE TABLE Options (
  Id BIGINT AUTO_INCREMENT,
  ProductId BIGINT NOT NULL,
  Name VARCHAR(64) NOT NULL,
  Price FLOAT NOT NULL,
  PRIMARY KEY (Id),
  FOREIGN KEY (ProductId) REFERENCES Products (Id)
);

INSERT INTO
  Options (ProductId, Name, Price)
VALUES
  (1, N'100 мл', 12.00),
  (1, N'350 мл', 15.00),
  (1, N'500 мл', 20.00),
  (2, N'450 мл', 19.00),
  (2, N'650 мл', 24.00),
  (3, N'3 банкі мёду + паштоўка', 30.00),
  (4, N'100 мл', 12.00),
  (4, N'350 мл', 15.00),
  (4, N'500 мл', 20.00),
  (5, N'450 мл', 19.00),
  (5, N'650 мл', 24.00),
  (6, N'100 мл', 12.00),
  (6, N'350 мл', 15.00),
  (6, N'500 мл', 20.00),
  (7, N'450 мл', 19.00),
  (7, N'650 мл', 24.00),
  (8, N'100 мл', 12.00),
  (8, N'350 мл', 15.00),
  (8, N'500 мл', 20.00),
  (9, N'100 мл', 12.00),
  (9, N'350 мл', 15.00),
  (9, N'500 мл', 20.00),
  (10, N'450 мл', 19.00),
  (10, N'650 мл', 24.00),
  (11, N'450 мл', 19.00),
  (11, N'650 мл', 24.00),
  (12, N'450 мл', 19.00),
  (12, N'650 мл', 24.00),
  (13, N'100 мл', 12.00),
  (13, N'350 мл', 15.00),
  (13, N'500 мл', 20.00),
  (14, N'450 мл', 19.00),
  (14, N'650 мл', 24.00),
  (15, N'450 мл', 19.00),
  (15, N'650 мл', 24.00),
  (16, N'450 мл', 19.00),
  (16, N'650 мл', 24.00),
  (17, N'450 мл', 19.00),
  (17, N'650 мл', 24.00),
  (18, N'6 слоік любога мёду', 70.00),
  (19, N'3 слоікі вострага мёду', 38.00),
  (20, N'3 слоікі любога мёду', 35.00);


CREATE TABLE Recommendations (
  Id BIGINT AUTO_INCREMENT,
  ProductId BIGINT NOT NULL,
  Notes TEXT NOT NULL,
  PRIMARY KEY (Id),
  FOREIGN KEY (ProductId) REFERENCES Products (Id)
);

INSERT INTO
  Recommendations (ProductId, Notes)
VALUES
  (1, N'Найлепшая прапанова'),
  (2, N'Найлепшая прапанова'),
  (3, N'Найлепшая прапанова');