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
  (3, N'3 банкі мёду + паштоўка', 30.00);


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