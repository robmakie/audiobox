import React, { useEffect, useState } from 'react'
import { ConfigHelper } from "@oceanprotocol/lib"
import { Grid, Image } from 'semantic-ui-react'
import { useParams } from "react-router-dom"

export default function MusicDetails() {

    const confighelper = new ConfigHelper();
    let config = confighelper.getConfig(
        process.env.REACT_APP_NETWORK,
        process.env.REACT_APP_INFURA_KEY
    );

    console.log(config)
    const [ddo, setDdo] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    let { did } = useParams()

    useEffect(() => {
        async function getDDO(did) {
            setIsLoading(true);
            try {
                let aquariusUrl = config.metadataCacheUri;
                alert(aquariusUrl)
                const url = `${aquariusUrl}/api/v1/aquarius/assets/ddo/${did}`;

                let encodedUrl = encodeURI(url);
                const response = await fetch(encodedUrl, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
                });
                const res = await response.json();
                console.log(res);
                let data = normaliseData(res);
                setDdo(data)
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }

        getDDO(did)
    }, [])


    function normaliseData(item) {
        var metadata = item.service[0];
        if (metadata) {
            if (metadata.attributes) {
                var { name, author } = metadata.attributes.main;
                var {
                    address,
                    cap,
                    symbol,
                    name: dtName,
                    minter
                } = item.dataTokenInfo;

                if (metadata.additionalInformation) {
                    var { description } = metadata.attributes.main;
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
                    price
                };
            }
        }
    }

    function renderLoader() {
        return (
            <h1>loading...</h1>
        )

    }

    function renderContent() {
        return (<Grid>
            <Grid.Column width={4}>
                <Image src='https://i1.sndcdn.com/artworks-000158892019-gl0357-t500x500.jpg' />
            </Grid.Column>
            <Grid.Column width={9}>
                <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
                    ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et
                    magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
                    ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
                    quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
                    arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
                    Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras
                    dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
                    Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
                    Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus
                    viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.
                    Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
            </p>
            </Grid.Column>
        </Grid>
        )
    }
    return isLoading ? renderLoader() : renderContent()
}
