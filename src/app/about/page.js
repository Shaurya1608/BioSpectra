'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Assets from public directory
const madhaviImg = '/assets/madhavi.jpg';
const award1Img = '/assets/award2.jpg';
const award2Img = '/assets/award2(2).jpg';
const award3Img = '/assets/award1.jpg';

const About = () => {
  return (
    <div className="pt-32 pb-12 overflow-hidden bg-[#FAFAFA]">
      {/* Trust History & Foundation */}
      <section className="py-12 bg-white relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl font-black text-slate-900 mb-6 tracking-tight text-center"
            >
              MADHAWI – SHYAM EDUCATIONAL TRUST (MSET)
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center mb-8"
            >
              <div className="p-1 bg-white border border-slate-200 shadow-sm rounded-lg mb-2">
                <Image src={madhaviImg} alt="Founders" width={400} height={200} className="rounded-md h-48 w-auto object-cover" />
              </div>
              <p className="text-[#c52c2c] font-bold text-[11px] uppercase tracking-wider">Prof. (Dr.) Mahendra Prasad & Mrs. Pali Vasudha</p>
            </motion.div>

            <div className="text-center space-y-2 mb-8 w-full">
              <p className="font-bold text-slate-800 text-sm md:text-base">
                Regn. No: 20560/IV-1815/2005 & its Life Science Academic & Research Body/Forum:
              </p>
              <p className="font-bold text-slate-900 text-sm md:text-base">
                International Consortium of Contemporary Biologists (ICCB) its official publication
              </p>
              <p className="font-bold italic text-slate-800 text-xs md:text-sm">
                BIOSPECTRA : ISSN-0973-7057 (An International Biannual Referred Journal of Life Sciences)
              </p>
            </div>

            <div className="text-slate-700 text-sm leading-relaxed text-justify mb-10 bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm">
              <p>
                The trust, <b>MADHAWI – SHYAM EDUCATIONAL TRUST (MSET)</b> established on 30th Nov. 2005 under Trust Registration Act at Ranchi, by a Senior Professor of Zoology, Late. Prof. (Dr.) Mahendra Prasad, University Department of Zoology, Ranchi University, Ranchi and Mrs. Pali Vasudha, Retd. Asst. Director (OL) O/o GMT, BSNL, Ranchi, Jharkhand (India), Resident of Village – Mahuwa, Dist – Vaishali, Bihar, (India) in 2005 in fond memory of their parents as the Almighty-the Creator & the Guru, it has to its credit, multidimensional creative activities in the field of education particularly of biological sciences with a high profile academic and research forum in the name of International Consortium of Contemporary Biologists (ICCB under MSET) created in 2008, having organized seven International Conferences so far at Ranchi, Patna, Bengaluru & other important cities of India. Several scholarships, financial help and tuition fee support as well as free education to poor children are also given by this body. It has also established life scientist memorial and foundation chair gold medal awards for outstanding researchers. The trust has another achievement to its credit in the form of publication of <i>An International Bi-annual Refereed Journal of Life Sciences</i>, <b>BIOSPECTRA : ISSN – 0973-7057</b> started in Sept. 2006.
              </p>
            </div>

            {/* Awards Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {[award1Img, award2Img, award3Img].map((imgSrc, idx) => (
                <div key={idx} className="bg-white p-2 border border-slate-200 shadow-sm rounded-xl transform hover:-translate-y-1 transition-transform group">
                  <div className="rounded-lg overflow-hidden aspect-[4/3] relative">
                    <Image src={imgSrc} alt={`Award ceremony ${idx + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
