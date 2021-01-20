import React, { useEffect, useState } from "react"
import { Grid, Header, Image } from "semantic-ui-react"
import { useParams } from "react-router-dom"
import { useOcean } from "@oceanprotocol/react"
import MusicCard from "./MusicCard"
import Loader from "react-loader-spinner"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import "./Collection.css"

export default function Collection({ config, myAssets }) {
  const [isLoading, setIsLoading] = useState(true)
  const [podcasts, setPodcasts] = useState([])
  const { accountId } = useOcean()
  let { term } = useParams()

  useEffect(() => {
    async function fetchDataAssets() {
      console.log(term)
      console.log(process.env.REACT_APP_DAPP_ID)
      if (myAssets) {
        term = accountId
      } else if (term == "home") {
        term = "data" //process.env.REACT_APP_DAPP_ID
      }

      try {
        const baseUrl = config.metadataCacheUri
        const url = `${baseUrl}/api/v1/aquarius/assets/ddo/query?text=${term}&offset=100`
        console.log(url)
        let encodedUrl = encodeURI(url)
        const response = await fetch(encodedUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        })
        const { results } = await response.json()
        console.log(results)
        if (response.status == 200) {
          setIsLoading(false)
          let processedData = await processData(results)
          console.log("processed data -")
          console.log(processedData)
          let finalArr = splitResults(processedData, 4)
          console.log("final data -")
          console.log(finalArr)
          setPodcasts(finalArr.slice())
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchDataAssets()
  }, [config])

  function splitResults(array, n) {
    let [...arr] = array
    var res = []
    while (arr.length) {
      res.push(arr.splice(0, n))
    }
    return res
  }

  function renderLoader() {
    return (
      <div style={{ paddingTop: 200 }}>
        <Loader type="Bars" color="skyblue" height={100} width={100} />
        <h3>Loading Podcasts</h3>
      </div>
    )
  }

  async function processData(datasets) {
    return await Promise.all(
      datasets.map(item => {
        var metadata = item.service[0]
        if (metadata) {
          if (metadata.attributes) {
            var tags = []
            var { name, author } = metadata.attributes.main
            let extra = metadata.attributes.additionalInformation
            if (extra) {
              tags = extra.tags ? extra.tags.splice(0, 2) : []
              var playbackTime = extra.playbackTime
              var posterImage = extra.posterImage
            }

            return {
              name,
              author,
              tags,
              playbackTime,
              posterImage,
              price: Number(item.price.value).toFixed(2),
              ddo: item,
              did: item.id
            }
          }
        }
      })
    )
  }

  function renderRow(item, index) {
    return (
      <Grid.Row centered key={index} columns={4}>
        {item.map(it => {
          return (
            <Grid.Column>
              <MusicCard
                did={it.did}
                imageSrc={
                  it.posterImage
                    ? it.posterImage
                    : process.env.PUBLIC_URL + "/no-image.jpg"
                }
                title={it.name}
                author={it.author}
                playtime={it.playbackTime ? it.playbackTime : "-:--"}
                tags={it.tags}
                config={config}
                ddo={it.ddo}
                price={it.price}
              />
            </Grid.Column>
          )
        })}
      </Grid.Row>
    )
  }
  return isLoading ? (
    renderLoader()
  ) : podcasts.length ? (
    <Grid divided="vertically" className="container">
      {podcasts.map((it, i) => renderRow(it, i))}
    </Grid>
  ) : (
    <h2>No Podcasts found</h2>
  )
}
