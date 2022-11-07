FROM node:16 as build
ENV NODE_ENV production
LABEL version="1.0"
LABEL description="This is the base docker image for prod frontend react app."
LABEL maintainer = ["nickworkspace189@gmail.com"]

WORKDIR /app

COPY ["package.json", "./"]
COPY [".env", "./"]
RUN npm install --omit=dev
COPY . ./
RUN npm run build

# production environment
FROM nginx:1.19.10-alpine as product-stage
COPY --from=build /app/build /app
# COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 5001 
CMD ["nginx", "-g", "daemon off;"]
