FROM node:22-alpine AS build

ARG VITE_SENTRY_DSN
ARG VITE_RELEASE
ARG VITE_SHOULD_PERSIST_QUERIES
ARG VITE_AUTH0_DOMAIN
ARG VITE_AUTH0_CLIENT_ID
ARG VITE_AUTH0_AUDIENCE

ENV \
VITE_SENTRY_DSN=$VITE_SENTRY_DSN \
VITE_RELEASE=$VITE_RELEASE \
VITE_SHOULD_PERSIST_QUERIES=$VITE_SHOULD_PERSIST_QUERIES \
VITE_AUTH0_DOMAIN=$VITE_AUTH0_DOMAIN \
VITE_AUTH0_CLIENT_ID=$VITE_AUTH0_CLIENT_ID \
VITE_AUTH0_AUDIENCE=$VITE_AUTH0_AUDIENCE

WORKDIR /app

RUN mkdir -p public/scripts
COPY . ./

RUN yarn install --immutable

RUN yarn run build

# ------------------------------------------------

FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENV API_URL=""

EXPOSE 80
EXPOSE 443

ENTRYPOINT ["/entrypoint.sh"]