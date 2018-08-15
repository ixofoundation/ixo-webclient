#!/bin/bash -xe
#green=`tput setaf 2`
echo "***********************************"
echo "* IXO WEB START                   *"
echo "***********************************"
echo ""
echo "Build Ixo Web"
CURRENT_DIR=`dirname $0`
ROOT_DIR=$CURRENT_DIR/..

if [ "$1" = "dev" ]; then
  echo "Building Developer images"

  if [[ ! -f $ROOT_DIR/docker-compose.dev.yml  ]] ; then
      echo 'It appears as if you are trying to run in local development mode without a docker-compose.dev.yml. Make a copy of docker-compose.uat.yml, rename it and adapt it as neccesary. BUT NEVER CHECK IT IN!'
      exit
  fi

  cd $ROOT_DIR
  yarn
  cd bin

  docker build -t trustlab/ixo-web $ROOT_DIR
  docker-compose -f $ROOT_DIR/docker-compose.yml -f $ROOT_DIR/docker-compose.dev.yml up --build --no-start
elif [ "$1" = "uat" ]; then
  echo "Running with UAT config"

  docker-compose -f $ROOT_DIR/docker-compose.yml -f $ROOT_DIR/docker-compose.uat.yml up --no-start
else
  echo "Running with Production config"

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