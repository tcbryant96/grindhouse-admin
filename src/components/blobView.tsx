import React from "react";
import { InteractiveBrowserCredential } from "@azure/identity";
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";

export class BlobView extends React.Component {
    componentDidMount() {
      const blobStorageClient = new BlobServiceClient(
        "https://grindhousestorage.blob.core.windows.net/private"
      )
    }
  render() {
    <div>
      <table>
        <thead>
          <tr>
            <th>Blob Name</th>
            <th>Blob size</th>
            <th>Url Download </th>
          </tr>
        </thead>
        <tbody>
            
            </tbody>
      </table>
    </div>;
  }
}
