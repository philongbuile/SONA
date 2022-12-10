test-nework:
	cd fabric && ./startFabric.sh typescript

apiserver:
	cd sona/apiserver && npm install && ts-node apiserver.js

install:
	cd fe && npm install

run:
	cd fe && npm start
env:
	cd fe && echo "URL=128.199.203.189:8080" >> .env
