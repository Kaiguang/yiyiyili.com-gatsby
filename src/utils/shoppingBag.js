/**
 * Add an item to the shopping bag.
 * @param {String}   artworkId      - Id, in the "YYYY-MM-DD" format.
 * @param {state}    shoppingBag    - React state passed from the react component, can also be a recoil state.
 * @param {setState} setShoppingBag - React setState function passed from the react component, can also be a recoil setState.
 */
export const addToBag = (artworkId, shoppingBag, setShoppingBag) => {
  const newBag = [...shoppingBag, artworkId]
  setShoppingBag(newBag)
  localStorage.setItem("shoppingBag", JSON.stringify(newBag))
}

/**
 * Remove an item from the shopping bag.
 * @param {String}   artworkId      - Id, in the "YYYY-MM-DD" format.
 * @param {state}    shoppingBag    - React state passed from the react component, can also be a recoil state.
 * @param {setState} setShoppingBag - React setState function passed from the react component, can also be a recoil setState.
 */
export const removeFromBag = (artworkId, shoppingBag, setShoppingBag) => {
  const newBag = shoppingBag.filter(id => id !== artworkId)
  setShoppingBag(newBag)
  localStorage.setItem("shoppingBag", JSON.stringify(newBag))
}

/**
 * Remove all items from the shopping bag.
 * @param {setState} setShoppingBag - React setState function passed from the react component, can also be a recoil setState.
 */
export const emptyBag = (setShoppingBag) => {
  setShoppingBag([])
  localStorage.setItem("shoppingBag", JSON.stringify([]))
}
