import React, { useCallback, useState } from "react";
import { useOcean } from "@oceanprotocol/react";
import { Button } from "semantic-ui-react";
import { useEffect } from "react";

export default function Wallet() {
  const { ocean, connect, logout, accountId } = useOcean();

  const conn = async () => {
    await connect();
  };

  const init = useCallback(async () => {
    if (ocean === undefined || accountId === undefined) return;
    await ocean.assets.ownerAssets(accountId);
  }, [accountId, ocean]);

  useEffect(() => {
    init();
  }, [ocean, accountId, init]);

  return (
    <>
      {accountId ? (
        <div>
          <Button>
            {accountId}
          </Button>
        </div>
      ) : (
          <div>
            <Button onClick={conn}>Connect</Button>
          </div>
        )}
    </>
  );
}
