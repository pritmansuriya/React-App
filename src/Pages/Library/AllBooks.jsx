import React, { useMemo, useState } from "react";
import {
  FaBook,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaUser,
  FaLayerGroup,
  FaBox,
  FaCheckCircle,
  FaUpload,
  FaSearch,
  FaDownload,
  FaExclamationCircle,
  FaSortAlphaDown,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const defaultBooks = [
  {
    id: 1,
    title: "Mathematics",
    author: "John Smith",
    category: "Academic",
    copies: 10,
    status: "Available",
  },
  {
    id: 2,
    title: "Science",
    author: "Sarah Lee",
    category: "Science",
    copies: 8,
    status: "Available",
  },
  {
    id: 3,
    title: "English",
    author: "David Roy",
    category: "Language",
    copies: 6,
    status: "Issued",
  },
  {
    id: 4,
    title: "History",
    author: "Emily Brown",
    category: "History",
    copies: 5,
    status: "Available",
  },
];

const emptyForm = {
  title: "",
  author: "",
  category: "",
  copies: "",
  status: "Available",
};

const readBooks = () => {
  try {
    const savedBooks = localStorage.getItem("schoolBooks");

    if (savedBooks !== null) {
      const parsedBooks = JSON.parse(savedBooks);
      return Array.isArray(parsedBooks) ? parsedBooks : defaultBooks;
    }
  } catch (error) {
    console.error("Unable to read saved books:", error);
  }

  return defaultBooks;
};

const AllBooks = () => {
  const navigate = useNavigate();

  const [books, setBooks] = useState(readBooks);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("az");

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [bookForm, setBookForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const showMessage = (message, type = "success") => {
    setToast({ message, type });
    window.setTimeout(() => setToast(null), 3000);
  };

  const persistBooks = (updatedBooks) => {
    try {
      localStorage.setItem("schoolBooks", JSON.stringify(updatedBooks));
      setBooks(updatedBooks);
      return true;
    } catch (error) {
      console.error("Unable to save books:", error);
      showMessage("Unable to save books. Please try again.", "error");
      return false;
    }
  };

  // Summary values
  const totalTitles = books.length;

  const totalBooks = books.reduce(
    (total, book) => total + (Number(book.copies) || 0),
    0
  );

  const availableBooks = books
    .filter((book) => book.status === "Available")
    .reduce((total, book) => total + (Number(book.copies) || 0), 0);

  const issuedBooks = books
    .filter((book) => book.status === "Issued")
    .reduce((total, book) => total + (Number(book.copies) || 0), 0);

  const categories = useMemo(
    () => [
      ...new Set(
        books.map((book) => book.category).filter(Boolean)
      ),
    ].sort((a, b) => a.localeCompare(b)),
    [books]
  );

  // Search, filter and sort
  const filteredBooks = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return books
      .filter((book) => {
        const matchesSearch = [
          book.title,
          book.author,
          book.category,
        ].some((value) =>
          String(value ?? "").toLowerCase().includes(query)
        );

        const matchesStatus =
          statusFilter === "All" || book.status === statusFilter;

        const matchesCategory =
          categoryFilter === "All" ||
          book.category === categoryFilter;

        return matchesSearch && matchesStatus && matchesCategory;
      })
      .sort((a, b) => {
        const comparison = String(a.title ?? "").localeCompare(
          String(b.title ?? "")
        );

        return sortOrder === "az" ? comparison : -comparison;
      });
  }, [books, searchTerm, statusFilter, categoryFilter, sortOrder]);

  // Open add modal
  const handleOpenAdd = () => {
    setEditId(null);
    setBookForm({ ...emptyForm });
    setErrors({});
    setShowModal(true);
  };

  // Open edit modal
  const handleEdit = (book) => {
    setEditId(book.id);

    setBookForm({
      title: book.title ?? "",
      author: book.author ?? "",
      category: book.category ?? "",
      copies: String(book.copies ?? ""),
      status: book.status ?? "Available",
    });

    setErrors({});
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditId(null);
    setBookForm({ ...emptyForm });
    setErrors({});
  };

  // Input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setBookForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!bookForm.title.trim()) {
      newErrors.title = "Book title is required.";
    }

    if (!bookForm.author.trim()) {
      newErrors.author = "Author name is required.";
    }

    if (!bookForm.category.trim()) {
      newErrors.category = "Category is required.";
    }

    const copies = Number(bookForm.copies);

    if (
      bookForm.copies === "" ||
      !Number.isInteger(copies) ||
      copies < 1
    ) {
      newErrors.copies = "Enter a whole number greater than zero.";
    }

    if (!["Available", "Issued"].includes(bookForm.status)) {
      newErrors.status = "Select a valid status.";
    }

    // Prevent duplicate titles by the same author
    const duplicate = books.some(
      (book) =>
        book.id !== editId &&
        String(book.title).trim().toLowerCase() ===
          bookForm.title.trim().toLowerCase() &&
        String(book.author).trim().toLowerCase() ===
          bookForm.author.trim().toLowerCase()
    );

    if (duplicate) {
      newErrors.title =
        "This title already exists for the same author.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Add or update book
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const cleanedBook = {
      title: bookForm.title.trim(),
      author: bookForm.author.trim(),
      category: bookForm.category.trim(),
      copies: Number(bookForm.copies),
      status: bookForm.status,
    };

    if (editId !== null) {
      const updatedBooks = books.map((book) =>
        book.id === editId
          ? { ...book, ...cleanedBook }
          : book
      );

      if (!persistBooks(updatedBooks)) return;

      handleCloseModal();
      showMessage("Book updated successfully.");
      return;
    }

    const newBook = {
      id: Date.now(),
      ...cleanedBook,
    };

    const updatedBooks = [...books, newBook];

    if (!persistBooks(updatedBooks)) return;

    handleCloseModal();
    showMessage("Book added successfully.");
  };

  // Delete book
  const handleDelete = (id) => {
    const book = books.find((item) => item.id === id);

    if (!book) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${book.title}"?`
    );

    if (!confirmed) return;

    const updatedBooks = books.filter((item) => item.id !== id);

    if (!persistBooks(updatedBooks)) return;

    showMessage("Book deleted successfully.");
  };

  // CSV export
  const handleExportCSV = () => {
    if (filteredBooks.length === 0) {
      showMessage("No books available to export.", "error");
      return;
    }

    const headers = [
      "Book Title",
      "Author",
      "Category",
      "Copies",
      "Status",
    ];

    const escapeCSV = (value) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const rows = filteredBooks.map((book) => [
      book.title,
      book.author,
      book.category,
      book.copies,
      book.status,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "school-library-books.csv";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);

    showMessage("CSV exported successfully.");
  };

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setCategoryFilter("All");
    setSortOrder("az");
  };

  const InputError = ({ name }) =>
    errors[name] ? (
      <p className="mt-1 text-xs text-red-500">{errors[name]}</p>
    ) : null;

  return (
    <div className="min-h-screen bg-[#EAF1FF] p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Toast notification */}
        {toast && (
          <div
            role="status"
            className={`fixed right-4 top-4 z-70 flex max-w-sm items-center gap-3 rounded-xl px-4 py-3 text-white shadow-lg ${
              toast.type === "error" ? "bg-red-600" : "bg-green-600"
            }`}
          >
            {toast.type === "error" ? (
              <FaExclamationCircle />
            ) : (
              <FaCheckCircle />
            )}

            <span className="text-sm font-medium">
              {toast.message}
            </span>

            <button
              type="button"
              onClick={() => setToast(null)}
              aria-label="Close notification"
              className="ml-2"
            >
              <FaTimes />
            </button>
          </div>
        )}

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl text-left font-bold text-gray-800">
              All Books
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage all books in the school library
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <FaDownload />
              Export CSV
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard/library/add")}
              className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-purple-700"
            >
              <FaPlus />
              Add Book
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            icon={<FaBook />}
            value={totalBooks}
            label="Total Copies"
            iconClass="bg-purple-50 text-purple-600"
          />

          <SummaryCard
            icon={<FaCheckCircle />}
            value={availableBooks}
            label="Available Copies"
            iconClass="bg-green-50 text-green-600"
          />

          <SummaryCard
            icon={<FaUpload />}
            value={issuedBooks}
            label="Issued Copies"
            iconClass="bg-orange-50 text-orange-500"
          />

          <SummaryCard
            icon={<FaLayerGroup />}
            value={totalTitles}
            label="Book Titles"
            iconClass="bg-blue-50 text-blue-600"
          />
        </div>

        {/* Library Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-gray-100 px-5 py-5 lg:flex-row lg:items-center lg:justify-between sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
                <FaBook className="text-purple-600" />
              </div>

              <div>
                <h2 className="text-lg text-left font-semibold text-gray-800">
                  Library Books
                </h2>

                <p className="text-sm text-gray-500">
                  Showing {filteredBooks.length} of {books.length} titles
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleOpenAdd}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-purple-200 px-4 py-2 text-sm font-medium text-purple-700 transition hover:bg-purple-50"
            >
              <FaPlus />
              Quick Add
            </button>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 gap-3 border-b border-gray-100 p-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search books, authors..."
                aria-label="Search books"
                className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="Filter by book status"
              className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-purple-500"
            >
              <option value="All">All statuses</option>
              <option value="Available">Available</option>
              <option value="Issued">Issued</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              aria-label="Filter by category"
              className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-purple-500"
            >
              <option value="All">All categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              aria-label="Sort books"
              className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-purple-500"
            >
              <option value="az">Title: A to Z</option>
              <option value="za">Title: Z to A</option>
            </select>
          </div>

          {(searchTerm ||
            statusFilter !== "All" ||
            categoryFilter !== "All" ||
            sortOrder !== "az") && (
            <div className="flex justify-end px-4 pt-3">
              <button
                type="button"
                onClick={resetFilters}
                className="text-sm font-medium text-purple-600 hover:text-purple-700"
              >
                Reset filters
              </button>
            </div>
          )}

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Book Title",
                    "Author",
                    "Category",
                    "Copies",
                    "Status",
                    "Actions",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredBooks.map((book, index) => (
                  <tr
                    key={book.id}
                    className="border-b border-gray-100 transition hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50">
                          <FaBook className="text-purple-600" />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            {book.title}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            Book #{String(index + 1).padStart(2, "0")}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaUser className="text-xs text-gray-400" />
                        {book.author}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaLayerGroup className="text-xs text-gray-400" />
                        {book.category}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <FaBox className="text-xs text-gray-400" />
                        {book.copies}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${
                          book.status === "Available"
                            ? "bg-green-50 text-green-700"
                            : "bg-orange-50 text-orange-700"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            book.status === "Available"
                              ? "bg-green-500"
                              : "bg-orange-500"
                          }`}
                        />
                        {book.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(book)}
                          aria-label={`Edit ${book.title}`}
                          title="Edit book"
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600 transition hover:bg-purple-100"
                        >
                          <FaEdit />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(book.id)}
                          aria-label={`Delete ${book.title}`}
                          title="Delete book"
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredBooks.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-14 text-center">
                      <FaBook className="mx-auto mb-3 text-3xl text-gray-300" />

                      <h3 className="font-semibold text-gray-800">
                        No books found
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Try another search or change the filters.
                      </p>

                      <button
                        type="button"
                        onClick={resetFilters}
                        className="mt-4 text-sm font-medium text-purple-600 hover:text-purple-700"
                      >
                        Clear filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-gray-100 px-5 py-4 text-xs text-gray-500 sm:px-6">
            Displaying {filteredBooks.length} book titles · {totalBooks} total copies
          </div>
        </div>

        {/* Add / Edit Modal */}
        {showModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 px-4 py-6"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                handleCloseModal();
              }
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="book-modal-title"
              className="my-auto w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                <div>
                  <h2
                    id="book-modal-title"
                    className="text-lg font-semibold text-gray-800"
                  >
                    {editId !== null ? "Edit Book" : "Add Book"}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {editId !== null
                      ? "Update the book information"
                      : "Add a new book to the library"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCloseModal}
                  aria-label="Close form"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100"
                >
                  <FaTimes />
                </button>
              </div>

              <form
                onSubmit={handleSubmit}
                className="max-h-[75vh] space-y-4 overflow-y-auto px-6 py-5"
              >
                <div>
                  <label
                    htmlFor="book-title"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Book Title
                  </label>

                  <input
                    id="book-title"
                    name="title"
                    value={bookForm.title}
                    onChange={handleChange}
                    placeholder="Enter book title"
                    className={`w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2 focus:ring-purple-100 ${
                      errors.title
                        ? "border-red-500"
                        : "border-gray-200 focus:border-purple-500"
                    }`}
                  />

                  <InputError name="title" />
                </div>

                <div>
                  <label
                    htmlFor="book-author"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Author
                  </label>

                  <input
                    id="book-author"
                    name="author"
                    value={bookForm.author}
                    onChange={handleChange}
                    placeholder="Enter author name"
                    className={`w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2 focus:ring-purple-100 ${
                      errors.author
                        ? "border-red-500"
                        : "border-gray-200 focus:border-purple-500"
                    }`}
                  />

                  <InputError name="author" />
                </div>

                <div>
                  <label
                    htmlFor="book-category"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>

                  <input
                    id="book-category"
                    name="category"
                    value={bookForm.category}
                    onChange={handleChange}
                    placeholder="e.g. Academic, Science, History"
                    className={`w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2 focus:ring-purple-100 ${
                      errors.category
                        ? "border-red-500"
                        : "border-gray-200 focus:border-purple-500"
                    }`}
                  />

                  <InputError name="category" />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="book-copies"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Number of Copies
                    </label>

                    <input
                      id="book-copies"
                      type="number"
                      min="1"
                      step="1"
                      name="copies"
                      value={bookForm.copies}
                      onChange={handleChange}
                      placeholder="10"
                      className={`w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2 focus:ring-purple-100 ${
                        errors.copies
                          ? "border-red-500"
                          : "border-gray-200 focus:border-purple-500"
                      }`}
                    />

                    <InputError name="copies" />
                  </div>

                  <div>
                    <label
                      htmlFor="book-status"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Status
                    </label>

                    <select
                      id="book-status"
                      name="status"
                      value={bookForm.status}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-200 px-4 py-2.5 outline-none focus:border-purple-500"
                    >
                      <option value="Available">Available</option>
                      <option value="Issued">Issued</option>
                    </select>

                    <InputError name="status" />
                  </div>
                </div>

                <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-purple-700"
                  >
                    {editId !== null ? (
                      <>
                        <FaEdit />
                        Update Book
                      </>
                    ) : (
                      <>
                        <FaPlus />
                        Save Book
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable summary card
const SummaryCard = ({ icon, value, label, iconClass }) => (
  <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md">
    <div
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl ${iconClass}`}
    >
      {icon}
    </div>

    <div>
      <p className="text-2xl font-bold text-left text-gray-800">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  </div>
);

export default AllBooks;