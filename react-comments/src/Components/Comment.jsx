import moment from "moment"
import React, { useState } from "react"
import styles from "./Comment.module.css"
function Comment({ author, body, timestamp, points, replies }) {
  const [showReply, setShowReply] = useState(false)
  const [replyList, setReplyList] = useState(replies)
  console.log("replyList:", replyList)
  return (
    <div className={styles.mainCont}>
      <div className={styles.topInfo}>
        {replyList?.length && !showReply && (
          <h3 onClick={() => setShowReply(true)}>+</h3>
        )}
        <p onClick={() => setShowReply(false)}>{author}</p>
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
      {showReply && replyList && replyList.map((item) => <Comment {...item} />)}
    </div>
  )
}

export default Comment
