import React, { useEffect, useMemo, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import {
  FaUser,
  FaCamera,
  FaEdit,
  FaSave,
  FaTimes,
  FaDownload,
  FaPrint,
  FaGraduationCap,
  FaBriefcase,
  FaSchool,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaAward,
  FaBook,
  FaCheckCircle,
  FaChartLine,
  FaIdBadge,
  FaGlobe,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaUserTie,
} from "react-icons/fa";

const PROFILE_KEY = "teacherProfile";
const PHOTO_KEY = "teacherProfilePhoto";

/* ================= INITIAL PROFILE DATA ================= */

const initialProfileData = {
  personalInfo: {
    firstName: "",
    lastName: "",
    fullName: "",
    dob: "",
    gender: "",
    nationality: "",
    maritalStatus: "",
    bloodGroup: "",
    email: "",
    personalEmail: "",
    phone: "",
    alternatePhone: "",
    whatsapp: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    emergencyContact: {
      name: "",
      relationship: "",
      phone: "",
    },
  },

  professionalInfo: {
    employeeId: "",
    designation: "",
    department: "",
    joiningDate: "",
    experienceYears: "",
    qualification: "",
    specialization: "",
    subjects: [],
    classAssigned: [],
    workingDays: [],
    workingHours: "",
    salaryGrade: "",
    employmentType: "",
  },

  academicInfo: {
    schoolName: "",
    schoolCode: "",
    schoolAddress: "",
    schoolPhone: "",
    schoolEmail: "",
    schoolWebsite: "",
    board: "",
    affiliation: "",
    principalName: "",
    vicePrincipalName: "",
  },

  additionalInfo: {
    languages: [],
    skills: [],
    hobbies: [],
    achievements: [],
    certifications: [],
    socialMedia: {
      facebook: "",
      instagram: "",
      twitter: "",
      linkedin: "",
    },
  },
};

/* ================= HELPER FUNCTIONS ================= */

const mergeProfileData = (saved = {}) => ({
  ...initialProfileData,
  ...saved,

  personalInfo: {
    ...initialProfileData.personalInfo,
    ...(saved.personalInfo || {}),
    emergencyContact: {
      ...initialProfileData.personalInfo.emergencyContact,
      ...(saved.personalInfo?.emergencyContact || {}),
    },
  },

  professionalInfo: {
    ...initialProfileData.professionalInfo,
    ...(saved.professionalInfo || {}),
  },

  academicInfo: {
    ...initialProfileData.academicInfo,
    ...(saved.academicInfo || {}),
  },

  additionalInfo: {
    ...initialProfileData.additionalInfo,
    ...(saved.additionalInfo || {}),
    socialMedia: {
      ...initialProfileData.additionalInfo.socialMedia,
      ...(saved.additionalInfo?.socialMedia || {}),
    },
  },
});

const toListString = (value) =>
  Array.isArray(value) ? value.join(", ") : value || "";

const toArray = (value) => {
  if (Array.isArray(value)) return value;

  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const convertToFormValues = (profile) => ({
  ...profile,

  professionalInfo: {
    ...profile.professionalInfo,
    subjects: toListString(profile.professionalInfo.subjects),
    classAssigned: toListString(profile.professionalInfo.classAssigned),
    workingDays: toListString(profile.professionalInfo.workingDays),
  },

  additionalInfo: {
    ...profile.additionalInfo,
    languages: toListString(profile.additionalInfo.languages),
    skills: toListString(profile.additionalInfo.skills),
    hobbies: toListString(profile.additionalInfo.hobbies),
    achievements: toListString(profile.additionalInfo.achievements),
    certifications: toListString(profile.additionalInfo.certifications),
  },
});

const convertToProfileData = (values) => ({
  ...values,

  professionalInfo: {
    ...values.professionalInfo,
    subjects: toArray(values.professionalInfo.subjects),
    classAssigned: toArray(values.professionalInfo.classAssigned),
    workingDays: toArray(values.professionalInfo.workingDays),
  },

  additionalInfo: {
    ...values.additionalInfo,
    languages: toArray(values.additionalInfo.languages),
    skills: toArray(values.additionalInfo.skills),
    hobbies: toArray(values.additionalInfo.hobbies),
    achievements: toArray(values.additionalInfo.achievements),
    certifications: toArray(values.additionalInfo.certifications),
  },
});

/* ================= YUP VALIDATION ================= */

const optionalPhone = Yup.string()
  .matches(/^[0-9+\-\s()]{7,20}$/, {
    message: "Enter a valid phone number",
    excludeEmptyString: true,
  })
  .notRequired();

const optionalEmail = Yup.string()
  .transform((value) => (value === "" ? undefined : value))
  .email("Enter a valid email")
  .notRequired();

const profileSchema = Yup.object({
  personalInfo: Yup.object({
    firstName: Yup.string().trim().required("First name is required"),

    lastName: Yup.string().trim().required("Last name is required"),

    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),

    personalEmail: optionalEmail,

    phone: Yup.string()
      .matches(/^[0-9+\-\s()]{7,20}$/, "Enter a valid phone number")
      .required("Phone number is required"),

    alternatePhone: optionalPhone,
    whatsapp: optionalPhone,

    pincode: Yup.string()
      .matches(/^[0-9A-Za-z -]{3,12}$/, {
        message: "Enter a valid pincode",
        excludeEmptyString: true,
      })
      .notRequired(),
  }),

  professionalInfo: Yup.object({
    employeeId: Yup.string().required("Employee ID is required"),
    designation: Yup.string().required("Designation is required"),
    department: Yup.string().required("Department is required"),
  }),

  academicInfo: Yup.object({
    schoolName: Yup.string().required("School name is required"),
    schoolEmail: optionalEmail,
  }),
});

/* ================= REUSABLE FORM FIELD ================= */

const ProfileField = ({
  label,
  name,
  type = "text",
  placeholder,
  as,
  rows = 3,
}) => (
  <div>
    <label className="mb-2 block text-sm font-semibold text-gray-700">
      {label}
    </label>

    <Field
      name={name}
      type={type}
      as={as}
      rows={rows}
      placeholder={placeholder || `Enter ${label.toLowerCase()}`}
      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
    />

    <ErrorMessage
      name={name}
      component="p"
      className="mt-1 text-xs text-red-500"
    />
  </div>
);

/* ================= REUSABLE DISPLAY FIELD ================= */

const InfoField = ({ label, value, icon: Icon }) => (
  <div className="flex min-w-0 gap-3 rounded-xl border border-gray-100 bg-white p-4">
    {Icon && (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
        <Icon />
      </div>
    )}

    <div className="min-w-0">
      <p className="text-xs font-medium text-gray-400">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold text-gray-700">
        {value || "Not provided"}
      </p>
    </div>
  </div>
);

/* ================= MAIN COMPONENT ================= */

const MyProfile = () => {
  const [profileData, setProfileData] = useState(initialProfileData);
  const [profilePhoto, setProfilePhoto] = useState("");
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState("success");
  const [isDownloading, setIsDownloading] = useState(false);

  const photoInputRef = useRef(null);
  const profileContentRef = useRef(null);
  const toastTimerRef = useRef(null);

  /* LOAD PROFILE FROM LOCAL STORAGE */

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem(PROFILE_KEY);
      const savedPhoto = localStorage.getItem(PHOTO_KEY);

      if (savedProfile) {
        setProfileData(mergeProfileData(JSON.parse(savedProfile)));
      }

      if (savedPhoto) {
        setProfilePhoto(savedPhoto);
      }
    } catch (error) {
      console.error("Profile loading error:", error);
    }

    return () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  /* TOAST NOTIFICATION */

  const showToast = (message, type = "success") => {
    setToast(message);
    setToastType(type);

    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = window.setTimeout(() => {
      setToast("");
    }, 3000);
  };

  /* PROFILE PHOTO UPLOAD */

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Please select a valid image.", "error");
      event.target.value = "";
      return;
    }

    if (file.size > 1024 * 1024) {
      showToast("Image size must be less than 1 MB.", "error");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const imageData = reader.result;

        localStorage.setItem(PHOTO_KEY, imageData);
        setProfilePhoto(imageData);

        showToast("Profile photo updated successfully!");
      } catch (error) {
        console.error(error);
        showToast("Unable to save photo. Try a smaller image.", "error");
      }
    };

    reader.onerror = () => {
      showToast("Unable to read the selected image.", "error");
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  };

  /* SAVE PROFILE */

  const handleSaveProfile = (values, actions) => {
    try {
      const updatedProfile = convertToProfileData(values);

      updatedProfile.personalInfo.fullName = [
        updatedProfile.personalInfo.firstName,
        updatedProfile.personalInfo.lastName,
      ]
        .filter(Boolean)
        .join(" ");

      // Save profile to localStorage
      localStorage.setItem(PROFILE_KEY, JSON.stringify(updatedProfile));

      // Update React state immediately
      setProfileData(updatedProfile);

      // Exit editing mode
      setIsEditing(false);

      // Show success notification
      showToast("Profile saved successfully!");

      actions.resetForm({
        values: convertToFormValues(updatedProfile),
      });
    } catch (error) {
      console.error("Profile save error:", error);

      showToast("Failed to save profile. Check browser storage.", "error");
    } finally {
      actions.setSubmitting(false);
    }
  };

  /* PROFILE COMPLETION */

  const completion = useMemo(() => {
    const fields = [
      profileData.personalInfo.firstName,
      profileData.personalInfo.lastName,
      profileData.personalInfo.email,
      profileData.personalInfo.phone,
      profileData.personalInfo.dob,
      profileData.personalInfo.gender,
      profileData.personalInfo.address,
      profileData.personalInfo.city,
      profileData.personalInfo.state,
      profileData.personalInfo.country,

      profileData.professionalInfo.employeeId,
      profileData.professionalInfo.designation,
      profileData.professionalInfo.department,
      profileData.professionalInfo.joiningDate,
      profileData.professionalInfo.qualification,
      profileData.professionalInfo.specialization,
      profileData.professionalInfo.subjects,

      profileData.academicInfo.schoolName,
      profileData.academicInfo.schoolCode,
      profileData.academicInfo.board,

      profileData.additionalInfo.languages,
      profileData.additionalInfo.skills,
      profileData.additionalInfo.certifications,
    ];

    const completed = fields.filter((value) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }

      return String(value || "").trim() !== "";
    }).length;

    return Math.round((completed / fields.length) * 100);
  }, [profileData]);

  /* STATISTICS */

  const statistics = [
    {
      label: "Experience",
      value: profileData.professionalInfo.experienceYears || "0",
      suffix: "Years",
      icon: FaBriefcase,
    },
    {
      label: "Subjects",
      value: profileData.professionalInfo.subjects?.length || 0,
      suffix: "Subjects",
      icon: FaBook,
    },
    {
      label: "Classes",
      value: profileData.professionalInfo.classAssigned?.length || 0,
      suffix: "Classes",
      icon: FaGraduationCap,
    },
    {
      label: "Certifications",
      value: profileData.additionalInfo.certifications?.length || 0,
      suffix: "Certificates",
      icon: FaAward,
    },
  ];

  /* PRINT PROFILE */

  const handlePrint = () => {
    window.print();
  };

  /* DOWNLOAD PDF */

  const handleDownloadPDF = async () => {
    if (!profileContentRef.current) return;

    try {
      setIsDownloading(true);

      const canvas = await html2canvas(profileContentRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imageData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 10;
      const imageWidth = pageWidth - margin * 2;
      const imageHeight = (canvas.height * imageWidth) / canvas.width;

      let remainingHeight = imageHeight;
      let position = margin;

      pdf.addImage(imageData, "PNG", margin, position, imageWidth, imageHeight);

      remainingHeight -= pageHeight - margin * 2;

      while (remainingHeight > 0) {
        pdf.addPage();

        position = margin - (imageHeight - remainingHeight);

        pdf.addImage(
          imageData,
          "PNG",
          margin,
          position,
          imageWidth,
          imageHeight,
        );

        remainingHeight -= pageHeight - margin * 2;
      }

      const fileName = (profileData.personalInfo.fullName || "Teacher").replace(
        /[^a-z0-9]/gi,
        "_",
      );

      pdf.save(`${fileName}_Profile.pdf`);

      showToast("Profile PDF downloaded successfully!");
    } catch (error) {
      console.error("PDF error:", error);
      showToast("Unable to download PDF.", "error");
    } finally {
      setIsDownloading(false);
    }
  };

  /* PROFILE DETAILS */

  const fullName =
    profileData.personalInfo.fullName ||
    `${profileData.personalInfo.firstName} ${profileData.personalInfo.lastName}`.trim() ||
    "Teacher Name";

  const tabs = [
    {
      id: "personal",
      label: "Personal Information",
      icon: FaUser,
    },
    {
      id: "professional",
      label: "Professional Information",
      icon: FaBriefcase,
    },
    {
      id: "academic",
      label: "Academic Information",
      icon: FaSchool,
    },
  ];

  /* ================= JSX ================= */

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* TOAST */}

      {toast && (
        <div
          className={`fixed right-5 top-5 z-[100] flex items-center gap-3 rounded-xl px-5 py-4 text-sm text-white shadow-xl ${
            toastType === "success" ? "bg-gray-900" : "bg-red-600"
          }`}
        >
          {toastType === "success" ? (
            <FaCheckCircle className="text-green-400" />
          ) : (
            <FaTimes />
          )}

          {toast}
        </div>
      )}

      <div className="mx-auto max-w-7xl">
        {/* PAGE HEADER */}

        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl text-left font-bold text-gray-800">
              My Profile
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage your personal and professional information.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {!isEditing ? (
              <>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                >
                  <FaPrint />
                  Print
                </button>

                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  disabled={isDownloading}
                  className="flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-60"
                >
                  <FaDownload />
                  {isDownloading ? "Preparing..." : "Download PDF"}
                </button>

                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-700"
                >
                  <FaEdit />
                  Edit Profile
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100"
              >
                <FaTimes />
                Cancel Editing
              </button>
            )}
          </div>
        </div>

        {/* PROFILE CONTENT */}

        <div ref={profileContentRef} className="space-y-6 bg-gray-50">
          {/* PROFILE HEADER */}

          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            {/* Blue background */}
            <div className="h-32 bg-gradient-to-r from-sky-600 to-blue-500 sm:h-36" />

            {/* Profile information */}
            <div className="px-5 pb-6 sm:px-8">
              <div className="flex flex-col gap-4 pt-5 sm:flex-row sm:items-center">
                {/* Profile photo */}
                <div className="relative h-28 w-28 shrink-0">
                  {profilePhoto ? (
                    <img
                      src={profilePhoto}
                      alt="Profile"
                      className="h-full w-full rounded-2xl border-4 border-white bg-white object-cover shadow-md"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-2xl border-4 border-white bg-sky-100 text-4xl font-bold text-sky-700 shadow-md">
                      {fullName.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => photoInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-sky-600 text-white shadow hover:bg-sky-700"
                  >
                    <FaCamera />
                  </button>

                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>

                {/* Teacher details */}
                <div className="min-w-0 flex-1">
                  <h2 className="break-words text-left text-2xl font-bold leading-tight text-gray-800">
                    {fullName}
                  </h2>

                  <p className="mt-2 text-sm text-left text-gray-500">
                    {profileData.professionalInfo.designation ||
                      "Designation not added"}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-2">
                      <FaIdBadge className="text-sky-600" />
                      {profileData.professionalInfo.employeeId ||
                        "Employee ID not added"}
                    </span>

                    <span className="flex items-center gap-2">
                      <FaSchool className="text-sky-600" />
                      {profileData.academicInfo.schoolName ||
                        "School not added"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STATISTICS CARDS */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {statistics.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-xl text-sky-600">
                    <Icon />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>

                    <p className="mt-1 text-xl font-bold text-gray-800">
                      {item.value}{" "}
                      <span className="text-xs font-medium text-gray-400">
                        {item.suffix}
                      </span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* PROFILE COMPLETION */}

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <FaChartLine />
                </div>

                <div>
                  <h3 className="font-bold text-gray-800">
                    Profile Completion
                  </h3>

                  <p className="text-xs text-gray-500">
                    Complete your information to improve your profile.
                  </p>
                </div>
              </div>

              <span className="text-lg font-bold text-sky-600">
                {completion}%
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-500 to-blue-600 transition-all duration-500"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>

          {/* TABS */}

          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex flex-col gap-2 border-b border-gray-100 p-3 sm:flex-row sm:p-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const selected = activeTab === tab.id;

                return (
                  <button
                    type="button"
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition sm:flex-1 ${
                      selected
                        ? "bg-sky-600 text-white shadow-sm"
                        : "bg-gray-50 text-gray-600 hover:bg-sky-50 hover:text-sky-700"
                    }`}
                  >
                    <Icon />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="p-5 sm:p-7">
              {/* FORM */}

              {isEditing ? (
                <Formik
                  initialValues={convertToFormValues(profileData)}
                  validationSchema={profileSchema}
                  onSubmit={handleSaveProfile}
                  enableReinitialize
                >
                  {({ isSubmitting, errors, touched }) => (
                    <Form>
                      {/* PERSONAL FORM */}

                      {activeTab === "personal" && (
                        <div className="space-y-7">
                          <section>
                            <h3 className="mb-4 text-lg font-bold text-gray-800">
                              Personal Information
                            </h3>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                              <ProfileField
                                label="First Name"
                                name="personalInfo.firstName"
                              />
                              <ProfileField
                                label="Last Name"
                                name="personalInfo.lastName"
                              />
                              <ProfileField
                                label="Date of Birth"
                                name="personalInfo.dob"
                                type="date"
                              />
                              <ProfileField
                                label="Gender"
                                name="personalInfo.gender"
                              />
                              <ProfileField
                                label="Nationality"
                                name="personalInfo.nationality"
                              />
                              <ProfileField
                                label="Marital Status"
                                name="personalInfo.maritalStatus"
                              />
                              <ProfileField
                                label="Blood Group"
                                name="personalInfo.bloodGroup"
                              />
                              <ProfileField
                                label="Official Email"
                                name="personalInfo.email"
                                type="email"
                              />
                              <ProfileField
                                label="Personal Email"
                                name="personalInfo.personalEmail"
                                type="email"
                              />
                              <ProfileField
                                label="Phone"
                                name="personalInfo.phone"
                              />
                              <ProfileField
                                label="Alternate Phone"
                                name="personalInfo.alternatePhone"
                              />
                              <ProfileField
                                label="WhatsApp"
                                name="personalInfo.whatsapp"
                              />
                              <ProfileField
                                label="Address"
                                name="personalInfo.address"
                              />
                              <ProfileField
                                label="City"
                                name="personalInfo.city"
                              />
                              <ProfileField
                                label="State"
                                name="personalInfo.state"
                              />
                              <ProfileField
                                label="Pincode"
                                name="personalInfo.pincode"
                              />
                              <ProfileField
                                label="Country"
                                name="personalInfo.country"
                              />
                            </div>
                          </section>

                          <section>
                            <h3 className="mb-4 text-lg font-bold text-gray-800">
                              Emergency Contact
                            </h3>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                              <ProfileField
                                label="Contact Name"
                                name="personalInfo.emergencyContact.name"
                              />

                              <ProfileField
                                label="Relationship"
                                name="personalInfo.emergencyContact.relationship"
                              />

                              <ProfileField
                                label="Contact Phone"
                                name="personalInfo.emergencyContact.phone"
                              />
                            </div>
                          </section>

                          <section>
                            <h3 className="mb-4 text-lg font-bold text-gray-800">
                              Additional Information
                            </h3>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                              <ProfileField
                                label="Languages (comma separated)"
                                name="additionalInfo.languages"
                              />

                              <ProfileField
                                label="Skills (comma separated)"
                                name="additionalInfo.skills"
                              />

                              <ProfileField
                                label="Hobbies (comma separated)"
                                name="additionalInfo.hobbies"
                              />

                              <ProfileField
                                label="Achievements (comma separated)"
                                name="additionalInfo.achievements"
                                as="textarea"
                              />

                              <ProfileField
                                label="Certifications (comma separated)"
                                name="additionalInfo.certifications"
                                as="textarea"
                              />
                            </div>
                          </section>

                          <section>
                            <h3 className="mb-4 text-lg font-bold text-gray-800">
                              Social Media
                            </h3>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                              <ProfileField
                                label="Facebook URL"
                                name="additionalInfo.socialMedia.facebook"
                              />

                              <ProfileField
                                label="Instagram URL"
                                name="additionalInfo.socialMedia.instagram"
                              />

                              <ProfileField
                                label="Twitter URL"
                                name="additionalInfo.socialMedia.twitter"
                              />

                              <ProfileField
                                label="LinkedIn URL"
                                name="additionalInfo.socialMedia.linkedin"
                              />
                            </div>
                          </section>
                        </div>
                      )}

                      {/* PROFESSIONAL FORM */}

                      {activeTab === "professional" && (
                        <section>
                          <h3 className="mb-4 text-lg font-bold text-gray-800">
                            Professional Information
                          </h3>

                          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <ProfileField
                              label="Employee ID"
                              name="professionalInfo.employeeId"
                            />
                            <ProfileField
                              label="Designation"
                              name="professionalInfo.designation"
                            />
                            <ProfileField
                              label="Department"
                              name="professionalInfo.department"
                            />
                            <ProfileField
                              label="Joining Date"
                              name="professionalInfo.joiningDate"
                              type="date"
                            />
                            <ProfileField
                              label="Experience (Years)"
                              name="professionalInfo.experienceYears"
                              type="number"
                            />
                            <ProfileField
                              label="Qualification"
                              name="professionalInfo.qualification"
                            />
                            <ProfileField
                              label="Specialization"
                              name="professionalInfo.specialization"
                            />
                            <ProfileField
                              label="Working Hours"
                              name="professionalInfo.workingHours"
                            />
                            <ProfileField
                              label="Salary Grade"
                              name="professionalInfo.salaryGrade"
                            />
                            <ProfileField
                              label="Employment Type"
                              name="professionalInfo.employmentType"
                            />

                            <ProfileField
                              label="Subjects (comma separated)"
                              name="professionalInfo.subjects"
                              as="textarea"
                            />

                            <ProfileField
                              label="Classes Assigned (comma separated)"
                              name="professionalInfo.classAssigned"
                              as="textarea"
                            />

                            <ProfileField
                              label="Working Days (comma separated)"
                              name="professionalInfo.workingDays"
                              as="textarea"
                            />
                          </div>
                        </section>
                      )}

                      {/* ACADEMIC FORM */}

                      {activeTab === "academic" && (
                        <section>
                          <h3 className="mb-4 text-lg font-bold text-gray-800">
                            Academic Information
                          </h3>

                          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <ProfileField
                              label="School Name"
                              name="academicInfo.schoolName"
                            />
                            <ProfileField
                              label="School Code"
                              name="academicInfo.schoolCode"
                            />
                            <ProfileField
                              label="School Address"
                              name="academicInfo.schoolAddress"
                            />
                            <ProfileField
                              label="School Phone"
                              name="academicInfo.schoolPhone"
                            />
                            <ProfileField
                              label="School Email"
                              name="academicInfo.schoolEmail"
                              type="email"
                            />
                            <ProfileField
                              label="School Website"
                              name="academicInfo.schoolWebsite"
                            />
                            <ProfileField
                              label="Board"
                              name="academicInfo.board"
                            />
                            <ProfileField
                              label="Affiliation"
                              name="academicInfo.affiliation"
                            />
                            <ProfileField
                              label="Principal Name"
                              name="academicInfo.principalName"
                            />
                            <ProfileField
                              label="Vice Principal Name"
                              name="academicInfo.vicePrincipalName"
                            />
                          </div>
                        </section>
                      )}

                      {/* VALIDATION SUMMARY */}

                      {Object.keys(errors).length > 0 &&
                        Object.keys(touched).length > 0 && (
                          <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-600">
                            Please check the highlighted fields before saving.
                          </p>
                        )}

                      {/* FORM BUTTONS */}

                      <div className="mt-8 flex flex-wrap justify-end gap-3 border-t border-gray-100 pt-5">
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                        >
                          Cancel
                        </button>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <FaSave />
                          {isSubmitting ? "Saving..." : "Save Profile"}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              ) : (
                <>
                  {/* PERSONAL DISPLAY */}

                  {activeTab === "personal" && (
                    <div className="space-y-7">
                      <section>
                        <h3 className="mb-4 text-lg font-bold text-gray-800">
                          Personal Information
                        </h3>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                          <InfoField
                            label="Full Name"
                            value={fullName}
                            icon={FaUser}
                          />
                          <InfoField
                            label="Date of Birth"
                            value={profileData.personalInfo.dob}
                            icon={FaCalendarAlt}
                          />
                          <InfoField
                            label="Gender"
                            value={profileData.personalInfo.gender}
                          />
                          <InfoField
                            label="Nationality"
                            value={profileData.personalInfo.nationality}
                          />
                          <InfoField
                            label="Marital Status"
                            value={profileData.personalInfo.maritalStatus}
                          />
                          <InfoField
                            label="Blood Group"
                            value={profileData.personalInfo.bloodGroup}
                          />
                          <InfoField
                            label="Official Email"
                            value={profileData.personalInfo.email}
                            icon={FaEnvelope}
                          />
                          <InfoField
                            label="Personal Email"
                            value={profileData.personalInfo.personalEmail}
                            icon={FaEnvelope}
                          />
                          <InfoField
                            label="Phone"
                            value={profileData.personalInfo.phone}
                            icon={FaPhone}
                          />
                          <InfoField
                            label="Alternate Phone"
                            value={profileData.personalInfo.alternatePhone}
                            icon={FaPhone}
                          />
                          <InfoField
                            label="WhatsApp"
                            value={profileData.personalInfo.whatsapp}
                            icon={FaPhone}
                          />
                          <InfoField
                            label="Address"
                            value={profileData.personalInfo.address}
                            icon={FaMapMarkerAlt}
                          />
                          <InfoField
                            label="City"
                            value={profileData.personalInfo.city}
                          />
                          <InfoField
                            label="State"
                            value={profileData.personalInfo.state}
                          />
                          <InfoField
                            label="Pincode"
                            value={profileData.personalInfo.pincode}
                          />
                          <InfoField
                            label="Country"
                            value={profileData.personalInfo.country}
                          />
                        </div>
                      </section>

                      <section>
                        <h3 className="mb-4 text-lg font-bold text-gray-800">
                          Emergency Contact
                        </h3>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                          <InfoField
                            label="Contact Name"
                            value={
                              profileData.personalInfo.emergencyContact.name
                            }
                          />

                          <InfoField
                            label="Relationship"
                            value={
                              profileData.personalInfo.emergencyContact
                                .relationship
                            }
                          />

                          <InfoField
                            label="Contact Phone"
                            value={
                              profileData.personalInfo.emergencyContact.phone
                            }
                            icon={FaPhone}
                          />
                        </div>
                      </section>

                      <section>
                        <h3 className="mb-4 text-lg font-bold text-gray-800">
                          Additional Information
                        </h3>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                          <InfoField
                            label="Languages"
                            value={profileData.additionalInfo.languages?.join(
                              ", ",
                            )}
                            icon={FaGlobe}
                          />
                          <InfoField
                            label="Skills"
                            value={profileData.additionalInfo.skills?.join(
                              ", ",
                            )}
                            icon={FaAward}
                          />
                          <InfoField
                            label="Hobbies"
                            value={profileData.additionalInfo.hobbies?.join(
                              ", ",
                            )}
                          />
                          <InfoField
                            label="Achievements"
                            value={profileData.additionalInfo.achievements?.join(
                              ", ",
                            )}
                            icon={FaAward}
                          />
                          <InfoField
                            label="Certifications"
                            value={profileData.additionalInfo.certifications?.join(
                              ", ",
                            )}
                            icon={FaGraduationCap}
                          />
                        </div>
                      </section>

                      <section>
                        <h3 className="mb-4 text-lg font-bold text-gray-800">
                          Social Media
                        </h3>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                          <InfoField
                            label="Facebook"
                            value={
                              profileData.additionalInfo.socialMedia.facebook
                            }
                            icon={FaFacebook}
                          />
                          <InfoField
                            label="Instagram"
                            value={
                              profileData.additionalInfo.socialMedia.instagram
                            }
                            icon={FaInstagram}
                          />
                          <InfoField
                            label="Twitter"
                            value={
                              profileData.additionalInfo.socialMedia.twitter
                            }
                            icon={FaTwitter}
                          />
                          <InfoField
                            label="LinkedIn"
                            value={
                              profileData.additionalInfo.socialMedia.linkedin
                            }
                            icon={FaLinkedin}
                          />
                        </div>
                      </section>
                    </div>
                  )}

                  {/* PROFESSIONAL DISPLAY */}

                  {activeTab === "professional" && (
                    <section>
                      <h3 className="mb-4 text-lg font-bold text-gray-800">
                        Professional Information
                      </h3>

                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                        <InfoField
                          label="Employee ID"
                          value={profileData.professionalInfo.employeeId}
                          icon={FaIdBadge}
                        />
                        <InfoField
                          label="Designation"
                          value={profileData.professionalInfo.designation}
                          icon={FaUserTie}
                        />
                        <InfoField
                          label="Department"
                          value={profileData.professionalInfo.department}
                        />
                        <InfoField
                          label="Joining Date"
                          value={profileData.professionalInfo.joiningDate}
                          icon={FaCalendarAlt}
                        />
                        <InfoField
                          label="Experience"
                          value={
                            profileData.professionalInfo.experienceYears
                              ? `${profileData.professionalInfo.experienceYears} Years`
                              : ""
                          }
                          icon={FaBriefcase}
                        />
                        <InfoField
                          label="Qualification"
                          value={profileData.professionalInfo.qualification}
                          icon={FaGraduationCap}
                        />
                        <InfoField
                          label="Specialization"
                          value={profileData.professionalInfo.specialization}
                        />
                        <InfoField
                          label="Subjects"
                          value={profileData.professionalInfo.subjects?.join(
                            ", ",
                          )}
                          icon={FaBook}
                        />
                        <InfoField
                          label="Classes Assigned"
                          value={profileData.professionalInfo.classAssigned?.join(
                            ", ",
                          )}
                        />
                        <InfoField
                          label="Working Days"
                          value={profileData.professionalInfo.workingDays?.join(
                            ", ",
                          )}
                        />
                        <InfoField
                          label="Working Hours"
                          value={profileData.professionalInfo.workingHours}
                        />
                        <InfoField
                          label="Salary Grade"
                          value={profileData.professionalInfo.salaryGrade}
                        />
                        <InfoField
                          label="Employment Type"
                          value={profileData.professionalInfo.employmentType}
                        />
                      </div>
                    </section>
                  )}

                  {/* ACADEMIC DISPLAY */}

                  {activeTab === "academic" && (
                    <section>
                      <h3 className="mb-4 text-lg font-bold text-gray-800">
                        Academic Information
                      </h3>

                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                        <InfoField
                          label="School Name"
                          value={profileData.academicInfo.schoolName}
                          icon={FaSchool}
                        />
                        <InfoField
                          label="School Code"
                          value={profileData.academicInfo.schoolCode}
                        />
                        <InfoField
                          label="School Address"
                          value={profileData.academicInfo.schoolAddress}
                          icon={FaMapMarkerAlt}
                        />
                        <InfoField
                          label="School Phone"
                          value={profileData.academicInfo.schoolPhone}
                          icon={FaPhone}
                        />
                        <InfoField
                          label="School Email"
                          value={profileData.academicInfo.schoolEmail}
                          icon={FaEnvelope}
                        />
                        <InfoField
                          label="School Website"
                          value={profileData.academicInfo.schoolWebsite}
                          icon={FaGlobe}
                        />
                        <InfoField
                          label="Board"
                          value={profileData.academicInfo.board}
                        />
                        <InfoField
                          label="Affiliation"
                          value={profileData.academicInfo.affiliation}
                        />
                        <InfoField
                          label="Principal Name"
                          value={profileData.academicInfo.principalName}
                        />
                        <InfoField
                          label="Vice Principal Name"
                          value={profileData.academicInfo.vicePrincipalName}
                        />
                      </div>
                    </section>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* PRINT CSS */}

      <style>{`
        @media print {
          body {
            background: white !important;
          }

          body * {
            visibility: hidden;
          }

          #root,
          #root * {
            visibility: visible;
          }

          button,
          input[type="file"] {
            display: none !important;
          }

          .min-h-screen {
            min-height: auto !important;
            padding: 0 !important;
            background: white !important;
          }

          .shadow-sm,
          .shadow-md {
            box-shadow: none !important;
          }

          @page {
            size: A4;
            margin: 12mm;
          }
        }
      `}</style>
    </div>
  );
};

export default MyProfile;
