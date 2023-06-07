#!/bin/sh

git pull
yarn

rm -rf .ci/cache
git clone ./ .ci/cache
yarn build .ci/cache

rm -rf .next
mv .ci/cache/.next .next

export "HOME=/root"
pm2 restart ai_hub_frontend