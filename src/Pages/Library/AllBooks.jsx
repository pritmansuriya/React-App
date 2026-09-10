import React, { useState,} from "react";
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
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Default Books
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

const AllBooks = () => {
  // Books state
  const navigate = useNavigate();
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem("schoolBooks");

    return savedBooks ? JSON.parse(savedBooks) : defaultBooks;
  });

  // const [showModal, setShowModal] = useState(false);

  // const [editId, setEditId] = useState(null);

  // const [bookForm, setBookForm] = useState({
  //   title: "",
  //   author: "",
  //   category: "",
  //   copies: "",
  //   status: "Available",
  // });

  // const handleChange = (e) => {
  //   setBookForm({
  //     ...bookForm,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleAddBook = () => {
  //   setEditId(null);

  //   setBookForm({
  //     title: "",
  //     author: "",
  //     category: "",
  //     copies: "",
  //     status: "Available",
  //   });

  //   setShowModal(true);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !bookForm.title ||
      !bookForm.author ||
      !bookForm.category ||
      !bookForm.copies
    ) {
      alert("Please fill all fields.");
      return;
    }

    // UPDATE
    if (editId !== null) {
      const updatedBooks = books.map((book) =>
        book.id === editId
          ? {
              ...book,
              title: bookForm.title,
              author: bookForm.author,
              category: bookForm.category,
              copies: Number(bookForm.copies),
              status: bookForm.status,
            }
          : book,
      );

      setBooks(updatedBooks);

      localStorage.setItem("schoolBooks", JSON.stringify(updatedBooks));

      setShowModal(false);
      setEditId(null);

      return;
    }

    // ADD NEW BOOK

    const newBook = {
      id: Date.now(),
      title: bookForm.title,
      author: bookForm.author,
      category: bookForm.category,
      copies: Number(bookForm.copies),
      status: bookForm.status,
    };

    const updatedBooks = [...books, newBook];

    setBooks(updatedBooks);

    localStorage.setItem("schoolBooks", JSON.stringify(updatedBooks));

    setShowModal(false);

    setBookForm({
      title: "",
      author: "",
      category: "",
      copies: "",
      status: "Available",
    });
  };

  const handleEdit = (book) => {
    setEditId(book.id);

    setBookForm({
      title: book.title,
      author: book.author,
      category: book.category,
      copies: book.copies,
      status: book.status,
    });

    setShowModal(true);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?",
    );

    if (!confirmDelete) {
      return;
    }

    const updatedBooks = books.filter((book) => book.id !== id);

    setBooks(updatedBooks);

    localStorage.setItem("schoolBooks", JSON.stringify(updatedBooks));
  };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  //   setEditId(null);

  //   setBookForm({
  //     title: "",
  //     author: "",
  //     category: "",
  //     copies: "",
  //     status: "Available",
  //   });
  // };

  const totalBooks = books.reduce(
    (total, book) => total + Number(book.copies),
    0,
  );

  const availableBooks = books
    .filter((book) => book.status === "Available")
    .reduce((total, book) => total + Number(book.copies), 0);

  const issuedBooks = books
    .filter((book) => book.status === "Issued")
    .reduce((total, book) => total + Number(book.copies), 0);

  return (
    <div className="min-h-screen bg-[#F7F8FC] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 text-left">
              All Books
            </h1>

            <p className="text-sm text-gray-500 mt-1 text-left">
              Manage all books in the school library
            </p>
          </div>

          {/* ADD BOOK BUTTON */}
          <button
            onClick={() => navigate("/dashboard/library/add")}
            className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition"
          >
            <FaPlus className="text-xs" />
            Add Book
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {/* TOTAL */}

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
                <FaBook className="text-purple-600 text-lg" />
              </div>

              <div>
                <p className="text-2xl font-bold text-gray-800 text-left">
                  {totalBooks}
                </p>

                <p className="text-sm text-gray-500 text-left">Total Books</p>
              </div>
            </div>
          </div>

          {/* AVAILABLE */}

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
                <FaCheckCircle className="text-green-600 text-lg" />
              </div>

              <div>
                <p className="text-2xl font-bold text-gray-800 text-left">
                  {availableBooks}
                </p>

                <p className="text-sm text-gray-500 text-left">Available</p>
              </div>
            </div>
          </div>

          {/* ISSUED */}

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center">
                <FaUpload className="text-orange-500 text-lg" />
              </div>

              <div>
                <p className="text-2xl font-bold text-gray-800 text-left">
                  {issuedBooks}
                </p>

                <p className="text-sm text-gray-500 text-left">Issued</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* TABLE HEADER */}

          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <FaBook className="text-purple-600" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800 text-left">
                  Library Books
                </h2>

                <p className="text-sm text-gray-500 text-left">
                  List of all available books
                </p>
              </div>
            </div>
          </div>

          {/* TABLE */}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                    Book Title
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                    Author
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                    Category
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                    Copies
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {books.map((book, index) => (
                  <tr
                    key={book.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    {/* BOOK TITLE */}

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
                          <FaBook className="text-purple-600 text-sm" />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-gray-800 text-left">
                            {book.title}
                          </p>

                          <p className="text-xs text-gray-400 text-left">
                            Book #{String(index + 1).padStart(2, "0")}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* AUTHOR */}

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FaUser className="text-gray-400 text-xs" />

                        <span className="text-sm text-gray-600">
                          {book.author}
                        </span>
                      </div>
                    </td>

                    {/* CATEGORY */}

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FaLayerGroup className="text-gray-400 text-xs" />

                        <span className="text-sm text-gray-600">
                          {book.category}
                        </span>
                      </div>
                    </td>

                    {/* COPIES */}

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FaBox className="text-gray-400 text-xs" />

                        <span className="text-sm font-medium text-gray-700">
                          {book.copies}
                        </span>
                      </div>
                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-4">
                      {book.status === "Available" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-600 text-xs font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          Available
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-50 text-yellow-600 text-xs font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                          Issued
                        </span>
                      )}
                    </td>

                    {/* ACTION */}

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {/* EDIT */}

                        <button
                          onClick={() => handleEdit(book)}
                          className="w-9 h-9 flex items-center justify-center rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 transition"
                          title="Edit"
                        >
                          <FaEdit className="text-sm" />
                        </button>

                        {/* DELETE */}

                        <button
                          onClick={() => handleDelete(book.id)}
                          className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition"
                          title="Delete"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default AllBooks;
