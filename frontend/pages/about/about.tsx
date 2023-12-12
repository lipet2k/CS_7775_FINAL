import Layout from '@/components/Layout';
import { ReactElement } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { InformationCircleIcon, BookOpenIcon, AcademicCapIcon } from '@heroicons/react/20/solid'

export default function About() {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-red-600">Erasify</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Verifiable Machine Unlearning</h1>
        <p className="mt-6 text-xl leading-8">
          The right to be forgotten sets the precedent for companies to delete private data upon users&apos; requests. However, the ability of machine learning models to learn and retain information from the features extracted from user data complicates this task. Data points can be encoded into the weights of the model, although it is unclear the amount of leakage from these learned data points. This dilemma proves to be a difficult problem when making unlearning requests.
        </p>
        <div className="mt-10 max-w-2xl">
          <h2 className="mb-10 text-2xl font-bold tracking-tight text-gray-900">Background</h2>
          <p>
          In recent years, user information - both non-confidential and sensitive data - have been collected and utilized to train complex models, introducing serious privacy concerns. Luckily, new regulatory advancements, such as the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), have empowered users to revoke access to their personal data. However, this is not a straightforward task, retraining models can be difficult and expensive and standard methods of machine unlearning do not exist. Unlearning trained data points require either retraining models from scratch or probabilistic methods. This process introduces a distinctive issue: how can a user ensure a data point(s) unlearning request was actually fulfilled by a server? Furthermore, it poses the question of how the server proves to the user that their data point(s) was unlearned in accordance with an agreed upon method.
          </p>
          <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
            <li className="flex gap-x-3">
              <BookOpenIcon className="mt-1 h-5 w-5 flex-none text-red-600" aria-hidden="true" />
              <span>
                <strong className="font-semibold text-gray-900">Question:</strong> How can a user ensure a data point(s) unlearning request was actually fulfilled by a server?
              </span>
            </li>
          </ul>
          <p className="mt-8">
          This dilemma proves to be a difficult problem when making unlearning requests. Maintainers may have to completely retrain their models to exclude specific data points. Even so, there are no provable guarantees that a requested data point is deleted from a specific model. Several techniques have been introduced that circumvents the necessity of training from scratch. We implement the Shared Isolated Sharded and Aggregated (SISA) framework introduced by Bourtoule et al. (2020) to expedite the retraining process. Our unlearned model is re-trained from a checkpoint without the specified data point and ensembled with the remaining sharded model. 
          </p>
          <p className="mt-8">
          To prove to users the unlearning process, we borrow the interactive proof system from cryptography. In this protocol, a prover (P) attempts to convince a verifier (V) that a statement is true. In this case, we need to prove that the user’s requested data point(s) is absent from the unlearned model and that the computation of the unlearning is consistent with the agreed upon method. To cryptographically prove both model unlearning and non-membership of the data point in the retrained data set we utilize the SNARK (Succinct Non-Interactive Argument of Knowledge) based verifiable computational model introduced by Eisenhofer et al. SNARKs provide an efficient method of verifying the generated proof; thereby offsetting the computation to the maintainer/prover of the model.
          </p>
          <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
            <li className="flex gap-x-3">
              <BookOpenIcon className="mt-1 h-5 w-5 flex-none text-red-600" aria-hidden="true" />
              <span>
                <strong className="font-semibold text-gray-900">Definition: </strong> A SNARK is a Succinct Non-Interactive Argument of Knowledge
              </span>
            </li>
          </ul>
          <p className="mt-8">
          Much of the current literature surrounding unlearning verification rely on probabilistic methods and don&apos;t provide any theoretical guarantees of unlearning (Ngyuen et al. 2022). Eisenhofer et al. (2022) proposed methods reliant on verifiable proof systems (SNARKs), to prove to the user that an update occurred and that a data point was unlearned. These methods were built using the Spartan (Setty 2019) back-end and tested on simple models (logistic regression, linear regression, and small neural networks). Other related works such as (Weng et al. 2022) utilized a hardware approach through secure enclaves. Weng et al. demonstrated verifiable machine unlearning using the SISA (Bourtoule et al. 2020) framework. Our proposed work hopes to bridge the two aforementioned works, utilizing SNARKs and the SISA framework to provide theoretically guaranteed verifiable machine unlearning systems.
          </p>
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Bonus: Zero Knowledge Proofs</h2>
          <p className="mt-6">
            Imagine that you are a spy for the United Federation of Cryptographers (UFC) and you are trying to convince another
            agent that you are a secret agent for the UFC. However, on the off chance that this other spy is actually a double-agent
            for the Black Hat Destroyers - you don&apos;t want to reveal any top secret information to the enemy. Can you come up with a
            method to convince the other spy that you are a UFC agent without revealing any information about the UFC?
          </p>
          <figure className="mt-10 border-l border-red-600 pl-9">
            <blockquote className="font-semibold text-gray-900">
              <p>
                &quot;If you have no doubt in what you are about to do, you are not pushing yourself hard enough.&quot;
              </p>
            </blockquote>
            <figcaption className="mt-6 flex gap-x-4">
              <Image
                className="h-6 w-6 flex-none rounded-full bg-gray-50"
                src="/images/silvio_micali.jpeg"
                alt="Silvio Micali"
                width={500}
                height={500}
              />
              <div className="text-sm leading-6">
                <strong className="font-semibold text-gray-900">Silvio Micali</strong> – Co-Inventor of the Zero Knowledge Proof
              </div>
            </figcaption>
          </figure>
          <p className="mt-10">
            The solution would be to create a zero knowledge proof. Zero knowledge proofs are a method of provind the validity of a
            statement without revealing the statement or any additional information. The you (the UFC spy) could create a zero knowledge
            proof proving knowledge of a secret UFC password. The suspected secret agent would then be able to verify the validity of the
            proof. If the proof the valid (and the resulting output of the proof is true), then the suspected agent would be convinced that you are a UFC agent. However, if the proof is invalid (or the resulting output of the proof is false), then the suspected agent would not be convinced that you are a UFC agent. The beauty of zero knowledge proofs means that the suspected agent never learns the UFC password or any other extra information about the UFC.
          </p>
        </div>
        <figure className="mt-16">
          <iframe
            className="aspect-video rounded-xl bg-gray-50 object-cover w-[20rem] h-[20rem] md:w-[30rem] md:h-[30rem] lg:w-[40rem] lg:h-[40rem]"
            src="https://www.wired.com/video/watch/5-levels-zero-knowledge-proof?mute=1"

          />

          <figcaption className="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
            <InformationCircleIcon className="mt-0.5 h-5 w-5 flex-none text-gray-300" aria-hidden="true" />
            Computer scientist Amit Sahai, PhD explains zero knowledge proofs on WIRED
          </figcaption>
        </figure>
        <div className="mt-16 max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Everything you need to get up and running</h2>
          <p className="mt-6">
            Now that you know a little more about machine learning and SNARKs, you&apos;re ready to get started. This demo project
            let&apos;s you unlearn a personal identifiable datapoint from a trained neural network model. You can check it out at the  <Link href='/demo' className="font-bold">/demo</Link> tab.
          </p>
          <p className="mt-8">
            While our construction is not zero knowledge, it utilizes the succinctness of SNARKs to generate a proof of the unlearning 
            process. Check it out!
          </p>
        </div>
        <div className="mt-16 max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Sources</h2>
          <ul role="list" className="mt-8 max-w-xl space-y-4 text-gray-600">
            <li className="flex gap-x-3">
              <AcademicCapIcon className="mt-1 h-5 w-5 flex-none text-red-600" aria-hidden="true" />
              <span>https://www.wired.com/video/watch/5-levels-zero-knowledge-proof</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}


About.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}