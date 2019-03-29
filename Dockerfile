# Run with:
# $ npm eval-in-docker

FROM node:10
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "npm", "run", "eval-firebase-dumps" ]
