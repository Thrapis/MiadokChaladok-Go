
class Product {
	id: number;
	name: string;
	imagePath: string;

    constructor(id: number, name: string, imagePath: string) {
        this.id = id;
        this.name = name;
        this.imagePath = imagePath;
    }
}

export { Product }