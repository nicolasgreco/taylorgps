#!/bin/bash

#if [ $2 = "clean" ]; then
#    echo 'Remove old instances....';
#    docker stop $(docker ps -a -q)
#    docker rm $(docker ps -a -q)
#    docker rmi $(docker images -q)
#fi
export ENV=development
echo 'Generating docker instances....';
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml build
docker-compose -f docker-compose.dev.yml up

