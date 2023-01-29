#!/bin/bash
FROM --platform=linux/amd64 node:lts-alpine as dist

WORKDIR /opt/project
COPY ./ ./
RUN npm i
ENV NODE_ENV=production
RUN npm run build

# build the nginx image
FROM --platform=linux/arm64 nginx:1.17
COPY --from=dist /opt/project/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]