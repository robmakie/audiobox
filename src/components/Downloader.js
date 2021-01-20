import React, { useState, useEffect } from "react"
import { useOcean, useConsume, usePricing } from "@oceanprotocol/react"
import Loader from "react-loader-spinner"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export default function Download({ ddo, showDownloader }) {
  console.log(ddo)
  const { buyDT } = usePricing(ddo)
  const { consumeStepText, consume, consumeError } = useConsume()
  const { ocean, accountId } = useOcean()
  const [stepText, setStepText] = useState(
    "We are starting Download. It might take a while before download completes.."
  )

  useEffect(() => {
    async function handleDownload() {
      setStepText("Going to buy Datatoken")
      await buyDT("1")
      setStepText("Bought Datatoken. Going to Download")
      console.log()
      await consume(ddo.id, ddo.dataToken, "access", accountId)
      setStepText("Download complete")
      showDownloader(false)
    }
    handleDownload()
  }, [ddo])

  return (
    <div style={{ marginTop: 50 }}>
      <Loader type="Bars" color="skyblue" height={50} width={50} />
      <h3>{stepText ? stepText : "Downloading Podcast"}</h3>
    </div>
  )
}
