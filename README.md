# Verifiable Machine Unlearning

## Abstract
In recent years, user information - both non-confidential and sensitive data - have been collected and utilized to train complex models, introducing serious privacy concerns. Luckily, new regulatory advancements, such as the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), have empowered users to revoke access to their personal data. However, this is not a straightforward task, retraining models can be difficult and expensive, and standard methods of machine unlearning do not exist. Unlearning trained data points require either retraining models from scratch or methods with probabilistic guarantees. This introduces a distinctive issue: how can a user ensure a data point(s) unlearning request was actually fulfilled by a server? Furthermore, it poses the question of how a potentially malicious server can prove to the user that their data point(s) were unlearned in accordance with an agreed upon method. We solve these problems by implementing the SISA framework (Bourtoule et al. 2020) using cryptographic methods of proving unlearning and non-membership (Eisenhofer et al. 2022).

## Run locally
```
docker compose up --build
```