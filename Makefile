test-nework:
	cd fabric && ./startFabric.sh typescript

apiserver:
	cd sona/apiserver && npm install && ts-node apiserver.js

install:
	cd fe && npm install

run:
	cd fe && npm start
