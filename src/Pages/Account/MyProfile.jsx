
import React, { useState } from 'react';

import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaUserCircle,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaEdit,
  FaCheckCircle,
  FaTimes,
  FaSchool,
  FaChalkboardTeacher,
  FaBook,
  FaUserGraduate,
  FaIdCard,
  FaBriefcase,
  FaBuilding,
  FaCalendarCheck,
  FaClock,
  FaUsers,
  FaGlobe,
  FaStar,
  FaAward,
  FaGraduationCap,
  FaAddressBook,
  FaHome,
  FaCity,
  FaFlag,
  FaBirthdayCake,
  FaUserTie,
  FaMailBulk,
  FaHeart,
  FaPhoneAlt,
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin
} from 'react-icons/fa';

const MyProfile = () => {
  // const [isEditing, setIsEditing] = useState(false);

  // Complete Profile Data
  const [profileData, setProfileData] = useState({
    // Personal Information
    personalInfo: {
      firstName: 'Pal',
      lastName: 'Patel',
      fullName: 'Pal Patel',
      dateOfBirth: '1995-05-15',
      gender: 'Male',
      nationality: 'Indian',
      maritalStatus: 'UnMarried',
      bloodGroup: 'O+',
      email: 'pal.patel@school.edu.in',
      personalEmail: 'palpatel@gmail.com',
      phone: '+91 98765 43210',
      alternatePhone: '+91 98765 43211',
      whatsapp: '+91 98765 43210',
      address: '123, Gandhi Nagar, Ahmedabad',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380001',
      country: 'India',
      emergencyContact: {
        name: 'Sita Patel',
        relationship: 'Mother',
        phone: '+91 98765 43212'
      }
    },

    // Professional Information
    professionalInfo: {
      employeeId: 'EMP-2024-001',
      designation: 'Senior Teacher',
      department: 'Science Department',
      joiningDate: '2024-01-15',
      experienceYears: 8,
      qualification: 'M.Sc. Physics, B.Ed.',
      specialization: 'Physics and Mathematics',
      subjects: ['Physics', 'Mathematics', 'Science'],
      classAssigned: ['10-A', '11-B', '12-A'],
      workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      workingHours: '8:00 AM - 3:00 PM',
      salaryGrade: 'Grade 12',
      employmentType: 'Permanent'
    },

    // Academic Information
    academicInfo: {
      schoolName: 'Shree Swaminarayan Gurukul',
      schoolCode: 'SSG-2024',
      schoolAddress: 'Near Railway Station, Ahmedabad',
      schoolPhone: '+91 79 1234 5678',
      schoolEmail: 'info@ssgurukul.edu.in',
      schoolWebsite: 'www.ssgurukul.edu.in',
      board: 'GSEB',
      affiliation: 'Gujarat Secondary Education Board',
      principalName: 'Dr. Anil Sharma',
      vicePrincipalName: 'Prof. Meena Desai'
    },

    // Additional Information
    additionalInfo: {
      languages: ['English', 'Gujarati', 'Hindi', 'Sanskrit'],
      skills: ['Curriculum Development', 'Classroom Management', 'Student Counseling'],
      hobbies: ['Playing Cricket', 'Yoga', 'Teaching'],
      achievements: [
        'Best Teacher Award 2023',
        'Best Batsman Of the Cricket Tournment',
        'National Level Physics Olympiad Winner'
      ],
      certifications: [
        'Google Certified Educator',
        'Microsoft Innovative Educator',
        'NPTEL Certification in Physics'
      ],
      socialMedia: {
        facebook: 'palpatel.teacher',
        instagram: '@palpatel_educator',
        twitter: '@palpatel_edu',
        linkedin: 'palpatel-teacher'
      }
    }
  });

  
  // Format Date
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // Render Field (View Mode)
  const renderField = (label, value, icon = null) => (
    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition">
      {icon && <span className="text-gray-400 mt-1">{icon}</span>}
      <div className="flex-1">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
        <p className="text-sm text-gray-800 font-medium">{value || '-'}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6" >
          <div>
            <h1 className="text-3xl font-bold text-left text-gray-800">My Profile</h1>
          </div>
         
        </div>

        <form id="profileForm">
          {/* Personal Information Section */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <FaUser size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">Personal Information</h2>
                <p className="text-sm text-left text-gray-500">Basic personal details</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 text-left lg:grid-cols-3 gap-4">
                <>
                  {renderField('Full Name', `${profileData.personalInfo.firstName} ${profileData.personalInfo.lastName}`, <FaUserCircle />)}
                  {renderField('Date of Birth', formatDate(profileData.personalInfo.dateOfBirth), <FaBirthdayCake />)}
                  {renderField('Gender', profileData.personalInfo.gender, <FaUserTie />)}
                  {renderField('Nationality', profileData.personalInfo.nationality, <FaFlag />)}
                  {renderField('Marital Status', profileData.personalInfo.maritalStatus)}
                  {renderField('Blood Group', profileData.personalInfo.bloodGroup)}
                  {renderField('Email', profileData.personalInfo.email, <FaEnvelope />)}
                  {renderField('Personal Email', profileData.personalInfo.personalEmail, <FaMailBulk />)}
                  {renderField('Phone', profileData.personalInfo.phone, <FaPhone />)}
                  {renderField('Alternate Phone', profileData.personalInfo.alternatePhone, <FaPhoneAlt />)}
                  {renderField('WhatsApp', profileData.personalInfo.whatsapp, <FaWhatsapp />)}
                  {renderField('Address', profileData.personalInfo.address, <FaHome />)}
                  {renderField('City', profileData.personalInfo.city, <FaCity />)}
                  {renderField('State', profileData.personalInfo.state)}
                  {renderField('Pincode', profileData.personalInfo.pincode)}
                  {renderField('Country', profileData.personalInfo.country, <FaGlobe />)}
                </>
            </div>

            {/* Emergency Contact */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <FaAddressBook className="text-blue-500" />
                Emergency Contact
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               
                  <>
                    <div className="flex items-start gap-3 p-3 bg-gray-50 text-left rounded-lg">
                      <FaUser className="text-gray-400 mt-1" />
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase">Contact Name</p>
                        <p className="text-sm text-gray-800 font-medium">{profileData.personalInfo.emergencyContact.name}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-left p-3 bg-gray-50 rounded-lg">
                      <FaHeart className="text-gray-400 mt-1" />
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase">Relationship</p>
                        <p className="text-sm text-gray-800 font-medium">{profileData.personalInfo.emergencyContact.relationship}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-left p-3 bg-gray-50 rounded-lg">
                      <FaPhone className="text-gray-400 mt-1" />
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase">Phone</p>
                        <p className="text-sm text-gray-800 font-medium">{profileData.personalInfo.emergencyContact.phone}</p>
                      </div>
                    </div>
                  </>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                <FaChalkboardTeacher size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">Professional Information</h2>
                <p className="text-sm text-gray-500">Work and career details</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 text-left lg:grid-cols-3 gap-4">
              
                <>
                  {renderField('Employee ID', profileData.professionalInfo.employeeId, <FaIdCard />)}
                  {renderField('Designation', profileData.professionalInfo.designation, <FaUserTie />)}
                  {renderField('Department', profileData.professionalInfo.department, <FaBuilding />)}
                  {renderField('Joining Date', formatDate(profileData.professionalInfo.joiningDate), <FaCalendarCheck />)}
                  {renderField('Experience', `${profileData.professionalInfo.experienceYears} Years`, <FaClock />)}
                  {renderField('Qualification', profileData.professionalInfo.qualification, <FaGraduationCap />)}
                  {renderField('Specialization', profileData.professionalInfo.specialization)}
                  {renderField('Subjects', profileData.professionalInfo.subjects.join(', '), <FaBook />)}
                  {renderField('Class Assigned', profileData.professionalInfo.classAssigned.join(', '), <FaUsers />)}
                  {renderField('Working Hours', profileData.professionalInfo.workingHours, <FaClock />)}
                  {renderField('Salary Grade', profileData.professionalInfo.salaryGrade, <FaBriefcase />)}
                  {renderField('Employment Type', profileData.professionalInfo.employmentType)}
                </>
            </div>
          </div>

         

          {/* Additional Information */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                <FaStar size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-left text-gray-800">Additional Information</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Languages */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <FaGlobe className="text-blue-500" />
                  Languages Known
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.additionalInfo.languages.map(lang => (
                    <span key={lang} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <FaChalkboardTeacher className="text-purple-500" />
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.additionalInfo.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hobbies */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <FaHeart className="text-red-500" />
                  Hobbies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.additionalInfo.hobbies.map(hobby => (
                    <span key={hobby} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                      {hobby}
                    </span>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <FaAward className="text-yellow-500" />
                  Achievements
                </h3>
                <ul className="space-y-1">
                  {profileData.additionalInfo.achievements.map((achievement, index) => (
                    <li key={index} className="text-sm text-yellow-700 bg-yellow-100 px-3 py-1 rounded-xl flex items-start gap-2">
                      {/* <span className="text-yellow-500">🏆</span> */}
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Certifications */}
              <div className="p-4 bg-gray-50 rounded-xl md:col-span-2">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <FaGraduationCap className="text-green-500" />
                  Certifications
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.additionalInfo.certifications.map(cert => (
                    <span key={cert} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                       {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <FaGlobe className="text-blue-500" />
                Social Media Presence
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <FaFacebook className="text-blue-600" />
                  <span className="text-sm text-gray-700">{profileData.additionalInfo.socialMedia.facebook}</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <FaInstagram className="text-pink-600" />
                  <span className="text-sm text-gray-700">{profileData.additionalInfo.socialMedia.instagram}</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <FaTwitter className="text-blue-400" />
                  <span className="text-sm text-gray-700">{profileData.additionalInfo.socialMedia.twitter}</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <FaLinkedin className="text-blue-700" />
                  <span className="text-sm text-gray-700">{profileData.additionalInfo.socialMedia.linkedin}</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;