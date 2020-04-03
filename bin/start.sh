#!/bin/bash -xe
#green=`tput setaf 2`
echo "***********************************"
echo "* IXO WEB START                   *"
echo "***********************************"
echo ""
echo "Build Ixo Web for $TARGET_ENVIRONMENT"
CURRENT_DIR=`dirname $0`
ROOT_DIR=$CURRENT_DIR/..

# if the environment cannot provide the type try to get it from the script argument
if [ -z "$TARGET_ENVIRONMENT" ];
then
  TARGET_ENVIRONMENT=$1
fi

if [ -z "$TARGET_ENVIRONMENT" ];
then
    echo 'UNKNOWN TARGET ENVIRONMENT'
    exit
fi

echo "Pulling $TARGET_ENVIRONMENT images"
docker-compose -f "$ROOT_DIR/docker-compose.yml" -f "$ROOT_DIR/docker-compose.$TARGET_ENVIRONMENT.yml" up --no-start

docker-compose start ixo-web-$TARGET_ENVIRONMENT
echo -n "Starting Ixo Web for $TARGET_ENVIRONMENT ..."
sleep 5
echo ${green} "done"
docker-compose logs --tail 13 ixo-web-$TARGET_ENVIRONMENT
echo ""
echo "***********************************"
echo "* IXO WEB START COMPLETE          *"
echo "***********************************"
docker-compose ps