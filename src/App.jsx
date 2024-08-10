import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import HomePage from "../src/components/home/HomePage"
import Layout from "./components/layout/Layout"
import BlogPage from "./components/blog/BlogPage"
import AuthorPage from "./components/author/AuthorPage"
import BlogsPage from "./components/blogs list/BlogsPage"
import AuthorsPage from "./components/authors list/AuthorsPage"
import NotFoundPage from "./components/404/404"
import SearchPage from "./components/search/SearchPage"

function App() {



  return (


    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:slug" element={<BlogPage />} />
          <Route path="/authors/:slug" element={<AuthorPage />} />
          <Route path="/authors" element={<AuthorsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
