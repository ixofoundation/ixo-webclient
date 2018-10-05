FROM node:carbon

ADD package.json /package.json

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN NPM i

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY . .
EXPOSE 80
CMD ["npm", "start"]