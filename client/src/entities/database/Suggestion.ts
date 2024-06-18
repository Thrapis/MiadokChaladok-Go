
class Suggestion {
	id: number;
	productId: number;
	notes: string;

    constructor(id: number, productId: number, notes: string) {
        this.id = id;
        this.productId = productId;
        this.notes = notes;
    }
}

export { Suggestion }