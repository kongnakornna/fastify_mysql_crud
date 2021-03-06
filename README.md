# Fastapi: 8003 
# port : 8003

## Base URL

This project have 3 step running such as [localhost](localhost:8003), [dev](http://localhost:8003/fasiapi/), [production](https://app.io/atlantic/fasiapi)

About dev which is private url you must connect Pulse Secure before running

## Database

Database as MySQL version 5.6.20     

## Storage

On `https://static.app.io` and now is not available because this storage need server team allow to access

# How To run project
# install project
- Run `npm install -g nodemon` # install nodemon
- Run `npm install `  or Run `npm i ` 
# Development server for localhost 
- Run `npx nodemon` for a dev server.  
- OR  Run `npm start`
- OR  Run `npx ts-node -P tsconfig.json src/server.ts`
- OR  Run `npx ts-node -P tsconfig.json -r ./src/server.ts`

## Development server on Build
# Build Source Code on production
- Run `npx gulp `
 -- After Run `npm gulp ` is have directory `dist` file in package typescript
# directory Build file ` dist/server.ts`
# How To run project
# install project
- Run `npm install `  and  Run `npm install -g nodemon`
# Development server
- Run `npx nodemon` for a dev server.  OR  Run `npx ts-node -P tsconfig.json src/server.ts `
# Build Source Code on production
- Run `npx gulp `
# PM2 TEST RUN
# ############## How to Run PM2 on windows 
- Run `D: `
- Run `cd D:\UwAmp\www\git\fastapi`
- Run `pm2 list` # ดูว่า มี service ไหม
- Run `pm2 delete fastapi` #  ลบ service fastapi ออก จาก pm2
- Run `pm2 flush fastapi`  #  ลบ log fastapi ออก จาก pm2
- Run `pm2 start dist/server.js --name "fastapi" ` #  ติดตั้ง service fastapi ใหม่ บน pm2
- OR Run `cd dist`
- OR Run `pm2 start server.js --name "fastapi" ` #  ติดตั้ง service fastapi ใหม่ บน pm2
 - Run `pm2 monit ` * See how your program is working now, how are you using ram and cpu in real time?
 
# github 
-  branches name
- 1.`maian` for source code version 
- 2.`dev`   for ci/cd  deploy into junkins `development`
- 3.`master`for ci/cd  deploy into junkins `production`


# Testing

Run `npm install fastify ` &&  Run `npm install tap pino-pretty --save-dev `
│ └─for a test available my code should run this commnad for sure before deploy on dev or production service

# How To startup
# step 1
- Run Dev Source Code project

Run `npm install `  and  Run `npm install -g nodemon`

# install redis
Run `npm install redis`

# step 2 
- Development server
- Run `npx nodemon` for a dev server.
- Navigate `localhost:3031`. The app will automatically reload if you change any of the source files.

# step 3
- Build Source Code on production

Run `npx gulp `


# step 4  run application on service
- install
- Run `npm i g pm2` 
- Run `npm audit` for details.
- Run `npm install pm2 -g`  install pm2 on your machine
- go to directory  `dist`
 -- After Run `npm gulp ` is have directory `dist` file in package typescript
- Run On pm2 
- Run `npm install pm2 -g`  install pm2 on your machine
- go to directory  `dist`
- 1st  new install application service
- Run `cd dist `
- Run `pm2 start server.js --name "apiservice1" `  up to your , example ` "apiservice1" ` is `name service`
- 2rd  run application service on pm2
- Run `pm2 start server.js`  run pm2 service on your machine
- Run `pm2 list` view list
- 3th  run pm2 monitor service
- Run `pm2 monit ` * See how your program is working now, how are you using ram and cpu in real time?



# Deploy on Dev or production

Step Deploy you should change version in base url as GET. This project is CI/CD and Jenkins.
So you can deploy on Dev via push code to gid branch name `dev` and build in Jenkins

# Deploy on Production

Before Deploy you should change version in base url as GET. This project is CI/CD and Jenkins. 
So you can deploy on Production via push code to gid branch name `master` and build in Jenkins

About dev which is private url you must connect Pulse Secure before running


# scripts test / build /  /deploy on file package.json
 "scripts": {
    "start-prod": "pm2 delete $npm_package_pm2Name; pm2 flush $npm_package_pm2Name; NODE_ENV=production pm2 start ts-node --name=$npm_package_pm2Name -- -P tsconfig.json -r ./src/server.ts;",
    "start-dev": "pm2 delete $npm_package_pm2Name; pm2 flush $npm_package_pm2Name; NODE_ENV=development pm2 start ts-node --name=$npm_package_pm2Name -- -P tsconfig.json -r ./src/server.ts;",
    "start": "set NODE_ENV=local&npx ts-node -P tsconfig.json src/server.ts",
    "build": "tsc -P tsconfig.json",
    "build:dist": "npx gulp",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
# scripts nodemon file nodemon.json
`{
	  "verbose": true,
	  "ignore": [
		"*.js",
		"views/*",
		"public/*"
	  ],
	  "watch": [
		"src"
	  ],
	  "ext": "ts",
	  "exec": "npx ts-node -P tsconfig.json -r ./src/server.ts"
	}`

# Jenkins is ( Continuous Integration (CI) ) with  github or git
 - https://www.jenkins.io
 


## Database

Database as MySQL version 5.6.20 on trueplookpanya 

## Storage
 
# About source code
- Nodejs typescript  
- Backend Vesion 1.0.0
- Use fastify framework
- Nodejs typescript fastify framwork  mysql typeorm  knextjs crud
- Use Nodejs with fastify framework and knexjs framework mysql database
- fomat  REST API
- Document for developer
- https://www.fastify.io
- https://knexjs.org
- https://typeorm.io
- https://nextjs.org

# Document is relevant
# graphql
- https://graphql.org  
- https://docs.nestjs.com/graphql/quick-start
- https://www.npmjs.com/package/apollo-server-fastify
- https://www.apollographql.com/docs
- Run `npm install apollo-server-fastify apollo-server-core fastify graphql -S `
- https://www.apollographql.com/docs/apollo-server/integrations/middleware/#apollo-server-fastify

# Other
- https://www.codegrepper.com/search.php?answer_removed=1&q=typeorm%20nodejs
- https://www.npmjs.com/package/knex
- https://orkhan.gitbook.io/typeorm/docs/select-query-builder
- https://typeorm.io/#/select-query-builder/what-is-querybuilder
- https://codetain.com/blog/implementing-server-side-crud-with-typescript-typeorm-and-graphql
- https://orkhan.gitbook.io/typeorm/docs/sequelize-migration
- https://www.npmjs.com/package/fastify-typeorm
- https://javascript.plainenglish.io/set-up-graphql-with-fastify-mercurius-typescript-and-automated-testing-f4fc17420945
- https://ichi.pro/th/rwm-graphql-kab-typeorm-laea-nestjs-doy-chi-perch-query-builder-88228883514206

 
# Language use  and framework in develop
- Nodejs
- Typescript
- TypeORM 
- CRUD knext.js
- es5 ,es6
- graphql

# Database Language 
- Mysql database
- Mongodb use  mongoose

# Cache Language 
- Redis cache

# plugin or ecosystem use

- jwt && oauth2-server token Barer Header security allow access
- jwt token
- json schema validation
- build swagger documentation from routes
- integration tests

# Description project
- This project created by Node JS version 14.17.0. Used Fastify framework+ Express framework for connect to server Coding by Typescript and Testing by Jest

- Run on `port 3031` this port is fix by bible team and infrastructor team so you should not change it

# Base URL

- This project have 3 step running such as
- localhost (localhost:3031)
- localhost (127.0.0.1:3031)
 
- About dev which is private url you must connect Pulse Secure before running

# Database use
- Database as MySQL version 5.6.20 
- Mongodb

# Storage  Cache use

- Redis
- memcache
- cache file

# Project install nodejs modules 

Run `npm i` for a local your pc


## Run all Tests
- Run `npm run test `
## Delete `dist` folder
- Run `pm run clean`
## Trigger a clean build
- Run `npm run build`
## Start the server using the output from `npm run build`
- Run `npm run start`
## Directly start the server via the TypeScript files
- Run `npm run dev`
## Run `eslint` on all TypeScript files located under `src`
- Run `npm run lint`
## Run `eslint` and fix all TypeScript files located under `src`
- Run `npm run lint:write`


# Developed By  Kongnakorn Jantakun
# Contact information
- Mr Kongnakorn Jantakun
- Email kongnakornjantakun@gmail.com
- Mobile No. +66955088091
  

# software test REST API 

- https://insomnia.rest/download
- https://www.postman.com/downloads
 

# วิธีการ run node.js บน server ด้วย pm2

## pm2 service

- url  https://pm2.keymetrics.io

- Run `npm install pm2 -S`
- Run `npm i pm2 install pm2-server-monit -S`
- Run `pm2 start ts-node -- -P tsconfig.server.json ./server/index.ts`

# คำสั่งสำหรับแสดง process ทั้งหมดใน server PM2

Run `pm2 list`

# คำสั่งสำหรับแสดงรายละเอียด process

Run `pm2 show `<id|name|all>

# คำสั่ง restart process

Run `pm2 restart `<id|name|all> // pm2 restart 0

# คำสั่ง stop process

Run `pm2 stop `<id|name|all>

# คำสั่งดูรายละเอียดของเครื่อง server และ process ที่ทำงาน

Run ` pm2 start dist\server.js --name "fastapi" `

Run `pm2 dash`

# ติดตั้ง pm2
Run ` npm install pm2 -S npm i pm2 install pm2-server-monit -S `
Run `npm install pm2 -g`

# สั่งให้ program ทำงาน

Run `pm2 start server.js ` // index.js คือ ชื่อโปรแกรม
Run `pm2 start server.js -n "fastapi" `  
ในกรณีที่ต้องการให้ run ใน mode cluster ให้เติม parameter -i แล้วตามด้วยจำนวน instance ที่ต้องการเช่น
Run `pm2 start server.js -i 2 ` หมายถึง ทำเป็น cluster 2 ตัว
หรือ
Run `pm2 start server.js -i max ` หมายถึงทำเป็น cluster มากที่สุดเท่าที่ cpu รองรับ

กรณีที่เรา start อยู่ใน mode cluster แล้วอยากจะปรับเปลี่ยนจำนวน instance เช่นอยากปรับจาก 2 เป็น 4

Run `pm2 start index -i 2 ` run program ใน mode cluster จำนวน 2 instance
Run `pm2 scale index 4 ` หมายถึงปรับจาก 2 เป็น 4
ในกรณีที่ต้องการหยุดการทำงานของโปรแกรมเราใช้คำสั่งดังนี้
Run `pm2 stop index` หยุดโปรแกรมตามชื่อที่กำหนด
Run `pm2 stop 0` หยุดโปรแกรมตาม id ที่กำหนด
Run `pm2 stop all ` หยุดโปรแกรมทั้งหมด

เนื่องด้วยการหยุดการทำงานของโปรแกรมนั้นเป็นการหยุดชั่วคราว ข้อมูล program เรายังคงค้างอยู่ใน pm2 หากเราต้องการถอนโปรแกรมเราออก ให้ใช้คำสั่งดังนี้

Run `pm2 delete index` ลบโปรแกรมตามชื่อที่กำหนด
Run `pm2 start ` ลบโปรแกรมตาม id ที่กำหนด
Run `pm2 delete all ` ลบโปรแกรมทั้งหมด

ในกรณีที่ต้องการ restart ให้คำสั่ง ดังนี้

Run `pm2 restart index ` restart โปรแกรมตามชื่อที่กำหนด
Run `pm2 restart 0 ` restart โปรแกรมตาม id ที่กำหนด
Run `pm2 restart all `restart โปรแกรมทั้งหมด

ในกรณีที่ต้องการ reload ให้คำสั่ง ดังนี้

Run `pm2 reload index` reload โปรแกรมตามชื่อที่กำหนด
Run `pm2 reload 0` reload โปรแกรมตาม id ที่กำหนด
Run `pm2 reload all ` reload โปรแกรมทั้งหมด

ในกรณีที่ต้องการดูข้อมูลว่า process นั่นๆ ถูก start จากไหน แล้ว log เก็บไว้ที่ไหน

Run `pm2 info index ` แสดง information ของ program ตามชื่อที่กำหนด
Run `pm2 info 0 ` แสดง information ของ program ตาม id ที่กำหนด

pm2 จะแสดงข้อมูลต่างๆ เช่น status, name, uptime, และอื่นๆ สิ่งที่สำคัญและต้องใช้เสมอในการพัฒนา software ก็คือ log ซึ่งดูได้ที่ out log path, error log path โดยที่ pm2 จะเก็บ log เราไปเรื่อยๆ ในกรณีที่ต้องการ clear log ออกจาก pm2 สามารถทำได้โดยการใช้คำสั่ง ดังนี้

Run `pm2 flush `
ในกรณีที่เราต้องการให้ auto start program เราเมื่อ server เรา start ให้ใช้คำสั่งดังนี้

Run `pm2 startup` หมายถึงเมื่อมีการ start server ให้ program เรา start ด้วย
Run `pm2 save` หมายถึงให้ pm2 เก็บข้อมูลทั้งหมดเพื่อใช้ตอน start

เมื่อต้องการดูว่าตอนนี้ program เราทำงานเป็นยังไงใช้ ram กับ cpu เป็นอย่างไรบ้างแบบ real time สามารถทำได้โดยใช้คำสั่ง
Run `pm2 monit `

# รวม Docker command line พื้นฐาน
## ถ้าเราจะ Push images ขึ้น Docker Registry จำเป็นต้อง login ก่อน

Run `docker login` ท่านี้เดี๋ยวมันจะถ้า username, password เราทีหลัง
Run `docker login -u saspallow -p password ` หรือสามารถกำหนดได้เลย
Run `docker login -u` หรือเดี๋ยวค่อยใส่ password ก็ได้
Run `docker logout ` อันนี้ก็คือการ Logout นั้นเองมันจะไปลบ Credentials ในเครื่องเรา
สำหรับเราเข้าไปจัดการ Docker hosts ของเรา
Run `docker-machine ssh default` default สามารถเปลี่ยนไปได้ตามชื่อ hosts นั้นๆ
Run `docker-machine start default`
Run `docker-machine restart default`

## docker images

Run `docker images` โชว์ images ในเครื่องเรามี images อะไรบ้าง
Run `docker images --no-trunc ` ชว์ Images ID แบบเต็มๆยาวพรืด
docker search <IMAGE>
Run `docker search appservice` ค้นหา images จาก Docker registry
docker pull <image name>
เลือก Docker image ได้ที่นี่

Run `docker pull appservice` ดึง images ที่เราระบุลงมาไว้ในเครื่อง

## docker run

Run `docker run -d -it --name mysql \ -h mysql \ -e MYSQL_ROOT_PASSWORD=password \ -p 3306:3306 \ -v /your_path/mysql:/var/lib/mysql`

# docker run -p 80:80 -d --name nginx -h nginx nginx

# ตอนเราสั่ง Run สามารถใส่ parameter ได้เยอะแยะเลย

`-d `//รอให้ระบบทำงานไป
`-h ` //กำหนดชื่อ Container name ถ้าไม่ระบุ ระบบ มันจะตั้งชื่อ มาให้เราเอง
`-e ` //กำหนด Environment ของ Container ต้องดูว่าแต่ล่ะ images มีอะไรให้เราเซ็ตบ้าง
`-p` //กำหนด ports ที่จะให้ Client คุยกับ Docker hosts
`-v` //Mount Volume จากใน Container(/var/lib/mysql) บอกว่าให้มาอ่านที่นี้นะ(your_path)

# docker ps

Run `docker ps` โชว์ container ที่กำลังทำงานในเครื่องเรา
Run `docker ps -a -s` ชว์ container ทั้งหมดทั้งที่กำลังทำงาน และ ไม่ได้ทำงานอยู่
Run `docker ps <CONTAINER_ID> ` โชว์ container โดยการระบุ conatiner id หรือ host name `-s` // โชว์ Size Container

# docker cp

Run `copy file from host to container docker cp /my_file.txt:/usr/local/`

Run `copy file from container to host docker cp <containerId>:/file/path/within/container /host/path/target`

# docker rm

Run `docker rm <CONTAINER_ID> ` ลบ container ที่ระบุ, running อยู่ไม่ได้นะจ๊ะ ไม่งั้นมันจะบ่นเรา ให้ไป stop ซ่ะ หรือ
Run `docker rm -f ` // บังคับลบมันสะเลย

# docker rmi <IMAGE_ID>

Run `docker rmi <IMAGE_ID> ` ลบ docker images, ถ้ามี container ไหนใช้งานอยู่ไม่สามารถลบได้

# docker start <CONTAINER_ID>

Run `docker start <CONTAINER_ID> ` start container ที่stop อยู่นะไม่ใช่การ run images

# docker stop <CONTAINER_ID>

Run `docker stop <CONTAINER_ID> docker stop <CONTAINER_ID> <CONTAINER_ID> <CONTAINER_ID> ` Multiple
หยุดการทำงานของ container ไม่ใช่ remove นะลองพิมพ์ docker ps -a

# docker pause <CONTAINER_ID>

Run `docker pause <CONTAINER_ID>` เหมือนเราแช่แข็ง container ไว้
Run `docker unpause <CONTAINER_ID>` เอาของที่แช่แข็งไว้มาทำไร ต่อ...

# docker exec

Run `docker exec -it <CONTAINER_ID> bash` เข้าไป console container

# docker inspect

Run `docker inspect <CONTAINER_ID>` รายละเอียดของ container มีให้ดูเต็มไปหมด

# docker logs

Run `docker logs` # โชว์ Logs container

# docker commit <CONTAINER_ID> <NEW IMAGE NAME>

Run `docker commit <CONTAINER_ID> <NEW IMAGE NAME>` Ex. docker commit 2x5t aloha

# docker push

Run `docker push <ACCOUNT>/<NAME_IMAGE>` Push imges เราขึ้น Docker registry

# docker tag

Run `docker tag ubuntu ubuntu-x` ไม่กำหนด tag จะเป็น latest นะจ๊ะ
Run `docker tag ubuntu ubuntu-x:2`

# Docker import-export and save-load images

`docker export - saves a container's running or paused instance to a file docker save - saves a non-running container image to a file`

`Export, Import ` ไว้ export container ที่ running or paused อยู่ได้
Run `docker export <CONTAINER ID> > <To PATH> docker import - <FROM PATH>`
docker export — saves a container’s running or paused instance to a file

`-- Save, Load ` ไไว้แชร์ images ให้เพื่อนโดยการไม่ต้อง push ขึ้น Docker registry
Run `docker save <IMAGE NAME> > <To PATH> docker save <IMAGE NAME>:<TAG> > <To PATH> docker load < <FROM PATH>`

# Docker Network

Run `docker network ls docker network create <NETWORK NAME> default bridge docker network create --subnet 10.0.0.1/24 <NETWORK NAME> docker network inspect <NETWORK Name or Conatiner ID> docker network create my-net (create images networks) docker run --network <NETWORK_NAME> <IMAGE NAME> docker run -it --name <CONTAIN_NAME> --net--alias alias2 --network <NETWORK_NAME> <IMAGE NAME> `

# Docker Compose

Run `docker-compose up -d --build ` --build คือ Build ของใน Dockerfile ใหม่
Run `docker-compose up --force-recreate docker-compose ps docker-compose scale web=5 docker-compose stop docker-compose rm`

# Tips and Tricks

Run `docker rmi $(docker images --filter "dangling=true" -q --no-trunc) `
// Remove old and unused Docker images
// เนื่องจาก ผมใช้ docker compose build บ่อยจนเจอ พวกชื่อ images <none> เลยต้องการวิธีลบทีเดียวไปเลย ได้ไม่เสียเวลาลบทีละตัว

Run `docker rm $(docker ps -a -q) ` ลบ Container ทั้งหมดที่ Stop อยู่
Run `docker stop $(docker ps -a -q) ` หยุดการทำงาน Container ทั้งหมด

# ssh default username, password

Run `username: docker password: tcuser`

# how to set proxy in docker toolbox

Run `docker-machine ssh default sudo vi /var/lib/boot2docker/profile export "HTTP_PROXY=PROXY:PORT" export "HTTPS_PROXY=PROXY:PORT"`

# Docker parameter

-คำสั่ง `-d //Run in the background.`
-คำสั่ง `-p `Port mapping, local_port:container_port
-คำสั่ง `-h` Container host name
-คำสั่ง `-e ` Environment
-คำสั่ง `-v` Map volume paths
-คำสั่ง `-i` Keep STDIN open even if not attached
-คำสั่ง `-t` Allocate a pseudo-TTY

# keyword
- fastify how to Stop processing handler after reply

- คำสั่ง `npm install middie -S`
- คำสั่ง `npm i fastify-express -S`
- คำสั่ง `npm i fastify-swagger --save`
- คำสั่ง `npm install --save fastify-static --save`
 
- คำสั่ง install debug nodejs `npm install @sentry/node --save`
- คำสั่ง debug nodejs `const Sentry = require('@sentry/node');`
- คำสั่ง debug nodejs `Sentry.init({ dsn: 'https://<key>@sentry.io/<project>' });;`

- Run ` npm install sequelize mysql2 -S `
- Run ` npm install -g sequelize-auto MySQL -S`
- Run ` npm install graphql  -S`
- Run `npx ts-node -P tsconfig.json ./src/server.ts `
- Run ` http://172.19.199.85:3031/fastapi `



# TypeORM
MyProject
├── src              // place of your TypeScript code
│   ├── entity       // place where your entities (database models) are stored
│   │   └── User.ts  // sample entity
│   ├── migration    // place where your migrations are stored
│   └── index.ts     // start point of your application
├── .gitignore       // standard gitignore file
├── ormconfig.json   // ORM and database connection configuration
├── package.json     // node module dependencies
├── README.md        // simple readme file
└── tsconfig.json    // TypeScript compiler options


### Remark
# windows Run pm2   
- Run  Updatre deploy source code `npx gulp `
- Run `D:`
- Run `cd D:\UwAmp\www\git\fastapi`
- Run `cd dist`
- Run `pm2 list`
- Run `pm2 start dist/server.js --name "fastapi"`


- Run `pm2 start server.js --name "fastapi"`
- Run `c -i max`
- Run `pm2 monit `
- Run `pm2 stop all` 
- Run `pm2 restart index ` restart โปรแกรมตามชื่อที่กำหนด
- Run `pm2 restart 0 ` restart โปรแกรมตาม id ที่กำหนด   - Run `pm2 restart 9 `
- Run `pm2 restart all `restart โปรแกรมทั้งหมด
 

# install nodejs on Windows OS
- Run `npm i`
- Run dev `npm ts-node -P tsconfig.json dist/server.ts `
- or Run dev `npx nodemon`
- Run product `npm ts-node -P tsconfig.json src/server.ts`
- Run test `npm test`

# install project
- Run `npm install `  or Run `npm i `  and  Run `npm install -g nodemon`
# Development server
- Run `npx nodemon` for a dev server.  
- OR  Run `npm start`
- OR  Run `npx ts-node -P tsconfig.json src/server.ts`
# Development server on Build
- Run `npx xxx` for a dev server.  
# Build Source Code on production
- Run `npx gulp `

# ############## How to Run PM2 on windows 
- Run `D: `
- Run `cd D:\UwAmp\www\git\fastapi`
- Run `pm2 list` # ดูว่า มี service ไหม
- Run `pm2 delete fastapi` #  ลบ service fastapi ออก จาก pm2
- Run `pm2 flush fastapi`  #  ลบ log fastapi ออก จาก pm2
- Run `pm2 start dist/server.js --name "fastapi" ` #  ติดตั้ง service fastapi ใหม่ บน pm2
- OR Run `cd dist`
- OR Run `pm2 start server.js --name "fastapi" ` #  ติดตั้ง service fastapi ใหม่ บน pm2
 - Run `pm2 monit ` * See how your program is working now, how are you using ram and cpu in real time?


# dev test
- Run `npm i -D typescript ts-node nodemon`



# How To run project
# install project
- Run `npm install -g nodemon` # install nodemon
- Run `npm install `  or Run `npm i ` 
# Development server for localhost 
- Run `npx nodemon` for a dev server.  
- OR  Run `npm start`
- OR  Run `npx ts-node -P tsconfig.json src/server.ts`
- OR  Run `npx ts-node -P tsconfig.json -r ./src/server.ts`

## Development server on Build
# Build Source Code on production
- Run `npx gulp `
 -- After Run `npm gulp ` is have directory `dist` file in package typescript
# directory Build file ` dist/server.ts`
# How To run project
# install project
- Run `npm install `  and  Run `npm install -g nodemon`
# Development server
- Run `npx nodemon` for a dev server.  OR  Run `npx ts-node -P tsconfig.json src/server.ts `
# Build Source Code on production
- Run `npx gulp `
# PM2 TEST RUN
# ############## How to Run PM2 on windows 
- Run `D: `
- Run `cd D:\UwAmp\www\git\fastapi`
- Run `pm2 list` # ดูว่า มี service ไหม
- Run `pm2 delete fastapi` #  ลบ service fastapi ออก จาก pm2
- Run `pm2 flush fastapi`  #  ลบ log fastapi ออก จาก pm2
- Run `pm2 start dist/server.js --name "fastapi" ` #  ติดตั้ง service fastapi ใหม่ บน pm2
- OR Run `cd dist`
- OR Run `pm2 start server.js --name "fastapi" ` #  ติดตั้ง service fastapi ใหม่ บน pm2
 - Run `pm2 monit ` * See how your program is working now, how are you using ram and cpu in real time?

# PM2 TEST RUN dev  ใช้ทดสอบ   CMD start


- Run `pm2 list`
- Run `pm2 delete fastapi`
- Run `pm2 flush  fastapi`
- Run `pm2 start dist/server.js --name "fastapi" ` #  ติดตั้ง service fastapi ใหม่ บน pm2

- json `  "scripts": {
    "start-prod": "npm i pm2 delete $npm_package_pm2Name; pm2 flush $npm_package_pm2Name; NODE_ENV=production pm2 start dist/server.js --name $npm_package_pm2Name;",
    "start-dev": "npm i pm2 delete $npm_package_pm2Name; pm2 flush $npm_package_pm2Name; NODE_ENV=development pm2 start dist/server.js --name $npm_package_pm2Name;",
    "start": "set NODE_ENV=local&npx ts-node -P tsconfig.json src/server.ts",
    "build": "tsc -P tsconfig.json",
    "build:dist": "npx gulp",
    "test": "echo \"Error: no test specified\" && exit 1"
  },`

# PM2 TEST RUN dev  # ทดสอบ  โดย CMD END
# https://pm2.keymetrics.io/docs/usage/quick-start/

3031/fastapi

78

- Run `pm2 list`
- Run `pm2 delete all`
- Run `pm2 flush all`
 
- Run `pm2 delete 3031/fastapi`
- Run `pm2 flush 3031/fastapi`
- Run `pm2 start dist/server.js --name 3031/fastapi`


- Run `npm install md5-typescript -save`
- Run `npm install email-validator -save`

# Scope var let const ใช้งานยังไง ?
- `var`  สามารถ `Assign` ค่าใหม่ได้
- `let` สามารถ `Assign` ค่าใหม่ได้
- `const` จะไม่สามารถถูก `assign` ค่าให้กับตัวแปรใหม่ได้
# แนะนำให้ประกาศตัวแปรด้วย const เสมอและค่อยเปลี่ยนเป็น let ถ้าคุณต้องการเปลี่ยนแปลงค่า (mutate) หรือ assign ค่าให้ตัวแปรในภายหลัง
 
# Var ใช้งานยังไง ?
- ตัวเเปรที่ถูกประกาศด้วย `var` จะเป็น `function scope` เมื่อตัวเเปรถูกสร้างภายใน `function` นั้นสามารถเข้าถึงตัวเเปรนั้นได้ `function scoped `
- ที่ถูกสร้างใน `function `จะไม่สามารถถูกเข้าถึงจากภายนอก `function` ได้

# let ใช้งานยังไง ?
- `var` และ `let` จะคล้ายกันแต่ตัวแปรที่ประกาศด้วย `let` จะเป็น
- `Block scoped`
- ไม่สามารถเข้าถึงก่อนที่มันจะถูก `assign` ค่าได้
- ไม่สามารถประกาศตัวแปรซ้ำใน `scope` เดียวกันได้

# const ใช้งานยังไง ?
- การประกาศตัวแปรโดยใช้ `const` จะเหมือนกับ `let` แต่ต่างตรงที่พวกมันจะไม่สามารถ `assign` ค่าซ้ำได้
- สรุปสั้นๆ สำหรับตัวแปรที่ประกาศแบบ `const:`
- `Block Scoped`
- ไม่สามารถเข้าถึงได้ก่อนถูก `assign` ค่า
- ไม่สามารถประกาศซ้ำได้ใน `scope` เดียวกัน
- ไม่สามารถ `assign` ซ้ำได้

npm install fastify-xss-filter -S

# รู้หรือไม่ Import/Require มันต่างกันกว่าที่คิด 
# Module vs Namespace - Import vs Require Typescript
# module/namespace/exportและimport, require, referenceการใช้งาน

# require  แบ่ง `Code `ออกเป็นสัดเป็นส่วนหรือเป็น `Unit` ย่อยๆ 
- `CommonJS Modules (using “require”)`
- `CommonJS` คือรูปแบบการเขียน `JavaScript `แบบแบ่ง `Code `ออกเป็นสัดเป็นส่วนหรือเป็น `Unit` ย่อยๆ เพื่อให้ง่ายต่อการพัฒนาโปรเจคขนาดใหญ่ขึ้น 
- จุดแข็งคือการทำงานแบบ `Synchronous`

# import  สามารถจัดการการเขียนแบบ Modules ได้ด้วยตัวเองแล้ว
`ES6 Modules (using “import”)`
- ในสมัยก่อนนั้น JavaScript ยังไม่สามารถจัดการเรื่องของ Modules ได้ด้วยตัวเอง ทำให้ต้องใช้ Libs ต่างๆเข้ามาช่วยจัดการ เช่น CommonJS/AMD เป็นต้น - ซึ่งการมาของ ES2015/ES6 
- นั้นได้มีการอัพเดทฟังก์ชั่น ES6 Modules เข้ามาทำให้ตัว JavaScript สามารถจัดการการเขียนแบบ Modules ได้ด้วยตัวเองแล้ว