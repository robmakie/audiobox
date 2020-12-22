import React, { useEffect, useState } from 'react'
import { ConfigHelper } from '@oceanprotocol/lib'
import { Grid, Image } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './MusicDetails.css'

export default function MusicDetails() {
  const confighelper = new ConfigHelper()
  let config = confighelper.getConfig(
    process.env.REACT_APP_NETWORK,
    process.env.REACT_APP_INFURA_KEY
  )

  console.log(config)
  const [ddo, setDdo] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  let { did } = useParams()

  useEffect(() => {
    async function getDDO(did) {
      setIsLoading(true)
      try {
        let aquariusUrl = config.metadataCacheUri
        const url = `${aquariusUrl}/api/v1/aquarius/assets/ddo/${did}`

        let encodedUrl = encodeURI(url)
        const response = await fetch(encodedUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        })
        const res = await response.json()
        console.log(res)
        let data = normaliseData(res)
        setDdo(data)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    getDDO(did)
  }, [])

  function renderLoader() {
    return <Loader type='Audio' color='#00BFFF' height={100} width={100} />
  }

  function normaliseData(item) {
    var metadata = item.service[0]
    if (metadata) {
      if (metadata.attributes) {
        var { name, author } = metadata.attributes.main
        var { address, cap, symbol, name: dtName, minter } = item.dataTokenInfo

        if (metadata.additionalInformation) {
          var { description } = metadata.attributes.main
        }

        var price = item.price.value

        return {
          name,
          author,
          address,
          description,
          cap,
          dtName,
          minter,
          symbol,
          price,
        }
      }
    }
  }

  function renderContent() {
    return (
      <div className='detailsContainer'>
        <Grid>
          <Grid.Column width={9}>
            <Image src='https://i1.sndcdn.com/artworks-000158892019-gl0357-t500x500.jpg' />
          </Grid.Column>
          <Grid.Column width={5}>
            <p>{ddo.name}</p>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
  return isLoading && !ddo ? renderLoader() : renderContent()
}
