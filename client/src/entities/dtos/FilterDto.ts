import { Category, ShipmentMethod, Taste } from "entities/database"

export type CatalogFilterDto = {
    categories: Category[]
    tastes: Taste[]
    shipmentMethods: ShipmentMethod[]
}