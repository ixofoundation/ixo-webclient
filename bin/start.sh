#!/bin/bash -xe
#green=`tput setaf 2`
echo "Building Ixo Web..."
docker-compose up --no-start
echo -n "Starting Ixo Web..."
docker-compose start ixo-web
sleep 5
echo ${green} "Ixo Web Started"
docker-compose logs --tail 13 ixo-web
echo "Ixo Web Deployed"
docker-compose ps