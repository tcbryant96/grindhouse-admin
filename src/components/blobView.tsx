import React from 'react';

import { InteractiveBrowserCredential } from "@azure/identity";
import { BlobServiceClient, BlobItem } from "@azure/storage-blob";

interface Props {}
interface State {
    blobsWeFound: BlobItem[];
    containerUrl: string;
}

export class BlobView extends React.Component<Props, State> {
    state: State;

    constructor(props: Props, state: State) {
        super(props, state);
        this.state = { blobsWeFound: [], containerUrl: "" }
    }


    async componentDidMount() {
        const signInOptions = {
            clientId: "94c96df4-f238-4c92-aaba-f41a86dbb2e8",
            tenantId: "954cce98-a100-4c8a-9310-856b38bbb9a7"
        }

        const blobStorageClient = new BlobServiceClient(

            "https://grindhousestorage.blob.core.windows.net/",
            new InteractiveBrowserCredential(signInOptions)
        )

  
        var containerClient = blobStorageClient.getContainerClient("private");
        var localBlobList = [];

        for await (const blob of containerClient.listBlobsFlat()) {

            localBlobList.push(blob);
        }
      
        this.setState({ blobsWeFound: localBlobList, containerUrl: containerClient.url });
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>blob title</th>
                            <th>blob size</th>
                            <th>download url</th>
                        </tr>
                    </thead>
                    <tbody>{
                        this.state.blobsWeFound.map((x, i) => {
                            return <tr key={i}>
                                <td>{x.name}</td>
                                <td>{x.properties.contentLength}</td>
                                <td>
                              
                                    {this.state.containerUrl + x.name}
                                </td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}
// connectionString= https://grindhousestorage.blob.core.windows.net/privatepictures/Flask.png

// computer vision{
//     key1 = 199e0a4c9a3843aeb3d66ffc4fa17e4a
//     endpoint = https://grindhousecomputervision.cognitiveservices.azure.com/
// }