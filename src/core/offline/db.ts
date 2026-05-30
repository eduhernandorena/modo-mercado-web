import Dexie, { Table } from "dexie";

export interface Product {
  id: string;
  nome: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface PriceRecord {
  id: string;
  product_id: string;
  market_id: string;
  price: number;
  user_id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface ShoppingList {
  id: string;
  nome: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface ShoppingListItem {
  id: string;
  list_id: string;
  product_id: string;
  quantity: number;
  user_id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface SyncQueueItem {
  operationId: string;
  entity: string;
  action: "create" | "update" | "delete";
  payload: unknown;
  localTimestamp: number;
}

class ModoMercadoDB extends Dexie {
  products!: Table<Product>;
  priceRecords!: Table<PriceRecord>;
  shoppingLists!: Table<ShoppingList>;
  shoppingListItems!: Table<ShoppingListItem>;
  syncQueue!: Table<SyncQueueItem>;

  constructor() {
    super("ModoMercadoDB");
    this.version(1).stores({
      products: "id, user_id, created_at, updated_at, deleted_at",
      priceRecords: "id, product_id, market_id, user_id, created_at, updated_at, deleted_at",
      shoppingLists: "id, user_id, created_at, updated_at, deleted_at",
      shoppingListItems: "id, list_id, product_id, user_id, created_at, updated_at, deleted_at",
      syncQueue: "operationId, entity, localTimestamp"
    });
  }
}

export const db = new ModoMercadoDB();
