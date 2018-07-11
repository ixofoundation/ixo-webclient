#!/bin/bash
#green=`tput setaf 2`
echo "***********************************"
echo "* IXO WEB START                   *"
echo "***********************************"
echo ""
echo "Build Ixo Web"
ROOT_DIR=$CURRENT_DIR/..

docker-compose up --no-start
docker build -t trustlab/ixo-web $ROOT_DIR

docker-compose start ixo-web

echo -n "Starting Ixo Web ..."
sleep 5
echo ${green} "done"
docker-compose logs --tail 13 ixo-web
echo ""
echo "***********************************"
echo "* IXO WEB START COMPLETE          *"
echo "***********************************"
docker-compose ps