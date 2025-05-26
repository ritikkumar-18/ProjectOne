// import { useState, useEffect, useRef } from "react"
// import { useNavigate } from "react-router-dom"
// import { motion, AnimatePresence } from "framer-motion"
// import { toast, Toaster } from "react-hot-toast"
// import {
//   User,
//   Mail,
//   Phone,
//   MapPin,
//   Camera,
//   Edit,
//   Save,
//   X,
//   Cake,
//   LinkIcon,
//   Lock,
//   CheckCircle,
//   ExternalLink,
//   LogOut,
//   Shield,
//   Bell,
//   HelpCircle,
//   Twitter,
// } from "lucide-react"

// const Profile = () => {
//   const navigate = useNavigate()
//   const [user, setUser] = useState({})
//   const [isEditing, setIsEditing] = useState(false)
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     bio: "",
//     dob: "",
//     socialLinks: { twitter: "", linkedin: "" },
//     profilePicture: "",
//   })
//   const [previewImage, setPreviewImage] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const [saveSuccess, setSaveSuccess] = useState(false)
//   const fileInputRef = useRef(null)

//   // Redirect to login if not logged in and load user data
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user")
//     if (!storedUser) {
//       navigate("/login")
//       return
//     }

//     try {
//       const parsedUser = JSON.parse(storedUser)
//       setUser(parsedUser)

//       // Initialize form data with user data
//       setFormData({
//         name: parsedUser.name || "",
//         email: parsedUser.email || "",
//         phone: parsedUser.phone || "",
//         address: parsedUser.address || "",
//         bio: parsedUser.bio || "",
//         dob: parsedUser.dob || "",
//         socialLinks: parsedUser.socialLinks || { twitter: "", linkedin: "" },
//         profilePicture:
//           parsedUser.profilePicture ||
//           "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
//       })

//       setPreviewImage(
//         parsedUser.profilePicture ||
//           "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
//       )
//     } catch (error) {
//       console.error("Error parsing user data:", error)
//       toast.error("Error loading profile data")
//       localStorage.removeItem("user")
//       navigate("/login")
//     }
//   }, [navigate])

//   const handleChange = (e) => {
//     const { name, value } = e.target

//     if (name === "twitter" || name === "linkedin") {
//       setFormData({
//         ...formData,
//         socialLinks: { ...formData.socialLinks, [name]: value },
//       })
//     } else {
//       setFormData({ ...formData, [name]: value })
//     }
//   }

//   const handleImageChange = (e) => {
//     const file = e.target.files[0]
//     if (!file) return

//     if (file.size > 2 * 1024 * 1024) {
//       toast.error("Image size should be less than 2MB")
//       return
//     }

//     const reader = new FileReader()
//     reader.onloadend = () => {
//       setPreviewImage(reader.result)
//       setFormData({ ...formData, profilePicture: reader.result })
//     }
//     reader.readAsDataURL(file)
//   }

//   const handleImageClick = () => {
//     if (isEditing) {
//       fileInputRef.current.click()
//     }
//   }

//   const validateForm = () => {
//     if (!formData.name || !formData.email || !formData.phone || !formData.address) {
//       toast.error("Please fill in all required fields")
//       return false
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//     if (!emailRegex.test(formData.email)) {
//       toast.error("Please enter a valid email address")
//       return false
//     }

//     const phoneRegex = /^\d{3}-\d{3}-\d{4}$/
//     if (!phoneRegex.test(formData.phone)) {
//       toast.error("Phone number must be in the format XXX-XXX-XXXX")
//       return false
//     }

//     return true
//   }

//   const handleSave = async () => {
//     if (!validateForm()) return

//     setIsLoading(true)

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000))

//       // Update user data in localStorage
//       const updatedUser = { ...formData }
//       localStorage.setItem("user", JSON.stringify(updatedUser))

//       // Update state
//       setUser(updatedUser)
//       setSaveSuccess(true)

//       toast.success("Profile updated successfully!")

//       // Reset success state after a delay
//       setTimeout(() => {
//         setSaveSuccess(false)
//         setIsEditing(false)
//       }, 1500)
//     } catch (error) {
//       console.error("Error saving profile:", error)
//       toast.error("Failed to update profile")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleCancel = () => {
//     // Reset form data to current user data
//     setFormData({
//       name: user.name || "",
//       email: user.email || "",
//       phone: user.phone || "",
//       address: user.address || "",
//       bio: user.bio || "",
//       dob: user.dob || "",
//       socialLinks: user.socialLinks || { twitter: "", linkedin: "" },
//       profilePicture:
//         user.profilePicture ||
//         "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
//     })

//     setPreviewImage(
//       user.profilePicture ||
//         "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
//     )

//     setIsEditing(false)
//   }

//   // Calculate profile completion percentage
//   const calculateProfileCompletion = () => {
//     const fields = [
//       user.name,
//       user.email,
//       user.phone,
//       user.address,
//       user.bio,
//       user.dob,
//       user.socialLinks?.twitter,
//       user.socialLinks?.linkedin,
//       user.profilePicture !==
//       "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
//         ? user.profilePicture
//         : null,
//     ]

//     const filledFields = fields.filter((field) => field).length
//     return Math.round((filledFields / fields.length) * 100)
//   }

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         when: "beforeChildren",
//         staggerChildren: 0.1,
//       },
//     },
//   }

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { type: "spring", stiffness: 100 },
//     },
//   }

//   const profilePictureVariants = {
//     hidden: { scale: 0.8, opacity: 0 },
//     visible: {
//       scale: 1,
//       opacity: 1,
//       transition: { type: "spring", stiffness: 100, delay: 0.2 },
//     },
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
//       <Toaster position="top-right" />

//       <div className="max-w-4xl mx-auto">
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
//         >
//           {/* Header */}
//           <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
//             <div className="flex justify-between items-center">
//               <h1 className="text-xl font-bold text-white">Profile Settings</h1>
//               <button onClick={() => navigate("/home")} className="text-white/80 hover:text-white transition-colors">
//                 <X className="h-5 w-5" />
//               </button>
//             </div>
//           </div>

//           {/* Profile Content */}
//           <div className="p-6">
//             {/* Profile Completion */}
//             <motion.div variants={itemVariants} className="mb-8">
//               <div className="flex justify-between items-center mb-2">
//                 <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">Profile Completion</h2>
//                 <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
//                   {calculateProfileCompletion()}%
//                 </span>
//               </div>
//               <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
//                 <motion.div
//                   className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full"
//                   initial={{ width: 0 }}
//                   animate={{ width: `${calculateProfileCompletion()}%` }}
//                   transition={{ duration: 1, ease: "easeOut" }}
//                 />
//               </div>
//             </motion.div>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               {/* Left Column - Profile Picture */}
//               <motion.div variants={itemVariants} className="lg:col-span-1">
//                 <div className="flex flex-col items-center">
//                   <motion.div
//                     variants={profilePictureVariants}
//                     className="relative group cursor-pointer"
//                     onClick={handleImageClick}
//                   >
//                     <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-600 dark:border-blue-500 shadow-lg">
//                       <img
//                         src={previewImage || "/placeholder.svg"}
//                         alt="Profile"
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     {isEditing && (
//                       <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                         <Camera className="h-8 w-8 text-white" />
//                       </div>
//                     )}
//                     <input
//                       type="file"
//                       ref={fileInputRef}
//                       accept="image/*"
//                       onChange={handleImageChange}
//                       className="hidden"
//                     />
//                   </motion.div>

//                   <motion.h2 variants={itemVariants} className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
//                     {user.name || "Your Name"}
//                   </motion.h2>

//                   <motion.p variants={itemVariants} className="text-gray-500 dark:text-gray-400">
//                     {user.email || "your.email@example.com"}
//                   </motion.p>

//                   {!isEditing && (
//                     <motion.button
//                       variants={itemVariants}
//                       onClick={() => setIsEditing(true)}
//                       className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//                     >
//                       <Edit className="h-4 w-4 mr-2" />
//                       Edit Profile
//                     </motion.button>
//                   )}
//                 </div>

//                 {/* Navigation Menu */}
//                 <motion.div variants={itemVariants} className="mt-8 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
//                   <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Account Settings</h3>
//                   <ul className="space-y-2">
//                     <li>
//                       <a
//                         href="#"
//                         className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md transition-colors"
//                       >
//                         <Shield className="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400" />
//                         Security
//                       </a>
//                     </li>
//                     <li>
//                       <a
//                         href="#"
//                         className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md transition-colors"
//                       >
//                         <Bell className="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400" />
//                         Notifications
//                       </a>
//                     </li>
//                     <li>
//                       <a
//                         href="#"
//                         className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md transition-colors"
//                       >
//                         <HelpCircle className="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400" />
//                         Help & Support
//                       </a>
//                     </li>
//                     <li>
//                       <a
//                         href="#"
//                         className="flex items-center px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
//                       >
//                         <LogOut className="h-4 w-4 mr-3" />
//                         Sign Out
//                       </a>
//                     </li>
//                   </ul>
//                 </motion.div>
//               </motion.div>

//               {/* Right Column - Profile Details */}
//               <motion.div variants={itemVariants} className="lg:col-span-2">
//                 <AnimatePresence mode="wait">
//                   {isEditing ? (
//                     <motion.div
//                       key="edit-form"
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -20 }}
//                       className="space-y-6"
//                     >
//                       <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Edit Your Profile</h2>

//                       {/* Name */}
//                       <div>
//                         <label
//                           htmlFor="name"
//                           className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//                         >
//                           Full Name *
//                         </label>
//                         <div className="relative rounded-md shadow-sm">
//                           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                             <User className="h-5 w-5 text-gray-400" />
//                           </div>
//                           <input
//                             type="text"
//                             id="name"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             required
//                             className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                             placeholder="John Doe"
//                           />
//                         </div>
//                       </div>

//                       {/* Email */}
//                       <div>
//                         <label
//                           htmlFor="email"
//                           className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//                         >
//                           Email Address *
//                         </label>
//                         <div className="relative rounded-md shadow-sm">
//                           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                             <Mail className="h-5 w-5 text-gray-400" />
//                           </div>
//                           <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                             className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                             placeholder="you@example.com"
//                           />
//                         </div>
//                       </div>

//                       {/* Phone */}
//                       <div>
//                         <label
//                           htmlFor="phone"
//                           className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//                         >
//                           Phone Number * (Format: XXX-XXX-XXXX)
//                         </label>
//                         <div className="relative rounded-md shadow-sm">
//                           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                             <Phone className="h-5 w-5 text-gray-400" />
//                           </div>
//                           <input
//                             type="text"
//                             id="phone"
//                             name="phone"
//                             value={formData.phone}
//                             onChange={handleChange}
//                             required
//                             className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                             placeholder="123-456-7890"
//                           />
//                         </div>
//                       </div>

//                       {/* Address */}
//                       <div>
//                         <label
//                           htmlFor="address"
//                           className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//                         >
//                           Address *
//                         </label>
//                         <div className="relative rounded-md shadow-sm">
//                           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                             <MapPin className="h-5 w-5 text-gray-400" />
//                           </div>
//                           <input
//                             type="text"
//                             id="address"
//                             name="address"
//                             value={formData.address}
//                             onChange={handleChange}
//                             required
//                             className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                             placeholder="123 Tech Street, Tech City"
//                           />
//                         </div>
//                       </div>

//                       {/* Bio */}
//                       <div>
//                         <label
//                           htmlFor="bio"
//                           className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//                         >
//                           Bio
//                         </label>
//                         <textarea
//                           id="bio"
//                           name="bio"
//                           value={formData.bio}
//                           onChange={handleChange}
//                           rows={3}
//                           className="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                           placeholder="Tell us about yourself..."
//                         />
//                       </div>

//                       {/* Date of Birth */}
//                       <div>
//                         <label
//                           htmlFor="dob"
//                           className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//                         >
//                           Date of Birth
//                         </label>
//                         <div className="relative rounded-md shadow-sm">
//                           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                             <Cake className="h-5 w-5 text-gray-400" />
//                           </div>
//                           <input
//                             type="date"
//                             id="dob"
//                             name="dob"
//                             value={formData.dob}
//                             onChange={handleChange}
//                             className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                           />
//                         </div>
//                       </div>

//                       {/* Social Links */}
//                       <div className="space-y-4">
//                         <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Social Links</h3>

//                         <div>
//                           <label
//                             htmlFor="twitter"
//                             className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//                           >
//                             Twitter
//                           </label>
//                           <div className="relative rounded-md shadow-sm">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                               <LinkIcon className="h-5 w-5 text-gray-400" />
//                             </div>
//                             <input
//                               type="url"
//                               id="twitter"
//                               name="twitter"
//                               value={formData.socialLinks.twitter}
//                               onChange={handleChange}
//                               className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                               placeholder="https://twitter.com/yourusername"
//                             />
//                           </div>
//                         </div>

//                         <div>
//                           <label
//                             htmlFor="linkedin"
//                             className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//                           >
//                             LinkedIn
//                           </label>
//                           <div className="relative rounded-md shadow-sm">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                               <LinkIcon className="h-5 w-5 text-gray-400" />
//                             </div>
//                             <input
//                               type="url"
//                               id="linkedin"
//                               name="linkedin"
//                               value={formData.socialLinks.linkedin}
//                               onChange={handleChange}
//                               className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                               placeholder="https://linkedin.com/in/yourusername"
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       {/* Action Buttons */}
//                       <div className="flex space-x-4 pt-4">
//                         <button
//                           type="button"
//                           onClick={handleSave}
//                           disabled={isLoading || saveSuccess}
//                           className={`flex-1 flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
//                             (isLoading || saveSuccess) && "opacity-70 cursor-not-allowed"
//                           }`}
//                         >
//                           {isLoading ? (
//                             <>
//                               <svg
//                                 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                               >
//                                 <circle
//                                   className="opacity-25"
//                                   cx="12"
//                                   cy="12"
//                                   r="10"
//                                   stroke="currentColor"
//                                   strokeWidth="4"
//                                 ></circle>
//                                 <path
//                                   className="opacity-75"
//                                   fill="currentColor"
//                                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                                 ></path>
//                               </svg>
//                               Saving...
//                             </>
//                           ) : saveSuccess ? (
//                             <>
//                               <CheckCircle className="h-5 w-5 mr-2" />
//                               Saved!
//                             </>
//                           ) : (
//                             <>
//                               <Save className="h-5 w-5 mr-2" />
//                               Save Changes
//                             </>
//                           )}
//                         </button>
//                         <button
//                           type="button"
//                           onClick={handleCancel}
//                           disabled={isLoading}
//                           className="flex-1 flex items-center justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-base font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//                         >
//                           <X className="h-5 w-5 mr-2" />
//                           Cancel
//                         </button>
//                       </div>
//                     </motion.div>
//                   ) : (
//                     <motion.div
//                       key="view-profile"
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -20 }}
//                       className="space-y-6"
//                     >
//                       <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Profile Information</h2>

//                       {/* Personal Information */}
//                       <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 space-y-4">
//                         <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Personal Information</h3>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           {/* Name */}
//                           <div className="flex items-start">
//                             <User className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3" />
//                             <div>
//                               <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</p>
//                               <p className="text-base text-gray-900 dark:text-white">{user.name || "Not provided"}</p>
//                             </div>
//                           </div>

//                           {/* Email */}
//                           <div className="flex items-start">
//                             <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3" />
//                             <div>
//                               <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</p>
//                               <p className="text-base text-gray-900 dark:text-white">{user.email || "Not provided"}</p>
//                             </div>
//                           </div>

//                           {/* Phone */}
//                           <div className="flex items-start">
//                             <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3" />
//                             <div>
//                               <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</p>
//                               <p className="text-base text-gray-900 dark:text-white">{user.phone || "Not provided"}</p>
//                             </div>
//                           </div>

//                           {/* Address */}
//                           <div className="flex items-start">
//                             <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3" />
//                             <div>
//                               <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</p>
//                               <p className="text-base text-gray-900 dark:text-white">
//                                 {user.address || "Not provided"}
//                               </p>
//                             </div>
//                           </div>

//                           {/* Date of Birth */}
//                           {user.dob && (
//                             <div className="flex items-start">
//                               <Cake className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3" />
//                               <div>
//                                 <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date of Birth</p>
//                                 <p className="text-base text-gray-900 dark:text-white">{user.dob}</p>
//                               </div>
//                             </div>
//                           )}
//                         </div>

//                         {/* Bio */}
//                         {user.bio && (
//                           <div className="flex items-start pt-2">
//                             <div>
//                               <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Bio</p>
//                               <p className="text-base text-gray-900 dark:text-white">{user.bio}</p>
//                             </div>
//                           </div>
//                         )}
//                       </div>

//                       {/* Social Links */}
//                       {(user.socialLinks?.twitter || user.socialLinks?.linkedin) && (
//                         <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
//                           <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Social Links</h3>

//                           <div className="space-y-3">
//                             {user.socialLinks?.twitter && (
//                               <a
//                                 href={user.socialLinks.twitter}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
//                               >
//                                 <Twitter className="h-5 w-5 mr-2" />
//                                 Twitter
//                                 <ExternalLink className="h-4 w-4 ml-1" />
//                               </a>
//                             )}

//                             {user.socialLinks?.linkedin && (
//                               <a
//                                 href={user.socialLinks.linkedin}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
//                               >
//                                 <LinkIcon className="h-5 w-5 mr-2" />
//                                 LinkedIn
//                                 <ExternalLink className="h-4 w-4 ml-1" />
//                               </a>
//                             )}
//                           </div>
//                         </div>
//                       )}

//                       {/* Account Settings */}
//                       <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
//                         <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Account Settings</h3>

//                         <button
//                           type="button"
//                           onClick={() => toast.info("Change Password feature coming soon!")}
//                           className="flex items-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//                         >
//                           <Lock className="h-4 w-4 mr-2" />
//                           Change Password
//                         </button>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
//             <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
//               Need help?{" "}
//               <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
//                 Contact Support
//               </a>
//             </p>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   )
// }

// export default Profileimport { useState, useEffect, useRef } from "react";


import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { toast, Toaster } from "react-hot-toast"
import { useState, useEffect, useRef } from "react"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Edit,
  Save,
  X,
  Cake,
  LinkIcon,
  CheckCircle,
  ExternalLink,
  LogOut,
  Instagram,
  Globe,
  QrCode,
  Star,
  Clock,
  Download,
  Share2,
  Heart,
  Eye,
  Code,
  Palette,
  Zap,
  Trophy,
  Target,
  Sparkles,
  RefreshCw,
  Shield,
  Bell,
  HelpCircle,
} from "lucide-react"

const Profile = () => {
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
    const timer = setTimeout(scrollToTop, 0)
    return () => clearTimeout(timer)
  }, [])

  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    dob: "",
    socialLinks: {
      instagram: "https://www.instagram.com/ritik_1_8?igsh=MXR1MWI5amwwd2FwMA==",
      portfolio: "https://portfolio-cyan-one-46.vercel.app/",
    },
    profilePicture: "",
    skills: [],
    achievements: [],
    projects: 0,
    experience: "",
  })
  const [previewImage, setPreviewImage] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [showQRCodes, setShowQRCodes] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [currentUserId, setCurrentUserId] = useState(null)
  const fileInputRef = useRef(null)

  // Young boy profile picture
  const defaultProfilePicture =
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"

  // Skills data
  const availableSkills = [
    "React",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Python",
    "Java",
    "C++",
    "HTML/CSS",
    "MongoDB",
    "PostgreSQL",
    "Git",
    "Docker",
    "AWS",
    "Firebase",
    "Next.js",
    "Vue.js",
    "Angular",
    "Express.js",
    "GraphQL",
    "REST APIs",
  ]

  const achievements = [
    { id: 1, title: "First Project Completed", icon: Trophy, color: "text-yellow-500", unlocked: true },
    { id: 2, title: "Profile Master", icon: Star, color: "text-blue-500", unlocked: true },
    { id: 3, title: "Social Connector", icon: Heart, color: "text-red-500", unlocked: true },
    { id: 4, title: "Skill Collector", icon: Target, color: "text-green-500", unlocked: true },
  ]

  // Get current user ID from authentication
  const getCurrentUserId = () => {
    const authUser = localStorage.getItem("user")
    if (authUser) {
      try {
        const parsed = JSON.parse(authUser)
        return parsed.id || parsed.email || "default"
      } catch (error) {
        console.error("Error parsing auth user:", error)
      }
    }
    return "default"
  }

  // Initialize or load user profile data
  const initializeUserProfile = () => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      navigate("/login")
      return
    }

    try {
      const parsedUser = JSON.parse(storedUser)
      const userId = parsedUser.id || parsedUser.email || "default"
      setCurrentUserId(userId)

      // Enhanced user data with all features
      const enhancedUser = {
        ...parsedUser,
        socialLinks: parsedUser.socialLinks || {
          instagram: "https://www.instagram.com/ritik_1_8?igsh=MXR1MWI5amwwd2FwMA==",
          portfolio: "https://portfolio-cyan-one-46.vercel.app/",
        },
        skills: parsedUser.skills || ["React", "JavaScript", "Node.js", "Python"],
        achievements: parsedUser.achievements || [1, 2],
        projects: parsedUser.projects || 12,
        experience: parsedUser.experience || "2+ years",
        profilePicture: parsedUser.profilePicture || defaultProfilePicture,
        lastUpdated: parsedUser.lastUpdated || new Date().toISOString(),
      }

      setUser(enhancedUser)
      setFormData(enhancedUser)
      setPreviewImage(enhancedUser.profilePicture)

      // Update localStorage with enhanced data
      localStorage.setItem("user", JSON.stringify(enhancedUser))
    } catch (error) {
      console.error("Error parsing user data:", error)
      toast.error("Error loading profile data")
      localStorage.removeItem("user")
      navigate("/login")
    }

    setIsLoading(false)
  }

  // Check authentication and initialize profile
  useEffect(() => {
    initializeUserProfile()
  }, [navigate])

  // Listen for storage changes (when user logs in/out in another tab)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "user") {
        if (!e.newValue) {
          // User logged out
          navigate("/login")
        } else {
          // User logged in, refresh profile
          initializeUserProfile()
        }
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "instagram" || name === "portfolio") {
      setFormData({
        ...formData,
        socialLinks: { ...formData.socialLinks, [name]: value },
      })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSkillToggle = (skill) => {
    const updatedSkills = formData.skills.includes(skill)
      ? formData.skills.filter((s) => s !== skill)
      : [...formData.skills, skill]
    setFormData({ ...formData, skills: updatedSkills })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB")
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewImage(reader.result)
      setFormData({ ...formData, profilePicture: reader.result })
    }
    reader.readAsDataURL(file)
  }

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current.click()
    }
  }

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      toast.error("Please fill in all required fields")
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address")
      return false
    }

    return true
  }

  const handleSave = async () => {
    if (!validateForm()) return

    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const updatedUser = {
        ...formData,
        lastUpdated: new Date().toISOString(),
      }

      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUser(updatedUser)
      setSaveSuccess(true)
      toast.success("Profile updated successfully!")

      setTimeout(() => {
        setSaveSuccess(false)
        setIsEditing(false)
      }, 1500)
    } catch (error) {
      console.error("Error saving profile:", error)
      toast.error("Failed to update profile")
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      ...user,
      socialLinks: user.socialLinks || {
        instagram: "https://www.instagram.com/ritik_1_8?igsh=MXR1MWI5amwwd2FwMA==",
        portfolio: "https://portfolio-cyan-one-46.vercel.app/",
      },
    })
    setPreviewImage(user.profilePicture || defaultProfilePicture)
    setIsEditing(false)
  }

  const handleSignOut = () => {
    // Clear all user-related data
    localStorage.removeItem("user")

    // Clear component state
    setUser({})
    setFormData({
      name: "Ritik Kumar",
      email: "",
      phone: "",
      address: "",
      bio: "",
      dob: "",
      socialLinks: {
        instagram: "https://www.instagram.com/ritik_1_8?igsh=MXR1MWI5amwwd2FwMA==",
        portfolio: "https://portfolio-cyan-one-46.vercel.app/",
      },
      profilePicture: "",
      skills: [],
      achievements: [],
      projects: 0,
      experience: "",
    })
    setPreviewImage("")
    setCurrentUserId(null)

    toast.success("Signed out successfully!")
    setTimeout(() => navigate("/login"), 1000)
  }

  const refreshProfile = () => {
    setIsLoading(true)
    toast.loading("Refreshing profile...")

    setTimeout(() => {
      initializeUserProfile()
      toast.dismiss()
      toast.success("Profile refreshed!")
    }, 1000)
  }

  const calculateProfileCompletion = () => {
    const fields = [
      user.name ,
      user.email,
      user.phone,
      user.address,
      user.bio,
      user.dob,
      user.socialLinks?.instagram,
      user.socialLinks?.portfolio,
      user.profilePicture !== defaultProfilePicture ? user.profilePicture : null,
      user.skills?.length > 0 ? user.skills : null,
    ]
    const filledFields = fields.filter((field) => field).length
    return Math.round((filledFields / fields.length) * 100)
  }

  const generateQRCode = (url, size = 150) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}`
  }

  const shareProfile = async () => {
    const profileData = {
      title: `${user.name}'s Profile`,
      text: `Check out ${user.name}'s developer profile!`,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(profileData)
        toast.success("Profile shared successfully!")
      } catch (error) {
        if (error.name !== "AbortError") {
          await navigator.clipboard.writeText(window.location.href)
          toast.success("Profile link copied to clipboard!")
        }
      }
    } else {
      await navigator.clipboard.writeText(window.location.href)
      toast.success("Profile link copied to clipboard!")
    }
  }

  const downloadProfile = () => {
    const profileData = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      bio: user.bio,
      skills: user.skills,
      experience: user.experience,
      projects: user.projects,
      socialLinks: user.socialLinks,
      lastUpdated: user.lastUpdated,
    }

    const dataStr = JSON.stringify(profileData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${user.name?.replace(/\s+/g, "_")}_profile.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    toast.success("Profile data downloaded!")
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  }

  const profilePictureVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300">Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-500 p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Profile Dashboard</h1>
              <p className="text-indigo-100 text-sm">Manage your professional presence</p>
              {user.lastUpdated && (
                <p className="text-indigo-200 text-xs mt-1">
                  Last updated: {new Date(user.lastUpdated).toLocaleDateString()}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={refreshProfile}
                className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                aria-label="Refresh Profile"
              >
                <RefreshCw size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={shareProfile}
                className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                aria-label="Share Profile"
              >
                <Share2 size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadProfile}
                className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                aria-label="Download Profile"
              >
                <Download size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/home")}
                className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                aria-label="Close"
              >
                <X size={24} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-8">
          {/* Enhanced Sidebar */}
          <motion.div variants={itemVariants} className="lg:w-1/3 space-y-6">
            <div className="flex flex-col items-center">
              <motion.div
                variants={profilePictureVariants}
                className="relative group cursor-pointer"
                onClick={handleImageClick}
              >
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-gradient-to-r from-indigo-500 to-purple-500 shadow-xl">
                  <img
                    src={previewImage || defaultProfilePicture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                {isEditing && (
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={32} className="text-white" />
                  </div>
                )}
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="mt-4 text-xl font-semibold text-gray-900 dark:text-white text-center"
              >
                {user.name || "Your Name"}
              </motion.h2>

              <motion.p variants={itemVariants} className="text-sm text-gray-500 dark:text-gray-400 text-center">
                {user.email || "your.email@example.com"}
              </motion.p>

              {/* Enhanced Stats */}
              <div className="mt-4 grid grid-cols-3 gap-4 w-full">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{user.projects || 12}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {user.skills?.length || 4}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Skills</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{user.experience || "2+"}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Years</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${calculateProfileCompletion()}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
                Profile Completion: {calculateProfileCompletion()}%
              </p>

              {!isEditing && (
                <motion.button
                  variants={itemVariants}
                  onClick={() => setIsEditing(true)}
                  className="mt-4 flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-lg"
                >
                  <Edit size={16} className="mr-2" />
                  Edit Profile
                </motion.button>
              )}
            </div>

            {/* QR Codes Section */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                  <QrCode size={20} className="mr-2 text-indigo-500" />
                  Quick Connect
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowQRCodes(!showQRCodes)}
                  className="text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 p-2 rounded-lg transition-colors"
                >
                  <Eye size={16} />
                </motion.button>
              </div>

              <AnimatePresence>
                {showQRCodes && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Instagram size={16} className="mr-2 text-pink-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Instagram</span>
                      </div>
                      <div className="bg-white p-2 rounded-lg shadow-md inline-block">
                        <img
                          src={generateQRCode(formData.socialLinks.instagram) || "/placeholder.svg"}
                          alt="Instagram QR Code"
                          className="w-24 h-24"
                        />
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Globe size={16} className="mr-2 text-blue-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Portfolio</span>
                      </div>
                      <div className="bg-white p-2 rounded-lg shadow-md inline-block">
                        <img
                          src={generateQRCode(formData.socialLinks.portfolio) || "/placeholder.svg"}
                          alt="Portfolio QR Code"
                          className="w-24 h-24"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Achievements Section */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-4"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                <Trophy size={20} className="mr-2 text-yellow-500" />
                Achievements
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement) => {
                  const IconComponent = achievement.icon
                  const isUnlocked = user.achievements?.includes(achievement.id) || achievement.unlocked
                  return (
                    <motion.div
                      key={achievement.id}
                      whileHover={{ scale: 1.05 }}
                      className={`p-3 rounded-xl text-center transition-all duration-300 ${
                        isUnlocked ? "bg-white dark:bg-gray-700 shadow-md" : "bg-gray-100 dark:bg-gray-800 opacity-50"
                      }`}
                    >
                      <IconComponent
                        size={24}
                        className={`mx-auto mb-2 ${isUnlocked ? achievement.color : "text-gray-400"}`}
                      />
                      <p
                        className={`text-xs font-medium ${
                          isUnlocked ? "text-gray-900 dark:text-white" : "text-gray-500"
                        }`}
                      >
                        {achievement.title}
                      </p>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={itemVariants} className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open(formData.socialLinks.instagram, "_blank")}
                  className="w-full flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-pink-900/30 rounded-lg transition-colors"
                >
                  <Instagram size={16} className="mr-3 text-pink-500" />
                  Visit Instagram
                  <ExternalLink size={12} className="ml-auto" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open(formData.socialLinks.portfolio, "_blank")}
                  className="w-full flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                >
                  <Globe size={16} className="mr-3 text-blue-500" />
                  View Portfolio
                  <ExternalLink size={12} className="ml-auto" />
                </motion.button>

               
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSignOut}
                  className="w-full flex items-center px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                >
                  <LogOut size={16} className="mr-3" />
                  Sign Out
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Main Content */}
          <motion.div variants={itemVariants} className="lg:w-2/3">
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-xl p-1 mb-6">
              {[
                { id: "overview", label: "Overview", icon: User },
                { id: "skills", label: "Skills", icon: Code },
                { id: "projects", label: "Projects", icon: Palette },
              ].map((tab) => {
                const IconComponent = tab.icon
                return (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-md"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <IconComponent size={16} className="mr-2" />
                    {tab.label}
                  </motion.button>
                )
              })}
            </div>

            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div
                  key="edit-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Edit Profile</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name *</label>
                      <div className="relative mt-1">
                        <User size={20} className="absolute top-3 left-3 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email Address *
                      </label>
                      <div className="relative mt-1">
                        <Mail size={20} className="absolute top-3 left-3 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Phone Number * (XXX-XXX-XXXX)
                      </label>
                      <div className="relative mt-1">
                        <Phone size={20} className="absolute top-3 left-3 text-gray-400" />
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          placeholder="123-456-7890"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address *</label>
                      <div className="relative mt-1">
                        <MapPin size={20} className="absolute top-3 left-3 text-gray-400" />
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          placeholder="123 Tech Street"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Experience</label>
                      <div className="relative mt-1">
                        <Clock size={20} className="absolute top-3 left-3 text-gray-400" />
                        <input
                          type="text"
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          placeholder="2+ years"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Date of Birth
                      </label>
                      <div className="relative mt-1">
                        <Cake size={20} className="absolute top-3 left-3 text-gray-400" />
                        <input
                          type="date"
                          name="dob"
                          value={formData.dob}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Instagram</label>
                      <div className="relative mt-1">
                        <Instagram size={20} className="absolute top-3 left-3 text-gray-400" />
                        <input
                          type="url"
                          name="instagram"
                          value={formData.socialLinks.instagram}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          placeholder="https://instagram.com/yourusername"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Portfolio</label>
                      <div className="relative mt-1">
                        <Globe size={20} className="absolute top-3 left-3 text-gray-400" />
                        <input
                          type="url"
                          name="portfolio"
                          value={formData.socialLinks.portfolio}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          placeholder="https://yourportfolio.com"
                        />
                      </div>
                    </div>

                    {/* Skills Selection */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Skills</label>
                      <div className="flex flex-wrap gap-2">
                        {availableSkills.map((skill) => (
                          <motion.button
                            key={skill}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            onClick={() => handleSkillToggle(skill)}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                              formData.skills.includes(skill)
                                ? "bg-indigo-600 text-white shadow-md"
                                : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500"
                            }`}
                          >
                            {skill}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={handleSave}
                      disabled={isSaving || saveSuccess}
                      className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg text-white ${
                        isSaving || saveSuccess
                          ? "bg-indigo-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 shadow-lg`}
                    >
                      {isSaving ? (
                        <>
                          <svg
                            className="animate-spin mr-2 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Saving...
                        </>
                      ) : saveSuccess ? (
                        <>
                          <CheckCircle size={20} className="mr-2" />
                          Saved!
                        </>
                      ) : (
                        <>
                          <Save size={20} className="mr-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={isSaving}
                      className="flex-1 flex items-center justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                    >
                      <X size={20} className="mr-2" />
                      Cancel
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={`view-${activeTab}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {activeTab === "overview" && (
                    <>
                      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
                        <Sparkles size={24} className="mr-2 text-indigo-500" />
                        Profile Overview
                      </h2>

                      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-start">
                            <User size={20} className="text-indigo-500 mt-0.5 mr-3" />
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                              <p className="text-base text-gray-900 dark:text-white font-medium">
                                {user.name || "Not provided"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Mail size={20} className="text-indigo-500 mt-0.5 mr-3" />
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                              <p className="text-base text-gray-900 dark:text-white font-medium">
                                {user.email || "Not provided"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Phone size={20} className="text-indigo-500 mt-0.5 mr-3" />
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
                              <p className="text-base text-gray-900 dark:text-white font-medium">
                                {user.phone || "Not provided"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <MapPin size={20} className="text-indigo-500 mt-0.5 mr-3" />
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                              <p className="text-base text-gray-900 dark:text-white font-medium">
                                {user.address || "Not provided"}
                              </p>
                            </div>
                          </div>
                          {user.dob && (
                            <div className="flex items-start">
                              <Cake size={20} className="text-indigo-500 mt-0.5 mr-3" />
                              <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Date of Birth</p>
                                <p className="text-base text-gray-900 dark:text-white font-medium">{user.dob}</p>
                              </div>
                            </div>
                          )}
                          {user.experience && (
                            <div className="flex items-start">
                              <Clock size={20} className="text-indigo-500 mt-0.5 mr-3" />
                              <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Experience</p>
                                <p className="text-base text-gray-900 dark:text-white font-medium">{user.experience}</p>
                              </div>
                            </div>
                          )}
                          {user.bio && (
                            <div className="md:col-span-2">
                              <p className="text-sm text-gray-500 dark:text-gray-400">Bio</p>
                              <p className="text-base text-gray-900 dark:text-white font-medium">{user.bio}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Social Links */}
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                          <LinkIcon size={20} className="mr-2 text-blue-500" />
                          Social Links
                        </h3>
                        <div className="space-y-3">
                          <motion.a
                            whileHover={{ scale: 1.02 }}
                            href={user.socialLinks?.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-xl hover:shadow-md transition-all duration-300"
                          >
                            <Instagram size={20} className="mr-3 text-pink-500" />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 dark:text-white">Instagram</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">@ritik_1_8</p>
                            </div>
                            <ExternalLink size={16} className="text-gray-400" />
                          </motion.a>

                          <motion.a
                            whileHover={{ scale: 1.02 }}
                            href={user.socialLinks?.portfolio}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-xl hover:shadow-md transition-all duration-300"
                          >
                            <Globe size={20} className="mr-3 text-blue-500" />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 dark:text-white">Portfolio</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">View my work</p>
                            </div>
                            <ExternalLink size={16} className="text-gray-400" />
                          </motion.a>
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === "skills" && (
                    <>
                      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
                        <Code size={24} className="mr-2 text-indigo-500" />
                        Skills & Expertise
                      </h2>

                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Technical Skills</h3>
                        <div className="flex flex-wrap gap-3">
                          {(user.skills || ["React", "JavaScript", "Node.js", "Python"]).map((skill, index) => (
                            <motion.div
                              key={skill}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                              className="px-4 py-2 bg-white dark:bg-gray-700 rounded-xl shadow-md border border-gray-200 dark:border-gray-600"
                            >
                              <span className="text-gray-900 dark:text-white font-medium">{skill}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                            <Zap size={20} className="mr-2 text-purple-500" />
                            Skill Level
                          </h3>
                          <div className="space-y-3">
                            {["Frontend Development", "Backend Development", "Database Design", "UI/UX Design"].map(
                              (skill, index) => (
                                <div key={skill}>
                                  <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                      {skill}
                                    </span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{85 - index * 10}%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <motion.div
                                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                                      initial={{ width: 0 }}
                                      animate={{ width: `${85 - index * 10}%` }}
                                      transition={{ duration: 1, delay: index * 0.2 }}
                                    />
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                            <Target size={20} className="mr-2 text-orange-500" />
                            Learning Goals
                          </h3>
                          <div className="space-y-3">
                            {["Machine Learning", "DevOps", "Mobile Development", "Cloud Computing"].map(
                              (goal, index) => (
                                <motion.div
                                  key={goal}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-lg"
                                >
                                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                                  <span className="text-gray-900 dark:text-white">{goal}</span>
                                </motion.div>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === "projects" && (
                    <>
                      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
                        <Palette size={24} className="mr-2 text-indigo-500" />
                        Projects & Work
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          {
                            title: "E-commerce Platform",
                            description: "Full-stack web application with React and Node.js",
                            tech: ["React", "Node.js", "MongoDB"],
                            status: "Completed",
                            color: "from-blue-500 to-purple-500",
                          },
                          {
                            title: "Mobile Task Manager",
                            description: "Cross-platform mobile app for productivity",
                            tech: ["React Native", "Firebase"],
                            status: "In Progress",
                            color: "from-green-500 to-teal-500",
                          },
                          {
                            title: "AI Chatbot",
                            description: "Intelligent chatbot using natural language processing",
                            tech: ["Python", "TensorFlow", "Flask"],
                            status: "Planning",
                            color: "from-orange-500 to-red-500",
                          },
                          {
                            title: "Portfolio Website",
                            description: "Personal portfolio showcasing my work and skills",
                            tech: ["Next.js", "Tailwind CSS"],
                            status: "Live",
                            color: "from-purple-500 to-pink-500",
                          },
                        ].map((project, index) => (
                          <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <div
                              className={`w-full h-32 bg-gradient-to-r ${project.color} rounded-xl mb-4 flex items-center justify-center`}
                            >
                              <Palette size={32} className="text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              {project.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {project.tech.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md text-xs"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center justify-between">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  project.status === "Completed"
                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                    : project.status === "In Progress"
                                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                      : project.status === "Live"
                                        ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                                        : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                                }`}
                              >
                                {project.status}
                              </span>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 text-gray-400 hover:text-indigo-500 transition-colors"
                              >
                                <ExternalLink size={16} />
                              </motion.button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Enhanced Footer */}
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 p-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Made with ❤️ by {user.name || "Ritik kumar"} • Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Profile

// import { useNavigate } from "react-router-dom"
// import { motion, AnimatePresence } from "framer-motion"
// import { toast, Toaster } from "react-hot-toast"
// import { useState, useEffect, useRef } from "react"
// import {
//   User,
//   Mail,
//   Phone,
//   MapPin,
//   Camera,
//   Edit,
//   Save,
//   X,
//   Cake,
//   LinkIcon,
//   CheckCircle,
//   ExternalLink,
//   LogOut,
//   Instagram,
//   Globe,
//   QrCode,
//   Star,
//   Clock,
//   Download,
//   Share2,
//   Heart,
//   Eye,
//   Code,
//   Palette,
//   Zap,
//   Trophy,
//   Target,
//   Sparkles,
//   RefreshCw,
//   Sun,
//   Moon,
//   FileText,
//   History,
//   Lock,
//   Unlock,
// } from "lucide-react"

// // Fixed array for default user data
// const initialUserData = [
//   {
//     name: "Ritik Kumar",
//     email: "ritik@example.com",
//     phone: "123-456-7890",
//     address: "123 Tech Street, Code City",
//     bio: "Passionate developer skilled in modern web technologies.",
//     dob: "1998-01-18",
//     socialLinks: {
//       instagram: "https://www.instagram.com/ritik_1_8?igsh=MXR1MWI5amwwd2FwMA==",
//       portfolio: "https://portfolio-cyan-one-46.vercel.app/",
//     },
//     profilePicture: "",
//     skills: ["React", "JavaScript", "Node.js", "Python"],
//     achievements: [1, 2],
//     projects: 12,
//     experience: "2+ years",
//   },
// ]

// const Profile = () => {
//   const navigate = useNavigate()
//   const [user, setUser] = useState(null) // Initialize as null to check loading state
//   const [isEditing, setIsEditing] = useState(false)
//   const [isLoading, setIsLoading] = useState(true)
//   const [formData, setFormData] = useState(null) // Initialize as null
//   const [previewImage, setPreviewImage] = useState("")
//   const [isSaving, setIsSaving] = useState(false)
//   const [saveSuccess, setSaveSuccess] = useState(false)
//   const [showQRCodes, setShowQRCodes] = useState(false)
//   const [activeTab, setActiveTab] = useState("overview")
//   const [currentUserId, setCurrentUserId] = useState(null)
//   const [isDarkMode, setIsDarkMode] = useState(false)
//   const [activityLog, setActivityLog] = useState([])
//   const [isProfilePublic, setIsProfilePublic] = useState(true)
//   const [skillEndorsements, setSkillEndorsements] = useState({})
//   const fileInputRef = useRef(null)

//   // Skills data
//   const availableSkills = [
//     "React", "JavaScript", "TypeScript", "Node.js", "Python", "Java", "C++", "HTML/CSS",
//     "MongoDB", "PostgreSQL", "Git", "Docker", "AWS", "Firebase", "Next.js", "Vue.js",
//     "Angular", "Express.js", "GraphQL", "REST APIs",
//   ]

//   const achievements = [
//     { id: 1, title: "First Project Completed", icon: Trophy, color: "text-yellow-500", unlocked: true },
//     { id: 2, title: "Profile Master", icon: Star, color: "text-blue-500", unlocked: true },
//     { id: 3, title: "Social Connector", icon: Heart, color: "text-red-500", unlocked: true },
//     { id: 4, title: "Skill Collector", icon: Target, color: "text-green-500", unlocked: true },
//   ]

//   // Initialize dark mode from localStorage
//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme")
//     if (savedTheme === "dark") {
//       setIsDarkMode(true)
//       document.documentElement.classList.add("dark")
//     }
//     const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })
//     const timer = setTimeout(scrollToTop, 0)
//     return () => clearTimeout(timer)
//   }, [])

//   // Get current user ID
//   const getCurrentUserId = () => {
//     const authUser = localStorage.getItem("user")
//     if (authUser) {
//       try {
//         const parsed = JSON.parse(authUser)
//         return parsed.id || parsed.email || "default"
//       } catch (error) {
//         console.error("Error parsing auth user:", error)
//       }
//     }
//     return "default"
//   }

//   // Initialize or load user profile data
//   const initializeUserProfile = () => {
//     console.log("Initializing user profile...")

//     // Check localStorage for user data
//     const storedUser = localStorage.getItem("user")
//     let userData = null

//     if (storedUser) {
//       try {
//         const parsedUser = JSON.parse(storedUser)
//         console.log("Parsed user from localStorage:", parsedUser)

//         // Validate that parsedUser has all required fields
//         const requiredFields = [
//           "name",
//           "email",
//           "phone",
//           "address",
//           "bio",
//           "dob",
//           "socialLinks",
//           "profilePicture",
//           "skills",
//           "achievements",
//           "projects",
//           "experience",
//         ]
//         const hasAllFields = requiredFields.every((field) => field in parsedUser)

//         if (hasAllFields) {
//           userData = {
//             ...parsedUser,
//             socialLinks: {
//               instagram: parsedUser.socialLinks?.instagram || initialUserData[0].socialLinks.instagram,
//               portfolio: parsedUser.socialLinks?.portfolio || initialUserData[0].socialLinks.portfolio,
//             },
//             skills: Array.isArray(parsedUser.skills) ? parsedUser.skills : initialUserData[0].skills,
//             achievements: Array.isArray(parsedUser.achievements)
//               ? parsedUser.achievements
//               : initialUserData[0].achievements,
//             projects: Number.isInteger(parsedUser.projects) ? parsedUser.projects : initialUserData[0].projects,
//             lastUpdated: parsedUser.lastUpdated || new Date().toISOString(),
//           }
//           console.log("Using validated localStorage data:", userData)
//         } else {
//           console.log("localStorage data incomplete, falling back to initialUserData")
//           userData = { ...initialUserData[0], id: getCurrentUserId() }
//         }
//       } catch (error) {
//         console.error("Error parsing user data from localStorage:", error)
//         userData = { ...initialUserData[0], id: getCurrentUserId() }
//         localStorage.removeItem("user")
//         navigate("/login")
//         return
//       }
//     } else {
//       console.log("No user in localStorage, using initialUserData")
//       userData = { ...initialUserData[0], id: getCurrentUserId() }
//       localStorage.setItem("user", JSON.stringify(userData))
//     }

//     const userId = userData.id || userData.email || "default"
//     setCurrentUserId(userId)
//     setUser(userData)
//     setFormData(userData)
//     setPreviewImage(userData.profilePicture)
//     console.log("Set user state:", userData)
//     console.log("Set formData state:", userData)
//     console.log("Set previewImage:", userData.profilePicture)

//     addActivity("Profile initialized")
//     setIsLoading(false)
//   }

//   useEffect(() => {
//     initializeUserProfile()
//   }, [navigate])

//   // Handle storage changes
//   useEffect(() => {
//     const handleStorageChange = (e) => {
//       if (e.key === "user") {
//         if (!e.newValue) {
//           navigate("/login")
//         } else {
//           initializeUserProfile()
//         }
//       }
//     }
//     window.addEventListener("storage", handleStorageChange)
//     return () => window.removeEventListener("storage", handleStorageChange)
//   }, [navigate])

//   // Toggle dark mode
//   const toggleDarkMode = () => {
//     const newMode = !isDarkMode
//     setIsDarkMode(newMode)
//     if (newMode) {
//       document.documentElement.classList.add("dark")
//       localStorage.setItem("theme", "dark")
//       toast.success("Switched to dark mode")
//       addActivity("Enabled dark mode")
//     } else {
//       document.documentElement.classList.remove("dark")
//       localStorage.setItem("theme", "light")
//       toast.success("Switched to light mode")
//       addActivity("Enabled light mode")
//     }
//   }

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target
//     console.log(`Handling change for ${name}: ${value}`)
//     if (name === "instagram" || name === "portfolio") {
//       setFormData({
//         ...formData,
//         socialLinks: { ...formData.socialLinks, [name]: value },
//       })
//     } else {
//       setFormData({ ...formData, [name]: value })
//     }
//   }

//   // Handle skill toggle
//   const handleSkillToggle = (skill) => {
//     const updatedSkills = formData.skills.includes(skill)
//       ? formData.skills.filter((s) => s !== skill)
//       : [...formData.skills, skill]
//     setFormData({ ...formData, skills: updatedSkills })
//     console.log("Updated skills:", updatedSkills)
//   }

//   // Handle image change
//   const handleImageChange = (e) => {
//     const file = e.target.files[0]
//     if (!file) return

//     if (file.size > 2 * 1024 * 1024) {
//       toast.error("Image size should be less than 2MB")
//       return
//     }

//     const reader = new FileReader()
//     reader.onloadend = () => {
//       setPreviewImage(reader.result)
//       setFormData({ ...formData, profilePicture: reader.result })
//       addActivity("Profile picture updated")
//       console.log("Profile picture updated to:", reader.result)
//     }
//     reader.readAsDataURL(file)
//   }

//   const handleImageClick = () => {
//     if (isEditing) fileInputRef.current.click()
//   }

//   // Validate form
//   const validateForm = () => {
//     if (!formData.name || !formData.email || !formData.phone || !formData.address) {
//       toast.error("Please fill in all required fields")
//       return false
//     }
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//     if (!emailRegex.test(formData.email)) {
//       toast.error("Please enter a valid email address")
//       return false
//     }
//     return true
//   }

//   // Save profile
//   const handleSave = async () => {
//     if (!validateForm()) return
//     setIsSaving(true)
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1000))
//       const updatedUser = {
//         ...formData,
//         lastUpdated: new Date().toISOString(),
//       }
//       localStorage.setItem("user", JSON.stringify(updatedUser))
//       setUser(updatedUser)
//       setSaveSuccess(true)
//       toast.success("Profile updated successfully!")
//       addActivity("Profile saved")
//       console.log("Saved user data:", updatedUser)
//       setTimeout(() => {
//         setSaveSuccess(false)
//         setIsEditing(false)
//       }, 1500)
//     } catch (error) {
//       console.error("Error saving profile:", error)
//       toast.error("Failed to update profile")
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   // Cancel editing
//   const handleCancel = () => {
//     setFormData(user)
//     setPreviewImage(user.profilePicture)
//     setIsEditing(false)
//     toast("Changes discarded")
//     addActivity("Edit cancelled")
//     console.log("Cancelled editing, reverted formData to:", user)
//   }

//   // Sign out
//   const handleSignOut = () => {
//     localStorage.removeItem("user")
//     setUser(null)
//     setFormData(initialUserData[0])
//     setPreviewImage(initialUserData[0].profilePicture)
//     setCurrentUserId(null)
//     toast.success("Signed out successfully!")
//     addActivity("Signed out")
//     console.log("Signed out, reset to initialUserData:", initialUserData[0])
//     setTimeout(() => navigate("/login"), 1000)
//   }

//   // Refresh profile
//   const refreshProfile = () => {
//     setIsLoading(true)
//     toast.loading("Refreshing profile...")
//     setTimeout(() => {
//       initializeUserProfile()
//       toast.dismiss()
//       toast.success("Profile refreshed!")
//       addActivity("Profile refreshed")
//     }, 1000)
//   }

//   // Calculate profile completion
//   const calculateProfileCompletion = () => {
//     if (!user) return 0
//     const fields = [
//       user.name,
//       user.email,
//       user.phone,
//       user.address,
//       user.bio,
//       user.dob,
//       user.socialLinks?.instagram,
//       user.socialLinks?.portfolio,
//       user.profilePicture !== initialUserData[0].profilePicture ? user.profilePicture : null,
//       user.skills?.length > 0 ? user.skills : null,
//     ]
//     const filledFields = fields.filter((field) => field).length
//     return Math.round((filledFields / fields.length) * 100)
//   }

//   // Generate QR code
//   const generateQRCode = (url, size = 150) => {
//     return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}`
//   }

//   // Share profile
//   const shareProfile = async () => {
//     const profileData = {
//       title: `${user?.name || "User"}'s Profile`,
//       text: `Check out ${user?.name || "this"} developer's profile!`,
//       url: window.location.href,
//     }
//     if (navigator.share) {
//       try {
//         await navigator.share(profileData)
//         toast.success("Profile shared successfully!")
//         addActivity("Profile shared")
//       } catch (error) {
//         if (error.name !== "AbortError") {
//           await navigator.clipboard.writeText(window.location.href)
//           toast.success("Profile link copied to clipboard!")
//           addActivity("Profile link copied")
//         }
//       }
//     } else {
//       await navigator.clipboard.writeText(window.location.href)
//       toast.success("Profile link copied to clipboard!")
//       addActivity("Profile link copied")
//     }
//   }

//   // Export profile as JSON
//   const downloadProfile = () => {
//     if (!user) return
//     const profileData = {
//       name: user.name,
//       email: user.email,
//       phone: user.phone,
//       address: user.address,
//       bio: user.bio,
//       skills: user.skills,
//       experience: user.experience,
//       projects: user.projects,
//       socialLinks: user.socialLinks,
//       lastUpdated: user.lastUpdated,
//     }
//     const dataStr = JSON.stringify(profileData, null, 2)
//     const dataBlob = new Blob([dataStr], { type: "application/json" })
//     const url = URL.createObjectURL(dataBlob)
//     const link = document.createElement("a")
//     link.href = url
//     link.download = `${user.name?.replace(/\s+/g, "_") || "user"}_profile.json`
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)
//     URL.revokeObjectURL(url)
//     toast.success("Profile data downloaded!")
//     addActivity("Profile exported as JSON")
//   }

//   // Export profile as PDF (LaTeX)
//   const exportProfileAsPDF = () => {
//     if (!user) return
//     const latexContent = `
// \\documentclass[a4paper,11pt]{article}
// \\usepackage{geometry}
// \\geometry{margin=1in}
// \\usepackage{hyperref}
// \\usepackage{fontspec}
// \\setmainfont{DejaVu Sans}
// \\usepackage{xcolor}
// \\usepackage{enumitem}
// \\usepackage{titlesec}

// \\titleformat{\\section}{\\Large\\bfseries\\color{blue}}{\\thesection}{1em}{}
// \\titleformat{\\subsection}{\\large\\bfseries\\color{teal}}{\\thesubsection}{1em}{}

// \\begin{document}

// \\begin{center}
//   {\\Huge \\textbf{${user.name || "Ritik Kumar"}}}\\\\
//   \\vspace{0.2cm}
//   {\\large Developer Profile}\\\\
//   \\vspace{0.2cm}
//   \\href{mailto:${user.email || "ritik@example.com"}}{${user.email || "ritik@example.com"}} \\ $|$ 
//   ${user.phone || "123-456-7890"} \\ $|$ 
//   ${user.address || "123 Tech Street, Code City"}
// \\end{center}

// \\vspace{0.5cm}

// \\section*{Summary}
// ${user.bio || "Passionate developer skilled in modern web technologies."}

// \\section*{Skills}
// \\begin{itemize}[leftmargin=*]
// ${user.skills.map((skill) => `  \\item ${skill}`).join("\n") || "\\item React\n\\item JavaScript\n\\item Node.js\n\\item Python"}
// \\end{itemize}

// \\section*{Experience}
// ${user.experience || "2+ years"} in software development.

// \\section*{Projects}
// Completed ${user.projects || 12} projects, showcasing expertise in web development.

// \\section*{Social Links}
// \\begin{itemize}[leftmargin=*]
//   \\item \\href{${user.socialLinks.instagram}}{Instagram: @ritik_1_8}
//   \\item \\href{${user.socialLinks.portfolio}}{Portfolio}
// \\end{itemize}

// \\section*{Achievements}
// \\begin{itemize}[leftmargin=*]
// ${achievements
//   .filter((a) => user.achievements?.includes(a.id))
//   .map((a) => `  \\item ${a.title}`)
//   .join("\n") || "\\item First Project Completed\n\\item Profile Master"}
// \\end{itemize}

// \\end{document}
// `
//     const blob = new Blob([latexContent], { type: "text/plain" })
//     const url = URL.createObjectURL(blob)
//     const link = document.createElement("a")
//     link.href = url
//     link.download = `${user.name?.replace(/\s+/g, "_") || "user"}_profile.tex`
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)
//     URL.revokeObjectURL(url)
//     toast.success("Profile exported as LaTeX (PDF ready)!")
//     addActivity("Profile exported as PDF")
//   }

//   // Add activity to log
//   const addActivity = (action) => {
//     const timestamp = new Date().toLocaleString()
//     setActivityLog((prev) => [{ action, timestamp }, ...prev.slice(0, 4)])
//     console.log("Activity added:", { action, timestamp })
//   }

//   // Endorse skill
//   const endorseSkill = (skill) => {
//     setSkillEndorsements((prev) => ({
//       ...prev,
//       [skill]: (prev[skill] || 0) + 1,
//     }))
//     toast.success(`Endorsed ${skill}!`)
//     addActivity(`Endorsed skill: ${skill}`)
//     console.log("Endorsed skill:", skill, "New endorsements:", skillEndorsements[skill] + 1)
//   }

//   // Toggle profile visibility
//   const toggleProfileVisibility = () => {
//     const newStatus = !isProfilePublic
//     setIsProfilePublic(newStatus)
//     toast.success(`Profile set to ${newStatus ? "public" : "private"}`)
//     addActivity(`Set profile to ${newStatus ? "public" : "private"}`)
//     console.log("Profile visibility set to:", newStatus ? "public" : "private")
//   }

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
//   }

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
//   }

//   const profilePictureVariants = {
//     hidden: { scale: 0.8, opacity: 0 },
//     visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 100 } },
//   }

//   if (isLoading || !user || !formData) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto mb-4"></div>
//           <p className="text-lg text-gray-600 dark:text-gray-300">Loading your profile...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
//       <Toaster position="top-center" />

//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden"
//       >
//         {/* Header */}
//         <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-500 p-6 relative overflow-hidden">
//           <div className="absolute inset-0 bg-black/10"></div>
//           <div className="relative flex justify-between items-center">
//             <div>
//               <h1 className="text-2xl font-bold text-white">Profile Dashboard</h1>
//               <p className="text-indigo-100 text-sm">Manage your professional presence</p>
//               {user.lastUpdated && (
//                 <p className="text-indigo-200 text-xs mt-1">
//                   Last updated: {new Date(user.lastUpdated).toLocaleDateString()}
//                 </p>
//               )}
//             </div>
//             <div className="flex items-center space-x-3">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={toggleDarkMode}
//                 className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
//                 aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
//               >
//                 {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={refreshProfile}
//                 className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
//                 aria-label="Refresh Profile"
//               >
//                 <RefreshCw size={20} />
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={shareProfile}
//                 className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
//                 aria-label="Share Profile"
//               >
//                 <Share2 size={20} />
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={downloadProfile}
//                 className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
//                 aria-label="Download Profile"
//               >
//                 <Download size={20} />
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={exportProfileAsPDF}
//                 className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
//                 aria-label="Export as PDF"
//               >
//                 <FileText size={20} />
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => navigate("/home")}
//                 className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
//                 aria-label="Close"
//               >
//                 <X size={24} />
//               </motion.button>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-8">
//           {/* Sidebar */}
//           <motion.div variants={itemVariants} className="lg:w-1/3 space-y-6">
//             <div className="flex flex-col items-center">
//               <motion.div
//                 variants={profilePictureVariants}
//                 className="relative group cursor-pointer"
//                 onClick={handleImageClick}
//               >
//                 <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-gradient-to-r from-indigo-500 to-purple-500 shadow-xl">
//                   <img
//                     src={previewImage}
//                     alt="Profile"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 {isEditing && (
//                   <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                     <Camera size={32} className="text-white" />
//                   </div>
//                 )}
//                 <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
//                   <div className="w-2 h-2 bg-white rounded-full"></div>
//                 </div>
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="hidden"
//                 />
//               </motion.div>

//               <motion.h2
//                 variants={itemVariants}
//                 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white text-center"
//               >
//                 {user.name || "Ritik Kumar"}
//               </motion.h2>

//               <motion.p variants={itemVariants} className="text-sm text-gray-500 dark:text-gray-400 text-center">
//                 {user.email || "ritik@example.com"}
//               </motion.p>

//               {/* Stats */}
//               <div className="mt-4 grid grid-cols-3 gap-4 w-full">
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{user.projects || 0}</div>
//                   <div className="text-xs text-gray-500 dark:text-gray-400">Projects</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{user.skills?.length || 0}</div>
//                   <div className="text-xs text-gray-500 dark:text-gray-400">Skills</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{user.experience || "0"}</div>
//                   <div className="text-xs text-gray-500 dark:text-gray-400">Years</div>
//                 </div>
//               </div>

//               {/* Progress Bar */}
//               <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
//                 <motion.div
//                   className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full"
//                   initial={{ width: 0 }}
//                   animate={{ width: `${calculateProfileCompletion()}%` }}
//                   transition={{ duration: 1, ease: "easeOut" }}
//                 />
//               </div>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
//                 Profile Completion: {calculateProfileCompletion()}%
//               </p>

//               {!isEditing && (
//                 <motion.button
//                   variants={itemVariants}
//                   onClick={() => setIsEditing(true)}
//                   className="mt-4 flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-lg"
//                 >
//                   <Edit size={16} className="mr-2" />
//                   Edit Profile
//                 </motion.button>
//               )}
//             </div>

//             {/* QR Codes Section */}
//             <motion.div
//               variants={itemVariants}
//               className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-4"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
//                   <QrCode size={20} className="mr-2 text-indigo-500" />
//                   Quick Connect
//                 </h3>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setShowQRCodes(!showQRCodes)}
//                   className="text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 p-2 rounded-lg transition-colors"
//                 >
//                   <Eye size={16} />
//                 </motion.button>
//               </div>
//               <AnimatePresence>
//                 {showQRCodes && (
//                   <motion.div
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: "auto" }}
//                     exit={{ opacity: 0, height: 0 }}
//                     className="space-y-4"
//                   >
//                     <div className="text-center">
//                       <div className="flex items-center justify-center mb-2">
//                         <Instagram size={16} className="mr-2 text-pink-500" />
//                         <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Instagram</span>
//                       </div>
//                       <div className="bg-white p-2 rounded-lg shadow-md inline-block">
//                         <img
//                           src={generateQRCode(user.socialLinks.instagram)}
//                           alt="Instagram QR Code"
//                           className="w-24 h-24"
//                         />
//                       </div>
//                     </div>
//                     <div className="text-center">
//                       <div className="flex items-center justify-center mb-2">
//                         <Globe size={16} className="mr-2 text-blue-500" />
//                         <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Portfolio</span>
//                       </div>
//                       <div className="bg-white p-2 rounded-lg shadow-md inline-block">
//                         <img
//                           src={generateQRCode(user.socialLinks.portfolio)}
//                           alt="Portfolio QR Code"
//                           className="w-24 h-24"
//                         />
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>

//             {/* Achievements Section */}
//             <motion.div
//               variants={itemVariants}
//               className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-4"
//             >
//               <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
//                 <Trophy size={20} className="mr-2 text-yellow-500" />
//                 Achievements
//               </h3>
//               <div className="grid grid-cols-2 gap-3">
//                 {achievements.map((achievement) => {
//                   const IconComponent = achievement.icon
//                   const isUnlocked = user.achievements?.includes(achievement.id) || achievement.unlocked
//                   return (
//                     <motion.div
//                       key={achievement.id}
//                       whileHover={{ scale: 1.05 }}
//                       className={`p-3 rounded-xl text-center transition-all duration-300 ${
//                         isUnlocked ? "bg-white dark:bg-gray-700 shadow-md" : "bg-gray-100 dark:bg-gray-800 opacity-50"
//                       }`}
//                     >
//                       <IconComponent
//                         size={24}
//                         className={`mx-auto mb-2 ${isUnlocked ? achievement.color : "text-gray-400"}`}
//                       />
//                       <p
//                         className={`text-xs font-medium ${
//                           isUnlocked ? "text-gray-900 dark:text-white" : "text-gray-500"
//                         }`}
//                       >
//                         {achievement.title}
//                       </p>
//                     </motion.div>
//                   )
//                 })}
//               </div>
//             </motion.div>

//             {/* Activity Log */}
//             <motion.div
//               variants={itemVariants}
//               className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-4"
//             >
//               <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
//                 <History size={20} className="mr-2 text-blue-500" />
//                 Recent Activity
//               </h3>
//               <div className="space-y-2">
//                 {activityLog.length > 0 ? (
//                   activityLog.map((activity, index) => (
//                     <div key={index} className="text-sm text-gray-600 dark:text-gray-300">
//                       <span className="font-medium">{activity.action}</span> at {activity.timestamp}
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-sm text-gray-500 dark:text-gray-400">No recent activity</p>
//                 )}
//               </div>
//             </motion.div>

//             {/* Quick Actions */}
//             <motion.div variants={itemVariants} className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-4">
//               <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Actions</h3>
//               <div className="space-y-2">
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => window.open(user.socialLinks.instagram, "_blank")}
//                   className="w-full flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-pink-900/30 rounded-lg transition-colors"
//                 >
//                   <Instagram size={16} className="mr-3 text-pink-500" />
//                   Visit Instagram
//                   <ExternalLink size={12} className="ml-auto" />
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => window.open(user.socialLinks.portfolio, "_blank")}
//                   className="w-full flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
//                 >
//                   <Globe size={16} className="mr-3 text-blue-500" />
//                   View Portfolio
//                   <ExternalLink size={12} className="ml-auto" />
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={toggleProfileVisibility}
//                   className="w-full flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors"
//                 >
//                   {isProfilePublic ? <Unlock size={16} className="mr-3 text-green-500" /> : <Lock size={16} className="mr-3 text-red-500" />}
//                   {isProfilePublic ? "Make Private" : "Make Public"}
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={handleSignOut}
//                   className="w-full flex items-center px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
//                 >
//                   <LogOut size={16} className="mr-3" />
//                   Sign Out
//                 </motion.button>
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* Main Content */}
//           <motion.div variants={itemVariants} className="lg:w-2/3">
//             {/* Tab Navigation */}
//             <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-xl p-1 mb-6">
//               {[
//                 { id: "overview", label: "Overview", icon: User },
//                 { id: "skills", label: "Skills", icon: Code },
//                 { id: "projects", label: "Projects", icon: Palette },
//               ].map((tab) => {
//                 const IconComponent = tab.icon
//                 return (
//                   <motion.button
//                     key={tab.id}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg transition-all duration-300 ${
//                       activeTab === tab.id
//                         ? "bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-md"
//                         : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
//                     }`}
//                   >
//                     <IconComponent size={16} className="mr-2" />
//                     {tab.label}
//                   </motion.button>
//                 )
//               })}
//             </div>

//             <AnimatePresence mode="wait">
//               {isEditing ? (
//                 <motion.div
//                   key="edit-form"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   className="space-y-6"
//                 >
//                   <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Edit Profile</h2>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name *</label>
//                       <div className="relative mt-1">
//                         <User size={20} className="absolute top-3 left-3 text-gray-400" />
//                         <input
//                           type="text"
//                           name="name"
//                           value={formData.name || ""}
//                           onChange={handleChange}
//                           required
//                           className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
//                           placeholder="Ritik Kumar"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address *</label>
//                       <div className="relative mt-1">
//                         <Mail size={20} className="absolute top-3 left-3 text-gray-400" />
//                         <input
//                           type="email"
//                           name="email"
//                           value={formData.email || ""}
//                           onChange={handleChange}
//                           required
//                           className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
//                           placeholder="ritik@example.com"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number * (XXX-XXX-XXXX)</label>
//                       <div className="relative mt-1">
//                         <Phone size={20} className="absolute top-3 left-3 text-gray-400" />
//                         <input
//                           type="text"
//                           name="phone"
//                           value={formData.phone || ""}
//                           onChange={handleChange}
//                           required
//                           className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
//                           placeholder="123-456-7890"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address *</label>
//                       <div className="relative mt-1">
//                         <MapPin size={20} className="absolute top-3 left-3 text-gray-400" />
//                         <input
//                           type="text"
//                           name="address"
//                           value={formData.address || ""}
//                           onChange={handleChange}
//                           required
//                           className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
//                           placeholder="123 Tech Street"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Experience</label>
//                       <div className="relative mt-1">
//                         <Clock size={20} className="absolute top-3 left-3 text-gray-400" />
//                         <input
//                           type="text"
//                           name="experience"
//                           value={formData.experience || ""}
//                           onChange={handleChange}
//                           className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
//                           placeholder="2+ years"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</label>
//                       <div className="relative mt-1">
//                         <Cake size={20} className="absolute top-3 left-3 text-gray-400" />
//                         <input
//                           type="date"
//                           name="dob"
//                           value={formData.dob || ""}
//                           onChange={handleChange}
//                           className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
//                         />
//                       </div>
//                     </div>
//                     <div className="md:col-span-2">
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
//                       <textarea
//                         name="bio"
//                         value={formData.bio || ""}
//                         onChange={handleChange}
//                         rows={4}
//                         className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
//                         placeholder="Tell us about yourself..."
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Instagram</label>
//                       <div className="relative mt-1">
//                         <Instagram size={20} className="absolute top-3 left-3 text-gray-400" />
//                         <input
//                           type="url"
//                           name="instagram"
//                           value={formData.socialLinks.instagram || ""}
//                           onChange={handleChange}
//                           className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
//                           placeholder="https://instagram.com/yourusername"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Portfolio</label>
//                       <div className="relative mt-1">
//                         <Globe size={20} className="absolute top-3 left-3 text-gray-400" />
//                         <input
//                           type="url"
//                           name="portfolio"
//                           value={formData.socialLinks.portfolio || ""}
//                           onChange={handleChange}
//                           className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
//                           placeholder="https://yourportfolio.com"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Projects</label>
//                       <div className="relative mt-1">
//                         <Palette size={20} className="absolute top-3 left-3 text-gray-400" />
//                         <input
//                           type="number"
//                           name="projects"
//                           value={formData.projects || 0}
//                           onChange={handleChange}
//                           className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
//                           placeholder="12"
//                         />
//                       </div>
//                     </div>
//                     <div className="md:col-span-2">
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Skills</label>
//                       <div className="flex flex-wrap gap-2">
//                         {availableSkills.map((skill) => (
//                           <motion.button
//                             key={skill}
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             type="button"
//                             onClick={() => handleSkillToggle(skill)}
//                             className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
//                               formData.skills.includes(skill)
//                                 ? "bg-indigo-600 text-white shadow-md"
//                                 : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500"
//                             }`}
//                           >
//                             {skill}
//                           </motion.button>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex gap-4 mt-6">
//                     <button
//                       onClick={handleSave}
//                       disabled={isSaving || saveSuccess}
//                       className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg text-white ${
//                         isSaving || saveSuccess
//                           ? "bg-indigo-400 cursor-not-allowed"
//                           : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
//                       } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 shadow-lg`}
//                     >
//                       {isSaving ? (
//                         <>
//                           <svg
//                             className="animate-spin mr-2 h-5 w-5 text-white"
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                           >
//                             <circle
//                               className="opacity-25"
//                               cx="12"
//                               cy="12"
//                               r="10"
//                               stroke="currentColor"
//                               strokeWidth="4"
//                             />
//                             <path
//                               className="opacity-75"
//                               fill="currentColor"
//                               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                             />
//                           </svg>
//                           Saving...
//                         </>
//                       ) : saveSuccess ? (
//                         <>
//                           <CheckCircle size={20} className="mr-2" />
//                           Saved!
//                         </>
//                       ) : (
//                         <>
//                           <Save size={20} className="mr-2" />
//                           Save Changes
//                         </>
//                       )}
//                     </button>
//                     <button
//                       onClick={handleCancel}
//                       disabled={isSaving}
//                       className="flex-1 flex items-center justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
//                     >
//                       <X size={20} className="mr-2" />
//                       Cancel
//                     </button>
//                   </div>
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key={`view-${activeTab}`}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   className="space-y-6"
//                 >
//                   {activeTab === "overview" && (
//                     <>
//                       <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
//                         <Sparkles size={24} className="mr-2 text-indigo-500" />
//                         Profile Overview
//                       </h2>
//                       <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 space-y-4">
//                         <h3 className="text-lg font-medium text-gray-900 dark:text-white">Personal Information</h3>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div className="flex items-start">
//                             <User size={20} className="text-indigo-500 mt-0.5 mr-3" />
//                             <div>
//                               <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
//                               <p className="text-base text-gray-900 dark:text-white font-medium">{user.name || "Ritik Kumar"}</p>
//                             </div>
//                           </div>
//                           <div className="flex items-start">
//                             <Mail size={20} className="text-indigo-500 mt-0.5 mr-3" />
//                             <div>
//                               <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
//                               <p className="text-base text-gray-500 dark:text-white font-medium">{user.email || "ritik@example.com"}</p>
//                             </div>
//                           </div>
//                           <div className="flex items-start">
//                             <Phone size={20} className="text-indigo-500 mt-0.5 mr-3" />
//                             <div>
//                               <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
//                               <p className="text-base text-gray-600 dark:text-white font-medium">{user.phone || "123-456-7890"}</p>
//                             </div>
//                           </div>
//                           <div className="flex items-start">
//                             <MapPin size={20} className="text-indigo-500 mt-0.5 mr-3" />
//                             <div>
//                               <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
//                               <p className="text-base text-gray-900 dark:text-white">{user.address || "123 Tech Street, Code City"}</p>
//                             </div>
//                           </div>
//                           {user.dob && (
//                             <div className="flex items-start">
//                               <Cake size={20} className="text-indigo-500 mt-0.5 mr-3" />
//                               <div>
//                                 <p className="text-sm text-gray-500 dark:text-gray-400">Date of Birth</p>
//                                 <p className="text-base text-gray-900 dark:text-white font-medium">{user.dob}</p>
//                               </div>
//                             </div>
//                           )}
//                           {user.experience && (
//                             <div className="flex items-start">
//                               <Clock size={20} className="text-indigo-500 mt-0.5 mr-3" />
//                               <div>
//                                 <p className="text-sm text-gray-500 dark:text-gray-400">Experience</p>
//                                 <p className="text-base text-gray-900 dark:text-white font-medium">{user.experience}</p>
//                               </div>
//                             </div>
//                           )}
//                           {user.bio && (
//                             <div className="md:col-span-2">
//                               <p className="text-sm text-gray-500 dark:text-gray-400">Bio</p>
//                               <p className="text-base text-gray-900 dark:text-white font-medium">{user.bio}</p>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                       <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6">
//                         <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
//                           <LinkIcon size={20} className="mr-2 text-blue-500" />
//                           Social Links
//                         </h3>
//                         <div className="space-y-3">
//                           <motion.a
//                             whileHover={{ scale: 1.02 }}
//                             href={user.socialLinks.instagram}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-xl hover:shadow-md transition-all duration-300"
//                           >
//                             <Instagram size={20} className="mr-3 text-pink-500" />
//                             <div className="flex-1">
//                               <p className="font-medium text-gray-900 dark:text-white">Instagram</p>
//                               <p className="text-sm text-gray-500 dark:text-gray-400">@ritik_1_8</p>
//                             </div>
//                             <ExternalLink size={16} className="text-gray-400" />
//                           </motion.a>
//                           <motion.a
//                             whileHover={{ scale: 1.02 }}
//                             href={user.socialLinks.portfolio}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-xl hover:shadow-md transition-all duration-300"
//                           >
//                             <Globe size={20} className="mr-3 text-blue-500" />
//                             <div className="flex-1">
//                               <p className="font-medium text-gray-900 dark:text-white">Portfolio</p>
//                               <p className="text-sm text-gray-500 dark:text-gray-400">View my work</p>
//                             </div>
//                             <ExternalLink size={16} className="text-gray-400" />
//                           </motion.a>
//                         </div>
//                       </div>
//                     </>
//                   )}
//                   {activeTab === "skills" && (
//                     <>
//                       <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
//                         <Code size={24} className="mr-2 text-indigo-500" />
//                         Skills & Expertise
//                       </h2>
//                       <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6">
//                         <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Technical Skills</h3>
//                         <div className="flex flex-wrap gap-3">
//                           {user.skills.map((skill, index) => (
//                             <motion.div
//                               key={skill}
//                               initial={{ opacity: 0, scale: 0.8 }}
//                               animate={{ opacity: 1, scale: 1 }}
//                               transition={{ delay: index * 0.1 }}
//                               className="px-4 py-2 bg-white dark:bg-gray-700 rounded-xl shadow-md border border-gray-200 dark:border-gray-600 flex items-center"
//                             >
//                               <span className="text-gray-900 dark:text-white font-medium">{skill}</span>
//                               <motion.button
//                                 whileHover={{ scale: 1.1 }}
//                                 whileTap={{ scale: 0.9 }}
//                                 onClick={() => endorseSkill(skill)}
//                                 className="ml-2 text-green-500"
//                                 aria-label={`Endorse ${skill}`}
//                               >
//                                 <Star size={16} />
//                                 <span className="text-xs ml-1">{skillEndorsements[skill] || 0}</span>
//                               </motion.button>
//                             </motion.div>
//                           ))}
//                         </div>
//                       </div>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6">
//                           <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
//                             <Zap size={20} className="mr-2 text-purple-500" />
//                             Skill Level
//                           </h3>
//                           <div className="space-y-3">
//                             {["Frontend Development", "Backend Development", "Database Design", "UI/UX Design"].map(
//                               (skill, index) => (
//                                 <div key={skill}>
//                                   <div className="flex justify-between mb-1">
//                                     <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill}</span>
//                                     <span className="text-sm text-gray-500 dark:text-gray-400">{85 - index * 10}%</span>
//                                   </div>
//                                   <div className="w-full bg-gray-200 dark:bg-gray-700 rounded">
//                                     <motion.div
//                                       className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
//                                       initial={{ width: 0 }}
//                                       animate={{ width: `${85 - index * 10}%` }}
//                                       transition={{ duration: 1, delay: index * 0.2 }}
//                                     />
//                                   </div>
//                                 </div>
//                               ),
//                             )}
//                           </div>
//                         </div>
//                         <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6">
//                           <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
//                             <Target size={20} className="mr-2 text-orange-500" />
//                             Learning Goals
//                           </h3>
//                           <div className="space-y-3">
//                             {["Machine Learning", "DevOps", "Mobile Development", "Cloud Computing"].map((goal, index) => (
//                               <motion.div
//                                 key={index}
//                                 initial={{ opacity: 0, x: -20 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 transition={{ delay: index * 0.1 }}
//                                 className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-lg"
//                               >
//                                 <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
//                                 <span className="text-gray-900 dark:text-white">{goal}</span>
//                               </motion.div>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     </>
//                   )}
//                   {activeTab === "projects" && (
//                     <>
//                       <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
//                         <Palette size={24} className="mr-2 text-indigo-500" />
//                         Projects & Work
//                       </h2>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {[
//                           {
//                             title: "E-commerce Platform",
//                             description: "Full-stack web application with React and Node.js",
//                             tech: ["React", "Node.js", "MongoDB"],
//                             status: "Completed",
//                             color: "from-blue-500 to-blue-600",
//                           },
//                           {
//                             title: "Mobile Task Manager",
//                             description: "Cross-platform mobile app for productivity",
//                             tech: ["React Native", "Firebase"],
//                             status: "In Progress",
//                             color: "from-green-500 to-teal-500",
//                           },
//                           {
//                             title: "AI Chatbot",
//                             description: "Intelligent chatbot using natural language processing",
//                             tech: ["Python", "TensorFlow", "Flask"],
//                             status: "Completed",
//                             color: "from-orange-500 to-red-500",
//                           },
//                           {
//                             title: "Portfolio Website",
//                             description: "Personal portfolio showcasing my work and skills",
//                             tech: ["Next.js", "Tailwind CSS"],
//                             status: "Live",
//                             color: "from-purple-500 to-pink-500",
//                           },
//                         ].map((project, index) => (
//                           <motion.div
//                             key={index}
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: index * 0.1 }}
//                             whileHover={{ y: -5 }}
//                             className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
//                           >
//                             <div
//                               className={`w-full h-32 bg-gradient-to-r ${project.color} rounded-xl mb-4 flex items-center justify-center`}
//                             >
//                               <Palette size={32} className="text-white" />
//                             </div>
//                             <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{project.title}</h3>
//                             <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{project.description}</p>
//                             <div className="flex flex-wrap gap-2 mb-3">
//                               {project.tech.map((tech, index) => (
//                                 <span
//                                   key={index}
//                                   className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-xs"
//                                 >
//                                   {tech}
//                                 </span>
//                               ))}
//                             </div>
//                             <div className="flex items-center justify-between">
//                               <span
//                                 className={`px-3 py-1 rounded-full text-xs font-medium text-gray-900 dark:text-white ${
//                                   project.status === "Completed"
//                                     ? "bg-green-100 dark:bg-green-900/20"
//                                     : project.status === "In Progress"
//                                     ? "bg-blue-100 dark:bg-blue-900/20"
//                                     : project.status === "Live"
//                                     ? "bg-purple-100 dark:bg-purple-900/20"
//                                     : "bg-orange-100 dark:bg-orange-900/20"
//                                 }`}
//                               >
//                                 {project.status}
//                               </span>
//                               <motion.button
//                                 whileHover={{ scale: 1.1 }}
//                                 whileTap={{ scale: 0.9 }}
//                                 className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
//                               >
//                                 <ExternalLink size={16} />
//                               </motion.button>
//                             </div>
//                           </motion.div>
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>
//         </div>

//         {/* Footer */}
//         <div className="bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 p-6 text-center">
//           <p className="text-sm text-gray-600 dark:text-gray-400">
//             Made with ❤️ by {user.name || "You"} • Last updated: {new Date().toLocaleDateString()}
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   )
// }

// export default Profile