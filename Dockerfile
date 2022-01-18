FROM node:16-alpine as build

ARG HTTPS
ARG SASS_PATH
ARG REACT_APP_API

ENV HTTPS=$HTTPS SASS_PATH=$SASS_PATH REACT_APP_API=$REACT_APP_API
ENV DISABLE_ESLINT_PLUGIN=true
ENV TSC_COMPILE_ON_ERROR=true
ENV PATH /app/node_modules/.bin:$PATH

WORKDIR /app

COPY package*.json ./
RUN yarn install --prod
COPY . ./

RUN yarn run build

# ------------------------------------------------

FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]