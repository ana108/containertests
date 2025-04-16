Steps to Replicate the experiment:

Step 1: Running two talking containers on default bridge network

In repository containertests, (git clone https://github.com/ana108/containertests)

Build the container:
docker build . -t networkingcontainer

Run container 1:

docker run --name networkingcontainer5005 --rm -d -e PORT=5001 -e NEIGHBOUR=5555 -p 5001:5001 -e NEIGHBOUR_HOST=networkingcontainer5555 networkingcontainer

Run container 2: 

docker run --name networkingcontainer5555 --rm -d -e PORT=5555 -e NEIGHBOUR=5001 -e NEIGHBOUR_HOST=networkingcontainer5005 networkingcontainer

Watch logs: 
docker logs -f networkingcontainer5005

docker logs -f networkingcontainer5555

Alternatively, call get on
0.0.0.0:5001/all 
to see all inbound/outbound requests


To finish running containers, run
docker stop networkingcontainer5005
docker stop networkingcontainer5555

Step 2: Create new custom network

docker network -d bridge testcustomnetwork

Run the containers on the new network

docker run --name networkingcontainer5005 --rm -d --network testcustomnetwork -e PORT=5001 -e NEIGHBOUR=5555 -p 5001:5001 -e NEIGHBOUR_HOST=networkingcontainer5555 networkingcontainer

Run container 2: 

docker run --name networkingcontainer5555 --rm -d --network testcustomnetwork -e PORT=5555 -e NEIGHBOUR=5001 -e NEIGHBOUR_HOST=networkingcontainer5005 networkingcontainer

Watch logs
docker logs -f networkingcontainer5005

docker logs -f networkingcontainer5555
