import { MotionConfig } from "motion/react";
import ScrollProgress from "./components/ScrollProgress";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ParentInsight from "./components/ParentInsight";
import Directions from "./components/Directions";
import AboutTeacher from "./components/AboutTeacher";
import Advantages from "./components/Advantages";
import LearningPath from "./components/LearningPath";
import LessonSteps from "./components/LessonSteps";
import ParentFeedback from "./components/ParentFeedback";
import Results from "./components/Results";
import TestimonialSlider from "./components/Testimonials";
import TrialOffer from "./components/TrialOffer";
import Faq from "./components/Faq";
import LeadForm from "./components/LeadForm";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";
import MobileCta from "./components/MobileCta";
import { PrivacyProvider } from "./components/PrivacyModal";

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <PrivacyProvider>
      <ScrollProgress />
      <a href="#main" className="skip-link">
        Перейти к содержанию
      </a>
      <Header />
      <main id="main">
        <Hero />
        <ParentInsight />
        <Directions />
        <AboutTeacher />
        <Advantages />
        <LearningPath />
        <LessonSteps />
        <ParentFeedback />
        <Results />
        <TestimonialSlider />
        <TrialOffer />
        <Faq />
        <LeadForm />
        <Contacts />
      </main>
      <Footer />
      <MobileCta />
      </PrivacyProvider>
    </MotionConfig>
  );
}

export default App;