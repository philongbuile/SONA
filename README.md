# Sona Healthcare System

> SONA (**S**tuttgart **O**nline **N**etwork he**A**lthcare) is an application for Electric Healthcare Store (EHR) with blockchain support. We apply Hyperledger Fabric to complete our solution in blockchain. With that being said, it can become more secure, lightweight and convenient for data access, management, and security.
> 

## Our team

- Bui Le Phi Long: (team lead)
- Truong Canh Thanh Vinh (dev)
- Huynh Cam Tu (dev)
- Nguyen Quoc Trung (dev, UI/UX designer)
- Le Duc Minh (dev)
- Instructor: Prof. Martin Kappes

## Tech specs

- Backend: Mongo + Typescript + Express
- Blockchain: Hyperledger Fabric + CouchDB + Typescript
- Frontend: ReactJS + Redux + Typescript + TailwindCSS

## Documentation

- Full report:
- API Docs:

## Sona Test Network

The first most important part of this project is the blockchain network. The test network is being introduced in Fabric v2.0 as the long term replacement for the `first-network`sample. By ultilizing and customising the network for our application, we make a startFabric script in order for you to feel free to test the network within one command line.

Before you can start the test network, you need to follow the instructions to [Install the Samples, Binaries and Docker Images](https://hyperledger-fabric.readthedocs.io/en/latest/install.html) in the Hyperledger Fabric documentation. Because the “bin” folder can be different for mac user / window user / linux user. 

## Running on your local machine

In fact, our application provide you full support of the docker images and all you need is to set up bin file depend on your operating system first (this can be optional),

```bash
// read the full version in
// https://hyperledger-fabric.readthedocs.io/en/release-2.5/install.html
./install-fabric.sh --fabric-version 2.2.1 binary
```

then run to bring up the test network: 

```makefile
make test-network
```

then run API server of the blockchain 

```makefile
make apiserver
```

Then you can access to the backend now on [https://locahost:8080](https://locahost:8080) 

and finally, install and run the frontend, in cas you need to see the full version of the application

```makefile
make install
make localrun
```

Now it’s online on [https://locahost:3000](https://locahost:3000)

## Running without network needed (if you don’t want to care about the network)

However, the network now is hosted on our virtual machine in digital ocean. Therefore, the good news is no need to care about the network. Just simply run the frontend, and it will automatically work like magic. 

```makefile
make install
make run
```

# 📚 Contribution

The main purpose of this repository is to continue evolving our project not only in university but also in the industry, making it faster and easier to use. We are always grateful to the community for contributing bugfixes and improvements. 

## Contribution Guide

1. Fork the repo.
2. Clone the repo.
3. Fix bugs, add function, test on your local machine.
4. Create a new branch and open a pull request to us.
5. You can also create a thread, so that we can discuss more about the repo.

## Thank You!

Thank you to all people who have dedicated their time and talent to contribute to this project!
