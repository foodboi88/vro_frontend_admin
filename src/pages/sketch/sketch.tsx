import { motion } from 'framer-motion'
import React from 'react'

const Sketch = () => {
  return (
    <motion.div
      className="main-sketch"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      Sketch
    </motion.div>
  )
}

export default Sketch