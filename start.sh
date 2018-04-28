#!/bin/bash
export NODE_ENV=$ENV
echo $NODE_ENV
pm2 start /opt/app/config/pm2/pm2-$ENV.json -i 0 --no-daemon
