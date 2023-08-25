export function UpdateElementByPosition<T>(arr: T[], index: number, upItem: T): T[] {
  const copy = [...arr]
  copy[index] = upItem
  return copy
}