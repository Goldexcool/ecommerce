'use client'
import React, { useEffect, useState } from 'react'

import label from '../../../payload/fields/richText/label'

import classes from './index.module.scss'

const Promotion = () => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 7)

    const calculateRemainingTime = () => {
      const currentTime = new Date()
      const timeDifference = targetDate.getTime() - currentTime.getTime()
      const remainingSeconds = Math.max(0, Math.floor(timeDifference / 1000))

      const days = Math.floor(remainingSeconds / (24 * 60 * 60))
      const hours = Math.floor((remainingSeconds % (24 * 60 * 60)) / 3600)
      const minutes = Math.floor((remainingSeconds % 3600) / 60)
      const seconds = remainingSeconds % 60

      return {
        days,
        hours,
        minutes,
        seconds,
      }
    }

    const updateRemainingTime = () => {
      setTime(calculateRemainingTime())
    }

    const intervalId = setInterval(updateRemainingTime, 1000)

    return () => clearInterval(intervalId)
  }, []) // Empty dependency array ensures that the effect runs only once on mount

  return (
    <section className={classes.promotion}>
      <div className={classes.textBox}>
        <h3 className={classes.title}>Deals of the month</h3>
        <p>
          Get ready for a shopping experience like never before with our Deals of the Month! Every
          purchase comes with exclusive perks and offers, making this month a celebration of savvy
          choices and amazing deals. Don't miss out! 🎁🛒
        </p>
        <ul className={classes.stats}>
          <StatBox label="Days" value={time.days} />
          <StatBox label="Hours" value={time.hours} />
          <StatBox label="Minutes" value={time.minutes} />
          <StatBox label="Seconds" value={time.seconds} />
        </ul>
      </div>
    </section>
  )
}

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <li>
    <h4>{value}</h4>
    <p>{label}</p>
  </li>
)

export default Promotion
