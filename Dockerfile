FROM node:18-alpine as build

ARG HTTPS
ARG NODE_ENV
ARG SASS_PATH
ARG REACT_APP_API
ARG REACT_APP_SENTRY_DSN
ARG REACT_APP_RELEASE

ENV \
HTTPS=$HTTPS \
NODE_ENV=$NODE_ENV \
SASS_PATH=$SASS_PATH \
REACT_APP_API=$REACT_APP_API \
REACT_APP_SENTRY_DSN=$REACT_APP_SENTRY_DSN \
REACT_APP_RELEASE=$REACT_APP_RELEASE

ENV DISABLE_ESLINT_PLUGIN=true
ENV TSC_COMPILE_ON_ERROR=true
ENV PATH /app/node_modules/.bin:$PATH

WORKDIR /app

RUN mkdir -p public/scripts
COPY copy-dep.js ./
COPY package*.json ./

RUN yarn install --prod --frozen-lockfile
 
COPY . ./

RUN yarn run build

# ------------------------------------------------

FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]