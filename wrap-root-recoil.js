import React, { useEffect } from "react"
import { RecoilRoot, useSetRecoilState } from "recoil"
import { shoppingBagState, artworksState } from "./src/utils/atoms.js"

export default function wrapRootElementWithRecoil({ element }) {
  return (
    <RecoilRoot>
      <GlobalAppState />
      {element}
    </RecoilRoot>
  )
}

function GlobalAppState() {
  // Get shopping bag data from local storage if it exists
  const setShoppingBag = useSetRecoilState(shoppingBagState)
  useEffect(() => {
    const shoppingBagString = localStorage.getItem("shoppingBag")
    if (shoppingBagString) {
      setShoppingBag(JSON.parse(shoppingBagString))
    }
  }, [setShoppingBag])

  // Get artworks data from Gateway API (DynamoDB and Lambda)
  const setArtworks = useSetRecoilState(artworksState)
  useEffect(() => {
    const fetchAllArtworksData = async () => {
      try {
        const response = await fetch(
          `${process.env.API_GATEWAY_ROOT_URL}/all-artworks-data`,
          { method: "GET" }
        )
        const body = await response.json()
        if (body.Items) {
          setArtworks(body.Items)
        }
      } catch (error) {
        console.error(`Cannot fetch:\n${JSON.stringify(error, null, 2)}`)
      }
    }

    fetchAllArtworksData()
  }, [setArtworks])

  return <></>
}
