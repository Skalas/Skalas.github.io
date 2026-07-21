export function recipePath(id: string): string {
  return `/recipes/${id.replace(/^recipe-/, '')}/`;
}
