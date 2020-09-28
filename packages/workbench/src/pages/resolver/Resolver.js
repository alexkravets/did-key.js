import React from "react";

import Grid from "@material-ui/core/Grid";
import Base from "../base/base";
import { DIDDocumentPreview } from "@transmute/material-did-core";
import { ContentTypeToggle } from "../../components/ContentTypeToggle";
const { resolver } = require("@transmute/did-key.js");

export const Resolver = ({ match }) => {
  const [didDocument, setDidDocument] = React.useState(null);

  const resolve = async (contentType = "application/did+json") => {
    const result = await resolver.resolve(match.params.did, {
      accept: contentType,
    });
    setDidDocument(result.didDocument);
  };

  React.useEffect(() => {
    (async () => {
      resolve();
    })();
  }, []);

  return (
    <Base>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <ContentTypeToggle
            onClick={(contentType) => {
              resolve("application/" + contentType);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          {didDocument !== null && (
            <DIDDocumentPreview didDocument={didDocument} />
          )}
        </Grid>
      </Grid>
    </Base>
  );
};

Resolver.propTypes = {
  //
};
