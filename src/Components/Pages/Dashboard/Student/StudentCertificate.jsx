import React, { useEffect, useState } from "react";
import {
  FaAward,
  FaCertificate,
  FaFileAlt,
  FaGraduationCap,
  FaSearch,
  FaPrint,
  FaDownload,
  FaTimes,
  FaHistory,
} from "react-icons/fa";

import { useStudents } from "../../../../Pages/hooks/useStudent";

const certificateTypes = [
  {
    id: "Bonafide",
    title: "Bonafide Certificate",
    description: "Confirms that a student is studying in this school.",
    icon: FaCertificate,
  },
  {
    id: "Leaving",
    title: "Leaving Certificate",
    description: "Issued when a student leaves the school.",
    icon: FaFileAlt,
  },
  {
    id: "Achievement",
    title: "Achievement Certificate",
    description: "Recognizes a student's achievements.",
    icon: FaAward,
  },
  {
    id: "Character",
    title: "Character Certificate",
    description: "Confirms the student's conduct and behaviour.",
    icon: FaGraduationCap,
  },
];

const STORAGE_KEY = "studentCertificates";

const StudentCertificate = () => {
  const { students = [] } = useStudents();

  const [selectedType, setSelectedType] = useState("Bonafide");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [certificateNo, setCertificateNo] = useState("");
  const [issueDate, setIssueDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [reason, setReason] = useState("");
  const [achievement, setAchievement] = useState("");
  const [schoolName, setSchoolName] = useState("ABC Public School");
  const [principalName, setPrincipalName] = useState("School Principal");
  const [history, setHistory] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      setHistory(Array.isArray(saved) ? saved : []);
    } catch {
      setHistory([]);
    }
  }, []);

  const student = students.find(
    (item) => String(item.id) === String(selectedStudent)
  );

  const selectedCertificate = certificateTypes.find(
    (item) => item.id === selectedType
  );

  const filteredStudents = students.filter((item) =>
    String(item.name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const showMessage = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3000);
  };

  const generateCertificateNumber = () => {
    return `CERT-${Date.now().toString().slice(-8)}`;
  };

  const handlePreview = () => {
    if (!student) {
      showMessage("Please select a student.");
      return;
    }

    if (!schoolName.trim() || !principalName.trim()) {
      showMessage("Please enter school and principal details.");
      return;
    }

    if (selectedType === "Leaving" && !reason.trim()) {
      showMessage("Please enter the leaving reason.");
      return;
    }

    if (selectedType === "Achievement" && !achievement.trim()) {
      showMessage("Please enter achievement details.");
      return;
    }

    setCertificateNo(generateCertificateNumber());
    setShowPreview(true);
  };

  const getCertificateContent = () => {
    if (!student) return "";

    const name = student.name || "Student";
    const className = student.class || "-";
    const rollNo = student.rollNo || "-";

    switch (selectedType) {
      case "Bonafide":
        return `This is to certify that ${name} is a bonafide student of ${schoolName}. The student is currently studying in Class ${className}, bearing Roll Number ${rollNo}. This certificate is issued upon the student's request for official purposes.`;

      case "Leaving":
        return `This is to certify that ${name} was a student of ${schoolName}, studying in Class ${className}, bearing Roll Number ${rollNo}. The student is leaving the institution for the following reason: ${reason}. We wish the student success in future endeavours.`;

      case "Achievement":
        return `This certificate is proudly presented to ${name}, a student of Class ${className}, Roll Number ${rollNo}, in recognition of the following achievement: ${achievement}. We appreciate the student's dedication and outstanding effort.`;

      case "Character":
        return `This is to certify that ${name} was a student of ${schoolName}, studying in Class ${className}, bearing Roll Number ${rollNo}. During the period of study, the student's conduct and behaviour were found to be satisfactory.`;

      default:
        return "";
    }
  };

  const saveCertificate = () => {
    if (!student) return null;

    const certificate = {
      id: Date.now(),
      certificateNo,
      studentId: student.id,
      studentName: student.name,
      className: student.class,
      type: selectedType,
      issueDate,
      content: getCertificateContent(),
      schoolName,
      principalName,
    };

    const updatedHistory = [certificate, ...history];

    setHistory(updatedHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));

    return certificate;
  };

  const handlePrint = () => {
    if (!student) return;

    saveCertificate();

    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      showMessage("Please allow pop-ups to print the certificate.");
      return;
    }

    const content = getCertificateContent();

    const safe = (value) =>
      String(value ?? "").replace(/[&<>"']/g, (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character]);

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${safe(selectedType)} Certificate</title>
        <style>
          * { box-sizing: border-box; }
          body {
            margin: 0;
            padding: 30px;
            font-family: Georgia, serif;
            background: white;
          }
          .certificate {
            max-width: 900px;
            min-height: 600px;
            margin: auto;
            padding: 55px;
            border: 10px double #1d4ed8;
            text-align: center;
            position: relative;
          }
          .school {
            font-size: 30px;
            color: #1d4ed8;
            font-weight: bold;
            text-transform: uppercase;
          }
          .subtitle { color: #555; margin-top: 8px; }
          .line {
            border-top: 2px solid #1d4ed8;
            margin: 25px 0;
          }
          h1 {
            font-size: 34px;
            letter-spacing: 3px;
            color: #1e3a8a;
            margin: 30px 0;
          }
          .content {
            font-size: 20px;
            line-height: 2;
            text-align: justify;
            margin: 45px 0;
          }
          .details {
            display: flex;
            justify-content: space-between;
            margin-top: 65px;
            text-align: left;
            font-size: 14px;
          }
          .signature {
            text-align: center;
            border-top: 1px solid #222;
            padding-top: 8px;
            min-width: 180px;
          }
          @media print {
            body { padding: 0; }
            .certificate {
              width: 100%;
              min-height: 95vh;
              border: 10px double #1d4ed8;
            }
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="school">${safe(schoolName)}</div>
          <div class="subtitle">Official School Certificate</div>
          <div class="line"></div>
          <h1>${safe(selectedType.toUpperCase())} CERTIFICATE</h1>
          <p>Certificate No: ${safe(certificateNo)}</p>
          <div class="content">${safe(content)}</div>
          <div class="details">
            <div>
              <p>Date: ${safe(issueDate)}</p>
              <p>Student: ${safe(student.name)}</p>
            </div>
            <div class="signature">
              ${safe(principalName)}<br/>
              Principal
            </div>
          </div>
        </div>
        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
      </html>
    `);

    printWindow.document.close();
    showMessage("Certificate sent to print.");
  };

  const deleteHistory = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this certificate record?"
    );

    if (!confirmed) return;

    const updated = history.filter((item) => item.id !== id);
    setHistory(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    showMessage("Certificate record deleted.");
  };

  const resetForm = () => {
    setSelectedStudent("");
    setSearch("");
    setReason("");
    setAchievement("");
    setShowPreview(false);
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN");
  };

  return (
    <div className="min-h-screen bg-[#EAF1FF] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl text-left font-bold text-gray-800 sm:text-3xl">
              Student Certificate
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Generate and manage student certificates.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-sm">
            <FaHistory className="text-blue-600" />
            <span className="text-sm font-semibold text-gray-700">
              {history.length} Certificates
            </span>
          </div>
        </div>

        {/* Certificate Types */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {certificateTypes.map((type) => {
            const Icon = type.icon;

            return (
              <button
                key={type.id}
                onClick={() => {
                  setSelectedType(type.id);
                  setShowPreview(false);
                }}
                className={`rounded-2xl border-2 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 ${
                  selectedType === type.id
                    ? "border-blue-500 ring-2 ring-blue-100"
                    : "border-transparent hover:border-blue-200"
                }`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                    <Icon size={23} />
                  </div>

                  {selectedType === type.id && (
                    <span className="text-xs font-bold text-blue-600">
                      SELECTED
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-gray-800">{type.title}</h3>
                <p className="mt-2 text-xs leading-5 text-gray-500">
                  {type.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Main Form */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-7 lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Generate Certificate
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Enter the required information.
              </p>
            </div>

            <div className="space-y-5">

              {/* Student */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Select Student *
                </label>

                <div className="relative mb-2">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search student by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <select
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                >
                  <option value="">Choose a student</option>

                  {filteredStudents.map((item, index) => (
                    <option
                      key={item.id ?? index}
                      value={item.id}
                    >
                      {item.name} - Class {item.class} - Roll No. {item.rollNo}
                    </option>
                  ))}
                </select>

                {students.length === 0 && (
                  <p className="mt-2 text-xs text-red-500">
                    No students registered. Please add a student first.
                  </p>
                )}
              </div>

              {/* Student Details */}
              {student && (
                <div className="grid grid-cols-1 gap-3 rounded-xl bg-blue-50 p-4 sm:grid-cols-3">
                  <div>
                    <p className="text-xs text-gray-500">Student Name</p>
                    <p className="mt-1 font-semibold text-gray-800">
                      {student.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Class</p>
                    <p className="mt-1 font-semibold text-gray-800">
                      {student.class}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Roll Number</p>
                    <p className="mt-1 font-semibold text-gray-800">
                      {student.rollNo}
                    </p>
                  </div>
                </div>
              )}

              {/* School Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  School Name *
                </label>
                <input
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  placeholder="Enter school name"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              {/* Principal */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Principal Name *
                </label>
                <input
                  type="text"
                  value={principalName}
                  onChange={(e) => setPrincipalName(e.target.value)}
                  placeholder="Enter principal name"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              {/* Issue Date */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Issue Date *
                </label>
                <input
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              {/* Conditional fields */}
              {selectedType === "Leaving" && (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Leaving Reason *
                  </label>
                  <textarea
                    rows="3"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Enter reason for leaving..."
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>
              )}

              {selectedType === "Achievement" && (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Achievement Details *
                  </label>
                  <textarea
                    rows="3"
                    value={achievement}
                    onChange={(e) => setAchievement(e.target.value)}
                    placeholder="Describe the student's achievement..."
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 pt-3">
                <button
                  onClick={handlePreview}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  <FaCertificate />
                  Preview Certificate
                </button>

                <button
                  onClick={resetForm}
                  className="flex items-center gap-2 rounded-xl bg-gray-100 px-6 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-200"
                >
                  <FaTimes />
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Information Card */}
          <div className="h-fit rounded-2xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-xl bg-purple-100 p-3 text-purple-600">
                <FaGraduationCap size={22} />
              </div>
              <h2 className="font-bold text-gray-800">
                Certificate Information
              </h2>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-500">Selected Certificate</p>
                <p className="mt-1 font-semibold text-gray-800">
                  {selectedCertificate?.title}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Selected Student</p>
                <p className="mt-1 font-semibold text-gray-800">
                  {student?.name || "Not selected"}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Issue Date</p>
                <p className="mt-1 font-semibold text-gray-800">
                  {formatDate(issueDate)}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Total Certificates</p>
                <p className="mt-1 text-2xl font-bold text-blue-600">
                  {history.length}
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-4 text-xs leading-6 text-blue-800">
                Select a student and certificate type, enter the required
                details, and preview before printing.
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Preview */}
        {showPreview && student && (
          <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Certificate Preview
                </h2>
                <p className="text-sm text-gray-500">
                  Review the certificate before printing.
                </p>
              </div>

              <button
                onClick={handlePrint}
                className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
              >
                <FaPrint />
                Print / Save PDF
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl bg-gray-100 p-3 sm:p-6">
              <div className="mx-auto min-w-[650px] max-w-4xl border-[8px] border-double border-blue-700 bg-white p-10 text-center sm:p-14">
                <h2 className="text-3xl font-bold uppercase tracking-wide text-blue-800">
                  {schoolName}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Official School Certificate
                </p>

                <div className="my-7 border-t-2 border-blue-700" />

                <h1 className="text-3xl font-bold uppercase tracking-widest text-blue-900">
                  {selectedType} Certificate
                </h1>

                <p className="mt-5 text-sm text-gray-600">
                  Certificate No: {certificateNo}
                </p>

                <p className="my-10 text-left text-lg leading-10 text-gray-800">
                  {getCertificateContent()}
                </p>

                <div className="mt-16 flex justify-between gap-10 text-sm text-gray-700">
                  <div className="text-left">
                    <p>Date: {formatDate(issueDate)}</p>
                    <p className="mt-2">Student: {student.name}</p>
                  </div>

                  <div className="min-w-40 border-t border-gray-700 pt-2">
                    {principalName}
                    <p>Principal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Certificate History */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="border-b border-gray-100 p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                <FaHistory size={20} />
              </div>
              <div>
                <h2 className="text-xl text-left font-bold text-gray-800">
                  Certificate History
                </h2>
                <p className="text-sm text-gray-500">
                  Previously generated certificate records.
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left text-sm">
              <thead className="bg-blue-50 text-gray-700">
                <tr>
                  <th className="px-5 py-4">No.</th>
                  <th className="px-5 py-4">Certificate No.</th>
                  <th className="px-5 py-4">Student</th>
                  <th className="px-5 py-4">Type</th>
                  <th className="px-5 py-4">Issue Date</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {history.length > 0 ? (
                  history.map((item, index) => (
                    <tr key={item.id} className="hover:bg-blue-50/50">
                      <td className="px-5 py-4">{index + 1}</td>
                      <td className="px-5 py-4 font-semibold text-blue-700">
                        {item.certificateNo}
                      </td>
                      <td className="px-5 py-4 font-medium text-gray-800">
                        {item.studentName}
                      </td>
                      <td className="px-5 py-4">{item.type}</td>
                      <td className="px-5 py-4">
                        {formatDate(item.issueDate)}
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => deleteHistory(item.id)}
                          className="rounded-lg bg-red-50 p-2.5 text-red-600 hover:bg-red-100"
                          title="Delete record"
                        >
                          <FaTimes />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-5 py-12 text-center text-gray-500"
                    >
                      <FaCertificate className="mx-auto mb-3 text-4xl text-gray-300" />
                      No certificate records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div className="fixed bottom-5 right-5 z-50 rounded-xl bg-gray-900 px-5 py-4 text-sm font-medium text-white shadow-xl">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCertificate;
