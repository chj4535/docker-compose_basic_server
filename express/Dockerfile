FROM node:12

WORKDIR /src 
#run, add같은 명령이 실행되는 디렉터리 설정

COPY . . 
#현재 폴더를 기준 .에 위치한(루트부터) .(루트)에 복사
COPY ./src/package.json  ./
#패키지 설치를 위해 json복사해옴

RUN npm install
RUN npm install -g nodemon
# RUN npm install -g pm2

CMD ["nodemon","-L","./bin/www"]