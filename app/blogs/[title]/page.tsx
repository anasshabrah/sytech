// app/blogs/[title]/page.tsx

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import blogDetails from '@/public/images/blog-details.png';
import { blogData } from '@/public/blogdata';
import { formatString } from '@/utils/formatString';
import DetailsVideo from '@/components/DetailsVideo';
import logo from "@/public/images/logo.png";
import fb from "@/public/images/fb.png";
import tt from "@/public/images/tt.png";
import x from "@/public/images/x.png";
import sp from "@/public/images/sp.png";
import { Blog, BlogDetailsPageProps, TableOfContentsItem } from '../../types'; // Import the new type

export async function generateStaticParams() {
  return blogData.map((blog: Blog) => ({
    title: formatString(blog.title),
  }));
}

const BlogDetailsPage = async ({ params }: BlogDetailsPageProps) => {
  const blog = blogData.find((blog: Blog) => formatString(blog.title) === params.title);

  if (!blog) {
    return (
      <div>
        <h1>Blog Not Found</h1>
        <Link href="/blogs">Back to Blogs</Link>
      </div>
    );
  }

  return (
    <>
      <header className="header-blog">
        <div className="container d-flex flex-wrap gap-4 align-items-center justify-content-between">
          <Link href="/">
            <Image src={logo} alt="logo" />
          </Link>
          <Link href="/" className="d-flex align-items-center gap-2">
            <i className="ph ph-arrow-left"></i> Back to Home
          </Link>
        </div>
      </header>

      <main>
        <section className="blog-details">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-xxl-3">
                <div className="details-left">
                  <div className="info-box">
                    <h4>Article Information</h4>
                    <div className="d-flex flex-column gap-3">
                      <div className="d-flex align-items-center gap-2">
                        <i className="ph ph-tag fs-5"></i>
                        <p>
                          <span className="fw-medium">Category</span>: Inspiration
                        </p>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <i className="ph ph-clock fs-5"></i>
                        <p>
                          <span className="fw-medium">Updated</span>: {blog.date}
                        </p>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <i className="ph ph-user fs-5"></i>
                        <p>
                          <span className="fw-medium">Author</span>: {blog.author}
                        </p>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <i className="ph ph-alarm fs-5"></i>
                        <p>
                          <span className="fw-medium">Reading Time</span>: {blog.time}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="info-box">
                    <h4>Table of Contents</h4>
                    <div id="blog-index" className="d-flex flex-column gap-2 table-of-content">
                      {blog.tableOfContents.map((item: TableOfContentsItem) => (
                        <a key={item.id} href={`#${item.id}`}>
                          {item.title}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-md-8 col-xxl-9 d-flex flex-column gap-4"
                data-bs-spy="scroll"
                data-bs-target="#blog-index"
                data-bs-smooth-scroll="true"
              >
                <div className="details-container">
                  <div className="details-content">
                    <div id="title" className="row align-items-center g-4 mb-4 mb-xl-5">
                      <div className="col-md-6">
                        <Image src={blog.image} className="img-fluid w-100 rounded-3" alt="" />
                      </div>
                      <div className="col-md-6">
                        <h3 className="mb-3 fw-medium">{blog.title}</h3>
                        <div className="d-flex align-items-center gap-2">
                          <i className="ph ph-calendar fs-4"></i>
                          <p>
                            <span className="fw-medium">Updated</span>: {blog.date}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-lg mb-4 mb-xl-5">{blog.desc}</p>
                    <h4 id="understanding" className="fw-medium mb-3">
                      {blog.sections.understanding.title}
                    </h4>
                    <p className="text-lg mb-4 mb-xl-5">{blog.sections.understanding.content}</p>

                    <DetailsVideo />

                    <div id="crafting" className="mb-4 mb-xl-5">
                      <h5 className="mb-3">{blog.sections.crafting.title}</h5>
                      <p className="text-lg">{blog.sections.crafting.content}</p>
                    </div>

                    <div id="showcasing" className="mb-4 mb-xl-5">
                      <h5 className="mb-3">{blog.sections.showcasing.title}</h5>
                      <p className="text-lg">{blog.sections.showcasing.content}</p>
                    </div>

                    <div className="quote">{blog.quote}</div>
                    <p className="mb-4 mb-xl-5">{blog.additionalContent}</p>

                    <div className="mb-4 mb-xl-5">
                      <Image src={blogDetails} className="img-fluid w-100 rounded-3" alt="" />
                    </div>

                    <div id="conclusion" className="mb-4 mb-xl-5">
                      <h5 className="mb-3">{blog.sections.conclusion.title}</h5>
                      <p className="text-lg">{blog.sections.conclusion.content}</p>
                    </div>

                    <div className="share py-4">
                      <div className="d-flex gap-3 align-items-center justify-content-center mb-4">
                        <p>Follow Me</p>
                        <div className="d-flex gap-3">
                          <a href="#">
                            <Image src={fb} alt="Facebook" />
                          </a>
                          <a href="#">
                            <Image src={tt} alt="Twitter" />
                          </a>
                          <a href="#">
                            <Image src={x} alt="X" />
                          </a>
                          <a href="#">
                            <Image src={sp} alt="Spotify" />
                          </a>
                        </div>
                      </div>
                      <form>
                        <input type="text" value="Portify-?node-id=0-1&t=3MUWkaOWKQ0TLoKa-0" disabled />
                        <button>Copy Link</button>
                      </form>
                    </div>
                  </div>
                  <div className="next-prev">
                    <a href="#" className="article-card">
                      <button>
                        <i className="ph ph-arrow-left"></i>
                      </button>
                      <div>
                        <p className="fw-medium mb-1">Previous Article</p>
                        <h5 className="fw-medium">The Evolution of My Design Style Over Time</h5>
                      </div>
                    </a>
                    <div className="divider d-none d-md-block"></div>
                    <a href="#" className="article-card right">
                      <div>
                        <p className="fw-medium mb-1">Next Article</p>
                        <h5 className="fw-medium">The Evolution of My Design Style Over Time</h5>
                      </div>
                      <button>
                        <i className="ph ph-arrow-left"></i>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="newsletter">
          <div className="container">
            <div className="content">
              <h2 className="mb-3 fw-medium">Subscribe to our newsletter</h2>
              <p className="mb-4 pb-2">
                Technology blogging, captivating your audience goes beyond just the written word.
              </p>
              <form className="mb-3">
                <input type="email" placeholder="Enter your email address" required />
                <button type="submit">Subscribe</button>
              </form>
              <div>
                <label htmlFor="agree" className="d-flex align-items-center gap-2">
                  <input type="checkbox" id="agree" required />
                  <p>
                    I agree with{' '}
                    <a href="#" className="underlined">
                      Privacy Policy
                    </a>{' '}
                    &amp;{' '}
                    <a href="#" className="underlined">
                      Terms
                    </a>
                  </p>
                </label>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="container">
          <div className="d-flex justify-content-center gap-3">
            <p>
              Copyright @ <span id="year">{new Date().getFullYear()}</span> Portify
            </p>
            <p>|</p>
            <p>
              Designed By <a href="#">Pixelaxis</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default BlogDetailsPage;
