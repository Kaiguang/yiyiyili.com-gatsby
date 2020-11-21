import React, { useRef, useState } from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo.js"
import LoadingSpinner from "../components/LoadingSpinner"

import styles from "./contact.module.css"

export default function Contact() {
  const nameInputEl = useRef(null)
  const emailInputEl = useRef(null)
  const buttonEl = useRef(null)
  const [data, setData] = useState({ name: "", email: "", message: "" })
  const [isSendingData, setIsSendingData] = useState(false)
  const [isFormValid, setIsFormValid] = useState(true)
  const [isMsgSentSuccessful, setIsMsgSentSuccessful] = useState(true)

  const handleFormSubmission = async event => {
    event.preventDefault()

    if (
      nameInputEl.current.reportValidity() &&
      emailInputEl.current.reportValidity()
    ) {
      setIsSendingData(true)
      setIsFormValid(true)
      try {
        await fetch(`${process.env.API_GATEWAY_ROOT_URL}/contact-me`, {
          method: `POST`,
          body: JSON.stringify(data, null, 2),
        })
        setIsMsgSentSuccessful(true)
        setIsSendingData(false)
        setData({ name: "", email: "", message: "" })
      } catch (error) {
        console.error(error.message)
      }
    } else {
      setIsSendingData(false)
      setIsFormValid(false)
    }
  }

  const handleUserInputChange = event => {
    setData({ ...data, [event.target.name]: event.target.value })
  }

  return (
    <Layout>
      <div className={styles.container}>
        <SEO title="Contact" />
        {isMsgSentSuccessful ? (
          <>
            <h1 className={styles.h1}>Message sent</h1>
            <button
              className={styles.button}
              onClick={() => setIsMsgSentSuccessful(false)}
            >
              Send me another message
            </button>
          </>
        ) : (
          <>
            <h1 className={styles.h1}>Send me a message</h1>
            <form className={styles.form}>
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Your Name"
                onChange={handleUserInputChange}
                ref={nameInputEl}
                disabled={isSendingData}
              />
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Your Email"
                onChange={handleUserInputChange}
                ref={emailInputEl}
                disabled={isSendingData}
              />
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Message"
                onChange={handleUserInputChange}
                disabled={isSendingData}
              />
              {isSendingData ? (
                <LoadingSpinner size={39} className={styles.loadingSpinner} />
              ) : (
                <button
                  className={`${styles.button} ${
                    isFormValid ? null : styles.shake
                  }`}
                  onClick={handleFormSubmission}
                  ref={buttonEl}
                  onAnimationEnd={() => setIsFormValid(true)}
                >
                  Send
                </button>
              )}
            </form>
          </>
        )}
      </div>
    </Layout>
  )
}
