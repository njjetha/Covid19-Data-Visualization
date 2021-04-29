# FROM node:10-alpine
# RUN mkdir -p usr/src/app
# WORKDIR usr/src/app
# COPY package.json usr/src/app
# RUN npm cache clean
# RUN npm install
# COPY . usr/src/app
# EXPOSE 4200
# CMD["npm","start"]

### STAGE 1: Build###
#FROM node:12.7-alpine AS build
# #WORKDIR /usr/src/app
# #COPY package.json ./
# RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
# WORKDIR /home/node/app
# COPY package*.json ./
# USER node
# COPY --chown=node:node . .
# RUN npm install
# #RUN ng build --prod
# RUN npm run build --prod
# #RUN node_modules/.bin/ng build --prod

# ### STAGE 2: Run ###
# FROM nginx:1.17.1-alpine
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY --from=build /usr/src/app/dist/Covid19-Data-Visualization /usr/share/nginx/html 

### STAGE 1: Build ###
FROM node:12.7-alpine AS build
WORKDIR /app
#ENV PATH /app/node_modules/:$PATH 
#ENV PATH=$PATH:/app/node_modules/
ENV PATH=$PATH:/usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod
EXPOSE 4200
#CMD ["node","app.js"]



### STAGE 2: Run ###
 FROM nginx:1.18.0
# COPY nginx/default.conf.template /etc/nginx/conf.d/default.conf.template
 #COPY nginx/nginx.conf /etc/nginx/nginx.conf
 COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
 EXPOSE 80
COPY --from=build /app/dist/covid19 /usr/share/nginx/html
#CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off:'

