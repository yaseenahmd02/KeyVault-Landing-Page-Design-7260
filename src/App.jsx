import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from './common/SafeIcon';
import AdminPanel from './components/AdminPanel';
import { saveWaitlistEntry, getWaitlistCount } from './utils/storage';
import './App.css';

const {
  FiUpload, 
  FiCpu, 
  FiTruck, 
  FiShield, 
  FiMapPin, 
  FiZap,
  FiCheck,
  FiChevronDown,
  FiChevronUp,
  FiStar,
  FiLock,
  FiSmartphone,
  FiMail,
  FiUser,
  FiPhone
} = FiIcons;

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: ''
  });
  const [openFaq, setOpenFaq] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Save to localStorage
      const savedEntry = saveWaitlistEntry(formData);
      
      if (savedEntry) {
        console.log('Waitlist entry saved:', savedEntry);
        setIsSubmitted(true);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          city: ''
        });
      } else {
        alert('Error saving entry. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const faqItems = [
    {
      question: "Is this safe?",
      answer: "Absolutely! We use military-grade encryption to protect your key data. Your photos are processed and then deleted, with only the encrypted 3D model stored securely in our servers."
    },
    {
      question: "What key types are supported?",
      answer: "We support most common key types including house keys, car keys, office keys, and padlock keys. Our AI can handle standard residential and commercial key profiles."
    },
    {
      question: "What if I don't like the result?",
      answer: "We offer a 100% satisfaction guarantee. If the duplicate key doesn't work perfectly, we'll remake it for free or provide a full refund."
    }
  ];

  const currentWaitlistCount = getWaitlistCount();
  const spotsLeft = Math.max(0, 50 - currentWaitlistCount);

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Logo */}
      <header className="bg-slate-900 text-white px-4 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753586904441-blob" 
              alt="KeyVault Logo" 
              className="h-10 mr-3" 
            />
            <span className="font-bold text-xl tracking-tight">KeyVault</span>
          </div>
          <motion.a 
            href="#waitlist"
            className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium text-sm shadow-md hover:bg-emerald-600 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Waitlist
          </motion.a>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section 
        className="bg-gradient-to-br from-slate-800 to-slate-900 px-4 py-16 text-center text-white"
        initial="initial"
        animate="animate"
        variants={staggerChildren}
      >
        <motion.div className="max-w-md mx-auto" variants={fadeInUp}>
          <div className="text-6xl mb-4">🔐</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Never Lose Your Key Again
          </h1>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            Upload your key photo, we back it up. Lose it later? Get a copy delivered.
          </p>
          
          {/* Limited Offer Highlight */}
          <motion.div 
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4 rounded-xl mb-6 shadow-lg"
            variants={fadeInUp}
          >
            <div className="flex items-center justify-center mb-2">
              <SafeIcon icon={FiZap} className="text-xl mr-2" />
              <span className="font-semibold">Launch Offer</span>
            </div>
            <div className="text-sm">Only ₹199 for first 50 users</div>
            <div className="text-xs opacity-90">(Regular price ₹699)</div>
            {spotsLeft > 0 && (
              <div className="text-xs mt-1 bg-white bg-opacity-20 rounded px-2 py-1">
                {spotsLeft} spots left!
              </div>
            )}
          </motion.div>

          <motion.a 
            href="#waitlist"
            className="bg-emerald-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:bg-emerald-600 transition-all duration-300 inline-block transform hover:scale-105"
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join the ₹199 Waitlist
          </motion.a>
        </motion.div>
      </motion.section>

      {/* How It Works */}
      <motion.section 
        className="py-16 px-4 bg-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="max-w-md mx-auto">
          <motion.h2 
            className="text-2xl font-bold text-center text-slate-900 mb-12"
            variants={fadeInUp}
          >
            How It Works
          </motion.h2>
          
          <div className="space-y-8">
            {[
              {
                icon: FiUpload,
                step: "1",
                title: "Upload Key Photo",
                description: "Take a clear photo of your key from both sides"
              },
              {
                icon: FiCpu,
                step: "2", 
                title: "AI Creates 3D Model",
                description: "Our AI securely processes and stores your key pattern"
              },
              {
                icon: FiTruck,
                step: "3",
                title: "Reorder Anytime",
                description: "Get physical duplicates delivered in 2 days"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="flex items-start space-x-4"
                variants={fadeInUp}
              >
                <div className="bg-emerald-100 p-3 rounded-full flex-shrink-0">
                  <SafeIcon icon={item.icon} className="text-emerald-600 text-xl" />
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <span className="bg-emerald-600 text-white text-sm font-bold px-2 py-1 rounded-full mr-3">
                      {item.step}
                    </span>
                    <h3 className="font-semibold text-slate-800">{item.title}</h3>
                  </div>
                  <p className="text-slate-600 text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Trust Section */}
      <motion.section 
        className="py-12 px-4 bg-slate-100"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="max-w-md mx-auto">
          <motion.div 
            className="grid grid-cols-1 gap-4"
            variants={fadeInUp}
          >
            {[
              { icon: FiShield, text: "Military-grade encryption" },
              { icon: FiMapPin, text: "Made in India" },
              { icon: FiTruck, text: "Fast 2-day delivery" },
              { icon: FiStar, text: "100% satisfaction guarantee" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="flex items-center justify-center space-x-3 bg-white p-4 rounded-lg shadow-sm border border-slate-200"
                variants={fadeInUp}
              >
                <SafeIcon icon={item.icon} className="text-emerald-600 text-lg" />
                <span className="text-slate-700 font-medium text-sm">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        className="py-16 px-4 bg-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="max-w-md mx-auto">
          <motion.h2 
            className="text-2xl font-bold text-center text-slate-900 mb-8"
            variants={fadeInUp}
          >
            Frequently Asked Questions
          </motion.h2>
          
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div 
                key={index}
                className="border border-slate-200 rounded-lg overflow-hidden"
                variants={fadeInUp}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-4 py-4 text-left flex items-center justify-between bg-white hover:bg-slate-50 transition-colors"
                >
                  <span className="font-medium text-slate-800">{item.question}</span>
                  <SafeIcon 
                    icon={openFaq === index ? FiChevronUp : FiChevronDown} 
                    className="text-slate-500" 
                  />
                </button>
                {openFaq === index && (
                  <motion.div 
                    className="px-4 py-4 bg-slate-50 border-t border-slate-200"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-slate-600 text-sm leading-relaxed">{item.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Waitlist Form */}
      <motion.section 
        id="waitlist"
        className="py-16 px-4 bg-slate-900"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="max-w-md mx-auto">
          <motion.div className="text-center mb-8" variants={fadeInUp}>
            <SafeIcon icon={FiLock} className="text-white text-4xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Join the Waitlist
            </h2>
            <p className="text-slate-300">
              Lock in your ₹199 launch price today
            </p>
            {currentWaitlistCount > 0 && (
              <p className="text-emerald-400 text-sm mt-2">
                {currentWaitlistCount} people have already joined!
              </p>
            )}
          </motion.div>

          {!isSubmitted ? (
            <motion.form 
              onSubmit={handleSubmit}
              className="space-y-4"
              variants={fadeInUp}
            >
              <div className="relative">
                <SafeIcon icon={FiUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none placeholder:text-slate-400"
                />
              </div>
              
              <div className="relative">
                <SafeIcon icon={FiMail} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none placeholder:text-slate-400"
                />
              </div>
              
              <div className="relative">
                <SafeIcon icon={FiPhone} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none placeholder:text-slate-400"
                />
              </div>
              
              <div className="relative">
                <SafeIcon icon={FiMapPin} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none placeholder:text-slate-400"
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-500 text-white py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-emerald-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? 'Joining...' : 'Join Now & Lock in ₹199'}
              </motion.button>
            </motion.form>
          ) : (
            <motion.div 
              className="text-center bg-slate-800 border border-slate-700 rounded-lg p-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <SafeIcon icon={FiCheck} className="text-emerald-500 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">You're In!</h3>
              <p className="text-slate-300">
                Thanks for joining the waitlist. We'll notify you when KeyVault launches!
              </p>
              <p className="text-emerald-400 text-sm mt-2">
                You're #{currentWaitlistCount} on the list
              </p>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 px-4 text-center border-t border-slate-800">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center items-center mb-4">
            <img 
              src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753586904441-blob" 
              alt="KeyVault Logo" 
              className="h-8 mr-2" 
            />
            <span className="font-bold">KeyVault</span>
          </div>
          <p className="text-slate-400 text-sm">
            © 2024 KeyVault. Secure key backup made simple.
          </p>
        </div>
      </footer>

      {/* Admin Panel */}
      <AdminPanel />
    </div>
  );
}

export default App;