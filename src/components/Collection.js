import React from 'react'
import { Grid, Header, Image } from 'semantic-ui-react'
import MusicCard from './MusicCard'
import './Collection.css'

export default function Collection({ config }) {
  function renderRow() {
    return (
      <Grid.Row centered columns={4}>
        <Grid.Column>
          <MusicCard
            imageSrc='https://i1.sndcdn.com/artworks-000247567530-ysnxiq-t500x500.jpg'
            title='Stacked Moments'
            author='Max Cooper'
            playtime='03:44'
          />
        </Grid.Column>
        <Grid.Column>
          <MusicCard
            imageSrc='https://i1.sndcdn.com/artworks-000158892019-gl0357-t500x500.jpg'
            title='Celaeno – GuZheng'
            author='terrorhythm'
            playtime='05:20'
          />
        </Grid.Column>
        <Grid.Column>
          <MusicCard
            imageSrc='https://i1.sndcdn.com/artworks-000182755511-wz2o9f-t500x500.jpg'
            title='Stacked Moments'
            author='Max Cooper'
            playtime='03:44'
          />
        </Grid.Column>
        <Grid.Column>
          <MusicCard
            imageSrc='https://i1.sndcdn.com/artworks-000192444803-5uo9pr-t500x500.jpg'
            title='Celaeno – GuZheng'
            author='terrorhythm'
            playtime='05:20'
          />
        </Grid.Column>
      </Grid.Row>
    )
  }
  return (
    <Grid divided='vertically' className='container'>
      {[1, 2, 3, 4, 5, 6].map((it) => renderRow())}
    </Grid>
  )
}
