#!/bin/bash

echo "lets go"
docker kill $(docker ps -q)
docker rm $(docker ps -a -q)
docker rmi $(docker images -q)
docker-compose down
docker volume prune
docker-compose up --build