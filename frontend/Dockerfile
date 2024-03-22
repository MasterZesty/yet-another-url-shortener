# syntax=docker/dockerfile:1
# Note: alembic db migartions are not considered

FROM node:18.16.0-alpine3.17

WORKDIR /url-shortner-frontend

COPY package.json package.json
RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "start"]
