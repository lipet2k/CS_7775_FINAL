set -x
set -e

source ~/.bashrc

/usr/bin/python3 /root/verifiable-unlearning/src/run.py \
    --trial_name benchmarks/retraining_train \
    --technique retraining --mode train \
    --no_samples_D_prev 0 \
    --no_samples_D_plus 100 \
    --no_samples_U_prev 0 \
    --no_samples_U_plus 0 \
    --dataset_name synthetic_10 \
    --classifier linear_regression \
    --proof_system nizk

/usr/bin/python3 /root/verifiable-unlearning/src/run.py \
    --trial_name benchmarks/retraining_unlearn \
    --technique retraining --mode unlearn \
    --no_samples_D_prev 100 \
    --no_samples_D_plus 0 \
    --no_samples_U_prev 0 \
    --no_samples_U_plus 10 \
    --dataset_name synthetic_10 \
    --classifier linear_regression \
    --proof_system nizk

/usr/bin/python3 /root/verifiable-unlearning/src/run.py \
    --trial_name benchmarks/amnesiac_train \
    --technique amnesiac --mode train \
    --no_samples_D_prev 0 \
    --no_samples_D_plus 100 \
    --no_samples_U_prev 0 \
    --no_samples_U_plus 0 \
    --dataset_name synthetic_10 \
    --classifier linear_regression \
    --proof_system nizk

/usr/bin/python3 /root/verifiable-unlearning/src/run.py \
    --trial_name benchmarks/amnesiac_unlearn \
    --technique amnesiac --mode unlearn \
    --no_samples_D_prev 100 \
    --no_samples_D_plus 0 \
    --no_samples_U_prev 0 \
    --no_samples_U_plus 10 \
    --dataset_name synthetic_10 \
    --classifier linear_regression \
    --proof_system nizk

/usr/bin/python3 /root/verifiable-unlearning/src/run.py \
    --trial_name benchmarks/optimization_train \
    --technique optimization --mode train \
    --no_samples_D_prev 0 \
    --no_samples_D_plus 100 \
    --no_samples_U_prev 0 \
    --no_samples_U_plus 0 \
    --dataset_name synthetic_10 \
    --classifier linear_regression \
    --proof_system nizk

/usr/bin/python3 /root/verifiable-unlearning/src/run.py \
    --trial_name benchmarks/optimization_unlearn \
    --technique optimization --mode unlearn \
    --no_samples_D_prev 100 \
    --no_samples_D_plus 0 \
    --no_samples_U_prev 0 \
    --no_samples_U_plus 10 \
    --dataset_name synthetic_10 \
    --classifier linear_regression \
    --proof_system nizk