FROM node:carbon

ADD yarn.lock /yarn.lock
ADD package.json /package.json

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN yarn

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY . .
EXPOSE 80
CMD ["npm", "start"]