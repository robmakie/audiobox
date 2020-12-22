import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useOcean, usePublish } from '@oceanprotocol/react'
import './Register.css'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

export default function Register({ config }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [tags, setTags] = useState('')
  const [url, setURL] = useState('')
  const [sampleurl, setSampleURL] = useState('')
  const [author, setAuthor] = useState('')
  const [licence, setLicense] = useState('')
  const [posterImage, setPosterImage] = useState('')
  const [playbackTime, setPlaybackTime] = useState('')
  const [showHistory, setShowHistory] = useState(false)

  const { publish, publishStepText, isLoading } = usePublish()
  const { accountId } = useOcean()

  const [ddo, setDdo] = useState(null)
  const [data, setData] = useState(null)

  const asset = {
    main: {
      type: 'dataset', //dataset
      name: title,
      dateCreated: new Date(Date.now()).toISOString().split('.')[0] + 'Z', // remove milliseconds
      author,
      licence,
      files: [
        {
          url,
          checksum: 'efb2c764274b745f5fc37f97c6b0e761',
          encoding: 'UTF-8',
          contentLength: '4535431',
          contentType: 'image/jpeg',
          compression: 'zip',
        },
      ],
    },
    additionalInformation: {
      tags,
      sample: sampleurl,
    },
  }

  async function registerMusic() {
    let ranum = parseInt(Math.random() * 100)
    const priceOptions = {
      price,
      cap: '5000',
      symbol: 'AXA-' + ranum,
      name: 'Fotograh Token ' + ranum,
      tokensToMint: '500',
      type: 'fixed',
    }

    console.log(asset)

    //   uncomment this below 2 lines
    const ddo = await publish(asset, 'access', priceOptions)
    console.log(ddo)
    setDdo(ddo)
  }

  function renderLoader() {
    return (
      <>
        <Loader type='Audio' color='#00BFFF' height={100} width={100} />
        <p>{publishStepText}</p>
      </>
    )
  }

  function renderForm() {
    return (
      <div className='registerContainer'>
        <h2>Register Your Music</h2>
        <Form className='registerForm'>
          <Form.Field widths='equals'>
            <label for='name'>Name</label>
            <input
              id='name'
              placeholder='First name'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Field>
          <Form.Field widths='equals'>
            <label for='name'>Description</label>
            <Form.TextArea
              placeholder='Tell us more about your music...'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label for='name'>Creator</label>
            <input
              id='name'
              placeholder='Brian Tyler'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label for='name'>Price (in OCEAN)</label>
            <input
              id='name'
              placeholder='10'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label for='name'>Music Url</label>
            <input
              id='name'
              placeholder='10'
              value={url}
              onChange={(e) => setURL(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label for='name'>Poster Image url</label>
            <input
              id='name'
              placeholder='10'
              value={posterImage}
              onChange={(e) => setPosterImage(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label for='name'>Playback duration (mm:ss)</label>
            <input
              id='name'
              placeholder='10'
              value={playbackTime}
              onChange={(e) => setPlaybackTime(e.target.value)}
            />
          </Form.Field>
          <Form.Button primary onClick={(e) => registerMusic(e)}>
            Register
          </Form.Button>
        </Form>
      </div>
    )
  }

  return isLoading ? renderLoader() : renderForm()
}
