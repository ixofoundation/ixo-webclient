#!/bin/bash -xe
#green=`tput setaf 2`
echo "***********************************"
echo "* IXO WEB START                   *"
echo "***********************************"
echo ""
echo "Build Ixo Web"
CURRENT_DIR=`dirname $0`
ROOT_DIR=$CURRENT_DIR/..

if [ "$1" = "dev" ]
then
  echo "Building Developer images"
  docker-compose -f $ROOT_DIR/docker-compose.yml -f $ROOT_DIR/docker-compose.dev.yml up --build --no-start
else
  echo "Building Production images"
  docker-compose -f $ROOT_DIR/docker-compose.yml -f $ROOT_DIR/docker-compose.prod.yml up --no-start
fi

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