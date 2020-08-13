# base image
FROM node:9.6.1

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
COPY . /usr/src/app/
RUN npm install --silent
RUN npm install react-scripts -g --silent
RUN fallocate -l 4G /swapfile
RUN chmod 600 /swapfile

RUN npm install serve -g
# start app
CMD ["npm", "start"]