import React from "react"
import { Card, Icon, Image, Label } from "semantic-ui-react"
import { Link } from "react-router-dom"
import "./MusicCard.css"

export default function MusicCard({
  imageSrc,
  title,
  author,
  playtime,
  did,
  tags,
  price
}) {
  return (
    <Link to={"/asset/" + did}>
      <Card fluid className="cards">
        <Image
          src={imageSrc}
          label={{
            color: "yellow",
            content: price > 0 ? price + " OCEAN" : "FREE",
            icon: "dollar",
            ribbon: true
          }}
          wrapped
          ui={false}
        />
        <Card.Content className="cardContent">
          <Card.Header>{title}</Card.Header>
          <Card.Meta>
            <span>{author}</span>
          </Card.Meta>
          <Card.Description>
            {tags.map(tag => (
              <Label as="a" color="blue" tag>
                {tag}
              </Label>
            ))}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name="play" />
          {playtime}
          {"    "}
          <a href={"/" + did}>
            <Icon name="external alternate" />
          </a>
        </Card.Content>
      </Card>
    </Link>
  )
}
