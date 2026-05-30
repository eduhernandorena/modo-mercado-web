export type SyncOperation = {
  operationId: string;
  entity: string;
  action: "create" | "update" | "delete";
  payload: unknown;
  localTimestamp: number;
};

const queue: SyncOperation[] = [];

export async function enqueueOperation(input: Omit<SyncOperation, "operationId" | "localTimestamp">) {
  const op: SyncOperation = {
    operationId: crypto.randomUUID(),
    localTimestamp: Date.now(),
    ...input
  };
  queue.push(op);
  return op;
}
