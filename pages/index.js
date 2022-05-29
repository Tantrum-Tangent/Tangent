import Head from "next/head";
import { storage } from "../firebase.config";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Link from "next/link";
import Header from "../components/header";
import { Document, Page, pdfjs } from "react-pdf";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function Home() {
  // Initialize local state
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState(null);
  const [url, setUrl] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  // Setup react-pdf
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const resetPreview = () => {
    setNumPages(0);
    setPageNumber(1);
  };

  const uploadToStorage = async () => {
    const storageRef = ref(storage, `receipts/${selectedImageName}`);
    const task = uploadBytesResumable(storageRef, selectedImage);

    const progress = (snapshot) => {
      console.log(
        `transferred: ${snapshot.bytesTransferred} / ${snapshot.totalBytes}`
      );
    };

    const error = (error) => {
      alert(error);
    };

    const completed = () => {
      getDownloadURL(task.snapshot.ref).then((snapshot) => {
        console.log(snapshot);
        setUrl(snapshot);
      });
    };

    task.on("state_changed", progress, error, completed);
  };

  const submitImage = async () => {
    if (selectedImage) {
      await uploadToStorage();
    }
  };

  const submitForm = () => {};

  return (
    <div className={styles.container}>
      <Head>
        <title>Tangent</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <p className={styles.description}>
          Upload a receipt/bank statment etc and let us extract the important
          information out for you!
        </p>

        {url ? (
          <Form url={url} />
        ) : (
          <div className={styles.uploadArea}>
            {selectedImage == null ? (
              <div className={styles.uploadBox}>
                <p className={styles.uploadBoxText}>No image selected</p>
              </div>
            ) : (
              // <p className={styles.uploadBoxText}>{selectedImage.}</p>
              <>
                <Document
                  file={selectedImage}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page pageNumber={pageNumber} />
                </Document>
                <div className="buttons">
                  <p>
                    Page {pageNumber} of {numPages}
                  </p>
                  <button
                    type="button"
                    disabled={pageNumber <= 1}
                    onClick={() => setPageNumber(pageNumber - 1)}
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    disabled={pageNumber >= numPages}
                    onClick={() => setPageNumber(pageNumber + 1)}
                  >
                    Next
                  </button>
                  <br />
                </div>
              </>
            )}

            <label for="inputTag" className={styles.uploadButtonLabel}>
              Upload Image
              <input
                className={styles.uploadButtonInput}
                id="inputTag"
                type="file"
                accept=".pdf"
                onChange={(event) => {
                  console.log(event.target.files[0]);
                  if (
                    event.target.files[0] != undefined &&
                    event.target.files[0].type == "application/pdf"
                  ) {
                    resetPreview();
                    setSelectedImage(event.target.files[0]);
                    setSelectedImageName(event.target.files[0].name);
                  } else {
                    console.log("Select your file");
                  }
                }}
              />
            </label>
            {selectedImage && (
              <button
                className={styles.uploadButtonLabel}
                onClick={submitImage}
              >
                Submit
              </button>
            )}
          </div>
        )}
        <Link href="./dashboard">
          <a>Back to Dashboard</a>
        </Link>
      </main>

      <footer className={styles.footer}>Powered by Tantrum</footer>
    </div>
  );
}
