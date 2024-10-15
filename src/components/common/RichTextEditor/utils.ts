export const URL_REGEX = /((?:https?:\/\/|www\.)[^\s]+)/gi
export const SINGLE_URL_REGEX = /^(?:https?:\/\/|www\.)[^\s]+$/gi
export const MENTION_REGEX = /@\[(.*?)\]\((.*?)\)/g

export function calculatePlaceholderInsertLength(placeHolderDelta: any) {
  return placeHolderDelta.ops.reduce(
    (accumulator: any, deltaOperation: any) => {
      if (deltaOperation.hasOwnProperty('insert')) accumulator++

      return accumulator
    },
    0,
  )
}
