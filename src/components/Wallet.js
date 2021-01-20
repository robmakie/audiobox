import React, { useCallback, useState } from "react"
import { useOcean } from "@oceanprotocol/react"
import { Button, Popup } from "semantic-ui-react"
import { useEffect } from "react"

export default function Wallet({ config }) {
  const { ocean, connect, logout, accountId, balance } = useOcean()
  const conn = async () => {
    await connect()
  }

  const init = useCallback(async () => {
    if (ocean === undefined || accountId === undefined) return
    await ocean.assets.ownerAssets(accountId)
  }, [accountId, ocean])

  useEffect(() => {
    init()
  }, [ocean, accountId, init, config])

  return (
    <>
      {accountId ? (
        <div>
          <Button
            content={
              accountId.substring(0, 6) +
              "....." +
              accountId.substring(accountId.length - 4, accountId.length)
            }
            readOnly
            style={{ cursor: "auto" }}
          />
        </div>
      ) : (
        <div>
          <Button onClick={conn}>Connect</Button>
        </div>
      )}
    </>
  )
}
