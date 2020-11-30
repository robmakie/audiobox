import React from 'react'
import { Card, Icon, Image, Label } from 'semantic-ui-react'
import { Link } from "react-router-dom"
import "./MusicCard.css"

export default function MusicCard({ imageSrc, title, author, playtime }) {
    return (
        <Link to="/asset/did:op:05677A8c372eD101F2abd6349f45094659f836dd">
            <Card fluid className="cards">
                <Image src={imageSrc} wrapped ui={false} />
                <Card.Content className="card">
                    <Card.Header>{title}</Card.Header>
                    <Card.Meta>
                        <span>{author}</span>
                    </Card.Meta>
                    <Card.Description>
                        <Label as='a' tag>
                            New
                    </Label>
                        <Label as='a' tag>
                            Epic
                    </Label>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Icon name='play' />
                    {playtime}
                    {"    "}
                    <a href="/did:op:05677A8c372eD101F2abd6349f45094659f836dd">
                        <Icon name='external alternate' />
                    </a>
                </Card.Content>
            </Card>
        </Link>

    )
}