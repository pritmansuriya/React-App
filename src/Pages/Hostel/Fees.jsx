
import React, { useEffect, useMemo, useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTimes,
  FaMoneyBillWave,
  FaCheckCircle,
  FaClock,
  FaUsers,
  FaSearch,
  FaReceipt,
  FaDownload,
  FaWallet,
  FaExclamationTriangle,
  FaHistory,
  FaPrint,
  FaCreditCard,
} from "react-icons/fa";
import { saveActivity } from "../hooks/useMessages";

const STORAGE_KEY = "hostelFees";
const PAYMENT_KEY = "hostelFeePayments";

const defaultFees = [
  {
    id: 1,
    student: "Evelyn Harper",
    studentId: "ST001",
    className: "8-A",
    room: "A102",
    fee: 5000,
    paid: 5000,
    dueDate: "2026-08-30",
  },
  {
    id: 2,
    student: "Diana Plenty",
    studentId: "ST002",
    className: "8-A",
    room: "A103",
    fee: 5000,
    paid: 3000,
    dueDate: "2026-08-30",
  },
  {
    id: 3,
    student: "John Millar",
    studentId: "ST003",
    className: "8-B",
    room: "B201",
    fee: 5000,
    paid: 0,
    dueDate: "2026-08-30",
  },
];

const emptyForm = {
  student: "",
  studentId: "",
  className: "",
  room: "",
  fee: "",
  paid: "0",
  dueDate: "",
};

const money = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

const today = () => new Date().toLocaleDateString("en-CA");

const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const getStatus = (item) => {
  const remaining = Math.max(0, Number(item.fee) - Number(item.paid));

  if (remaining === 0) return "Paid";

  if (item.dueDate && item.dueDate < today()) return "Overdue";

  if (Number(item.paid) > 0) return "Partial";

  return "Pending";
};

const statusStyles = {
  Paid: "bg-green-50 text-green-700",
  Partial: "bg-orange-50 text-orange-700",
  Pending: "bg-red-50 text-red-700",
  Overdue: "bg-rose-100 text-rose-800",
};

const escapeHTML = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });

const Fee = () => {
  const [fees, setFees] = useState(() =>
    readStorage(STORAGE_KEY, defaultFees)
  );

  const [payments, setPayments] = useState(() =>
    readStorage(PAYMENT_KEY, [])
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [editingFee, setEditingFee] = useState(null);
  const [selectedFee, setSelectedFee] = useState(null);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState(emptyForm);

  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    method: "Cash",
    date: today(),
    note: "",
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fees));
  }, [fees]);

  useEffect(() => {
    localStorage.setItem(PAYMENT_KEY, JSON.stringify(payments));
  }, [payments]);

  const totalFees = fees.reduce(
    (sum, item) => sum + Number(item.fee || 0),
    0
  );

  const paidAmount = fees.reduce(
    (sum, item) => sum + Number(item.paid || 0),
    0
  );

  const pendingAmount = Math.max(0, totalFees - paidAmount);

  const collectionProgress =
    totalFees > 0
      ? Math.min(100, (paidAmount / totalFees) * 100)
      : 0;

  const overdueCount = fees.filter(
    (item) => getStatus(item) === "Overdue"
  ).length;

  const filteredFees = useMemo(() => {
    return fees.filter((item) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        !query ||
        item.student.toLowerCase().includes(query) ||
        item.studentId.toLowerCase().includes(query) ||
        item.className.toLowerCase().includes(query) ||
        item.room.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        getStatus(item) === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [fees, search, statusFilter]);

  const handleAddFee = () => {
    setEditingFee(null);
    setFormData(emptyForm);
    setError("");
    setShowModal(true);
  };

  const handleEditFee = (item) => {
    setEditingFee(item);
    setFormData({
      student: item.student,
      studentId: item.studentId,
      className: item.className,
      room: item.room,
      fee: String(item.fee),
      paid: String(item.paid),
      dueDate: item.dueDate || "",
    });
    setError("");
    setShowModal(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (
      !formData.student.trim() ||
      !formData.studentId.trim() ||
      !formData.className.trim() ||
      !formData.room.trim() ||
      formData.fee === "" ||
      !formData.dueDate
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    const total = Number(formData.fee);
    const paid = Number(formData.paid || 0);

    if (
      !Number.isFinite(total) ||
      !Number.isFinite(paid) ||
      total <= 0 ||
      paid < 0 ||
      paid > total
    ) {
      setError("Enter a valid fee and paid amount. Paid amount cannot exceed total fee.");
      return;
    }

    const feeData = {
      student: formData.student.trim(),
      studentId: formData.studentId.trim(),
      className: formData.className.trim(),
      room: formData.room.trim(),
      fee: total,
      paid,
      dueDate: formData.dueDate,
    };

    if (editingFee) {
      setFees((previous) =>
        previous.map((item) =>
          item.id === editingFee.id
            ? { ...item, ...feeData }
            : item
        )
      );

      saveActivity(
        "Fee record updated",
        `${feeData.student}'s fee record was updated.`
      );
    } else {
      const duplicate = fees.some(
        (item) =>
          item.studentId.toLowerCase() ===
          feeData.studentId.toLowerCase()
      );

      if (duplicate) {
        setError("This Student ID already has a fee record.");
        return;
      }

      setFees((previous) => [
        ...previous,
        { id: Date.now(), ...feeData },
      ]);

      saveActivity(
        "Fee record added",
        `A fee record was added for ${feeData.student}.`
      );
    }

    setShowModal(false);
  };

  const openPaymentModal = (item) => {
    setSelectedFee(item);
    setPaymentForm({
      amount: "",
      method: "Cash",
      date: today(),
      note: "",
    });
    setError("");
    setShowPaymentModal(true);
  };

  const recordPayment = (event) => {
    event.preventDefault();
    setError("");

    if (!selectedFee) return;

    const amount = Number(paymentForm.amount);
    const remaining = Math.max(
      0,
      Number(selectedFee.fee) - Number(selectedFee.paid)
    );

    if (
      !Number.isFinite(amount) ||
      amount <= 0 ||
      amount > remaining
    ) {
      setError(`Enter a payment greater than ₹0 and no more than ${money(remaining)}.`);
      return;
    }

    if (!paymentForm.date) {
      setError("Please select the payment date.");
      return;
    }

    const updatedPaid = Number(selectedFee.paid) + amount;
    const receipt = {
      id: `RCT-${Date.now()}`,
      feeId: selectedFee.id,
      student: selectedFee.student,
      studentId: selectedFee.studentId,
      className: selectedFee.className,
      room: selectedFee.room,
      totalFee: Number(selectedFee.fee),
      previousPaid: Number(selectedFee.paid),
      amount,
      paidAfter: updatedPaid,
      balance: Number(selectedFee.fee) - updatedPaid,
      method: paymentForm.method,
      date: paymentForm.date,
      note: paymentForm.note.trim(),
      createdAt: new Date().toISOString(),
    };

    setFees((previous) =>
      previous.map((item) =>
        item.id === selectedFee.id
          ? { ...item, paid: updatedPaid }
          : item
      )
    );

    setPayments((previous) => [receipt, ...previous]);

    saveActivity(
      "Fee payment recorded",
      `${money(amount)} recorded for ${selectedFee.student}. Receipt: ${receipt.id}.`
    );

    setShowPaymentModal(false);
    setSelectedFee(null);
    setSelectedReceipt(receipt);
  };

  const printReceipt = (receipt) => {
    if (!receipt) return;

    const printWindow = window.open("", "_blank", "width=800,height=750");

    if (!printWindow) {
      alert("Please allow pop-ups to print the receipt.");
      return;
    }

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Fee Receipt ${escapeHTML(receipt.id)}</title>
        <meta charset="UTF-8" />
        <style>
          * { box-sizing: border-box; }
          body {
            font-family: Arial, sans-serif;
            color: #1e293b;
            margin: 0;
            padding: 32px;
            background: #fff;
          }
          .receipt {
            max-width: 680px;
            margin: auto;
            border: 1px solid #dbe3ef;
            border-radius: 12px;
            padding: 30px;
          }
          .top {
            display: flex;
            justify-content: space-between;
            gap: 20px;
            border-bottom: 2px solid #2563eb;
            padding-bottom: 20px;
          }
          h1 { margin: 0 0 8px; font-size: 25px; }
          p { margin: 5px 0; color: #64748b; font-size: 13px; }
          .label { color: #64748b; font-size: 12px; }
          .value { font-weight: bold; margin-top: 5px; }
          .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 24px 0;
          }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td {
            text-align: left;
            padding: 12px 8px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 13px;
          }
          th { color: #64748b; background: #f8fafc; }
          .amount {
            background: #eff6ff;
            padding: 18px;
            border-radius: 8px;
            margin-top: 18px;
          }
          .amount strong { font-size: 25px; color: #1d4ed8; }
          .footer {
            text-align: center;
            margin-top: 30px;
            border-top: 1px dashed #cbd5e1;
            padding-top: 18px;
          }
          .notice { font-size: 11px; }
          @media print {
            body { padding: 0; }
            .receipt { border: none; padding: 10px; }
          }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="top">
            <div>
              <h1>HOSTEL FEE RECEIPT</h1>
              <p>Student Management System</p>
              <p>Payment acknowledgement</p>
            </div>
            <div>
              <div class="label">Receipt number</div>
              <div class="value">${escapeHTML(receipt.id)}</div>
              <div class="label" style="margin-top:12px">Payment date</div>
              <div class="value">${escapeHTML(receipt.date)}</div>
            </div>
          </div>

          <div class="grid">
            <div>
              <div class="label">Student name</div>
              <div class="value">${escapeHTML(receipt.student)}</div>
              <div class="label" style="margin-top:14px">Student ID</div>
              <div class="value">${escapeHTML(receipt.studentId)}</div>
            </div>
            <div>
              <div class="label">Class / Room</div>
              <div class="value">${escapeHTML(receipt.className)} / ${escapeHTML(receipt.room)}</div>
              <div class="label" style="margin-top:14px">Payment method</div>
              <div class="value">${escapeHTML(receipt.method)}</div>
            </div>
          </div>

          <table>
            <thead>
              <tr><th>Description</th><th>Amount</th></tr>
            </thead>
            <tbody>
              <tr><td>Total hostel fee</td><td>${escapeHTML(money(receipt.totalFee))}</td></tr>
              <tr><td>Previously paid</td><td>${escapeHTML(money(receipt.previousPaid))}</td></tr>
              <tr><td><strong>Payment received now</strong></td><td><strong>${escapeHTML(money(receipt.amount))}</strong></td></tr>
              <tr><td>Total paid after transaction</td><td>${escapeHTML(money(receipt.paidAfter))}</td></tr>
              <tr><td>Remaining balance</td><td>${escapeHTML(money(receipt.balance))}</td></tr>
            </tbody>
          </table>

          ${receipt.note ? `<p><strong>Note:</strong> ${escapeHTML(receipt.note)}</p>` : ""}

          <div class="amount">
            <p>AMOUNT RECEIVED</p>
            <strong>${escapeHTML(money(receipt.amount))}</strong>
          </div>

          <div class="footer">
            <p>Thank you.</p>
            <p class="notice">Computer-generated demo receipt. This document is not proof of a verified online transaction.</p>
          </div>
        </div>
        <script>
          window.onload = function() {
            window.print();
          };
        <\/script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  };

  const exportCSV = () => {
    const headers = [
      "Student",
      "Student ID",
      "Class",
      "Room",
      "Total Fee",
      "Paid",
      "Balance",
      "Due Date",
      "Status",
    ];

    const rows = filteredFees.map((item) => [
      item.student,
      item.studentId,
      item.className,
      item.room,
      item.fee,
      item.paid,
      Math.max(0, item.fee - item.paid),
      item.dueDate,
      getStatus(item),
    ]);

    const escapeCSV = (value) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "hostel-fee-report.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const statCards = [
    {
      label: "Total Fees",
      value: money(totalFees),
      icon: <FaMoneyBillWave />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Collected",
      value: money(paidAmount),
      icon: <FaCheckCircle />,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Outstanding",
      value: money(pendingAmount),
      icon: <FaWallet />,
      color: "bg-orange-50 text-orange-600",
    },
    {
      label: "Overdue Students",
      value: overdueCount,
      icon: <FaExclamationTriangle />,
      color: "bg-rose-50 text-rose-600",
    },
  ];

  const inputClass =
    "w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="min-h-screen bg-[#EAF1FF] p-4 sm:p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl text-left font-semibold text-gray-900">
              Hostel Fee Management
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Track collections, outstanding balances and payment receipts.
            </p>
          </div>

          <button
            onClick={handleAddFee}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            <FaPlus size={13} /> Add Fee Record
          </button>
        </div>

        {/* Summary cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => (
            <div
              key={card.label}
              className="rounded-2xl text-left border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-gray-500">{card.label}</p>
                  <h2 className="mt-2 text-2xl font-bold text-gray-900">
                    {card.value}
                  </h2>
                </div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.color}`}
                >
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Collection progress */}
        <section className="mb-7 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="font-semibold text-left text-gray-900">
                Collection Progress
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Collected {money(paidAmount)} out of {money(totalFees)}
              </p>
            </div>
            <span className="text-xl font-bold text-blue-600">
              {collectionProgress.toFixed(1)}%
            </span>
          </div>
          <div
            className="h-3 overflow-hidden rounded-full bg-gray-100"
            role="progressbar"
            aria-valuenow={Math.round(collectionProgress)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-500"
              style={{ width: `${collectionProgress}%` }}
            />
          </div>
        </section>

        {/* Search and filters */}
        <section className="mb-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search student, ID, class or room..."
                className={`${inputClass} pl-11`}
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className={`${inputClass} md:max-w-52`}
              aria-label="Filter by payment status"
            >
              {["All", "Paid", "Partial", "Pending", "Overdue"].map(
                (status) => (
                  <option key={status} value={status}>
                    {status === "All" ? "All statuses" : status}
                  </option>
                )
              )}
            </select>

            <button
              onClick={exportCSV}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <FaDownload /> Export CSV
            </button>

            <button
              onClick={() => setShowHistory((previous) => !previous)}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <FaHistory />
              {showHistory ? "Hide History" : "Payment History"}
            </button>
          </div>
        </section>

        {/* Fee table */}
        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 px-5 py-5 sm:px-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Hostel Fee Records
              </h2>
              <p className="mt-1 text-sm text-left text-gray-500">
                {filteredFees.length} record(s) found
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px]">
              <thead>
                <tr className="bg-gray-50 text-left">
                  {[
                    "Student",
                    "Class / Room",
                    "Total Fee",
                    "Paid",
                    "Balance",
                    "Due Date",
                    "Status",
                    "Actions",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredFees.map((item) => {
                  const status = getStatus(item);
                  const balance = Math.max(
                    0,
                    Number(item.fee) - Number(item.paid)
                  );

                  return (
                    <tr
                      key={item.id}
                      className="border-t text-left border-gray-100 transition hover:bg-gray-50"
                    >
                      <td className="px-5 py-4">
                        <p className="font-medium text-gray-900">
                          {item.student}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          {item.studentId}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {item.className}
                        <p className="mt-1 text-xs text-gray-400">
                          Room {item.room}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm font-medium text-gray-900">
                        {money(item.fee)}
                      </td>

                      <td className="px-5 py-4 text-sm font-medium text-green-700">
                        {money(item.paid)}
                      </td>

                      <td className="px-5 py-4 text-sm font-medium text-gray-900">
                        {money(balance)}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {item.dueDate || "—"}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1.5 text-xs font-medium ${statusStyles[status]}`}
                        >
                          {status}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          {balance > 0 && (
                            <button
                              onClick={() => openPaymentModal(item)}
                              title="Record payment"
                              className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-700 transition hover:bg-green-100"
                            >
                              <FaCreditCard size={13} />
                            </button>
                          )}

                          <button
                            onClick={() => handleEditFee(item)}
                            title="Edit fee record"
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100"
                          >
                            <FaEdit size={13} />
                          </button>

                          <button
                            onClick={() => {
                              const latest = payments.find(
                                (payment) => payment.feeId === item.id
                              );

                              if (latest) {
                                setSelectedReceipt(latest);
                              } else {
                                alert(
                                  "No payment receipt exists yet. Record a payment first."
                                );
                              }
                            }}
                            title="View latest receipt"
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600 transition hover:bg-purple-100"
                          >
                            <FaReceipt size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filteredFees.length === 0 && (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-5 py-12 text-center text-sm text-gray-500"
                    >
                      No fee records match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Payment history */}
        {showHistory && (
          <section className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-5 py-5">
              <h2 className="text-xl text-left font-semibold text-gray-900">
                Payment History
              </h2>
              <p className="mt-1 text-left text-sm text-gray-500">
                Recorded transactions and their receipt numbers
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px]">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    {[
                      "Receipt No.",
                      "Student",
                      "Date",
                      "Method",
                      "Amount",
                      "Receipt",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="px-5 py-4 text-xs font-semibold uppercase text-gray-500"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="border-t border-gray-100"
                    >
                      <td className="px-5 text-left py-4 text-sm font-medium text-blue-700">
                        {payment.id}
                      </td>
                      <td className="px-5 py-4 text-left text-sm text-gray-700">
                        {payment.student}
                      </td>
                      <td className="px-5 py-4 text-left text-sm text-gray-600">
                        {payment.date}
                      </td>
                      <td className="px-5 py-4 text-left text-sm text-gray-600">
                        {payment.method}
                      </td>
                      <td className="px-5 py-4 text-sm text-left font-semibold text-green-700">
                        {money(payment.amount)}
                      </td>
                      <td className="px-5 text-left py-4">
                        <button
                          onClick={() => setSelectedReceipt(payment)}
                          className="text-sm  font-medium text-blue-600 hover:underline"
                        >
                          View receipt
                        </button>
                      </td>
                    </tr>
                  ))}

                  {payments.length === 0 && (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-5 py-10 text-center text-sm text-gray-500"
                      >
                        No payments recorded yet. Use the payment action on a fee record.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Add / edit modal */}
        {showModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/40 p-4">
            <div className="my-auto max-h-[95vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {editingFee ? "Edit Hostel Fee" : "Add Hostel Fee"}
                  </h2>
                  <p className="mt-1 text-xs text-gray-500">
                    Enter the student and fee details.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200"
                  aria-label="Close"
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 p-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Student Name *
                  </label>
                  <input
                    required
                    name="student"
                    value={formData.student}
                    onChange={handleChange}
                    placeholder="Enter student name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Student ID *
                  </label>
                  <input
                    required
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    placeholder="Example: ST004"
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Class *
                    </label>
                    <input
                      required
                      name="className"
                      value={formData.className}
                      onChange={handleChange}
                      placeholder="8-A"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Room *
                    </label>
                    <input
                      required
                      name="room"
                      value={formData.room}
                      onChange={handleChange}
                      placeholder="A104"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Total Fee (₹) *
                    </label>
                    <input
                      required
                      type="number"
                      min="1"
                      step="0.01"
                      name="fee"
                      value={formData.fee}
                      onChange={handleChange}
                      placeholder="5000"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Paid Amount (₹) *
                    </label>
                    <input
                      required
                      type="number"
                      min="0"
                      step="0.01"
                      name="paid"
                      value={formData.paid}
                      onChange={handleChange}
                      placeholder="0"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Due Date *
                  </label>
                  <input
                    required
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                  <span className="text-sm text-gray-500">
                    Remaining balance
                  </span>
                  <span className="font-bold text-gray-900">
                    {money(
                      Math.max(
                        0,
                        Number(formData.fee || 0) -
                          Number(formData.paid || 0)
                      )
                    )}
                  </span>
                </div>

                {error && (
                  <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                    {error}
                  </p>
                )}

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="rounded-xl border border-gray-200 px-5 py-2.5 font-medium text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
                  >
                    {editingFee ? "Update Fee" : "Add Fee"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Record payment modal */}
        {showPaymentModal && selectedFee && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/40 p-4">
            <div className="my-auto w-full max-w-md rounded-2xl bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Record Payment
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {selectedFee.student}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100"
                  aria-label="Close"
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={recordPayment} className="space-y-4 p-6">
                <div className="rounded-xl bg-blue-50 p-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Total fee</span>
                    <span>{money(selectedFee.fee)}</span>
                  </div>
                  <div className="mt-2 flex justify-between text-sm text-gray-600">
                    <span>Already paid</span>
                    <span>{money(selectedFee.paid)}</span>
                  </div>
                  <div className="mt-3 flex justify-between border-t border-blue-100 pt-3 font-semibold text-blue-800">
                    <span>Amount remaining</span>
                    <span>
                      {money(selectedFee.fee - selectedFee.paid)}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Payment Amount (₹) *
                  </label>
                  <input
                    required
                    type="number"
                    min="0.01"
                    max={selectedFee.fee - selectedFee.paid}
                    step="0.01"
                    value={paymentForm.amount}
                    onChange={(event) =>
                      setPaymentForm((previous) => ({
                        ...previous,
                        amount: event.target.value,
                      }))
                    }
                    placeholder="Enter amount received"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Payment Method *
                  </label>
                  <select
                    value={paymentForm.method}
                    onChange={(event) =>
                      setPaymentForm((previous) => ({
                        ...previous,
                        method: event.target.value,
                      }))
                    }
                    className={inputClass}
                  >
                    <option>Cash</option>
                    <option>UPI (demo record)</option>
                    <option>Bank Transfer</option>
                    <option>Cheque</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Payment Date *
                  </label>
                  <input
                    required
                    type="date"
                    value={paymentForm.date}
                    onChange={(event) =>
                      setPaymentForm((previous) => ({
                        ...previous,
                        date: event.target.value,
                      }))
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Note (optional)
                  </label>
                  <input
                    value={paymentForm.note}
                    onChange={(event) =>
                      setPaymentForm((previous) => ({
                        ...previous,
                        note: event.target.value,
                      }))
                    }
                    placeholder="Payment reference or note"
                    className={inputClass}
                  />
                </div>

                {error && (
                  <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                    {error}
                  </p>
                )}

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowPaymentModal(false)}
                    className="rounded-xl border border-gray-200 px-4 py-2.5 font-medium text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 font-medium text-white hover:bg-green-700"
                  >
                    <FaReceipt /> Record & Generate Receipt
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Receipt preview modal */}
        {selectedReceipt && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center overflow-y-auto bg-black/50 p-4">
            <div className="my-auto max-h-[95vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-gray-100 p-5">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Payment Receipt
                  </h2>
                  <p className="mt-1 text-xs text-gray-500">
                    {selectedReceipt.id}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedReceipt(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200"
                  aria-label="Close receipt"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-5 p-6">
                <div className="rounded-xl border border-gray-200 p-5">
                  <div className="border-b border-gray-200 pb-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                      Student Management System
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-gray-900">
                      Hostel Fee Receipt
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Receipt No: {selectedReceipt.id}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-5 text-sm">
                    <div>
                      <p className="text-gray-500">Student</p>
                      <p className="mt-1 font-semibold text-gray-900">
                        {selectedReceipt.student}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Student ID</p>
                      <p className="mt-1 font-semibold text-gray-900">
                        {selectedReceipt.studentId}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Class / Room</p>
                      <p className="mt-1 font-semibold text-gray-900">
                        {selectedReceipt.className} / {selectedReceipt.room}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Payment Date</p>
                      <p className="mt-1 font-semibold text-gray-900">
                        {selectedReceipt.date}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Payment Method</p>
                      <p className="mt-1 font-semibold text-gray-900">
                        {selectedReceipt.method}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Remaining Balance</p>
                      <p className="mt-1 font-semibold text-gray-900">
                        {money(selectedReceipt.balance)}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-green-50 p-5">
                    <p className="text-sm text-green-700">
                      Payment received
                    </p>
                    <p className="mt-1 text-3xl font-bold text-green-800">
                      {money(selectedReceipt.amount)}
                    </p>
                  </div>

                  <div className="mt-5 space-y-3 text-sm">
                    <div className="flex justify-between gap-3">
                      <span className="text-gray-500">Total fee</span>
                      <span className="font-medium">
                        {money(selectedReceipt.totalFee)}
                      </span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-gray-500">Previously paid</span>
                      <span className="font-medium">
                        {money(selectedReceipt.previousPaid)}
                      </span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-gray-500">Total paid to date</span>
                      <span className="font-semibold text-green-700">
                        {money(selectedReceipt.paidAfter)}
                      </span>
                    </div>
                    {selectedReceipt.note && (
                      <div className="border-t border-gray-100 pt-3">
                        <span className="text-gray-500">Note: </span>
                        {selectedReceipt.note}
                      </div>
                    )}
                  </div>

                  <p className="mt-6 border-t border-dashed border-gray-300 pt-4 text-center text-xs text-gray-500">
                    Computer-generated demo receipt. This is not proof of a verified online payment.
                  </p>
                </div>

                <button
                  onClick={() => printReceipt(selectedReceipt)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
                >
                  <FaPrint /> Print / Save as PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Fee;
