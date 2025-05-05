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
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import { useState, useEffect, useRef } from "react";
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
  Lock,
  CheckCircle,
  ExternalLink,
  LogOut,
  Shield,
  Bell,
  HelpCircle,
  Twitter,
} from "lucide-react";

const Profile = () => {
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
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    dob: "",
    socialLinks: { twitter: "", linkedin: "" },
    profilePicture: "",
  });
  const [previewImage, setPreviewImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const defaultProfilePicture =
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80";

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData({
        name: parsedUser.name || "",
        email: parsedUser.email || "",
        phone: parsedUser.phone || "",
        address: parsedUser.address || "",
        bio: parsedUser.bio || "",
        dob: parsedUser.dob || "",
        socialLinks: parsedUser.socialLinks || { twitter: "", linkedin: "" },
        profilePicture: parsedUser.profilePicture || defaultProfilePicture,
      });
      setPreviewImage(parsedUser.profilePicture || defaultProfilePicture);
    } catch (error) {
      console.error("Error parsing user data:", error);
      toast.error("Error loading profile data");
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "twitter" || name === "linkedin") {
      setFormData({
        ...formData,
        socialLinks: { ...formData.socialLinks, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
      setFormData({ ...formData, profilePicture: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current.click();
    }
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      toast.error("Please fill in all required fields");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Phone number must be in the format XXX-XXX-XXXX");
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const updatedUser = { ...formData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setSaveSuccess(true);
      toast.success("Profile updated successfully!");
      setTimeout(() => {
        setSaveSuccess(false);
        setIsEditing(false);
      }, 1500);
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
      bio: user.bio || "",
      dob: user.dob || "",
      socialLinks: user.socialLinks || { twitter: "", linkedin: "" },
      profilePicture: user.profilePicture || defaultProfilePicture,
    });
    setPreviewImage(user.profilePicture || defaultProfilePicture);
    setIsEditing(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    toast.success("Signed out successfully!");
    setTimeout(() => navigate("/login"), 1000);
  };

  const calculateProfileCompletion = () => {
    const fields = [
      user.name,
      user.email,
      user.phone,
      user.address,
      user.bio,
      user.dob,
      user.socialLinks?.twitter,
      user.socialLinks?.linkedin,
      user.profilePicture !== defaultProfilePicture ? user.profilePicture : null,
    ];
    const filledFields = fields.filter((field) => field).length;
    return Math.round((filledFields / fields.length) * 100);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  const profilePictureVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <Toaster />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Profile Dashboard</h1>
          <button
            onClick={() => navigate("/home")}
            className="text-white hover:bg-indigo-700 p-2 rounded-full transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Main Content */}
        <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <motion.div variants={itemVariants} className="lg:w-1/3 space-y-6">
            <div className="flex flex-col items-center">
              <motion.div
                variants={profilePictureVariants}
                className="relative group cursor-pointer"
                onClick={handleImageClick}
              >
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-indigo-500 shadow-lg">
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
              <motion.p
                variants={itemVariants}
                className="text-sm text-gray-500 dark:text-gray-400 text-center"
              >
                {user.email || "your.email@example.com"}
              </motion.p>
              <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <motion.div
                  className="bg-indigo-500 h-3 rounded-full"
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
                  className="mt-4 flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <Edit size={16} className="mr-2" />
                  Edit Profile
                </motion.button>
              )}
            </div>

            <motion.div
              variants={itemVariants}
              className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-4"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Account Settings</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => toast.info("Security settings coming soon!")}
                    className="w-full flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    <Shield size={16} className="mr-3 text-gray-500 dark:text-gray-400" />
                    Security
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => toast.info("Notifications settings coming soon!")}
                    className="w-full flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    <Bell size={16} className="mr-3 text-gray-500 dark:text-gray-400" />
                    Notifications
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => toast.info("Support page coming soon!")}
                    className="w-full flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    <HelpCircle size={16} className="mr-3 text-gray-500 dark:text-gray-400" />
                    Help & Support
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                  >
                    <LogOut size={16} className="mr-3" />
                    Sign Out
                  </button>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <motion.div variants={itemVariants} className="lg:w-2/3">
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
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address *</label>
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
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number * (XXX-XXX-XXXX)</label>
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
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</label>
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Twitter</label>
                      <div className="relative mt-1">
                        <LinkIcon size={20} className="absolute top-3 left-3 text-gray-400" />
                        <input
                          type="url"
                          name="twitter"
                          value={formData.socialLinks.twitter}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          placeholder="https://twitter.com/yourusername"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">LinkedIn</label>
                      <div className="relative mt-1">
                        <LinkIcon size={20} className="absolute top-3 left-3 text-gray-400" />
                        <input
                          type="url"
                          name="linkedin"
                          value={formData.socialLinks.linkedin}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                          placeholder="https://linkedin.com/in/yourusername"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={handleSave}
                      disabled={isLoading || saveSuccess}
                      className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg text-white ${
                        isLoading || saveSuccess
                          ? "bg-indigo-400 cursor-not-allowed"
                          : "bg-indigo-600 hover:bg-indigo-700"
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
                    >
                      {isLoading ? (
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
                      disabled={isLoading}
                      className="flex-1 flex items-center justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                    >
                      <X size={20} className="mr-2" />
                      Cancel
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="view-profile"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Profile Information</h2>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-6 space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start">
                        <User size={20} className="text-indigo-500 mt-0.5 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                          <p className="text-base text-gray-900 dark:text-white">{user.name || "Not provided"}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Mail size={20} className="text-indigo-500 mt-0.5 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                          <p className="text-base text-gray-900 dark:text-white">{user.email || "Not provided"}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Phone size={20} className="text-indigo-500 mt-0.5 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
                          <p className="text-base text-gray-900 dark:text-white">{user.phone || "Not provided"}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MapPin size={20} className="text-indigo-500 mt-0.5 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                          <p className="text-base text-gray-900 dark:text-white">{user.address || "Not provided"}</p>
                        </div>
                      </div>
                      {user.dob && (
                        <div className="flex items-start">
                          <Cake size={20} className="text-indigo-500 mt-0.5 mr-3" />
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Date of Birth</p>
                            <p className="text-base text-gray-900 dark:text-white">{user.dob}</p>
                          </div>
                        </div>
                      )}
                      {user.bio && (
                        <div className="md:col-span-2">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Bio</p>
                          <p className="text-base text-gray-900 dark:text-white">{user.bio}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  {(user.socialLinks?.twitter || user.socialLinks?.linkedin) && (
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-6">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Social Links</h3>
                      <div className="space-y-3">
                        {user.socialLinks?.twitter && (
                          <a
                            href={user.socialLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-indigo-600 dark:text-indigo-400 hover:underline"
                          >
                            <Twitter size={20} className="mr-2" />
                            Twitter
                            <ExternalLink size={16} className="ml-1" />
                          </a>
                        )}
                        {user.socialLinks?.linkedin && (
                          <a
                            href={user.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-indigo-600 dark:text-indigo-400 hover:underline"
                          >
                            <LinkIcon size={20} className="mr-2" />
                            LinkedIn
                            <ExternalLink size={16} className="ml-1" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Account Settings</h3>
                    <button
                      onClick={() => toast.info("Change Password feature coming soon!")}
                      className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                    >
                      <Lock size={16} className="mr-2" />
                      Change Password
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 dark:bg-gray-700 p-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Need help?{" "}
            <button
              onClick={() => toast.info("Support page coming soon!")}
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Contact Support
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
