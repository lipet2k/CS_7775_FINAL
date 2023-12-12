# Verifiable and Provably Secure Machine Unlearning

This is the starter code repository accompaning the paper [Verifiable and Provably Secure Machine Unlearning](https://arxiv.org/abs/2210.09126). We build upon the work of Eisenhofer et al. by implementing SISA.

## Evaluation

We implemented our framework based on [CirC](https://github.com/circify/circ/) and [Spartan](https://github.com/microsoft/Spartan). For ease of use, we included a Dockerfile with all necessary tools to reproduce the results from the paper. It can be build via

```
git clone https://github.com/cleverhans-lab/verifiable-unlearning verifiable-unlearning
cd verifiable-unlearning; ./docker.sh build
```

Beside building, the `docker.sh` script allows to spawn a shell in the container:

```
./docker.sh shell 
```

or run the evaluation:

```
./docker.sh eval 
```
