import moment from "moment"
import React from "react"
import styles from "./Comment.module.css"
function Comment({ author, body, timestamp, points, replies }) {
  return (
    <div className={styles.mainCont}>
      <div className={styles.topInfo}>
        <p>{author}</p>
        <p>{points} points</p>
        <p>{moment(timestamp).fromNow()}</p>
      </div>
      <h3>{body}</h3>
      <div className={styles.options}>
        <p>Reply</p>
        <p>Give Award</p>
        <p>Share</p>
        <p>Report</p>
        <p>Save</p>
      </div>
      {replies && replies.map((item) => <Comment {...item} />)}
    </div>
  )
}

export default Comment
