import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../component/CointextAuth";
import Particles from "@tsparticles/react";

<Particles
  options={{
    background: { color: { value: "#0d47a1" } },
    particles: {
      number: { value: 80 },
      size: { value: 3 },
      move: { enable: true, speed: 2 },
      color: { value: "#ffffff" },
    },
  }}
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  }}
/>;

const initialBooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    img: "https://picsum.photos/200/300?1",
    story: "Classic novel set in 1920s America.",
    category: "Classic",
  },
  {
    title: "Harry Potter",
    author: "J.K. Rowling",
    img: "https://picsum.photos/200/300?2",
    story: "Fantasy story of a young wizard.",
    category: "Fantasy",
  },
];

const Home = () => {
  const { user } = useContext(AuthContext);

  const [books, setBooks] = useState(initialBooks);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [storyData, setStoryData] = useState({ title: "", story: "" });
  const [showLogin, setShowLogin] = useState(false);
  const [adminForm, setAdminForm] = useState({
    username: "",
    password: "",
  });
  const [addBookForm, setAddBookForm] = useState({
    title: "",
    author: "",
    img: "",
    story: "",
    category: "",
  });

  // Filtering books by category and search
  const filteredBooks = books.filter(
    (book) =>
      (activeCategory === "All" || book.category === activeCategory) &&
      book.title.toLowerCase().includes(search.toLowerCase())
  );

  // Category list
  const categoryList = [
    "All",
    ...Array.from(new Set(books.map((b) => b.category))),
  ];

  // Handlers
  const handleCategoryClick = (cat) => setActiveCategory(cat);

  const handleSearchChange = (e) => setSearch(e.target.value);

  const handleShowStory = (title, story) => {
    setStoryData({ title, story });
    setShowStory(true);
  };

  const handleCloseStory = () => setShowStory(false);

  const handleOpenLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  const handleLoginChange = (e) =>
    setAdminForm({ ...adminForm, [e.target.name]: e.target.value });

  const handleAdminLogin = () => {
    if (adminForm.username === "admin" && adminForm.password === "1234") {
      setAdminLoggedIn(true);
      setShowLogin(false);
      setAdminForm({ username: "", password: "" });
    } else {
      alert("Invalid Credentials");
    }
  };

  const handleAdminLogout = () => setAdminLoggedIn(false);

  const handleAddBookChange = (e) =>
    setAddBookForm({ ...addBookForm, [e.target.name]: e.target.value });

  const handleAddBook = () => {
    const { title, author, img, story, category } = addBookForm;
    if (!title || !author || !img || !story || !category) {
      alert("Fill all fields!");
      return;
    }
    setBooks([...books, { title, author, img, story, category }]);
    setAddBookForm({ title: "", author: "", img: "", story: "", category: "" });
    alert("Book Added!");
  };

  const handleDeleteBook = (index) => {
    if (adminLoggedIn) {
      if (window.confirm("Are you sure you want to delete this book?")) {
        setBooks(books.filter((_, idx) => idx !== index));
      }
    }
  };

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  // CSS as JS style objects
  const styles = {
    homeContainer: {
      padding: "30px 20px",
      textAlign: "center",
      background: "linear-gradient(270deg, #667eea, #764ba2, #43cea2, #4e54c8)",
      backgroundSize: "800% 800%",
      color: "#fff",
      fontWeight: "700",
      fontSize: "28px",
      boxShadow: "0 8px 20px rgba(118,75,162,0.5)",
      marginBottom: "30px",
      height :"100%",
      userSelect: "none",
      animation: "gradientShift 15s ease infinite",
    },

    container: {
      padding: "20px",
      maxWidth: "1060px",
      margin: "auto",
    },

    searchBar: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "15px",
      marginBottom: "25px",
    },

    searchInput: {
      padding: "12px 16px",
      borderRadius: "30px",
      border: "1.5px solid #764ba2",
      fontSize: "16px",
      width: "250px",
      outline: "none",
      transition: "border-color 0.3s ease",
      boxShadow: "0 3px 10px rgba(118,75,162,0.2)",
    },

    btn: {
      background: "#764ba2",
      color: "#fff",
      border: "none",
      borderRadius: "30px",
      padding: "12px 28px",
      fontSize: "14px",
      cursor: "pointer",
      userSelect: "none",
      boxShadow: "0 4px 15px rgba(118,75,162,0.3)",
      transition: "background 0.3s ease, transform 0.2s ease",
    },

    btnHover: {
      background: "#926bc7",
      transform: "scale(1.05)",
    },

    categoryButtons: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "15px",
      marginBottom: "30px",
    },

    categoryBtn: {
      borderRadius: "24px",
      border: "1.5px solid #764ba2",
      background: "#f3ecff",
      color: "#764ba2",
      fontSize: "14px",
      padding: "10px 22px",
      cursor: "pointer",
      userSelect: "none",
      boxShadow: "0 2px 10px rgba(118,75,162,0.2)",
      transition: "all 0.3s ease",
    },

    categoryActive: {
      background: "#764ba2",
      color: "#fff",
      boxShadow: "0 5px 20px rgba(118,75,162,0.6)",
    },

    booksGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
      gap: "24px",
    },

    book: {
      background: "#fff",
      borderRadius: "16px",
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      overflow: "hidden",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      cursor: "pointer",
    },

    bookHover: {
      transform: "translateY(-6px)",
      boxShadow: "0 20px 40px rgba(118,75,162,0.2)",
    },

    bookImg: {
      width: "100%",
      height: "180px",
      objectFit: "cover",
    },

    bookContent: {
      padding: "14px 18px",
      textAlign: "center", // changed from 'left' to 'center'
    },

    bookTitle: {
      margin: "10px 0 6px",
      fontWeight: "700",
      fontSize: "18px",
      color: "#4a2a84",
    },

    bookAuthor: {
      margin: "0",
      fontSize: "14px",
      color: "#6a32b7",
    },

    bookButtons: {
      marginTop: "12px",
      display: "flex",
      justifyContent: "space-between",
    },

    deleteBtn: {
      background: "#e63946",
      color: "#fff",
      borderRadius: "20px",
      padding: "8px 22px",
      fontSize: "12px",
      cursor: "pointer",
      userSelect: "none",
      boxShadow: "0 3px 15px rgba(230,57,70,0.35)",
      transition: "background 0.3s ease",
    },
    deleteBtnHover: {
      background: "#b72a36",
    },

    modal: {
      display: "flex",
      position: "fixed",
      inset: 0,
      background: "rgba(0, 0, 0, 0.75)",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1500,
      padding: "15px",
    },

    modalContent: {
      background: "#f9f9fb",
      padding: "32px 28px",
      borderRadius: "16px",
      maxWidth: "520px",
      width: "100%",
      boxShadow: "0 15px 30px rgba(78, 71, 139, 0.3)",
      position: "relative",
      userSelect: "text",
      textAlign: "center",
    },

    close: {
      position: "absolute",
      top: "14px",
      right: "18px",
      cursor: "pointer",
      fontSize: "26px",
      fontWeight: "700",
      color: "#764ba2",
      transition: "color 0.3s ease, transform 0.3s ease",
      userSelect: "none",
    },
    closeHover: {
      color: "#a486d5",
      transform: "scale(1.2)",
    },

    cancelBtn: {
      background: "#764ba2",
      color: "#fff",
      borderRadius: "24px",
      fontSize: "14px",
      padding: "12px 36px",
      cursor: "pointer",
      border: "none",
      marginTop: "24px",
      userSelect: "none",
      boxShadow: "0 6px 20px rgba(118,75,162,0.6)",
      transition: "background 0.3s ease",
    },
    cancelBtnHover: {
      background: "#926bc7",
    },

    adminPanel: {
      display: "block",
      margin: "40px auto",
      width: "90%",
      maxWidth: "600px",
      background: "#fff",
      padding: "28px 30px",
      borderRadius: "20px",
      boxShadow: "0 12px 30px rgba(118,75,162, 0.15)",
    },

    input: {
      width: "100%",
      padding: "14px 18px",
      margin: "10px 0",
      borderRadius: "24px",
      border: "1.5px solid #764ba2",
      fontSize: "15px",
      outline: "none",
      transition: "border-color 0.3s ease",
    },

    textarea: {
      width: "100%",
      padding: "14px 18px",
      margin: "10px 0",
      borderRadius: "24px",
      border: "1.5px solid #764ba2",
      fontSize: "15px",
      resize: "vertical",
      minHeight: "110px",
      outline: "none",
      transition: "border-color 0.3s ease",
    },
  };

  // Hover state for buttons (optional)
  const [categoryHover, setCategoryHover] = useState({});
  const [bookHover, setBookHover] = useState({});
  const [deleteHover, setDeleteHover] = useState({});
  const [closeHover, setCloseHover] = useState(false);
  const [cancelHover, setCancelHover] = useState(false);

  return (
    <>
      <div style={styles.homeContainer}>
        <h2 style={styles.welcomeText}>Welcome, {user?.username}</h2>

        <div style={styles.container}>
          <div style={styles.searchBar}>
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search by title..."
              style={styles.searchInput}
            />
            {!adminLoggedIn && (
              <button style={styles.btn} onClick={handleOpenLogin}>
                Admin Login
              </button>
            )}
            {adminLoggedIn && (
              <button style={styles.btn} onClick={handleAdminLogout}>
                Logout
              </button>
            )}
          </div>

          <div style={styles.categoryButtons}>
            {categoryList.map((cat) => (
              <button
                key={cat}
                style={{
                  ...styles.categoryBtn,
                  ...(cat === activeCategory
                    ? styles.categoryActive
                    : categoryHover[cat]
                    ? styles.categoryBtnHover
                    : {}),
                }}
                onClick={() => handleCategoryClick(cat)}
                onMouseEnter={() =>
                  setCategoryHover((prev) => ({ ...prev, [cat]: true }))
                }
                onMouseLeave={() =>
                  setCategoryHover((prev) => ({ ...prev, [cat]: false }))
                }
              >
                {cat}
              </button>
            ))}
          </div>

          {adminLoggedIn && (
            <div style={styles.adminPanel}>
              <h3>Add New Book</h3>
              <input
                type="text"
                name="title"
                placeholder="Book Title"
                value={addBookForm.title}
                onChange={handleAddBookChange}
                style={styles.input}
              />
              <input
                type="text"
                name="author"
                placeholder="Author"
                value={addBookForm.author}
                onChange={handleAddBookChange}
                style={styles.input}
              />
              <input
                type="text"
                name="img"
                placeholder="Image URL"
                value={addBookForm.img}
                onChange={handleAddBookChange}
                style={styles.input}
              />
              <textarea
                name="story"
                placeholder="Story..."
                value={addBookForm.story}
                onChange={handleAddBookChange}
                style={styles.textarea}
              ></textarea>
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={addBookForm.category}
                onChange={handleAddBookChange}
                style={styles.input}
              />
              <button style={styles.btn} onClick={handleAddBook}>
                Add Book
              </button>
            </div>
          )}

          <div style={styles.booksGrid} id="booksContainer">
            {filteredBooks.length === 0 && (
              <p style={{ margin: "1em" }}>No books found.</p>
            )}
            {filteredBooks.map((book, idx) => (
              <div
                key={book.title + idx}
                style={{
                  ...styles.book,
                  ...(bookHover[idx] ? styles.bookHover : {}),
                }}
                onMouseEnter={() =>
                  setBookHover((prev) => ({ ...prev, [idx]: true }))
                }
                onMouseLeave={() =>
                  setBookHover((prev) => ({ ...prev, [idx]: false }))
                }
              >
                <img src={book.img} alt={book.title} style={styles.bookImg} />
                <div style={styles.bookContent}>
                  {" "}
                  {/* Apply center alignment here */}
                  <h4 style={styles.bookTitle}>{book.title}</h4>
                  <p style={styles.bookAuthor}>
                    <b>Author:</b> {book.author}
                  </p>
                  <button
                    style={styles.btn}
                    onClick={() => handleShowStory(book.title, book.story)}
                  >
                    Read
                  </button>
                  {adminLoggedIn && (
                    <button
                      style={{
                        ...styles.deleteBtn,
                        ...(deleteHover[idx] ? styles.deleteBtnHover : {}),
                      }}
                      onClick={() => handleDeleteBook(idx)}
                      onMouseEnter={() =>
                        setDeleteHover((prev) => ({ ...prev, [idx]: true }))
                      }
                      onMouseLeave={() =>
                        setDeleteHover((prev) => ({ ...prev, [idx]: false }))
                      }
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Story Modal */}
        {showStory && (
          <div style={styles.modal} id="storyModal">
            <div style={styles.modalContent}>
              <span
                style={{
                  ...styles.close,
                  ...(closeHover ? styles.closeHover : {}),
                }}
                onClick={handleCloseStory}
                onMouseEnter={() => setCloseHover(true)}
                onMouseLeave={() => setCloseHover(false)}
              >
                &times;
              </span>
              <h2 id="modalTitle">{storyData.title}</h2>
              <p id="modalStory">{storyData.story}</p>
              <button
                style={{
                  ...styles.cancelBtn,
                  ...(cancelHover ? styles.cancelBtnHover : {}),
                }}
                onClick={handleCloseStory}
                onMouseEnter={() => setCancelHover(true)}
                onMouseLeave={() => setCancelHover(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Admin Login Modal */}
        {showLogin && (
          <div style={styles.modal} id="loginModal">
            <div style={styles.modalContent}>
              <span
                style={{
                  ...styles.close,
                  ...(closeHover ? styles.closeHover : {}),
                }}
                onClick={handleCloseLogin}
                onMouseEnter={() => setCloseHover(true)}
                onMouseLeave={() => setCloseHover(false)}
              >
                &times;
              </span>
              <h3>Admin Login</h3>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={adminForm.username}
                onChange={handleLoginChange}
                style={styles.input}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={adminForm.password}
                onChange={handleLoginChange}
                style={styles.input}
              />
              <button style={styles.btn} onClick={handleAdminLogin}>
                Login
              </button>
              <button
                style={{
                  ...styles.cancelBtn,
                  ...(cancelHover ? styles.cancelBtnHover : {}),
                }}
                onClick={handleCloseLogin}
                onMouseEnter={() => setCancelHover(true)}
                onMouseLeave={() => setCancelHover(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
