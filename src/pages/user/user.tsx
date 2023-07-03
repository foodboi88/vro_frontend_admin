import { motion } from 'framer-motion'
import React from 'react'

const User = () => {
  return (
    <motion.div
      className="main-user"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      User
    </motion.div>
  )
}

export default User