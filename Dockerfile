FROM node:16-alpine as build

ENV PATH /app/node_modules/.bin:$PATH

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . ./

RUN DISABLE_ESLINT_PLUGIN=true npm run build

# ------------------------------------------------

FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]