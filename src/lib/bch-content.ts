import {
  Activity,
  Ambulance,
  Baby,
  Brain,
  Building2,
  Eye,
  FlaskConical,
  HeartPulse,
  Microscope,
  Pill,
  ShieldPlus,
  Stethoscope,
  Syringe,
  Users,
} from "lucide-react";

export const services = [
  {
    name: "Outpatient Care",
    description: "General consultation, specialist clinics and referrals for adults and children.",
    icon: Stethoscope,
  },
  {
    name: "Adult Inpatient Care",
    description: "A 31-bed unit providing continuous medical care and supported recovery.",
    icon: Building2,
  },
  {
    name: "Child Health",
    description: "A 38-bed children’s ward, neonatal care and paediatric treatment.",
    icon: Baby,
  },
  {
    name: "Maternal Health",
    description:
      "Antenatal, delivery, postnatal and emergency obstetric care, supported by a mothers’ waiting hostel.",
    icon: HeartPulse,
  },
  {
    name: "Surgery",
    description:
      "A 24-hour theatre supporting general, orthopaedic, obstetric, gynaecological and other procedures.",
    icon: Activity,
  },
  {
    name: "Diagnostics & Laboratory",
    description: "Laboratory testing, radiology and imaging supporting timely clinical decisions.",
    icon: FlaskConical,
  },
  {
    name: "HIV/AIDS & TB Care",
    description:
      "Testing, treatment, counselling and long-term follow-up in hospital and community settings.",
    icon: ShieldPlus,
  },
  {
    name: "Community Health & Batwa",
    description:
      "Preventive care and outreach across 101 villages, including dedicated Batwa community programs.",
    icon: Users,
  },
  {
    name: "Mental Health",
    description:
      "Counselling, clinical care and community-based rehabilitation, including alcohol-related support.",
    icon: Brain,
  },
  {
    name: "Dental & Eye Care",
    description: "Preventive, diagnostic and treatment services for oral and visual health.",
    icon: Eye,
  },
  {
    name: "Pharmacy",
    description: "On-site medicines and prescription support integrated with hospital care.",
    icon: Pill,
  },
  {
    name: "Emergency & Ambulance",
    description: "Accident and emergency response, stabilization, transport and referral support.",
    icon: Ambulance,
  },
  {
    name: "Youth-Friendly Services",
    description: "Confidential, age-appropriate health information, counselling and clinical care.",
    icon: Syringe,
  },
  {
    name: "eQuality Health Insurance",
    description: "A community health insurance scheme designed to make care more affordable.",
    icon: ShieldPlus,
  },
];

export const departments = [
  {
    name: "Child Health",
    description: "Paediatric and neonatal services for children from birth through adolescence.",
    offerings: ["Children’s ward", "Neonatal care", "Nutrition support"],
  },
  {
    name: "Sexual & Reproductive Health",
    description: "Comprehensive maternal, reproductive and newborn care for women and families.",
    offerings: ["Antenatal clinics", "Maternity", "Family planning"],
  },
  {
    name: "Surgical Services",
    description:
      "Safe planned and emergency surgical care with a theatre available around the clock.",
    offerings: ["General surgery", "Orthopaedics", "Obstetric surgery"],
  },
  {
    name: "Adult Inpatient",
    description: "Medical assessment, treatment and recovery support in a dedicated 31-bed unit.",
    offerings: ["Medical admissions", "Premium rooms", "Referral care"],
    lead: "Dr. Mugisha Obed",
  },
  {
    name: "Outpatients",
    description:
      "The first point of care for consultation, review, specialist clinics and referral.",
    offerings: ["General clinic", "Specialist clinics", "Physiotherapy"],
    lead: "Mbabazi Shamim",
  },
  {
    name: "Diagnostics",
    description:
      "Laboratory, radiology and imaging services for patients and referring facilities.",
    offerings: ["Clinical laboratory", "Radiology", "Imaging"],
  },
  {
    name: "Community Health & Batwa",
    description: "Community-led prevention, outreach and referral across BCH’s catchment area.",
    offerings: ["Village outreach", "Batwa health", "Mental health"],
    lead: "Kuule Yusufu",
  },
  {
    name: "HIV & Chronic Care",
    description:
      "Long-term, confidential treatment and support for HIV, TB and chronic conditions.",
    offerings: ["ART clinic", "TB care", "Viral load follow-up"],
  },
];

export const team = [
  { name: "Dr. Charlotte Aguti Ongom", role: "Executive Director" },
  { name: "Dr. Birungi Mutahunga", role: "Executive Advisor" },
  { name: "Can. Dr. Scott Kellermann", role: "Hospital Founder" },
  { name: "Dr. Patrick Mutegeki", role: "Director Clinical Services / Physician" },
  { name: "Ms Doreen Atukunda", role: "Human Resource Manager" },
  { name: "Robert Kamugisha", role: "Principal, Uganda Nursing School Bwindi" },
  { name: "Onesmus Keizire", role: "Principal, Uganda College of Health Sciences Bwindi" },
  { name: "Kuule Yusufu", role: "Community Health & Batwa Lead" },
  { name: "Aryatunga Brian", role: "Head, eQuality Health Scheme" },
  { name: "Nkuuhe Derrick", role: "Finance Manager" },
  { name: "Naturinda Patrick", role: "IT Manager" },
  { name: "Oyesiga Barnabas", role: "Communications Lead" },
  { name: "Dr. Mugisha Obed", role: "Head, Adult Inpatient" },
  { name: "Mbabazi Shamim", role: "Head, Outpatients" },
  { name: "Daniel Jamison", role: "Guest House Manager" },
  { name: "Joram Harerimaana", role: "Byumba Health Centre II" },
  { name: "Musiimenta Judith", role: "Kanyashogye Health Centre II" },
];

export const contact = {
  phoneDisplay: "+256 (0) 392 880 242",
  phoneHref: "tel:+256392880242",
  email: "bwindicommunityhospital@gmail.com",
  address: "P.O. Box 58, Kanungu, Uganda",
};
