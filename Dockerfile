

### STAGE 1: Build ###
FROM node:12.7-alpine AS build
WORKDIR /app
ENV PATH=$PATH:/usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod
EXPOSE 4200




### STAGE 2: Run ###
 FROM nginx:1.18.0
 COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
 EXPOSE 80
 COPY --from=build /app/dist/covid19 /usr/share/nginx/html
