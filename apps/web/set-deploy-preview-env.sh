#!/bin/bash

if [ "$CONTEXT" = "deploy-preview" ]; then
  export NEXT_PUBLIC_CONFIG_ASSETLIST_URL="https://raw.githubusercontent.com/ixofoundation/ixo-webclient/$BRANCH/configs/testzone/asset-list.json"
fi
