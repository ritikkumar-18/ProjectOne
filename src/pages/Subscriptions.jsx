// // import React, { useState } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import toast, { Toaster } from "react-hot-toast";
// // import { FaCheckCircle, FaTimes, FaCreditCard, FaWallet, FaUniversity, FaMoneyBillWave } from "react-icons/fa";

// // // Subscription Plan Component
// // const SubscriptionPlan = ({ plan, onSelect }) => (
// //   <motion.div
// //     initial={{ opacity: 0, y: 50 }}
// //     animate={{ opacity: 1, y: 0 }}
// //     transition={{ duration: 0.5 }}
// //     className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex-1 mx-4 hover:shadow-xl transition-shadow duration-300"
// //   >
// //     <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
// //     <p className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-4">
// //       ₹{plan.price} <span className="text-lg font-normal text-gray-500 dark:text-gray-400">/{plan.duration}</span>
// //     </p>
// //     <ul className="space-y-3 mb-6">
// //       {plan.features.map((feature, index) => (
// //         <motion.li
// //           key={index}
// //           initial={{ opacity: 0, x: -20 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           transition={{ delay: index * 0.1 }}
// //           className="flex items-center text-gray-700 dark:text-gray-300"
// //         >
// //           <FaCheckCircle className="text-green-500 mr-2" />
// //           {feature}
// //         </motion.li>
// //       ))}
// //     </ul>
// //     <motion.button
// //       whileHover={{ scale: 1.05 }}
// //       whileTap={{ scale: 0.95 }}
// //       onClick={() => onSelect(plan)}
// //       className="w-full py-3 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white rounded-lg font-medium transition-all duration-200 shadow-md"
// //     >
// //       Buy Now
// //     </motion.button>
// //   </motion.div>
// // );

// // // Payment Gateway Modal Component
// // const PaymentGatewayModal = ({ isOpen, onClose, plan }) => {
// //   const [selectedOption, setSelectedOption] = useState("UPI");
// //   const [upiId, setUpiId] = useState("");

// //   const handlePayment = () => {
// //     if (selectedOption === "UPI" && !upiId) {
// //       toast.error("Please enter a valid UPI ID");
// //       return;
// //     }
// //     // Simulate payment processing
// //     setTimeout(() => {
// //       toast.success(`Payment of ₹${plan.price} for ${plan.name} successful!`, {
// //         style: { background: "#10B981", color: "#fff" },
// //       });
// //       onClose();
// //     }, 1000);
// //   };

// //   const paymentOptions = [
// //     { name: "UPI", icon: "💳", apps: ["PhonePe", "G Pay", "Paytm", "BHIM"] },
// //     { name: "Wallets", icon: <FaWallet className="text-gray-700 dark:text-gray-300" />, price: plan.price },
// //     { name: "Debit/Credit Cards", icon: <FaCreditCard className="text-gray-700 dark:text-gray-300" />, price: plan.price },
// //     { name: "Netbanking", icon: <FaUniversity className="text-gray-700 dark:text-gray-300" />, price: plan.price },
// //     { name: "Bank Transfer", icon: "🏦", price: plan.price },
// //   ];

// //   return (
// //     <AnimatePresence>
// //       {isOpen && (
// //         <motion.div
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           exit={{ opacity: 0 }}
// //           transition={{ duration: 0.3 }}
// //           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 "
// //         >
// //           <motion.div
// //             initial={{ scale: 0.9, opacity: 0 }}
// //             animate={{ scale: 1, opacity: 1 }}
// //             exit={{ scale: 0.9, opacity: 0 }}
// //             transition={{ duration: 0.3 }}
// //             className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-md relative"
// //           >
// //             {/* Close Button */}
// //             <motion.button
// //               whileHover={{ scale: 1.1 }}
// //               whileTap={{ scale: 0.9 }}
// //               onClick={onClose}
// //               className="absolute top-2 right-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
// //               aria-label="Close payment modal"
// //             >
// //               <FaTimes className="h-6 w-6" />
// //             </motion.button>

// //             {/* Header */}
// //             <div className="flex items-center justify-between mb-4">
// //               <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Options</h2>
// //               <p className="text-lg font-semibold text-gray-900 dark:text-white">₹{plan.price}</p>
// //             </div>

// //             {/* Payment Options */}
// //             <div className="space-y-3 mb-4">
// //               {paymentOptions.map((option) => (
// //                 <motion.div
// //                   key={option.name}
// //                   whileHover={{ scale: 1.02 }}
// //                   className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors duration-200 ${
// //                     selectedOption === option.name
// //                       ? "bg-blue-100 dark:bg-blue-900 border border-blue-500"
// //                       : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
// //                   }`}
// //                   onClick={() => setSelectedOption(option.name)}
// //                 >
// //                   <div className="flex items-center">
// //                     <span className="text-2xl mr-3">{option.icon}</span>
// //                     <div>
// //                       <p className="text-gray-900 dark:text-white font-medium">{option.name}</p>
// //                       {option.apps && (
// //                         <div className="flex space-x-2 mt-1">
// //                           {option.apps.map((app) => (
// //                             <span key={app} className="text-sm text-gray-500 dark:text-gray-400">
// //                               {app}
// //                             </span>
// //                           ))}
// //                         </div>
// //                       )}
// //                       {option.emi && (
// //                         <p className="text-sm text-gray-500 dark:text-gray-400">
// //                           ₹{option.price} Now {option.emi}
// //                         </p>
// //                       )}
// //                     </div>
// //                   </div>
// //                   {!option.apps && !option.emi && (
// //                     <p className="text-gray-900 dark:text-white font-medium">₹{option.price}</p>
// //                   )}
// //                 </motion.div>
// //               ))}
// //             </div>

// //             {/* UPI ID Input */}
// //             {selectedOption === "UPI" && (
// //               <motion.div
// //                 initial={{ height: 0, opacity: 0 }}
// //                 animate={{ height: "auto", opacity: 1 }}
// //                 transition={{ duration: 0.3 }}
// //                 className="mb-4"
// //               >
// //                 <div className="relative">
// //                   <input
// //                     type="text"
// //                     value={upiId}
// //                     onChange={(e) => setUpiId(e.target.value)}
// //                     placeholder="Enter your UPI ID"
// //                     className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
// //                     aria-label="UPI ID input"
// //                   />
// //                 </div>
// //                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
// //                   You will receive a payment request on your UPI app
// //                 </p>
// //               </motion.div>
// //             )}

// //             {/* Pay Button */}
// //             <motion.button
// //               whileHover={{ scale: 1.05 }}
// //               whileTap={{ scale: 0.95 }}
// //               onClick={handlePayment}
// //               className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-all duration-200 shadow-md"
// //               aria-label={`Pay ₹${plan.price}`}
// //             >
// //               Pay ₹{plan.price}
// //             </motion.button>
// //           </motion.div>
// //         </motion.div>
// //       )}
// //     </AnimatePresence>
// //   );
// // };

// // // Main Subscriptions Page Component
// // const Subscriptions = () => {
// //   const [selectedPlan, setSelectedPlan] = useState(null);

// //   const plans = [
// //     {
// //       name: "Basic Plan",
// //       price: 499,
// //       duration: "month",
// //       features: ["Access to Core Features", "Email Support", "5 Projects", "Basic Analytics"],
// //     },
// //     {
// //       name: "Pro Plan",
// //       price: 999,
// //       duration: "month",
// //       features: ["All Basic Features", "Priority Support", "20 Projects", "Advanced Analytics", "API Access"],
// //     },
// //     {
// //       name: "Enterprise Plan",
// //       price: 1999,
// //       duration: "month",
// //       features: ["All Pro Features", "Dedicated Support", "Unlimited Projects", "Custom Integrations", "Premium Analytics"],
// //     },
// //   ];

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
// //       <Toaster position="top-right" />
// //       <motion.div
// //         initial={{ opacity: 0 }}
// //         animate={{ opacity: 1 }}
// //         transition={{ duration: 0.5 }}
// //         className="max-w-7xl mx-auto"
// //       >
// //         {/* Header */}
// //         <div className="text-center mb-12">
// //           <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
// //             Choose Your Subscription Plan
// //           </h1>
// //           <p className="text-lg text-gray-600 dark:text-gray-400">
// //             Unlock the full potential of our tech platform with a plan that suits your needs.
// //           </p>
// //         </div>

// //         {/* Plans */}
// //         <div className="flex flex-col md:flex-row gap-6">
// //           {plans.map((plan) => (
// //             <SubscriptionPlan key={plan.name} plan={plan} onSelect={setSelectedPlan} />
// //           ))}
// //         </div>

// //         {/* Payment Gateway Modal */}
// //         <PaymentGatewayModal
// //           isOpen={!!selectedPlan}
// //           onClose={() => setSelectedPlan(null)}
// //           plan={selectedPlan || { price: 0, name: "" }}
// //         />
// //       </motion.div>
// //     </div>
// //   );
// // };

// // export default Subscriptions;
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { toast, Toaster } from "react-hot-toast"
import {
  Check,
  X,
  CreditCard,
  Wallet,
  Building,
  DollarSign,
  ShieldCheck,
  Clock,
  Award,
  Sparkles,
  Rocket,
  Users,
  Database,
  Cloud,
  Headphones,
  ChevronRight,
  ChevronDown,
  Lock,
  AlertCircle,
  CheckCircle,
  Smartphone,
  ArrowRight,
  Star,
  Zap,
  Shield,
  Layers,
  Briefcase,
  Globe,
  HelpCircle,
  Tag,
  Percent,
} from "lucide-react"


// Subscription Plan Component
const SubscriptionPlan = ({ plan, onSelect, isPopular, isAnnual }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex-1 min-w-[280px] hover:shadow-xl transition-shadow duration-300 relative ${
        isPopular ? "border-2 border-blue-500 dark:border-blue-400" : "border border-gray-200 dark:border-gray-700"
      }`}
    >
      {isPopular && (
        <div className="absolute top-0 right-0">
          <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">MOST POPULAR</div>
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center mb-4">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
              plan.color === "blue"
                ? "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
                : plan.color === "purple"
                  ? "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
                  : "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400"
            }`}
          >
            {plan.icon}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
        </div>

        <div className="mb-4">
          <div className="flex items-baseline">
            <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
              ₹{plan.price.toLocaleString()}
            </span>
            <span className="text-lg font-normal text-gray-500 dark:text-gray-400 ml-2">
              /{isAnnual ? "year" : "month"}
            </span>
          </div>
          {isAnnual && plan.discount && (
            <div className="mt-1 inline-flex items-center bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-2 py-1 rounded-full text-xs font-medium">
              <Percent className="h-3 w-3 mr-1" />
              {plan.discount}
            </div>
          )}
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">{plan.description}</p>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 my-4 pt-4">
          <ul className="space-y-3">
            {plan.features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start text-gray-700 dark:text-gray-300"
              >
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </motion.li>
            ))}
            {plan.notIncluded?.map((feature, index) => (
              <motion.li
                key={`not-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (plan.features.length + index) * 0.1 }}
                className="flex items-start text-gray-400 dark:text-gray-500"
              >
                <X className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect(plan)}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 shadow-md flex items-center justify-center ${
            isPopular
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
              : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
          }`}
        >
          Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

// UPI App Selection Component
const UpiAppSelection = ({ selectedApp, onSelectApp }) => {
  const upiApps = [
    {
      id: "phonepe",
      name: "PhonePe",
      icon: "https://imgs.search.brave.com/dT0xh2JIoRoq0yMYKoy2518OhHOjj9yG32bFNJNRoic/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/YnJhbmRmZXRjaC5p/by9pZGNFME9kRzhp/L3RoZW1lL2Rhcmsv/c3ltYm9sLnN2Zz9j/PTFieGlkNjRNdXA3/YWN6ZXdTQVlNWCZ0/PTE2NjgwNzUxOTA1/ODM",
      color: "#5F259F",
    },
    {
      id: "gpay",
      name: "Google Pay",
      icon: "https://imgs.search.brave.com/xxxnyy_HWO8AdF5ZlNCZG_b0xl5cvaChcP0pofxJW8E/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bG9nby53aW5lL2Ev/bG9nby9Hb29nbGVf/UGF5L0dvb2dsZV9Q/YXktTG9nby53aW5l/LnN2Zw",
      color: "#4285F4",
    },
    {
      id: "paytm",
      name: "Paytm",
      icon: "https://imgs.search.brave.com/C_0XNC5c91Ud6rfNUeiZQptlku1FjAFQBLoH8ybUSig/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bG9nby53aW5lL2Ev/bG9nby9QYXl0bS9Q/YXl0bS1Mb2dvLndp/bmUuc3Zn",
      color: "#00BAF2",
    },
    {
      id: "bhim",
      name: "BHIM",
      icon: "https://imgs.search.brave.com/tU2uABL3iAW6LS6w044l4OoLHENg0GUECrEtBDy-6Dw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91eHdp/bmcuY29tL3dwLWNv/bnRlbnQvdGhlbWVz/L3V4d2luZy9kb3du/bG9hZC9icmFuZHMt/YW5kLXNvY2lhbC1t/ZWRpYS9iaGltLXVw/aS1pY29uLnBuZw",
      color: "#F47920",
    },
  ]

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {upiApps.map((app) => (
        <div
          key={app.id}
          className={`flex flex-col items-center cursor-pointer ${
            selectedApp === app.id ? "scale-110" : ""
          } transition-transform duration-200`}
          onClick={() => onSelectApp(app.id)}
        >
          <div
            className={`w-14 h-14 rounded-lg flex items-center justify-center mb-2 p-2 ${
              selectedApp === app.id
                ? "ring-2 ring-blue-500 ring-offset-2"
                : "border border-gray-200 dark:border-gray-700"
            }`}
            style={{ backgroundColor: "white" }}
          >
            <img src={app.icon || "/placeholder.svg"} alt={app.name} className="max-w-full max-h-full object-contain" />
          </div>
          <span className="text-xs text-gray-700 dark:text-gray-300">{app.name}</span>
        </div>
      ))}
    </div>
  )
}

// UPI PIN Input Component
const UpiPinInput = ({ onPinComplete }) => {
  const [pin, setPin] = useState(["", "", "", ""])
  const [isPinComplete, setIsPinComplete] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handlePinChange = (index, value) => {
    if (value === "" || /^[0-9]$/.test(value)) {
      const newPin = [...pin]
      newPin[index] = value
      setPin(newPin)

      // Auto-focus next input
      if (value !== "" && index < 3) {
        document.getElementById(`pin-${index + 1}`).focus()
      }

      // Check if PIN is complete
      setIsPinComplete(newPin.every((digit) => digit !== ""))
    }
  }

  const handleSubmit = () => {
    if (!isPinComplete) return

    setIsProcessing(true)

    // Simulate PIN verification
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)

      // Notify parent component
      setTimeout(() => {
        onPinComplete()
      }, 1000)
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-2">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Enter UPI PIN</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Please enter your 4-digit UPI PIN to authorize payment
        </p>
      </div>

      <div className="flex justify-center space-x-3 mb-4">
        {pin.map((digit, index) => (
          <input
            key={index}
            id={`pin-${index}`}
            type="password"
            value={digit}
            onChange={(e) => handlePinChange(index, e.target.value)}
            className="w-12 h-12 text-center text-xl font-bold border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            maxLength={1}
            autoComplete="off"
          />
        ))}
      </div>

      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={!isPinComplete || isProcessing || isSuccess}
          className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
            !isPinComplete
              ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              : isSuccess
                ? "bg-green-500 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isProcessing ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Verifying...
            </>
          ) : isSuccess ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Verified
            </>
          ) : (
            "Verify PIN"
          )}
        </motion.button>
      </div>

      <div className="text-center mt-4">
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Forgot UPI PIN?</button>
      </div>
    </div>
  )
}

// Card Payment Component
const CardPaymentForm = ({ onPaymentComplete }) => {
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    // Format card number with spaces
    if (name === "number") {
      const formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
        .slice(0, 19)
      setCardDetails({ ...cardDetails, [name]: formattedValue })
      return
    }

    // Format expiry date
    if (name === "expiry") {
      const formattedValue = value
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d)/, "$1/$2")
        .slice(0, 5)
      setCardDetails({ ...cardDetails, [name]: formattedValue })
      return
    }

    // CVV - only numbers, max 3 digits
    if (name === "cvv") {
      const formattedValue = value.replace(/\D/g, "").slice(0, 3)
      setCardDetails({ ...cardDetails, [name]: formattedValue })
      return
    }

    setCardDetails({ ...cardDetails, [name]: value })
  }

  const isFormValid = () => {
    return (
      cardDetails.number.replace(/\s/g, "").length === 16 &&
      cardDetails.name.trim() !== "" &&
      cardDetails.expiry.length === 5 &&
      cardDetails.cvv.length === 3
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isFormValid()) return

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)

      // Notify parent component
      setTimeout(() => {
        onPaymentComplete()
      }, 1000)
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Card Number
        </label>
        <div className="relative">
          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            id="card-number"
            name="number"
            type="text"
            value={cardDetails.number}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="card-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Cardholder Name
        </label>
        <input
          id="card-name"
          name="name"
          type="text"
          value={cardDetails.name}
          onChange={handleChange}
          placeholder="John Doe"
          className="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="card-expiry" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Expiry Date
          </label>
          <input
            id="card-expiry"
            name="expiry"
            type="text"
            value={cardDetails.expiry}
            onChange={handleChange}
            placeholder="MM/YY"
            className="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="card-cvv" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            CVV
          </label>
          <div className="relative">
            <input
              id="card-cvv"
              name="cvv"
              type="password"
              value={cardDetails.cvv}
              onChange={handleChange}
              placeholder="123"
              className="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={!isFormValid() || isProcessing || isSuccess}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
            !isFormValid()
              ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              : isSuccess
                ? "bg-green-500 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isProcessing ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : isSuccess ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Payment Successful
            </>
          ) : (
            "Pay Now"
          )}
        </motion.button>
      </div>

      <div className="flex items-center justify-center space-x-4 pt-2">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
          alt="Visa"
          className="h-6"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png"
          alt="Mastercard"
          className="h-6"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png"
          alt="American Express"
          className="h-6"
        />
        <img
          src="https://imgs.search.brave.com/yf3MUW4FNZlAzc5r4erQL2XDIZabRH46-hl-YE6cYF0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bnBjaS5vcmcuaW4v/aW1hZ2VzL25wY2kv/cnVwYXktbG9nby5w/bmc"
          alt="RuPay"
          className="h-6"
        />
      </div>

      <div className="flex items-center justify-center text-xs text-gray-500 dark:text-gray-400 pt-2">
        <Lock className="h-3 w-3 mr-1" />
        Secured by 256-bit encryption
      </div>
    </form>
  )
}

// Netbanking Component
const NetbankingForm = ({ onPaymentComplete }) => {
  const [selectedBank, setSelectedBank] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const banks = [
    { id: "sbi", name: "State Bank of India" },
    { id: "hdfc", name: "HDFC Bank" },
    { id: "icici", name: "ICICI Bank" },
    { id: "axis", name: "Axis Bank" },
    { id: "kotak", name: "Kotak Mahindra Bank" },
    { id: "yes", name: "Yes Bank" },
    { id: "pnb", name: "Punjab National Bank" },
    { id: "bob", name: "Bank of Baroda" },
  ]

  const handleSubmit = () => {
    if (!selectedBank) return

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)

      // Notify parent component
      setTimeout(() => {
        onPaymentComplete()
      }, 1000)
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Your Bank</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {banks.map((bank) => (
            <div
              key={bank.id}
              onClick={() => setSelectedBank(bank.id)}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                selectedBank === bank.id
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center mr-3">
                  {selectedBank === bank.id && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                </div>
                <span className="text-sm text-gray-900 dark:text-white">{bank.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={!selectedBank || isProcessing || isSuccess}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
            !selectedBank
              ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              : isSuccess
                ? "bg-green-500 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isProcessing ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Redirecting to Bank...
            </>
          ) : isSuccess ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Payment Successful
            </>
          ) : (
            "Continue to Bank"
          )}
        </motion.button>
      </div>

      <div className="flex items-center justify-center text-xs text-gray-500 dark:text-gray-400 pt-2">
        <AlertCircle className="h-3 w-3 mr-1" />
        You will be redirected to your bank's secure payment page
      </div>
    </div>
  )
}

// Wallet Payment Component
const WalletPaymentForm = ({ onPaymentComplete }) => {
  const [selectedWallet, setSelectedWallet] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const wallets = [
    {
      id: "paytm",
      name: "Paytm",
      icon: "https://imgs.search.brave.com/C_0XNC5c91Ud6rfNUeiZQptlku1FjAFQBLoH8ybUSig/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bG9nby53aW5lL2Ev/bG9nby9QYXl0bS9Q/YXl0bS1Mb2dvLndp/bmUuc3Zn",
    },
    {
      id: "amazonpay",
      name: "Amazon Pay",
      icon: "https://imgs.search.brave.com/NO3EmHho6braQ3_Co2xbgFGPJxkMGBzw1wS1BNTSy24/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy82/MjIwYTk4NjkxMjAx/M2M1MTk0N2Y5Yjcu/cG5n",
    },
    {
      id: "mobikwik",
      name: "MobiKwik",
      icon: "https://imgs.search.brave.com/_q62rhjC1fezKfKxeJPsHT-4E9JyGzNcphRW5x2nwr0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bG9nby53aW5lL2Ev/bG9nby9Nb2JpS3dp/ay9Nb2JpS3dpay1M/b2dvLndpbmUuc3Zn",
    },
    {
      id: "freecharge",
      name: "Freecharge",
      icon: "https://imgs.search.brave.com/LuqXWkg7zADnIOWlq1dWXcoXj7eUGw1Syr67QghlICk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzMzLzIvdW5pZmll/ZC1wYXltZW50LWlu/dGVyZmFjZS11cGkt/bG9nby1wbmdfc2Vl/a2xvZ28tMzMzMDg4/LnBuZw",
    },
  ]

  const handleSubmit = () => {
    if (!selectedWallet) return

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)

      // Notify parent component
      setTimeout(() => {
        onPaymentComplete()
      }, 1000)
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Your Wallet</label>
        <div className="grid grid-cols-2 gap-3">
          {wallets.map((wallet) => (
            <div
              key={wallet.id}
              onClick={() => setSelectedWallet(wallet.id)}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                selectedWallet === wallet.id
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              <div className="flex flex-col items-center">
                <div className="h-8 mb-2 flex items-center justify-center">
                  <img
                    src={wallet.icon || "/placeholder.svg"}
                    alt={wallet.name}
                    className="max-h-full object-contain"
                  />
                </div>
                <span className="text-sm text-gray-900 dark:text-white text-center">{wallet.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={!selectedWallet || isProcessing || isSuccess}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
            !selectedWallet
              ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              : isSuccess
                ? "bg-green-500 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isProcessing ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Redirecting to Wallet...
            </>
          ) : isSuccess ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Payment Successful
            </>
          ) : (
            "Continue to Wallet"
          )}
        </motion.button>
      </div>

      <div className="flex items-center justify-center text-xs text-gray-500 dark:text-gray-400 pt-2">
        <Smartphone className="h-3 w-3 mr-1" />
        You may need to authorize this payment in your wallet app
      </div>
    </div>
  )
}

// EMI Payment Component
const EmiPaymentForm = ({ onPaymentComplete, planPrice }) => {
  const [selectedTenure, setSelectedTenure] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const calculateEmi = (tenure) => {
    const interestRates = {
      "3": 0.03,
      "6": 0.06,
      "9": 0.09,
      "12": 0.12,
    }

    const principal = planPrice
    const rate = interestRates[tenure] / 12
    const totalAmount = principal * (1 + interestRates[tenure])
    const monthlyPayment = totalAmount / Number.parseInt(tenure)

    return {
      monthly: Math.round(monthlyPayment),
      total: Math.round(totalAmount),
      interest: Math.round(totalAmount - principal),
    }
  }

  const emiOptions = [
    { tenure: "3", label: "3 Months" },
    { tenure: "6", label: "6 Months" },
    { tenure: "9", label: "9 Months" },
    { tenure: "12", label: "12 Months" },
  ]

  const handleSubmit = () => {
    if (!selectedTenure) return

    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
      setTimeout(() => {
        onPaymentComplete()
      }, 1000)
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select EMI Tenure</label>
        <div className="space-y-3">
          {emiOptions.map((option) => {
            const emiDetails = calculateEmi(option.tenure)

            return (
              <div
                key={option.tenure}
                onClick={() => setSelectedTenure(option.tenure)}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedTenure === option.tenure
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center mr-3">
                      {selectedTenure === option.tenure && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{option.label}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">₹{emiDetails.monthly}/mo</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Total: ₹{emiDetails.total}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {selectedTenure && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">EMI Details</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Principal Amount</span>
              <span className="text-gray-900 dark:text-white">₹{planPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Interest Amount</span>
              <span className="text-gray-900 dark:text-white">₹{calculateEmi(selectedTenure).interest}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total Amount</span>
              <span className="font-medium text-gray-900 dark:text-white">₹{calculateEmi(selectedTenure).total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Monthly Installment</span>
              <span className="font-medium text-gray-900 dark:text-white">₹{calculateEmi(selectedTenure).monthly}</span>
            </div>
          </div>
        </div>
      )}

      <div className="pt-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={!selectedTenure || isProcessing || isSuccess}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
            !selectedTenure
              ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              : isSuccess
                ? "bg-green-500 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isProcessing ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : isSuccess ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              EMI Setup Successful
            </>
          ) : (
            "Confirm EMI Payment"
          )}
        </motion.button>
      </div>

      <div className="flex items-center justify-center text-xs text-gray-500 dark:text-gray-400 pt-2">
        <Shield className="h-3 w-3 mr-1" />
        No credit card needed. Instant approval with minimal documentation.
      </div>
    </div>
  )
}

// Payment Gateway Modal Component
const PaymentGatewayModal = ({ isOpen, onClose, plan, isAnnual }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("UPI")
  const [selectedUpiApp, setSelectedUpiApp] = useState("")
  const [upiId, setUpiId] = useState("")
  const [showUpiPin, setShowUpiPin] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [showOrderSummary, setShowOrderSummary] = useState(false)
  const [couponCode, setCouponCode] = useState("")
  const [showCouponInput, setShowCouponInput] = useState(false)
  const [appliedCoupon, setAppliedCoupon] = useState(null)

  // Reset state when modal opens with new plan
  useEffect(() => {
    if (isOpen) {
      setSelectedPaymentMethod("UPI")
      setSelectedUpiApp("")
      setUpiId("")
      setShowUpiPin(false)
      setPaymentComplete(false)
      setShowOrderSummary(false)
      setCouponCode("")
      setShowCouponInput(false)
      setAppliedCoupon(null)
    }
  }, [isOpen, plan])

  const handleUpiContinue = () => {
    if (!selectedUpiApp && !upiId) {
      toast.error("Please select a UPI app or enter UPI ID")
      return
    }

    setShowUpiPin(true)
  }

  const handleUpiPinComplete = () => {
    setPaymentComplete(true)

    // Show success toast
    toast.success(`Payment successful! Your ${plan.name} subscription is now active.`, {
      duration: 5000,
      icon: "🎉",
    })

    // Close modal after delay
    setTimeout(() => {
      onClose()
    }, 2000)
  }

  const handlePaymentComplete = () => {
    setPaymentComplete(true)

    // Show success toast
    toast.success(`Payment successful! Your ${plan.name} subscription is now active.`, {
      duration: 5000,
      icon: "🎉",
    })

    // Close modal after delay
    setTimeout(() => {
      onClose()
    }, 2000)
  }

  const handleApplyCoupon = () => {
    if (!couponCode) return

    // Simulate coupon validation
    if (couponCode.toUpperCase() === "WELCOME10") {
      setAppliedCoupon({
        code: "WELCOME10",
        discount: 10,
        type: "percent",
      })
      toast.success("Coupon applied successfully!")
    } else if (couponCode.toUpperCase() === "FLAT100") {
      setAppliedCoupon({
        code: "FLAT100",
        discount: 100,
        type: "fixed",
      })
      toast.success("Coupon applied successfully!")
    } else {
      toast.error("Invalid coupon code")
    }
  }

  const calculateDiscountedPrice = () => {
    if (!appliedCoupon) return plan.price

    if (appliedCoupon.type === "percent") {
      return Math.round(plan.price * (1 - appliedCoupon.discount / 100))
    } else {
      return Math.max(0, plan.price - appliedCoupon.discount)
    }
  }

  const paymentMethods = [
    { id: "UPI", name: "UPI / QR", icon: <Smartphone className="h-5 w-5" /> },
    { id: "CARD", name: "Credit / Debit Card", icon: <CreditCard className="h-5 w-5" /> },
    { id: "NETBANKING", name: "Net Banking", icon: <Building className="h-5 w-5" /> },
    { id: "WALLET", name: "Wallets", icon: <Wallet className="h-5 w-5" /> },
    { id: "EMI", name: "EMI", icon: <DollarSign className="h-5 w-5" /> },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 "
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="border-b border-gray-200 dark:border-gray-700 p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Complete Payment</h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Order Summary */}
              <div className="mb-4">
                <button
                  onClick={() => setShowOrderSummary(!showOrderSummary)}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div className="flex items-center">
                    <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    <span className="font-medium text-gray-900 dark:text-white">Order Summary</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold text-gray-900 dark:text-white mr-2">
                      ₹{appliedCoupon ? calculateDiscountedPrice() : plan.price}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-500 transition-transform ${showOrderSummary ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {showOrderSummary && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-2"
                    >
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                                plan.color === "blue"
                                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
                                  : plan.color === "purple"
                                    ? "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
                                    : "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400"
                              }`}
                            >
                              {plan.icon}
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-white">{plan.name}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {isAnnual ? "Annual" : "Monthly"} Subscription
                              </p>
                            </div>
                          </div>
                          <span className="font-medium text-gray-900 dark:text-white">₹{plan.price}</span>
                        </div>

                        {appliedCoupon && (
                          <div className="flex justify-between items-center mb-3 text-sm">
                            <div className="flex items-center">
                              <Tag className="h-4 w-4 text-green-500 mr-2" />
                              <span className="text-gray-600 dark:text-gray-400">Coupon: {appliedCoupon.code}</span>
                            </div>
                            <span className="text-green-600 dark:text-green-400">
                              -₹
                              {appliedCoupon.type === "percent"
                                ? Math.round((plan.price * appliedCoupon.discount) / 100)
                                : appliedCoupon.discount}
                            </span>
                          </div>
                        )}

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-900 dark:text-white">Total</span>
                            <span className="font-bold text-gray-900 dark:text-white">
                              ₹{appliedCoupon ? calculateDiscountedPrice() : plan.price}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Includes all applicable taxes
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Coupon Code */}
              <div className="mb-4">
                <button
                  onClick={() => setShowCouponInput(!showCouponInput)}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div className="flex items-center">
                    <Tag className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {appliedCoupon ? "Coupon Applied" : "Apply Coupon"}
                    </span>
                  </div>
                  {appliedCoupon ? (
                    <span className="text-green-600 dark:text-green-400 text-sm font-medium">{appliedCoupon.code}</span>
                  ) : (
                    <ChevronDown
                      className={`h-5 w-5 text-gray-500 transition-transform ${showCouponInput ? "rotate-180" : ""}`}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {showCouponInput && !appliedCoupon && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-2"
                    >
                      <div className="flex">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Enter coupon code"
                          className="flex-1 border border-gray-300 dark:border-gray-600 rounded-l-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                          onClick={handleApplyCoupon}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg font-medium transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Try "WELCOME10" for 10% off or "FLAT100" for ₹100 off
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Payment Methods */}
              {!paymentComplete && !showUpiPin && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Payment Method</h3>
                  <div className="space-y-2">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedPaymentMethod(method.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                          selectedPaymentMethod === method.id
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500"
                            : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="text-gray-700 dark:text-gray-300 mr-3">{method.icon}</div>
                          <span className="font-medium text-gray-900 dark:text-white">{method.name}</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Payment Method Content */}
              {!paymentComplete && (
                <div className="mt-6">
                  {selectedPaymentMethod === "UPI" && !showUpiPin && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Pay using UPI</h3>

                      {/* UPI App Selection */}
                      <UpiAppSelection selectedApp={selectedUpiApp} onSelectApp={setSelectedUpiApp} />

                      {/* OR Divider */}
                      <div className="text-center relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                        </div>
                        <div className="relative">
                          <span className="px-2 py-1 bg-white dark:bg-gray-800 text-sm text-gray-500 dark:text-gray-400">
                            OR
                          </span>
                        </div>
                      </div>

                      {/* UPI ID Input */}
                      <div>
                        <label
                          htmlFor="upi-id"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Enter UPI ID
                        </label>
                        <div className="relative">
                          <input
                            id="upi-id"
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="name@upi"
                            className="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          You will receive a payment request on your UPI app
                        </p>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleUpiContinue}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                      >
                        Continue
                      </motion.button>
                    </div>
                  )}

                  {selectedPaymentMethod === "UPI" && showUpiPin && (
                    <UpiPinInput onPinComplete={handleUpiPinComplete} />
                  )}

                  {selectedPaymentMethod === "CARD" && <CardPaymentForm onPaymentComplete={handlePaymentComplete} />}

                  {selectedPaymentMethod === "NETBANKING" && (
                    <NetbankingForm onPaymentComplete={handlePaymentComplete} />
                  )}

                  {selectedPaymentMethod === "WALLET" && (
                    <WalletPaymentForm onPaymentComplete={handlePaymentComplete} />
                  )}

                  {selectedPaymentMethod === "EMI" && (
                    <EmiPaymentForm onPaymentComplete={handlePaymentComplete} planPrice={plan.price} />
                  )}
                </div>
              )}

              {/* Payment Success */}
              {paymentComplete && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Payment Successful!</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Your {plan.name} subscription has been activated successfully.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Continue
                  </motion.button>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 text-center">
              <div className="flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                <Lock className="h-3 w-3 mr-1" />
                Secured by 256-bit encryption
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Main Subscriptions Page Component
const Subscriptions = () => {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [isAnnual, setIsAnnual] = useState(false)
  const [showFaq, setShowFaq] = useState({})

  const toggleFaq = (id) => {
    setShowFaq((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }
  useEffect(() => {
      // Ensure the scroll happens after the component mounts
      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      };
      const timer = setTimeout(scrollToTop, 0);
      return () => clearTimeout(timer);
    }, []);

  const plans = {
    monthly: [
      {
        id: "basic",
        name: "Basic",
        price: 499,
        description: "Perfect for individuals and small teams",
        icon: <Layers className="h-5 w-5" />,
        features: ["Up to 5 users", "10GB storage", "Basic analytics", "Email support", "API access"],
        notIncluded: ["Advanced analytics", "Custom branding", "Dedicated support", "Priority features"],
        popular: false,
        color: "blue",
      },
      {
        id: "pro",
        name: "Professional",
        price: 999,
        description: "Ideal for growing businesses",
        icon: <Briefcase className="h-5 w-5" />,
        features: [
          "Up to 20 users",
          "50GB storage",
          "Advanced analytics",
          "Priority support",
          "API access",
          "Custom branding",
          "Team collaboration tools",
        ],
        notIncluded: ["Dedicated account manager", "Advanced security", "Custom integrations"],
        popular: true,
        color: "purple",
      },
      {
        id: "enterprise",
        name: "Enterprise",
        price: 1999,
        description: "For large organizations with advanced needs",
        icon: <Globe className="h-5 w-5" />,
        features: [
          "Unlimited users",
          "500GB storage",
          "Advanced analytics",
          "24/7 priority support",
          "API access",
          "Custom branding",
          "Team collaboration tools",
          "Dedicated account manager",
          "Advanced security",
          "Custom integrations",
          "SLA guarantees",
        ],
        notIncluded: [],
        popular: false,
        color: "emerald",
      },
    ],
    yearly: [
      {
        id: "basic",
        name: "Basic",
        price: 4990,
        description: "Perfect for individuals and small teams",
        icon: <Layers className="h-5 w-5" />,
        features: ["Up to 5 users", "10GB storage", "Basic analytics", "Email support", "API access"],
        notIncluded: ["Advanced analytics", "Custom branding", "Dedicated support", "Priority features"],
        popular: false,
        color: "blue",
        discount: "Save 17%",
      },
      {
        id: "pro",
        name: "Professional",
        price: 9990,
        description: "Ideal for growing businesses",
        icon: <Briefcase className="h-5 w-5" />,
        features: [
          "Up to 20 users",
          "50GB storage",
          "Advanced analytics",
          "Priority support",
          "API access",
          "Custom branding",
          "Team collaboration tools",
        ],
        notIncluded: ["Dedicated account manager", "Advanced security", "Custom integrations"],
        popular: true,
        color: "purple",
        discount: "Save 17%",
      },
      {
        id: "enterprise",
        name: "Enterprise",
        price: 19990,
        description: "For large organizations with advanced needs",
        icon: <Globe className="h-5 w-5" />,
        features: [
          "Unlimited users",
          "500GB storage",
          "Advanced analytics",
          "24/7 priority support",
          "API access",
          "Custom branding",
          "Team collaboration tools",
          "Dedicated account manager",
          "Advanced security",
          "Custom integrations",
          "SLA guarantees",
        ],
        notIncluded: [],
        popular: false,
        color: "emerald",
        discount: "Save 17%",
      },
    ],
  }

  const activePlans = plans[isAnnual ? "yearly" : "monthly"]

  const faqs = [
    {
      id: 1,
      question: "How does the billing cycle work?",
      answer:
        "You can choose between monthly or yearly billing. Yearly plans offer a 17% discount compared to monthly plans. You can change your billing cycle at any time from your account settings.",
    },
    {
      id: 2,
      question: "Can I upgrade or downgrade my plan?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, the new rate will apply at the start of your next billing cycle.",
    },
    {
      id: 3,
      question: "Is there a free trial available?",
      answer: "Yes, we offer a 14-day free trial on all plans. No credit card required to start your trial.",
    },
    {
      id: 4,
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, debit cards, UPI payments, net banking, and digital wallets. For enterprise plans, we also offer invoice-based payments.",
    },
    {
      id: 5,
      question: "How secure is my data?",
      answer:
        "We take security seriously. All data is encrypted both in transit and at rest. We use industry-standard security protocols and regularly undergo security audits to ensure your data remains protected.",
    },
    {
      id: 6,
      question: "What happens when my subscription ends?",
      answer:
        "When your subscription ends, your account will be downgraded to our free tier with limited features. Your data will be retained for 30 days, after which it may be archived or deleted according to our data retention policy.",
    },
  ]

  const features = [
    {
      icon: <Zap className="h-6 w-6 text-blue-500" />,
      title: "Lightning Fast Performance",
      description: "Optimized for speed and efficiency across all devices",
    },
    {
      icon: <Shield className="h-6 w-6 text-emerald-500" />,
      title: "Enterprise-Grade Security",
      description: "Advanced encryption and security protocols to protect your data",
    },
    {
      icon: <Clock className="h-6 w-6 text-purple-500" />,
      title: "Real-Time Analytics",
      description: "Get insights instantly with our real-time analytics dashboard",
    },
    {
      icon: <Award className="h-6 w-6 text-amber-500" />,
      title: "Premium Support",
      description: "24/7 support from our dedicated customer success team",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-pink-500" />,
      title: "AI-Powered Insights",
      description: "Leverage machine learning to uncover valuable business insights",
    },
    {
      icon: <Rocket className="h-6 w-6 text-red-500" />,
      title: "Scalable Infrastructure",
      description: "Grows with your business without performance degradation",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO at TechStart",
      content:
        "This subscription service has completely transformed how we operate. The analytics tools alone have increased our efficiency by 40%.",
      avatar: "SJ",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Marketing Director",
      content:
        "The ROI we've seen since subscribing has been incredible. Customer support is responsive and the platform is intuitive.",
      avatar: "MC",
      rating: 5,
    },
    {
      name: "Priya Patel",
      role: "Product Manager",
      content:
        "I've used many similar services, but this one stands out for its reliability and feature set. Highly recommended for growing teams.",
      avatar: "PP",
      rating: 4,
    },
  ]

  const stats = [
    { value: "99.9%", label: "Uptime", icon: <Cloud className="h-5 w-5 text-blue-500" /> },
    { value: "24/7", label: "Support", icon: <Headphones className="h-5 w-5 text-purple-500" /> },
    { value: "500+", label: "Integrations", icon: <Database className="h-5 w-5 text-emerald-500" /> },
    { value: "10M+", label: "Users", icon: <Users className="h-5 w-5 text-amber-500" /> },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Toaster />
            {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Supercharge Your Business Growth
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-blue-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              All-in-one platform with powerful tools to help you scale, analyze, and optimize your business operations.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a
                href="#pricing"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                View Pricing Plans
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-gray-500 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Everything you need to take your business to the next level
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-4 p-2 inline-block bg-gray-100 dark:bg-gray-700 rounded-lg">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Choose the plan that works best for your business needs
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center mt-8">
              <span
                className={`text-sm ${!isAnnual ? "text-gray-900 dark:text-white font-medium" : "text-gray-500 dark:text-gray-400"}`}
              >
                Monthly
              </span>
              <button
                className="relative mx-4 w-14 h-7 bg-blue-600 rounded-full focus:outline-none"
                onClick={() => setIsAnnual(!isAnnual)}
              >
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 transform ${
                    isAnnual ? "translate-x-7" : ""
                  }`}
                />
              </button>
              <span
                className={`text-sm ${isAnnual ? "text-gray-900 dark:text-white font-medium" : "text-gray-500 dark:text-gray-400"}`}
              >
                Yearly <span className="text-green-600 dark:text-green-400 font-medium">(Save 17%)</span>
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {activePlans.map((plan, index) => (
              <SubscriptionPlan
                key={plan.id}
                plan={plan}
                onSelect={setSelectedPlan}
                isPopular={plan.popular}
                isAnnual={isAnnual}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Need a custom plan?{" "}
              <a href="#" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                Contact us
              </a>{" "}
              for enterprise pricing.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Trusted by thousands of businesses worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Find answers to common questions about our subscription plans
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq) => (
              <motion.div
                key={faq.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: faq.id * 0.1 }}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="flex justify-between items-center w-full p-6 text-left"
                >
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{faq.question}</h3>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform ${showFaq[faq.id] ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {showFaq[faq.id] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-gray-600 dark:text-gray-400">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-10 text-blue-100">
            Join thousands of businesses that trust our platform for their growth
          </p>
          <a
            href="#pricing"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Choose Your Plan
          </a>
        </div>
      </section>

      

      {/* Payment Gateway Modal */}
      <PaymentGatewayModal
        isOpen={!!selectedPlan}
        onClose={() => setSelectedPlan(null)}
        plan={selectedPlan || {}}
        isAnnual={isAnnual}
      />
    </div>
  )
}

export default Subscriptions
