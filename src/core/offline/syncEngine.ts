export function resolveConflictByUpdatedAt<T extends { updated_at: string }>(local: T, remote: T): T {
  return new Date(local.updated_at).getTime() >= new Date(remote.updated_at).getTime() ? local : remote;
}
