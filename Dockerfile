# build stage
FROM node:20-alpine AS builder
WORKDIR /app

# install deps using package lock if present
COPY package*.json ./
RUN npm install 

# copy source
COPY . .





EXPOSE 3000

# default command (overrideable)
CMD ["node", "index.js"]